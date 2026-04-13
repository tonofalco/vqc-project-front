import { useEffect, useState } from "react";
import { useModalStore, useModalTemplateStore, useFirstDayStore } from "src/stores";

export const UpdateFirstDayForm = () => {

  const { successModal, errorModal } = useModalStore();
  const { closeModal } = useModalTemplateStore();
  const { updateFirstDayCost, activeFirstDay, setActiveFirstDay } = useFirstDayStore();


  const [formData, setFormData] = useState({
    // Entre semana (ID 1)
    gasolineEs: "",
    salaryEs: "",
    boothsEs: "",
    maintenanceEs: "",
    utilityEs: "",
    supplementEs: "",
    // Fin de semana (ID 2)
    gasolineFs: "",
    salaryFs: "",
    boothsFs: "",
    maintenanceFs: "",
    utilityFs: "",
    supplementFs: "",
  });

  useEffect(() => {
    if (activeFirstDay) {
      // Si el ID es 1 (entre semana)
      if (activeFirstDay.id === 1) {
        setFormData((prev) => ({
          ...prev,
          gasolineEs: String(activeFirstDay.gasoline || ""),
          salaryEs: String(activeFirstDay.salary || ""),
          boothsEs: String(activeFirstDay.booths || ""),
          maintenanceEs: String(activeFirstDay.maintenance || ""),
          utilityEs: String(activeFirstDay.utility || ""),
          supplementEs: String(activeFirstDay.supplement || ""),
        }));
      }
      // Si el ID es 2 (fin de semana)
      else if (activeFirstDay.id === 2) {
        setFormData((prev) => ({
          ...prev,
          gasolineFs: String(activeFirstDay.gasoline || ""),
          salaryFs: String(activeFirstDay.salary || ""),
          boothsFs: String(activeFirstDay.booths || ""),
          maintenanceFs: String(activeFirstDay.maintenance || ""),
          utilityFs: String(activeFirstDay.utility || ""),
          supplementFs: String(activeFirstDay.supplement || ""),
        }));
      }
    }
  }, [activeFirstDay]);


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value
    }));
  };

  const validateAndConvertValues = (prefix: string): any | null => {
    const gasoline = formData[`gasoline${prefix}` as keyof typeof formData];
    const salary = formData[`salary${prefix}` as keyof typeof formData];
    const booths = formData[`booths${prefix}` as keyof typeof formData];
    const maintenance = formData[`maintenance${prefix}` as keyof typeof formData];
    const utility = formData[`utility${prefix}` as keyof typeof formData];
    const supplement = formData[`supplement${prefix}` as keyof typeof formData];

    // Si ningún campo tiene valor, retornar null
    if (!gasoline && !salary && !booths && !maintenance && !utility && !supplement) {
      return null;
    }

    // Convertir valores a números
    const gasolineNum = gasoline ? parseFloat(gasoline as string) : undefined;
    const salaryNum = salary ? parseFloat(salary as string) : undefined;
    const boothsNum = booths ? parseFloat(booths as string) : undefined;
    const maintenanceNum = maintenance ? parseFloat(maintenance as string) : undefined;
    const utilityNum = utility ? parseFloat(utility as string) : undefined;
    const supplementNum = supplement ? parseFloat(supplement as string) : undefined;

    // Validar que sean números válidos
    if ((gasoline && isNaN(gasolineNum as number)) ||
        (salary && isNaN(salaryNum as number)) ||
        (booths && isNaN(boothsNum as number)) ||
        (maintenance && isNaN(maintenanceNum as number)) ||
        (utility && isNaN(utilityNum as number)) ||
        (supplement && isNaN(supplementNum as number))) {
      errorModal("Los valores deben ser números válidos");
      return false;
    }

    // Validar que no sean negativos
    if ((gasolineNum && gasolineNum < 0) ||
        (salaryNum && salaryNum < 0) ||
        (boothsNum && boothsNum < 0) ||
        (maintenanceNum && maintenanceNum < 0) ||
        (utilityNum && utilityNum < 0) ||
        (supplementNum && supplementNum < 0)) {
      errorModal("Los valores no pueden ser negativos");
      return false;
    }

    const dataToSend: any = {};
    if (gasoline) dataToSend.gasoline = gasolineNum;
    if (salary) dataToSend.salary = salaryNum;
    if (booths) dataToSend.booths = boothsNum;
    if (maintenance) dataToSend.maintenance = maintenanceNum;
    if (utility) dataToSend.utility = utilityNum;
    if (supplement) dataToSend.supplement = supplementNum;

    return dataToSend;
  };

  const submit = async () => {
    // Validar entre semana (ID 1)
    const dataEs = validateAndConvertValues("Es");
    if (dataEs === false) return; // Error en validación

    // Validar fin de semana (ID 2)
    const dataFs = validateAndConvertValues("Fs");
    if (dataFs === false) return; // Error en validación

    // Si ninguno tiene valores
    if (!dataEs && !dataFs) {
      errorModal("Por favor completa al menos un campo");
      return;
    }

    try {
      // Actualizar entre semana si hay datos (ID 1)
      if (dataEs) {
        await updateFirstDayCost(1, dataEs);
      }

      // Actualizar fin de semana si hay datos (ID 2)
      if (dataFs) {
        await updateFirstDayCost(2, dataFs);
      }

      successModal("Costos del primer día actualizados correctamente");
      closeModal();
      setActiveFirstDay(null);
    } catch (error) {
      errorModal("Error al actualizar los costos");
    }
  };



  return (
    <form className="flex flex-col gap-4">

      <h1 className="text-center">{"Actualizar Costos Primer Día"}</h1>
      <hr />

      <div className="mt-3 mb-5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Columna Entre Semana */}
          <div className="border-r-2 pr-4">
            <h3 className="text-center font-bold mb-4">Entre Semana</h3>
            <div className="flex flex-col gap-3">
              <div>
                <label htmlFor="gasolineEs">Gasolina</label>
                <input
                  type="number"
                  id="gasolineEs"
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  value={formData.gasolineEs}
                  onChange={handleChange} />
              </div>
              <div>
                <label htmlFor="salaryEs">Salario</label>
                <input
                  type="number"
                  id="salaryEs"
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  value={formData.salaryEs}
                  onChange={handleChange} />
              </div>
              <div>
                <label htmlFor="boothsEs">Casetas</label>
                <input
                  type="number"
                  id="boothsEs"
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  value={formData.boothsEs}
                  onChange={handleChange} />
              </div>
              <div>
                <label htmlFor="maintenanceEs">Mantenimiento</label>
                <input
                  type="number"
                  id="maintenanceEs"
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  value={formData.maintenanceEs}
                  onChange={handleChange} />
              </div>
              <div>
                <label htmlFor="utilityEs">Servicios</label>
                <input
                  type="number"
                  id="utilityEs"
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  value={formData.utilityEs}
                  onChange={handleChange} />
              </div>
              <div>
                <label htmlFor="supplementEs">Suplemento</label>
                <input
                  type="number"
                  id="supplementEs"
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  value={formData.supplementEs}
                  onChange={handleChange} />
              </div>
            </div>
          </div>

          {/* Columna Fin de Semana */}
          <div className="pl-4">
            <h3 className="text-center font-bold mb-4">Fin de Semana</h3>
            <div className="flex flex-col gap-3">
              <div>
                <label htmlFor="gasolineFs">Gasolina</label>
                <input
                  type="number"
                  id="gasolineFs"
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  value={formData.gasolineFs}
                  onChange={handleChange} />
              </div>
              <div>
                <label htmlFor="salaryFs">Salario</label>
                <input
                  type="number"
                  id="salaryFs"
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  value={formData.salaryFs}
                  onChange={handleChange} />
              </div>
              <div>
                <label htmlFor="boothsFs">Casetas</label>
                <input
                  type="number"
                  id="boothsFs"
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  value={formData.boothsFs}
                  onChange={handleChange} />
              </div>
              <div>
                <label htmlFor="maintenanceFs">Mantenimiento</label>
                <input
                  type="number"
                  id="maintenanceFs"
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  value={formData.maintenanceFs}
                  onChange={handleChange} />
              </div>
              <div>
                <label htmlFor="utilityFs">Servicios</label>
                <input
                  type="number"
                  id="utilityFs"
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  value={formData.utilityFs}
                  onChange={handleChange} />
              </div>
              <div>
                <label htmlFor="supplementFs">Suplemento</label>
                <input
                  type="number"
                  id="supplementFs"
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  value={formData.supplementFs}
                  onChange={handleChange} />
              </div>
            </div>
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
