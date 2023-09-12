// @ts-nocheck

import { useMutation, useQuery, useQueryClient } from 'react-query';
import useSupabase from './useSupabase';
import { useAuth } from './useAuth';
import { createPlazo, deletePlazoById, getPlazosByUserId, updatePlazoById } from '../queries/plazo';
import { PlazoPayloadType } from '../types/plazo.types';
import { useState } from 'react';

export function useGetPlazosByUserId() {
  const client = useSupabase();
  const { user } = useAuth();

  return useQuery({
    queryKey: ['plazos', user?.id],
    queryFn: async () => {
      if (user?.id) {
        return getPlazosByUserId(client, user?.id).then((result) => result.data);
      }
    },
  });
}

/**
 * A Hook for creating new plazo.
 * @param {string} uid - UserId of the plazo creator.
 */
export function useCreatePlazoMutation() {
  const [loading, setLoading] = useState<boolean>();
  const client = useSupabase();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const uid = user?.id;

  const createPlazoMutation = useMutation(
    async (payload: PlazoPayloadType) => {
      if (uid) {
        return createPlazo(client, { uid, payload }).then((result) => result.data);
      }
    },
    {
      onMutate: () => setLoading(true),
      onSuccess: () => queryClient.refetchQueries(['plazos', uid]),
      onSettled: () => setLoading(false),
    }
  );
  return { createPlazoMutation, loading };
}

export function useUpdatePlazoMutation() {
  const client = useSupabase();
  const queryClient = useQueryClient();
  const { user } = useAuth();
  return useMutation(
    async ({ id, payload }: { id: string; payload: PlazoPayloadType }) => {
      return updatePlazoById(client, { id, payload }).then((result) => result.data);
    },
    {
      onMutate: async ({ payload }) => {
        await queryClient.cancelQueries('plazos');
        const snapshot = queryClient.getQueryData('plazos');

        queryClient.setQueryData(['plazos', user?.id], (old: any[]) => {
          const i = old.findIndex((i: unknown) => i.id == i);
          old[i] = payload;
          // [...old.filter((i) => i.id !== id),payload]
          return old;
        });

        return { snapshot };
      },
      // onSuccess: (data, variables) => queryClient.refetchQueries(['plazo', variables.id]),

      onError: (err, variables, context) => {
        queryClient.setQueryData('plazos', context?.snapshot);
      },
      onSettled: () => {
        // Always refetch after error or success
        queryClient.invalidateQueries('plazos');
      },
    }
  );
}

export function useDeletePlazoMutation() {
  const client = useSupabase();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation(
    async ({ id }: { id: string }) => {
      return deletePlazoById(client, { id }).then((result) => result.data);
    },
    {
      onMutate: async ({ id }) => {
        await queryClient.cancelQueries('plazos');
        const snapshot = queryClient.getQueryData('plazos');
        queryClient.setQueryData(['plazos', user?.id], (old) => [
          ...old.filter((i) => i.id !== id),
        ]);

        return { snapshot };
      },
      onSettled: () => {
        queryClient.invalidateQueries('plazos');
      },
    }
  );
}
