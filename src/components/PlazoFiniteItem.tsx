import { useRef, useState } from 'react';
import moment from 'moment';
import { PlazoType } from '../types/plazo.types';
import PlazoForm from './PlazoFiniteForm';
import { useDeletePlazoMutation, useUpdatePlazoMutation } from '../hooks/usePlazo';

type PlazoItemProps = {
  plazo: PlazoType;
};

export default function PlazoItem({ plazo }: PlazoItemProps) {
  const editPlazoRef = useRef<HTMLDialogElement>(null);

  const [showAction, setShowAction] = useState(false);

  const toggleShowAction = () => {
    setShowAction(!showAction);
  };

  const updatePlazoMutation = useUpdatePlazoMutation({ plazoId: plazo.id, type: plazo.type });
  const deletePlazoMutation = useDeletePlazoMutation({ type: 'FINITE' });

  const handleDeletePlazo = async (): Promise<void> => {
    const isConfirm = confirm(`Are you sure you want to delete ${plazo.title}  plazo?`);
    if (isConfirm) {
      deletePlazoMutation.mutate({ id: plazo.id });
    }
  };

  const handleCloseForm = () => {
    editPlazoRef.current?.close();
  };

  return (
    <>
      <li className="cursor-pointer border  px-4 py-2 hover:ring-2 ring-black">
        <div
          className="flex gap-5 justify-between flex-1 items-start lg:items-center"
          onClick={toggleShowAction}
        >
          <div className="flex-1 flex lg:gap-4 flex-col lg:flex-row lg:items-center">
            <p className="font-semibold text-base">{plazo.title}</p>
            <p className="text-xs font-thin">
              Started on {moment(plazo.startDate).format('DD MMM YYYY')}
              {/* Ends on {moment(plazo.endDate).format('DD MMM, YYYY')} */}
            </p>
          </div>
          <div className=" flex lg:gap-2 flex-col lg:flex-row lg:items-center">
            <p className="text-2xl font-bold">{moment(plazo.endDate).diff(moment.now(), 'days')}</p>
            <p className="text-xs">Days left</p>
          </div>
        </div>

        {showAction && (
          <>
            <div className="flex gap-2">
              <button
                onClick={() => editPlazoRef.current?.showModal()}
                title="Edit"
                className="px-2 py-1 text-sm border border-black"
              >
                Edit
              </button>
              <button
                onClick={handleDeletePlazo}
                title="Delete"
                className="px-2 py-1 text-sm border border-black"
              >
                Delete
              </button>
            </div>
            <dialog
              key={plazo.id}
              ref={editPlazoRef}
              className="modal borderb relative w-full lg:w-96 mx-auto mt-auto lg:mb-auto mb-4"
            >
              <PlazoForm
                type="edit"
                mutation={updatePlazoMutation}
                onClose={handleCloseForm}
                values={plazo}
              />
            </dialog>
          </>
        )}
      </li>
    </>
  );
}
