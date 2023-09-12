import { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { PlazoFormType, PlazoPayloadType, PlazoType } from '../types/plazo.types';
import { DurationUnit } from '../types/moment.types';
import moment from 'moment';

const initFormState: PlazoFormType = {
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
  values?: PlazoFormType | PlazoType;
  onSubmit: SubmitHandler<PlazoPayloadType>;
  onClose: () => void;
  type: 'add' | 'edit';
};

const formToPayloadConverter = (payload: PlazoFormType | PlazoType): PlazoPayloadType => {
  return {
    endDate: payload.endDate,
    startDate: payload.startDate,
    title: payload.title,
  };
};

const plazoToFormConverter = (
  payload: PlazoType | PlazoFormType | undefined
): PlazoFormType | undefined => {
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

export default function NewForm({ values, type, onSubmit, onClose }: PlazoFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    getValues,
    reset,
  } = useForm<PlazoFormType>({
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

  return (
    <form onSubmit={handleSubmit((data) => onSubmit(formToPayloadConverter(data)))}>
      <div className="col-span-2 gap-2 flex justify-between mb-4">
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
        <label className="label">
          <span className="label-text">Will end on</span>
        </label>
        <input
          {...register('durationValue')}
          placeholder="6"
          type="number"
          className="input input-bordered w-full"
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
      </div>

      {errors.durationUnit && <span>{errors.durationUnit.message}</span>}
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
      <div className="flex col-span-2 gap-4 mt-6">
        <button
          onClick={() => reset(initFormState)}
          className="col-span-2 w-full border border-black px-4 py-2"
        >
          Clear
        </button>
        <button type="submit" className="col-span-2 w-full bg-black px-4 text-white py-2">
          {type == 'add' && 'Add New'}
          {type == 'edit' && 'Save'}
        </button>
      </div>
    </form>
  );
}
