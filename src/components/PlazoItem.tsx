// @ts-nocheck

import { useState } from 'react';
import moment from 'moment';
import { PlazoPayloadType, PlazoType } from '../types/plazo.types';
import PlazoForm from './PlazoForm';
import Dialog from './Dialog';
import { useDeletePlazoMutation, useUpdatePlazoMutation } from '../hooks/usePlazo';

type PlazoItemProps = {
  plazo: PlazoType;
};

export default function PlazoItem({ plazo }: PlazoItemProps) {
  const edit_plazo = `edit_plazo_${plazo.id}`;

  const [showAction, setShowAction] = useState(false);

  const toggleShowAction = () => {
    setShowAction(!showAction);
  };

  const updatePlazoMutation = useUpdatePlazoMutation();
  const deletePlazoMutation = useDeletePlazoMutation();

  const handleUpdatePlazo = async (formdata: PlazoPayloadType): Promise<void> => {
    updatePlazoMutation.mutate({ id: plazo.id, payload: formdata });
  };

  const handleDeletePlazo = async (): Promise<void> => {
    const isConfirm = confirm(`Are you sure you want to delete ${plazo.title}  plazo?`);
    if (isConfirm) {
      deletePlazoMutation.mutate({ id: plazo.id });
    }
  };

  const handleCloseForm = () => {
    window[edit_plazo].close();
  };

  return (
    <>
      <li className="cursor-pointer">
        <div
          className="border border-black flex gap-5 justify-between flex-1 px-4 py-2 items-start lg:items-center hover:ring-2 ring-black"
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
            <div className="flex ">
              <button
                onClick={() => window[edit_plazo].showModal()}
                title="Edit"
                className="p-2 border border-black w-full"
              >
                Edit
              </button>
              <button
                onClick={handleDeletePlazo}
                title="Delete"
                className="p-2 border border-black w-full"
              >
                Delete
              </button>
            </div>
            <Dialog
              key={plazo.id}
              id={`edit_plazo_${plazo.id}`}
              className="modal borderb relative w-full lg:w-96 mx-auto mt-auto lg:mb-auto mb-4"
            >
              <PlazoForm
                type="edit"
                onSubmit={handleUpdatePlazo}
                onClose={handleCloseForm}
                values={plazo}
              />
            </Dialog>
          </>
        )}
      </li>
    </>
  );
}
