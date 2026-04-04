import { CreateExtraDayForm, UpdateExtraDayForm } from "src/components";
import { useModalStore, useModalTemplateStore, useExtraDayStore } from "../stores";


export const useExtraDay = () => {

  const loading = useExtraDayStore((state) => state.loading);
  const setActiveExtraDay = useExtraDayStore((state) => state.setActiveExtraDay);
  const deleteExtraDay = useExtraDayStore((state) => state.deleteExtraDay);

  const { openModal } = useModalTemplateStore();
  const { confirmModal, successModal } = useModalStore();


  // manejar la apertura del modal para crear un nuevo costo de día extra
  const handleCreateExtraDayModal = () => {
    setActiveExtraDay(null);
    openModal(<CreateExtraDayForm />);
  };

  // manejar la apertura del modal para actualizar un costo de día extra existente
  const handleUpdateExtraDayModal = (extraDay: any) => {
    setActiveExtraDay(extraDay);
    openModal(<UpdateExtraDayForm />);

  };

  //manejar la eliminación de un costo de día extra con confirmación
  const handleDelete = (id: number, cost: string) => {

    confirmModal(
      "¿Estás seguro?",
      `¿Deseas eliminar el costo "${cost}"?`,
      async () => {
        const success = await deleteExtraDay(id);

        if (success) {
          successModal("Costo eliminado correctamente");
        }
      }
    );
  };

  return {

    //estados
    loading,

    //funciones
    handleCreateExtraDayModal,
    handleUpdateExtraDayModal,
    handleDelete
  };
};