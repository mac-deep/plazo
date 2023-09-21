import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { PlazoInfiniteFormType, PlazoPayloadType, PlazoType } from '../types/plazo.types';
import moment from 'moment';
import { UseMutationResult } from '@tanstack/react-query';
import MultiPurposeBtn from './MultiPurposeBtn';
import { PostgrestError } from '@supabase/supabase-js';

const initFormState: PlazoInfiniteFormType = {
  title: '',
  startDate: moment(new Date().toLocaleDateString()).format('YYYY-DD-MM'),
};

type PlazoInfiniteFormProps = {
  values?: PlazoType | PlazoInfiniteFormType;
  mutation: UseMutationResult<PlazoType | undefined, unknown, PlazoPayloadType, unknown>;
  onClose: () => void;
  type: 'add' | 'edit';
};

const formToPayloadConverter = (payload: PlazoInfiniteFormType | PlazoType): PlazoPayloadType => {
  return {
    startDate: payload.startDate,
    title: payload.title,
  };
};

const plazoToFormConverter = (
  payload: PlazoType | PlazoInfiniteFormType | undefined
): PlazoInfiniteFormType | undefined => {
  if (payload) {
    return {
      startDate: payload.startDate,
      title: payload.title,
    };
  }
};

export default function PlazoInfinteForm({
  values,
  type,
  mutation,
  onClose,
}: PlazoInfiniteFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm<PlazoInfiniteFormType>({
    values: plazoToFormConverter(values),
    defaultValues: initFormState,
  });

  const formHeading =
    (type === 'add' && <>Add Infinite Plazo!</>) ||
    (type === 'edit' && <p>Edit {getValues('title')} Plazo!</p>);

  const { mutate, isLoading, error, isError, isSuccess } = mutation;
  const mutattionErr = error as PostgrestError;

  const onSubmit = async (formdata: PlazoPayloadType): Promise<void> => {
    mutate(formdata);
  };

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        reset();
        onClose();
      }, 2000);
    }
  }, [isSuccess]);

  return (
    <form
      onSubmit={handleSubmit((data) => onSubmit(formToPayloadConverter(data)))}
      className="grid grid-cols-2 gap-4"
    >
      {isError && <p className="bg-red-500  text-white">{mutattionErr.message}</p>}
      <div className="col-span-2 gap-2 flex justify-between">
        <h3 className="flex-1 p-2 bg-black text-white font-bold text-lg">{formHeading}</h3>
        <button type="button" onClick={onClose}>
          [x]
        </button>
      </div>

      <div className="col-span-2 form-control w-full ">
        <label className="label">
          <span className="label-text">Title</span>
        </label>
        <input
          autoFocus
          {...register('title')}
          min={4}
          max={100}
          type="text"
          placeholder="Eg. Day we meet"
          className="input input-bordered w-full"
        />
        {errors.title && (
          <label className="label">
            <span className="label-text-alt">{errors.title.message}</span>
          </label>
        )}
      </div>

      <div className="col-span-2 form-control w-full">
        <label className="label">
          <span className="label-text">Start Date</span>
        </label>
        <input
          type="date"
          {...register('startDate')}
          required
          className="input input-bordered w-full"
        />
        {errors.startDate && (
          <label className="label">
            <span className="label-text-alt">{errors.startDate.message}</span>
          </label>
        )}
      </div>

      <div className="flex col-span-2 gap-4 mt-4">
        <button
          type="button"
          onClick={() => reset(initFormState)}
          className="col-span-2 w-full border border-black px-4 py-2"
        >
          Clear
        </button>

        <MultiPurposeBtn
          type="submit"
          isLoading={isLoading}
          isSuccess={isSuccess}
          successMessage="Added!"
          name="SAVE"
          variant="black"
          className="w-full"
        />
      </div>
    </form>
  );
}
