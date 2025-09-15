import type { IconType } from 'react-icons';
import { IoSpeedometerOutline, IoMapOutline, IoLogOutOutline, IoSettingsOutline, IoAirplaneOutline, IoBus, IoPersonCircleOutline } from 'react-icons/io5';
import './SideMenu.css';
import vqgLogo from './../../../assets/logoBlanco.webp';
import { SideMenuItem } from './SideMenuItem';
import { useAuthStore } from '../../../stores';
import { capitalizeText } from '../../../helpers';


interface MenuItem {
  title: string;
  subTitle: string;
  href: string;
  Icon: IconType;
}

const menuItems: MenuItem[] = [
  { title: 'Dashboard', subTitle: 'Visualizar data', href: '/dashboard', Icon: IoSpeedometerOutline },
  { title: 'Cotizacion', subTitle: 'Cacular rutas', href: '/dashboard/bears', Icon: IoMapOutline },
  { title: 'Calendario', subTitle: 'viajes terrestres', href: '/dashboard/person', Icon: IoBus },
  { title: 'Calendario', subTitle: 'Viajes Aereos', href: '/dashboard/tasks', Icon: IoAirplaneOutline },
  { title: 'Configuracion', subTitle: 'Manipular data', href: '/dashboard/wedding-invitation', Icon: IoSettingsOutline },
];


export const SideMenu = ({ onClose }: { onClose?: () => void }) => {

  const logoutUser = useAuthStore((state) => state.logoutUser);
  const user = useAuthStore((state) => state.user);

  

  return (
    <div
      id="menu"
      className="bg-gray-900 h-screen z-10 text-slate-300 w-72 left-0 flex flex-col"
    >
      {/* Logo */}
      <div id="logo" className="my-3 px-3">
        <img src={vqgLogo} className="w-full h-auto" alt="logo viajes quality" />
      </div>

      {/* Profile */}
      <div id="profile" className="px-6 pt-5 pb-10">
        <div className="inline-flex space-x-3 items-center cursor-pointer">
          <IoPersonCircleOutline className="rounded-full w-10 h-10" />
          <div className="flex flex-col">
            <span className="text-xl font-semibold text-left">{capitalizeText(user?.name || 'usuario')}</span>
            <span className="text-slate-500">{capitalizeText(user?.role || 'sin rol')}</span>
          </div>
        </div>
      </div>

      {/* Menu Items con scroll si son muchos */}
      <nav id="nav" className="flex-1 px-5 overflow-y-auto">
        {menuItems.map((item) => (
          <SideMenuItem key={item.href} {...item} onClick={onClose} />
        ))}
      </nav>

      {/* Logout fijo abajo */}
      <button
        onClick={() => {
          logoutUser();
          onClose?.();
        }}
        className="flex items-center px-5 bg-transparent cursor-pointer focus:outline-none rounded-none hover:bg-red-800"
        type="button"

      >
        <IoLogOutOutline className="w-6 h-6" />
        <div className="ml-2 flex flex-col">
          <span className="text-lg text-slate-300 font-bold leading-5">Logout</span>
          <span className="text-sm text-slate-500 hidden md:block">Cerrar sesión</span>
        </div>
      </button>
    </div>
  );

};