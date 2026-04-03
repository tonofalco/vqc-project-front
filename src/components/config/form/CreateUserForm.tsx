import { useEffect, useState } from "react";
import { useModalStore, useModalTemplateStore, useUsersStore } from "src/stores";


// UserForm.tsx
export function CreateUserForm() {

  const { errorModal, successModal } = useModalStore();
  const { closeModal } = useModalTemplateStore();
  const { addUser, activeUser, setActiveUser, users } = useUsersStore();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "user",
    password: "",
    passwordRenew: ""
  });

  useEffect(() => {
    setFormData({
      name: "",
      email: "",
      role: "user",
      password: "",
      passwordRenew: ""
    })
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
      return;
    }

    else if (formData.password && formData.password.length < 6) {
      errorModal("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    else if (formData.password && formData.password !== formData.passwordRenew) {
      errorModal("Las contraseñas no coinciden");
      return;
    }

    else if (users.some(user => user.email === formData.email)) {
      errorModal("El email ya está registrado");
      return;
    }

    // Envio de datos
    const { passwordRenew, ...dataToSend } = formData;
    let success =  await addUser(dataToSend);

    if (success) {
      successModal("Usuario registrado correctamente");
      closeModal();
      setActiveUser(null); // Limpiar el usuario seleccionado
    }
  };

  return (
    <form className="flex flex-col gap-4">

      <h1 className="text-center">{"Registro De Nuevo Usuario"}</h1>
      <hr />

      <div className="mt-3 mb-5 ">
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
      </div>

        <hr />
      <div className="flex justify-end gap-4">
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
      </div>

    </form>
  );
}