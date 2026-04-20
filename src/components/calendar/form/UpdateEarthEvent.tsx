
import { useEffect, useState } from "react";
import { useModalStore, useModalTemplateStore, useEarthEventsStore, useAuthStore } from "src/stores";
import { useEarthEvent } from "src/hooks";
import { EarthEventFormData } from "src/interfaces";
import { getInputClassName } from "src/helpers";

export const UpdateEarthEvent = () => {
  const { errorModal, successModal } = useModalStore();
  const { closeModal } = useModalTemplateStore();
  const { updateEarthEvent, activeEarthEvent, setActiveEarthEvent, loading } = useEarthEventsStore();
  const { user } = useAuthStore();

  const [emptyFields, setEmptyFields] = useState<Set<keyof EarthEventFormData>>(new Set());

  const isOwner = activeEarthEvent && String(user.uid) === activeEarthEvent?.userId;

  const {
    formData,
    setFormData,
    handleChange,
    getBalance,
    validateFormData,
    getPreparedData,
    getCurrentDatetimeLocal,
    convertTimestampToDatetimeLocal,
    getEmptyRequiredFields,
    handleDelete
  } = useEarthEvent();

  // Cargar datos del evento activo
  useEffect(() => {
    if (activeEarthEvent) {
      setFormData({
        transportNumber: String(activeEarthEvent.transportNumber || ""),
        transport: String(activeEarthEvent.transport || ""),
        seats: String(activeEarthEvent.seats || ""),
        nameClient: String(activeEarthEvent.nameClient || ""),
        phone: String(activeEarthEvent.phone || ""),
        departure: String(activeEarthEvent.departure || ""),
        destination: String(activeEarthEvent.destination || ""),
        price: String(activeEarthEvent.price || ""),
        advance: String(activeEarthEvent.advance || ""),
        start: convertTimestampToDatetimeLocal(activeEarthEvent.start),
        end: convertTimestampToDatetimeLocal(activeEarthEvent.end),
        title: String(activeEarthEvent.title || ""),
        status: String(activeEarthEvent.status || "pendiente"),
        notes: String(activeEarthEvent.notes || "")
      });
    }
  }, [activeEarthEvent]);

  const submit = async () => {
    const empty = getEmptyRequiredFields();
    setEmptyFields(empty);

    if (!validateFormData() || !activeEarthEvent || empty.size > 0) {
      return;
    }

    const success = await updateEarthEvent(activeEarthEvent.id, getPreparedData() as any);

    if (success) {
      successModal("Evento terrestre actualizado correctamente");
      closeModal();
      setActiveEarthEvent(null);
    } else {
      errorModal("Error al actualizar el evento");
    }
  };

  return (
    <form className="flex flex-col gap-4">
      <h1 className="text-center">Actualizar Evento Terrestre - Sencillo</h1>
      <h2 className="text-center">Evento creado por {activeEarthEvent?.user?.name}</h2>

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
              className={getInputClassName('transportNumber', emptyFields)}
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
              className={getInputClassName('transport', emptyFields)}
            />
          </div>

          <div>
            <label htmlFor="seats">Numero de Asientos *</label>
            <input
              type="number"
              id="seats"
              value={formData.seats}
              onChange={handleChange}
              className={getInputClassName('seats', emptyFields)}
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
              className={getInputClassName('nameClient', emptyFields)}
            />
          </div>

          <div>
            <label htmlFor="phone">Teléfono del Cliente *</label>
            <input
              type="number"
              id="phone"
              value={formData.phone}
              onChange={handleChange}
              className={getInputClassName('phone', emptyFields)}
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
              className={getInputClassName('departure', emptyFields)}
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
              className={getInputClassName('destination', emptyFields)}
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
              className={getInputClassName('start', emptyFields)}
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
              className={getInputClassName('end', emptyFields)}
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
              className={getInputClassName('price', emptyFields)}
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
              className={getInputClassName('advance', emptyFields)}
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

      <div className="flex justify-between gap-4 ">
        <button
          type="button"
          className="delete-button-form"
          onClick={() => activeEarthEvent && handleDelete(activeEarthEvent.id, activeEarthEvent.nameClient)}
          disabled={loading || !isOwner}
        >
          {loading ? "Eliminando..." : "Eliminar"}
        </button>
        <div className="flex justify-end gap-4">
          <button
            type="button"
            className="primary-button"
            onClick={submit}
            disabled={loading || !isOwner}
          >
            {loading ? "Actualizando..." : "Actualizar"}
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
      </div>
    </form>
  );
};
