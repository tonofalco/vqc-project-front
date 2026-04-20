
import { useModalStore, useModalTemplateStore, useEarthEventsStore } from "src/stores";
import { useEarthEvent } from "src/hooks";

export const CreateEarthEvent = () => {
  const { errorModal, successModal } = useModalStore();
  const { closeModal } = useModalTemplateStore();
  const { addEarthEvent, loading } = useEarthEventsStore();

  const {
    formData,
    handleChange,
    getBalance,
    validateFormData,
    getPreparedData,
    getCurrentDatetimeLocal
  } = useEarthEvent();

  const submit = async () => {
    if (!validateFormData()) {
      return;
    }

    const success = await addEarthEvent(getPreparedData() as any);

    if (success) {
      successModal("Evento terrestre creado correctamente");
      closeModal();
    } else {
      errorModal("Error al crear el evento");
    }
  };

  return (
    <form className="flex flex-col gap-4">
      <h1 className="text-center">Crear Evento Terrestre - Sencillo</h1>
      <hr />

      <div className="mt-3 mb-5">
        {/* Informacion del transporte */}
        <div className="grid grid-cols-3 gap-4 mb-3">

          <div>
            <label htmlFor="transportNumber">Número de Transporte *</label>
            <input
              type="number"
              id="transportNumber"
              value={formData.transportNumber}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="transport">Nombre del Transporte *</label>
            <input
              type="text"
              id="transport"
              value={formData.transport}
              onChange={handleChange}
              placeholder="Ej: Bus, Toyota Van"
            />
          </div>

          <div>
            <label htmlFor="seats">Numero de Asientos *</label>
            <input
              type="number"
              id="seats"
              value={formData.seats}
              onChange={handleChange}
            />
          </div>

        </div>
        <hr className="mb-5" />

        {/* Informacion del cliente y viaje */}
        <div className="grid grid-cols-2 gap-4 mb-3">
          <div>
            <label htmlFor="nameClient">Nombre del Cliente *</label>
            <input
              type="text"
              id="nameClient"
              value={formData.nameClient}
              onChange={handleChange}
              placeholder="Ingresa el nombre del cliente"
            />
          </div>

          <div>
            <label htmlFor="phone">Teléfono del Cliente *</label>
            <input
              type="number"
              id="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Ingresa el teléfono del cliente"
            />
          </div>

          <div>
            <label htmlFor="departure">Punto de Salida *</label>
            <input
              type="text"
              id="departure"
              value={formData.departure}
              onChange={handleChange}
              placeholder="Ej: Chilpancingo, Acapulco"
            />
          </div>

          <div>
            <label htmlFor="destination">Punto de Destino *</label>
            <input
              type="text"
              id="destination"
              value={formData.destination}
              onChange={handleChange}
              placeholder="Ej: Ciudad de México"
            />
          </div>

          <div>
            <label htmlFor="start">Fecha de Salida</label>
            <input
              type="datetime-local"
              id="start"
              value={formData.start}
              onChange={handleChange}
              min={getCurrentDatetimeLocal()}
            />
          </div>

          <div>
            <label htmlFor="end">Fecha de Regreso</label>
            <input
              type="datetime-local"
              id="end"
              value={formData.end}
              onChange={handleChange}
              min={getCurrentDatetimeLocal()}
            />
          </div>

        </div>
        <hr className="mb-5" />

        {/* Informacion de precio y anticipo */}
        <div className="grid grid-cols-3 gap-4 mb-3">

          <div>
            <label htmlFor="price">Precio</label>
            <input
              type="number"
              id="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="0.00"
              min="0"
              step="0.01"
            />
          </div>

          <div>
            <label htmlFor="advance">Anticipo</label>
            <input
              type="number"
              id="advance"
              value={formData.advance}
              onChange={handleChange}
              placeholder="0.00"
              min="0"
              step="0.01"
            />
          </div>

          <div>
            <label htmlFor="balance">Saldo</label>
            <input
              type="number"
              id="balance"
              value={getBalance()}
              onChange={handleChange}
              placeholder="0.00"
              min="0"
              step="0.01"
              disabled={true}
            />
          </div>
        </div>
        <hr className="mb-5" />


        <div className="grid grid-cols-1 gap-4 mb-3">
          <div className="mt-4">
            <label htmlFor="notes">Notas</label>
            <textarea
              id="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Notas adicionales"
              rows={3}
            />
          </div>
        </div>
      </div>


      <hr />

      <div className="flex justify-end gap-4">
        <button
          type="button"
          className="primary-button"
          onClick={submit}
          disabled={loading}
        >
          {loading ? "Creando..." : "Crear"}
        </button>
        <button
          type="button"
          className="secondary-button"
          onClick={closeModal}
          disabled={loading}
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};
