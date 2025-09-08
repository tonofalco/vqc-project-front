import { FormEvent } from 'react';
<<<<<<< HEAD

export const LoginPage = () => {

  const onSubmit = (event: FormEvent<HTMLFormElement> ) => {
    event.preventDefault();
    // const { username, password, remember } = event.target as HTMLFormElement;
    const { username, password,remember } = event.target as typeof event.target & {
=======
import vqgLogo from './../../assets/logoBlanco.webp';
import { useAuthStore, useModalStore } from '../../stores';
import { useNavigate } from 'react-router-dom';


export const LoginPage = () => {

  const navigate = useNavigate();

  const loginUser = useAuthStore((state) => state.loginUser);
  const { errorModal } = useModalStore();


  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // const { username, password, remember } = event.target as HTMLFormElement;
    const { username, password, remember } = event.target as typeof event.target & {
>>>>>>> aa681ca (first commit)
      username: { value: string };
      password: { value: string };
      remember: { checked: boolean }
    };
    console.log(username.value, password.value, remember.checked);

<<<<<<< HEAD
    username.value = '';
    password.value = '';
    remember.checked = false;
  }


  return (
    <>
      <h1 className="text-2xl font-semibold mb-4">Login</h1>

      <form onSubmit={ onSubmit }>

        <div className="mb-4">
          <label className="block text-gray-600">Username</label>
=======
    try {
      await loginUser(username.value, password.value);
      navigate('/dashboard')
    } catch (error) {
      errorModal('Error', 'No se pudo iniciar sesión');
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
          <label className="block text-gray-600">Email</label>
>>>>>>> aa681ca (first commit)
          <input type="text" name="username" autoComplete="off" />
        </div>

        <div className="mb-4">
<<<<<<< HEAD
          <label className="block text-gray-600">Password</label>
=======
          <label className="block text-gray-600">Contraseña</label>
>>>>>>> aa681ca (first commit)
          <input type="password" name="password" autoComplete="off" />
        </div>

        <div className="mb-4 flex items-center">
          <input type="checkbox" name="remember" className="text-blue-500" />
          <label className="text-gray-600 ml-2">Remember Me</label>
        </div>
<<<<<<< HEAD
        
        <div className="mb-6 text-blue-500">
          <a href="#" className="hover:underline">Forgot Password?</a>
        </div>

        <button type="submit" className="bg-indigo-600">Login</button>
      </form>
      <div className="mt-6 text-blue-500 text-center">
        <a href="#" className="hover:underline">Sign up Here</a>
      </div>
=======

        <button type="submit" className="bg-blue-500 ">Login </button>

      </form>

>>>>>>> aa681ca (first commit)
    </>
  );
};