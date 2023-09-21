import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import useSupabase from './useSupabase';
import { useAuth } from './useAuth';
import { createPlazo, deletePlazoById, getPlazosByUserId, updatePlazoById } from '../queries/plazo';
import { PlazoPayloadType, PlazoType } from '../types/plazo.types';
import { PostgrestError } from '@supabase/supabase-js';

export function useGetPlazosByUserId({ type }: { type: PlazoType['type'] }) {
  const client = useSupabase();
  const { user } = useAuth();

  return useQuery({
    queryKey: ['plazos', type],
    queryFn: async () => {
      if (user?.id) {
        const { data, error } = await getPlazosByUserId(client, {
          type: type,
          uid: user.id,
        });

        if (error) throw new Error(`${error.message}: ${error.details}`);

        return data;
      }
    },
  });
}

export function useCreatePlazoMutation({ type }: { type: PlazoType['type'] }) {
  const client = useSupabase();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const uid = user?.id;

  return useMutation<PlazoType | undefined, PostgrestError, PlazoPayloadType, unknown>(
    async (payload: PlazoPayloadType) => {
      if (uid) {
        const { error: createError, data } = await createPlazo(client, { uid, payload, type });

        if (createError) {
          throw createError;
        }

        return data;
      }
    },
    {
      onSuccess: () => queryClient.invalidateQueries(['plazos', type]),
    }
  );
}

export function useUpdatePlazoMutation({
  type,
  plazoId,
}: {
  type: PlazoType['type'];
  plazoId: string;
}) {
  const client = useSupabase();
  const queryClient = useQueryClient();

  return useMutation(
    async (payload: PlazoPayloadType) => {
      const { data, error: updateError } = await updatePlazoById(client, { id: plazoId, payload });

      if (updateError) {
        throw updateError;
      }

      return data;
    },
    {
      //   onMutate: async (variables) => {
      //     await queryClient.cancelQueries(['plazos', type]);
      //     const snapshot = queryClient.getQueryData(['plazos']);

      //     queryClient.setQueryData(['plazos', type], (old: PlazoPayload[] | undefined) => {
      //       if (!old) return;
      //       const i = old.findIndex((item: PlazoType | unknown) => item.id == i);
      //       old[i] = { ...variables };
      //       return old;
      //     });

      //     return { snapshot };
      //   },

      // onError: (err, variables, context) => {
      //   queryClient.setQueryData(['plazos', type], context?.snapshot);
      // },
      onSettled: () => {
        queryClient.invalidateQueries(['plazos', type]);
      },
    }
  );
}

export function useDeletePlazoMutation({ type }: { type: PlazoType['type'] }) {
  const client = useSupabase();
  const queryClient = useQueryClient();

  return useMutation(
    async ({ id }: { id: string }) => {
      const { data, error } = await deletePlazoById(client, { id });

      if (error) {
        throw error;
      }

      return data;
    },
    {
      // onMutate: async ({ id }) => {
      //   await queryClient.cancelQueries(['plazos', type]);
      //   const snapshot = queryClient.getQueryData(['plazos', type]);
      //   queryClient.setQueryData(['plazos', type], (old: PlazoType[] | u) => [...old.filter((i) => i.id !== id)]);

      //   return { snapshot };
      // },
      onSettled: () => {
        queryClient.invalidateQueries(['plazos', type]);
      },
    }
  );
}
