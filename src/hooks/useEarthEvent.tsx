
import { CreateEarthEvent, UpdateEarthEvent } from "src/components";
import { useModalTemplateStore, useEarthEventsStore, useModalStore } from "../stores";
import { EarthEvent } from "src/interfaces";

export const useEarthEvent = () => {
  const { setActiveEarthEvent, deleteEarthEvent } = useEarthEventsStore();
  const { openModal, closeModal } = useModalTemplateStore();
  const { confirmModal, successModal } = useModalStore();

  // manejar la apertura del modal para crear un nuevo evento terrestre
  const handleCreateEarthEventModal = () => {
    openModal(<CreateEarthEvent />);
  };

  // manejar la apertura del modal para actualizar un evento terrestre
  const handleUpdateEarthEventModal = (earthEvent: EarthEvent) => {
    setActiveEarthEvent(earthEvent);
    openModal(<UpdateEarthEvent />);
  };

  // manejar la eliminación de un evento terrestre con confirmación
  const handleDelete = (id: number, nameClient: string) => {
    confirmModal(
      "¿Estás seguro?",
      `¿Deseas eliminar el evento de "${nameClient}"?`,
      async () => {
        const success = await deleteEarthEvent(id);

        if (success) {
          successModal("Evento terrestre eliminado correctamente");
          closeModal();
          setActiveEarthEvent(null);
        }
      }
    );
  };

  return {
    // funciones
    handleCreateEarthEventModal,
    handleUpdateEarthEventModal,
    handleDelete,
  };
};
