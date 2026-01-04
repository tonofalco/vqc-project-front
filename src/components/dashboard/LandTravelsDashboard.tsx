import { useEffect } from "react";
import { WhiteCard } from "../shared/cards/WhiteCard"
import { useEarthEventStore, useTablePaginationStore } from "../../stores";
import { TravelTable } from './table/TravelTable';


export const LandTravelsDashboard = () => {

  const { events, fetchEvents } = useEarthEventStore();
  const { landCurrentPage, landItemsPerPage, landSetPage } = useTablePaginationStore();

  // fetch inicial
  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  // log cada vez que cambian los eventos
  useEffect(() => {
  }, [events]);

  return (

    <WhiteCard centered>

      <h2 className="text-start">Proximos viajes terrestres</h2>
      <hr />

      <TravelTable
        currentPage={landCurrentPage}
        itemsPerPage={landItemsPerPage}
        setPage={landSetPage}
        events={events} />

    </WhiteCard>

  )
}