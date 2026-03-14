import vqgLogo from 'src/assets/logoBlanco.webp';
import { useAuthLogin } from 'src/hooks';


export const LoginPage = () => {

  const { handleSubmit } = useAuthLogin();

  return (
    <>

      <img src={vqgLogo}
        alt="VQC logo"
        className="lg:hidden mb-14" />

      <h2 className="text-3xl font-semibold mb-4 text-center">Iniciar sesión</h2>
      <h1 className="text-xl font-light mb-4 text-center">Software interno para viajes privado</h1>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="username">Email</label>
          <input type="text" name="username" autoComplete="off" /> 
        </div>

        <div className="mb-4">
          <label htmlFor="password">Contraseña</label>
          <input type="password" name="password" autoComplete="off" />
        </div>

        <button type="submit" className="primary-button ">Login </button>

      </form>
    </>
  );
};