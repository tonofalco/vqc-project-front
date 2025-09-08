
<<<<<<< HEAD
import { Outlet } from 'react-router-dom';

export const AuthLayout = () => {
  return (
    <div className="bg-gray-100 flex justify-center items-center h-screen">
      <div className="w-1/2 h-screen hidden lg:flex lg:flex-col items-center justify-center bg-indigo-700">
        <span className="text-white font-bold text-9xl">Zustand</span>
        {/* <img src="https://placehold.co/1440/667fff/ffffff.png?text=Zustand&font=Montserrat"
          alt="Placeholder Image"
          className="object-cover w-full h-full" /> */}
=======
import { Navigate, Outlet } from 'react-router-dom';
import vqgLogo from './../assets/vq_guerrero_logo.png';
import { useAuthStore } from '../stores';
import { SpinnerCircular } from 'spinners-react';


export const AuthLayout = () => {

    const AuthStatus = useAuthStore( (state) => state.status );
    const checkAuthStatus = useAuthStore( (state) => state.checkAuthStatus );
  
    console.log('AuthStatus', AuthStatus)
  
    if (AuthStatus === 'pending') {
      checkAuthStatus();
      return <SpinnerCircular size={50} thickness={100} speed={100} color="rgba(58, 57, 172, 1)" secondaryColor="rgba(0, 0, 0, 0.44)" />
    }
  
    if (AuthStatus === 'authorized') {
      return <Navigate to='/dashboard' />;
    }


  return (
    <div className="bg-gray-100 flex justify-center items-center h-screen">
      <div className="w-1/2 h-screen hidden lg:flex lg:flex-col items-center justify-center bg-slate-800">
        <img src={vqgLogo}
          alt="VQC logo"
          className="object-contain w-full h-full mx-20" />
>>>>>>> aa681ca (first commit)
      </div>
      <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
        <Outlet />
      </div>
    </div>
  );
};