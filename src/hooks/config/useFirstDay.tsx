
import { UpdateFirstDayForm } from "src/components";
import { useModalTemplateStore, useFirstDayStore } from "../../stores";


export const useFirstDay = () => {

  const loading = useFirstDayStore((state) => state.loading);
  const setActiveFirstDay = useFirstDayStore((state) => state.setActiveFirstDay);

  const { openModal } = useModalTemplateStore();


  // manejar la apertura del modal para actualizar un costo del primer día existente
  const handleUpdateFirstDayModal = (firstDay: any) => {
    setActiveFirstDay(firstDay);
    openModal(<UpdateFirstDayForm />);
  };

  return {

    //estados
    loading,

    //funciones
    handleUpdateFirstDayModal
  };
};
