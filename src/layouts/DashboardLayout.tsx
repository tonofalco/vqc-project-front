import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "src/stores/index";
import { SideMenu } from "src/components/index";
import { IoMenu } from "react-icons/io5";
import { authURL } from "src/enum/routesURL";

export const DashboardLayout = () => {
  const status = useAuthStore((state) => state.status);
  const checkAuthStatus = useAuthStore((state) => state.checkAuthStatus);

  const [isOpen, setIsOpen] = useState(false);

  // ✅ Verificar auth solo una vez al montar el layout
  useEffect(() => {
    if (status === "pending") {
      checkAuthStatus();
    }
  }, [status, checkAuthStatus]);

  // ⏳ Loading mientras se valida el token
  if (status === "pending") {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  // 🔐 Token inválido → login
  if (status === "unauthenticated") {
    return <Navigate to={authURL.LOGIN} replace />;
  }

  return (
    <div className="flex h-screen w-screen antialiased text-slate-900 selection:bg-blue-900 selection:text-white">
      {/* Sidebar Desktop */}
      <div className="hidden md:block">
        <SideMenu />
      </div>

      {/* Botón hamburguesa en mobile */}
      <button
        onClick={() => setIsOpen(true)}
        className="absolute top-4 right-4 z-20 md:hidden bg-gray-900 text-white p-2 rounded-lg"
      >
        <IoMenu className="w-6 h-6" />
      </button>

      {/* Sidebar Mobile */}
      {
      isOpen && (
        <>
          {/* Overlay */}
          <button
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/50 z-20 background-button"
          />

          {/* Drawer */}
          <div className="fixed inset-y-0 left-0 w-72 z-50">
            <SideMenu onClose={() => setIsOpen(false)} />
          </div>
        </>
      )
      }

      {/* Contenido scrollable */}
      <div className="flex-1 overflow-y-auto p-4 bg-slate-200">
        <Outlet />
      </div>
    </div>
  );
};