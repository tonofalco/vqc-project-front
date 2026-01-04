import vqgLogo from 'src/assets/logoBlanco.webp';
import { useAuthStore, useModalStore } from 'src/stores/index';
import { useNavigate } from 'react-router-dom';
import { FormEvent } from 'react';
import { routesURL } from 'src/enum/routesURL';



export const LoginPage = () => {

  const navigate = useNavigate();

  const loginUser = useAuthStore((state) => state.loginUser);
  const { errorModal } = useModalStore();


  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { username, password } = event.target as typeof event.target & {
      username: { value: string };
      password: { value: string };
    };

    try {
      await loginUser(username.value, password.value);
      navigate(routesURL.DASHBOARD);
    } catch (error) {
      errorModal('Error', 'No se pudo iniciar sesión');
      throw error;
    }

  }

  return (
    <>

      <img src={vqgLogo}
        alt="VQC logo"
        className="lg:hidden mb-14" />

      <h2 className="text-3xl font-semibold mb-4 text-center">Iniciar sesión</h2>
      <h1 className="text-xl font-light mb-4 text-center">Software interno para viajes privado</h1>

      <form onSubmit={onSubmit}>
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-600">Email</label>
          <input type="text" name="username" autoComplete="off" /> 
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-600">Contraseña</label>
          <input type="password" name="password" autoComplete="off" />
        </div>

        {/* <div className="mb-4 flex items-center">
          <input type="checkbox" name="remember" className="text-blue-500" />
          <label htmlFor="remember" className="text-gray-600 ml-2">
            Remember Me
          </label>
        </div> */}

        <button type="submit" className="bg-blue-500 ">Login </button>

      </form>
    </>
  );
};