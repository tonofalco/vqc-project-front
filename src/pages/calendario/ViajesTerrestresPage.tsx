
import { useEffect } from 'react';
import { IoAddOutline } from 'react-icons/io5';
import { EarthEventsCalendar } from 'src/components/calendar/EarthEventsCalendar';
import { WhiteCard } from 'src/components/shared/cards/WhiteCard';
import { useEarthEventsStore } from 'src/stores';
import { useEarthEvent } from 'src/hooks';
import Modal from 'src/components/shared/modals/modalTemplate';

export const ViajesTerrestresPage = () => {
  const { fetchEarthEvents } = useEarthEventsStore();
  const { handleCreateEarthEventModal  } = useEarthEvent();

  // Se ejecuta UNA VEZ al montar el componente.
  useEffect(() => {
    const init = async () => {
      await fetchEarthEvents();
    };
    init();
  }, []);

  return (
    <>
      <div className="flex items-center justify-between">
        <h1>VIAJES TERRESTRES</h1>
        <button onClick={handleCreateEarthEventModal} className="primary-button flex items-center gap-2">
          <IoAddOutline />
          Agregar
        </button>
      </div>
      <hr />

      <WhiteCard centered>
          <EarthEventsCalendar />
      </WhiteCard>
      <Modal />
    </>
  )
}
