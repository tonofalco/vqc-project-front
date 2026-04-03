import { useEffect, useState } from "react";
import { useModalStore, useModalTemplateStore, useUsersStore } from "src/stores";

export const UpdateUserForm = () => {

  const { successModal, errorModal } = useModalStore();
  const { closeModal } = useModalTemplateStore();
  const { updateUser, activeUser, setActiveUser, users } = useUsersStore();


  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "user",
  });

  useEffect(() => {
    if (activeUser) {
      setFormData({
        name: activeUser.name || "",
        email: activeUser.email || "",
        role: activeUser.role || "user",
      });
    }
  }, [activeUser]);


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
    if (!formData.name || !formData.email || !formData.role) {
      errorModal("Por favor completa todos los campos obligatorios");
    }

    else if (activeUser) {
      if (users.some(userSelect => userSelect.email === formData.email) && activeUser.email !== formData.email) {
        errorModal("El email ya está registrado");
        return;
      }

      const {  ...dataToSend } = formData;
      let success = await updateUser( String(activeUser.uid), dataToSend);

      if (success) {
        successModal("Usuario actualizado correctamente");
        closeModal();
        setActiveUser(null);
      }
    }
  };



  return (
    <form className="flex flex-col gap-4">

      <h1>{"Registro De Nuevo Usuario"}</h1>

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
        </div>
      </div>

      <button
        type="button"
        className="primary-button"
        onClick={submit}
      >
        Registrar
      </button>
      <button
        type="button"
        className="secondary-button"
        onClick={closeModal}
      >
        Cancelar
      </button>
    </form>
  )
}
