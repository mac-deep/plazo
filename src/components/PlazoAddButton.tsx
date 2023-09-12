import { useCreatePlazoMutation } from '../hooks/usePlazo';
import { PlazoPayloadType } from '../types/plazo.types';
import Button from './Button';
import Dialog from './Dialog';
import PlazoForm from './PlazoForm';

export default function PlazoAddButton() {
  const { createPlazoMutation } = useCreatePlazoMutation();

  const handleCreatePlazo = async (formdata: PlazoPayloadType) => {
    createPlazoMutation.mutate(formdata);
  };

  const handleCloseForm = () => {
    dialogAddPlazo.close();
  };

  return (
    <>
      <Button
        variant="black"
        type="button"
        className="fixed bottom-20 right-2  text-white bg-black"
        onClick={() => dialogAddPlazo.showModal()}
      >
        <span className="text-xl">+ Add New Plazo</span>
      </Button>
      <Dialog
        id="dialogAddPlazo"
        className="modal p-2 border border-black relative w-full lg:w-96 mx-auto mt-auto lg:mb-auto mb-4"
      >
        <PlazoForm onSubmit={handleCreatePlazo} onClose={handleCloseForm} type="add" />
      </Dialog>
    </>
  );
}
