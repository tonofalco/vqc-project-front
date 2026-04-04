
import { useEffect, useState } from "react";
import { useModalStore, useModalTemplateStore, useExtraDayStore } from "src/stores";

export const UpdateExtraDayForm = () => {

  const { successModal, errorModal } = useModalStore();
  const { closeModal } = useModalTemplateStore();
  const { updateExtraDay, activeExtraDay, setActiveExtraDay } = useExtraDayStore();


  const [formData, setFormData] = useState({
    cost: "",
    valueEs: "",
    valueFs: "",
  });

  useEffect(() => {
    if (activeExtraDay) {
      setFormData({
        cost: activeExtraDay.cost || "",
        valueEs: String(activeExtraDay.valueEs) || "",
        valueFs: String(activeExtraDay.valueFs) || "",
      });
    }
  }, [activeExtraDay]);


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value
    }));
  };


  const submit = async () => {
    // Validaciones
    if (!formData.cost || !formData.valueEs || !formData.valueFs) {
      errorModal("Por favor completa todos los campos obligatorios");
      return;
    }

    const valueEs = Number.parseFloat(formData.valueEs);
    const valueFs = Number.parseFloat(formData.valueFs);

    if (Number.isNaN(valueEs) || Number.isNaN(valueFs)) {
      errorModal("Los valores deben ser números válidos");
      return;
    }

    if (valueEs < 0 || valueFs < 0) {
      errorModal("Los valores no pueden ser negativos");
    }

    else if (activeExtraDay) {
      const dataToSend = {
        cost: formData.cost,
        valueEs,
        valueFs
      };
      let success = await updateExtraDay(activeExtraDay.id, dataToSend);

      if (success) {
        successModal("Costo de día extra actualizado correctamente");
        closeModal();
        setActiveExtraDay(null);
      }
    }
  };

  return (
    <form className="flex flex-col gap-4">

      <h1 className="text-center">{"Actualizar Costo Día Extra"}</h1>
      <hr />

      <div className="mt-3 mb-5 ">
        <div className="mb-3">
          <label htmlFor="cost">Concepto De Costo</label>
          <input
            type="text"
            id="cost"
            placeholder="Ej: Hospedaje, Alimentos, Sueldo"
            value={formData.cost}
            onChange={handleChange} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="valueEs">Valor Entre Semana</label>
            <input
              type="number"
              id="valueEs"
              placeholder="0.00"
              min="0"
              step="0.01"
              value={formData.valueEs}
              onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="valueFs">Valor Fin De Semana</label>
            <input
              type="number"
              id="valueFs"
              placeholder="0.00"
              min="0"
              step="0.01"
              value={formData.valueFs}
              onChange={handleChange} />
          </div>
        </div>
      </div>
      
      <hr />
      <div className="flex justify-end gap-4">
        <button
          type="button"
          className="primary-button"
          onClick={submit}
        >
          Actualizar
        </button>
        <button
          type="button"
          className="secondary-button"
          onClick={closeModal}
        >
          Cancelar
        </button>
      </div>
    </form>
  )
}
