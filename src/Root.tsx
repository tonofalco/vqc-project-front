import { Navigate, Outlet, useLocation } from 'react-router-dom';
  
import { useAuthStore } from './stores';
import { authURL } from './enum/routesURL';

export const Root = () => {
  const { pathname } = useLocation();
  const status = useAuthStore((state) => state.status);

  // 1. Mientras se verifica el estado (opcional pero recomendado)
  if (status === 'pending') {
    return <h1>Cargando...</h1>; 
  }

  // 2. Si no está autenticado y no está en las páginas de login/auth
  if (status === 'unauthenticated' && !pathname.includes(authURL.AUTH)) {
    return <Navigate to={`${authURL.LOGIN}`} />;
  }

  // 3. Si ya está autenticado e intenta ir al login o raíz, mandarlo al dashboard
  if (status === 'authorized' && (pathname === '/' || pathname.includes(authURL.AUTH))) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <main>
      <Outlet />
    </main>
  );
};