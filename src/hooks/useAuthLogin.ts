import { useNavigate } from 'react-router-dom';
import { FormEvent } from 'react';
import { useAuthStore, useModalStore } from 'src/stores/index';
import { routesURL } from 'src/enum/routesURL';

// Hook personalizado para manejar el proceso de login
export const useAuthLogin = () => {
  const navigate = useNavigate();
  const loginUser = useAuthStore((state) => state.loginUser);
  const { errorModal } = useModalStore();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const email = formData.get('username') as string;
    const password = formData.get('password') as string;

    try {
      await loginUser({ email, password });
      navigate(routesURL.DASHBOARD);
    } catch (error) {
      errorModal('Error', 'No se pudo iniciar sesión');
      throw error;
    }
  };

  return { handleSubmit };
};