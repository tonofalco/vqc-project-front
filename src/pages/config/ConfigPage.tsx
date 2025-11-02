import { IconType } from 'react-icons';
import { IoIdCardOutline, IoCalendarNumberOutline, IoCalendarOutline   } from 'react-icons/io5';

import { WhiteCard } from '../../components/shared/cards/WhiteCard';
import { useNavigate } from 'react-router-dom';
import { routesURL } from '../../enum/routesURL';

interface SubMenuItem {
  title: string;
  href: string;
  Icon: IconType;
}


const SubMenuItems: SubMenuItem[] = [
  { title: 'Costos Primer Dia', href: routesURL.CONFIG_FIRST_DAY, Icon: IoCalendarNumberOutline  },
  { title: 'Costos Dia Extra', href: routesURL.CONFIG_EXTRA_DAY, Icon: IoCalendarOutline  },
  { title: 'Usuarios', href: routesURL.CONFIG_USERS, Icon: IoIdCardOutline },
];



export const ConfigPage = () => {

  const navigate = useNavigate();

  return (
    <>
      <h1>CONFIGURACION</h1>
      <p>Manipulacion de datos internos del sistema</p>
      <hr />

    
      <WhiteCard centered>
        <div className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 gap-6 p-4">
          {SubMenuItems.map(({ title, href, Icon }) => (
            <button
              key={href}
              onClick={() => navigate(href)}
              className="card-option flex flex-col items-center justify-center"
            >
              <Icon className="text-5xl text-blue-500 mb-2" />
              <h3>{title}</h3>
            </button>
          ))}
        </div>
      </WhiteCard>
    </>
  )
}
