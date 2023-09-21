import { useRef } from 'react';
import { useCreatePlazoMutation } from '../hooks/usePlazo';
import Button from './Button';
import PlazoForm from './PlazoFiniteForm';

export default function PlazoAddFiniteButton() {
  const createPlazoMutation = useCreatePlazoMutation({ type: 'FINITE' });
  const addPlazoRef = useRef<HTMLDialogElement>(null);

  const handleCloseForm = () => {
    addPlazoRef.current?.close();
  };

  return (
    <>
      <Button
        variant="gray"
        type="button"
        className="w-full"
        onClick={() => addPlazoRef.current?.showModal()}
      >
        + Add Finite
      </Button>
      <dialog
        ref={addPlazoRef}
        className="modal p-2 border border-black relative w-full lg:w-96 mx-auto mt-auto lg:mb-auto mb-4"
      >
        <PlazoForm mutation={createPlazoMutation} onClose={handleCloseForm} type="add" />
      </dialog>
    </>
  );
}
