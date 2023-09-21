import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { PlazoFiniteFormType, PlazoPayloadType, PlazoType } from '../types/plazo.types';
import { DurationUnit } from '../types/moment.types';
import moment from 'moment';
import { UseMutationResult } from '@tanstack/react-query';
import { PostgrestError } from '@supabase/supabase-js';
import MultiPurposeBtn from './MultiPurposeBtn';

const initFormState: PlazoFiniteFormType = {
  title: '',
  startDate: moment(new Date().toLocaleDateString()).format('YYYY-DD-MM'),
  endDate: '',
  durationValue: 6,
  durationUnit: 'months',
};

type DurationOptionType = {
  type: string;
  value: keyof typeof DurationUnit;
};

const durationOptions: DurationOptionType[] = [
  { type: 'Days', value: 'days' },
  { type: 'Months', value: 'months' },
  { type: 'Quarters', value: 'quarters' },
  { type: 'Year', value: 'years' },
];

type PlazoFormProps = {
  values?: PlazoFiniteFormType | PlazoType;
  mutation: UseMutationResult<PlazoType | undefined, unknown, PlazoPayloadType, unknown>;
  onClose: () => void;
  type: 'add' | 'edit';
};

const formToPayloadConverter = (payload: PlazoFiniteFormType | PlazoType): PlazoPayloadType => {
  return {
    endDate: payload.endDate,
    startDate: payload.startDate,
    title: payload.title,
  };
};

const plazoToFormConverter = (
  payload: PlazoType | PlazoFiniteFormType | undefined
): PlazoFiniteFormType | undefined => {
  if (payload) {
    return {
      endDate: payload.endDate,
      startDate: payload.startDate,
      title: payload.title,
      durationUnit: 'days',
      durationValue: moment(payload.endDate).diff(moment(payload.startDate), 'days'),
    };
  }
};

export default function NewForm({ values, type, mutation, onClose }: PlazoFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    getValues,
    reset,
  } = useForm<PlazoFiniteFormType>({
    values: plazoToFormConverter(values),
    defaultValues: initFormState,
  });

  const wStart = getValues('startDate');
  const wUnit = getValues('durationUnit');
  const wValue = getValues('durationValue');

  useEffect(() => {
    // if (wStart && wUnit && wValue) {
    const calculateEndDate = () => {
      const sDate = moment(watch('startDate'));
      const newEndDate = sDate
        .add(watch('durationValue'), watch('durationUnit'))
        .format('YYYY-MM-DD');
      setValue('endDate', newEndDate);
    };

    calculateEndDate();
    // }
  }, [wStart, wUnit, wValue]);

  const formHeading =
    (type === 'add' && <>Add New Plazo!</>) ||
    (type === 'edit' && <p>Edit {getValues('title')} Plazo!</p>);

  const { mutate, isLoading, error, isError, isSuccess } = mutation;
  const mutationError = error as PostgrestError;
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
      {isError && (
        <p className="bg-red-500  text-white">
          {mutationError.details} {mutationError.message}
        </p>
      )}
      <div className="col-span-2 gap-2 flex justify-between">
        <h3 className="flex-1 p-2 bg-black text-white font-bold text-lg">{formHeading}</h3>
        <button onClick={onClose}>[x]</button>
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
          placeholder="Eg. Netflix Subscription"
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

      <div className="col-span-2 form-control w-full">
        <label className="label block">
          <span className="label-text">Will end on</span>
        </label>
        <input
          {...register('durationValue')}
          placeholder="6"
          type="number"
          className="input input-bordered w-1/2"
        />
        {errors.durationValue && (
          <label className="label">
            <span className="label-text-alt">{errors.durationValue.message}</span>
          </label>
        )}

        <select className="w-1/2 h-8" {...register('durationUnit')}>
          <option value="">Selected</option>
          {durationOptions.map((i) => (
            <option value={i.value} key={i.value}>
              {i.type}
            </option>
          ))}
        </select>
        {errors.durationUnit && <span>{errors.durationUnit.message}</span>}
      </div>

      <div className="col-span-2 form-control w-full">
        <p className="text-center w-full opacity-50 text-sm">OR enter End date</p>
        <input
          type="date"
          {...register('endDate')}
          onInput={(e) => {
            const newDuration = moment(e.currentTarget.value).diff(
              moment(watch('startDate')),
              'days'
            );
            setValue('durationValue', newDuration);
            setValue('durationUnit', 'days');
          }}
          className="input input-bordered w-full"
        />
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
