import { Navigate, Outlet } from 'react-router-dom';
import vqgLogo from './../assets/vq_guerrero_logo.png';
import { useAuthStore } from '../stores';
import { SpinnerCircular } from 'spinners-react';
import { routesURL } from 'src/enum/routesURL';


export const AuthLayout = () => {

  const AuthStatus = useAuthStore((state) => state.status);
  const checkAuthStatus = useAuthStore((state) => state.checkAuthStatus);

  console.log('AuthStatus', AuthStatus)

  if (AuthStatus === 'pending') {
    checkAuthStatus();
    return <SpinnerCircular size={50} thickness={100} speed={100} color="rgba(58, 57, 172, 1)" secondaryColor="rgba(0, 0, 0, 0.44)" />
  } 
  
  
  if (AuthStatus === 'authorized') {
    return <Navigate to={routesURL.DASHBOARD} />;
  }


  return (
    <div className="bg-gray-100 flex justify-center items-center h-screen">
      <div className="w-1/2 h-screen hidden lg:flex lg:flex-col items-center justify-center bg-slate-800">
        <img src={vqgLogo}
          alt="VQC logo"
          className="object-contain w-full h-full mx-20" />
      </div>
      <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
        <Outlet />
      </div>
    </div>
  );
};