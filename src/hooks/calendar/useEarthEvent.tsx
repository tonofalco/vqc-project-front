
import { useState } from "react";
import { CreateEarthEvent, UpdateEarthEvent } from "src/components";
import { useModalTemplateStore, useEarthEventsStore, useModalStore } from "../../stores";
import { EarthEventGetData, EarthEventRequest, EarthEventFormData } from "src/interfaces";
import { convertTimestampToDatetimeLocal, convertDatetimeLocalToTimestamp, getCurrentDatetimeLocal, getEmptyRequiredFields } from "src/helpers";

const INITIAL_FORM_DATA: EarthEventFormData = {
  transportNumber: "",
  transport: "",
  seats: "",
  nameClient: "",
  phone: "",
  departure: "",
  destination: "",
  price: "",
  advance: "",
  start: "",
  end: "",
  title: "",
  status: "pendiente",
  notes: ""
};

export const useEarthEvent = () => {
  // ============ FORM DATA STATE ============
  const [formData, setFormData] = useState<EarthEventFormData>(INITIAL_FORM_DATA);

  // ============ STORE HOOKS ============
  const loading = useEarthEventsStore((state) => state.loading);
  const { setActiveEarthEvent, deleteEarthEvent, updateEarthEvent, addEarthEvent } = useEarthEventsStore();
  const { openModal, closeModal } = useModalTemplateStore();
  const { confirmModal, successModal, errorModal } = useModalStore();

  // ============ FORM FIELD HANDLERS ============
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value
    }));
  };

  // ============ FORM CALCULATIONS ============
  const getBalance = (): number => {
    const price = formData.price ? Number.parseFloat(formData.price) : 0;
    const advance = formData.advance ? Number.parseFloat(formData.advance) : 0;
    return price - advance;
  };

  // ============ FORM VALIDATION ============
  const validateFormData = (): boolean => {
    const emptyFields = getEmptyRequiredFields(formData);

    if (emptyFields.size > 0) {
      errorModal("Por favor completa todos los campos obligatorios");
      return false;
    }

    if (getBalance() < 0) {
      errorModal("El anticipo no puede ser mayor al precio");
      return false;
    }

    return true;
  };

  // ============ DATA PREPARATION ============
  const getPreparedData = (): EarthEventRequest => {
    return {
      transportNumber: Number.parseInt(formData.transportNumber),
      seats: Number.parseInt(formData.seats),
      phone: Number.parseInt(formData.phone),
      price: Number.parseFloat(formData.price),
      advance: Number.parseFloat(formData.advance),
      start: convertDatetimeLocalToTimestamp(formData.start),
      end: convertDatetimeLocalToTimestamp(formData.end),
      title: formData.title,
      transport: formData.transport,
      nameClient: formData.nameClient,
      departure: formData.departure,
      destination: formData.destination,
      status: formData.status,
      notes: formData.notes,
    };
  };

  // ============ FORM RESET ============
  const resetForm = (): void => {
    setFormData(INITIAL_FORM_DATA);
  };

  // ============ MODAL HANDLERS ============
  const handleCreateEarthEventModal = () => {
    resetForm();
    openModal(<CreateEarthEvent />);
  };

  const handleUpdateEarthEventModal = (earthEvent: EarthEventGetData) => {
    setActiveEarthEvent(earthEvent);
    openModal(<UpdateEarthEvent />);
  };

  // ============ DELETE HANDLER ============
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
    // Form State
    formData,
    setFormData,

    // Form Handlers
    handleChange,
    getBalance,
    validateFormData,
    getPreparedData,
    resetForm,

    // Field Validation
    getEmptyRequiredFields: () => getEmptyRequiredFields(formData),

    // Date Conversion Helpers
    convertTimestampToDatetimeLocal,
    convertDatetimeLocalToTimestamp,
    getCurrentDatetimeLocal,

    // Store State
    loading,

    // Modal Handlers
    handleCreateEarthEventModal,
    handleUpdateEarthEventModal,
    handleDelete,

    // Store Actions
    updateEarthEvent,
    addEarthEvent,
  };
};
