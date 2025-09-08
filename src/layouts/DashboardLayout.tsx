import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../stores";
import { SideMenu } from "../components";
import { IoMenu } from "react-icons/io5";

export const DashboardLayout = () => {
  const AuthStatus = useAuthStore((state) => state.status);
  const checkAuthStatus = useAuthStore((state) => state.checkAuthStatus);

  const [isOpen, setIsOpen] = useState(false);

  if (AuthStatus === "pending") {
    checkAuthStatus();
    return (
      <div className="flex justify-center items-center h-screen">Loading...</div>
    );
  }

  if (AuthStatus === "unauthenticated") {
    return <Navigate to="/auth/login" />;
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
      {isOpen && (
        <>
          {/* Overlay */}
          <div
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/50 z-40"
          />

          {/* Drawer */}
          <div className="fixed inset-y-0 left-0 w-72 z-50">
            <SideMenu onClose={() => setIsOpen(false)} />
          </div>
        </>
      )}

      {/* Contenido scrollable */}
      <div className="flex-1 overflow-y-auto p-4 bg-slate-200">
        <Outlet />
      </div>
    </div>
  );
};