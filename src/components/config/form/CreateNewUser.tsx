import { useState, useEffect } from "react";
import { useModalFormStore, useModalStore, useUsersStore } from "src/stores";
import { TooltipCustom } from "src/components";
import { IoPersonAddOutline } from "react-icons/io5";

export const CreateNewUser = () => {
  const { openModal, closeModal, isOpen } = useModalFormStore();
  const { addUser, loading, activeUser, setActiveUser, updateUser } = useUsersStore();
  const { errorModal } = useModalStore();

  // 1. Estado elevado al padre
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "user",
    password: "",
    passwordRenew: ""
  });


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value
    }));
  };

  const handleSubmit = async () => {
    // Validaciones
    if (formData.password && formData.password !== formData.passwordRenew) {
      errorModal("Las contraseñas no coinciden");
      return;
    }

    const { passwordRenew, ...dataToSend } = formData;
    let success = false;

    if (activeUser) {
      // 📝 MODO EDICIÓN
      // El ID puede venir como 'uid', 'id' o '_id' según tu hook useUser
      const id = activeUser.uid;
      success = await updateUser(id.toString(), dataToSend);
    } else {
      // 🆕 MODO CREACIÓN
      success = await addUser(dataToSend);
    }

    if (success) {
      closeModal();
      setActiveUser(null); // Limpiar el usuario seleccionado
    }
  };

  useEffect(() => {
    if (activeUser) {
      setFormData({
        name: activeUser.name || "",
        email: activeUser.email || "",
        role: activeUser.role || "user",
        password: "", // Normalmente la contraseña no se precarga por seguridad
        passwordRenew: ""
      });
    }
  }, [activeUser]);

  // 2. Sincronización: Actualiza los slots del modal cuando el estado cambia
  useEffect(() => {
    if (isOpen) {
      renderModalContents();
    }
  }, [formData, loading, isOpen]); // Se dispara al escribir o al cambiar el loading


  useEffect(() => {
    // Si hay un usuario activo y el modal aún está cerrado...
    if (activeUser && !isOpen) {
      renderModalContents(); // Esto ejecuta el openModal() con los datos ya cargados
    }
  }, [activeUser]); // Se dispara cada vez que seleccionas a alguien en la tabla

  const renderModalContents = () => {
    const isEditing = !!activeUser;

    openModal(
      // 🔹 HEADER
      <h1>{isEditing ? `Editar Usuario` : "Registro De Nuevo Usuario"}</h1>,

      // 🔹 CONTENT (Cuerpo del modal)
      <div>
        <div className="mb-3">
          <label htmlFor="name">Nombre De Usuario</label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={handleChange} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="role">Rol</label>
            <select
              id="role"
              className={`cursor-pointer`}
              value={formData.role}
              onChange={handleChange}
            >
              <option value="user">Usuario (user)</option>
              <option value="admin">Administrador (admin)</option>
            </select>
          </div>
          <div>
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="passwordRenew">Confirmar Contraseña</label>
            <input
              type="password"
              id="passwordRenew"
              value={formData.passwordRenew}
              onChange={handleChange} />
          </div>
        </div>
      </div>,

      // 🔹 FOOTER (Botones separados)
      <div className="flex gap-x-4">
        <button
          className="secondary-button"
          onClick={closeModal}
        >
          Cancelar
        </button>
        <button
          className="primary-button"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Registrando..." : "Registrar"}
        </button>
      </div>
    );
  };

  return (
    <TooltipCustom content="Registrar nuevo usuario" placement="top">
      <button
        onClick={() => {
          // Resetear form al abrir si es necesario
          setFormData({ name: "", email: "", role: "user", password: "", passwordRenew: "" });
          renderModalContents();
        }}
        className="primary-button"
      >
        <IoPersonAddOutline />
      </button>
    </TooltipCustom>
  );
};