import { useRef } from 'react';
import { useCreatePlazoMutation } from '../hooks/usePlazo';
import Button from './Button';
import PlazoInfiniteForm from './PlazoInfiniteForm';

export default function PlazoAddInfiniteButton() {
  const createPlazoMutation = useCreatePlazoMutation({ type: 'INFINITE' });
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
        + Add Infinite Plazo
      </Button>
      <dialog
        ref={addPlazoRef}
        className="modal p-1 border border-black relative w-full lg:w-96 mx-auto mt-auto lg:mb-auto mb-4"
      >
        <PlazoInfiniteForm mutation={createPlazoMutation} onClose={handleCloseForm} type="add" />
      </dialog>
    </>
  );
}
