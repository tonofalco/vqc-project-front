import type { IconType } from 'react-icons';
<<<<<<< HEAD
import { IoSpeedometerOutline, IoPawOutline, IoLogOutOutline, IoHeartOutline, IoListOutline, IoAccessibilityOutline } from 'react-icons/io5';
import { NavLink } from 'react-router-dom';
import './SideMenu.css';
import { SideMenuItem } from './SideMenuItem';
=======
import { IoSpeedometerOutline, IoMapOutline, IoLogOutOutline, IoSettingsOutline, IoAirplaneOutline, IoBus, IoPersonCircleOutline } from 'react-icons/io5';
import './SideMenu.css';
import vqgLogo from './../../../assets/logoBlanco.webp';
import { SideMenuItem } from './SideMenuItem';
import { useAuthStore } from '../../../stores';
>>>>>>> aa681ca (first commit)


interface MenuItem {
  title: string;
  subTitle: string;
  href: string;
  Icon: IconType;
}

const menuItems: MenuItem[] = [
  { title: 'Dashboard', subTitle: 'Visualizar data', href: '/dashboard', Icon: IoSpeedometerOutline },
<<<<<<< HEAD
  { title: 'Osos', subTitle: 'Manejador de osos', href: '/dashboard/bears', Icon: IoPawOutline },
  { title: 'Persona', subTitle: 'Nombre y apellido', href: '/dashboard/person', Icon: IoAccessibilityOutline },
  { title: 'Tareas', subTitle: 'Listado de tareas', href: '/dashboard/tasks', Icon: IoListOutline },
  { title: 'Boda', subTitle: 'Invitados a la boda', href: '/dashboard/wedding-invitation', Icon: IoHeartOutline },
];




export const SideMenu = () => {

  return (
    <div id="menu" className="bg-gray-900 min-h-screen z-10 text-slate-300 w-80 left-0 overflow-y-scroll">
      <div id="logo" className="my-4 px-6">
        {/* Title */}
        <h1 className="text-lg md:text-2xl font-bold text-white">
          Zustand
          <span className="text-blue-500 text-xs"> StateManager</span>
          .
        </h1>
        <p className="text-slate-500 text-sm">Manejador de estados simple pero poderoso.</p>
      </div>

      {/*  Profile */ }
      <div id="profile" className="px-6 py-10">
        <p className="text-slate-500">Bienvenido,</p>
        <a href="#" className="inline-flex space-x-2 items-center">
          <span>
            <img className="rounded-full w-8 h-8" src="https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=128&q=80" alt="" />
          </span>
          <span className="text-sm md:text-base font-bold">
            Edward Tompson
          </span>
        </a>
      </div>

      {/* Menu Items */ }
      <nav id="nav" className="w-full px-6">

        {
          menuItems.map( item =>(
            <SideMenuItem key={item.href} {...item} />
          ) )
        }



        {/* Logout */}
        <NavLink to={'/auth/login'} className="mt-10">
          <div>
            <IoLogOutOutline />
          </div>
          <div className="flex flex-col">
            <span className="text-lg text-slate-300 font-bold leading-5">Logout</span>
            <span className="text-sm text-slate-500 hidden md:block">Cerrar sesión</span>
          </div>
        </NavLink>

      </nav>
    </div>
  );
=======
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
            <span className="text-xl font-semibold text-left">{user?.name}</span>
            <span className="text-slate-500">{user?.role}</span>
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


>>>>>>> aa681ca (first commit)
};