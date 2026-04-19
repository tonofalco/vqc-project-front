import { useEffect } from "react";
import { WhiteCard } from "../shared/cards/WhiteCard"
import { useEarthEventsStore, useTablePaginationStore } from "../../stores";
import { TravelTable } from './table/TravelTable';


export const LandTravelsDashboard = () => {

  const { earthEvents, fetchEarthEvents } = useEarthEventsStore();
  const { landCurrentPage, landItemsPerPage, landSetPage } = useTablePaginationStore();

  // fetch inicial
  useEffect(() => {
    fetchEarthEvents();
  }, [fetchEarthEvents]);

  // log cada vez que cambian los eventos
  useEffect(() => {
  }, [earthEvents]);

  return (

    <WhiteCard centered>

      <h2 className="text-start">Proximos viajes terrestres</h2>
      <hr />

      <TravelTable
        currentPage={landCurrentPage}
        itemsPerPage={landItemsPerPage}
        setPage={landSetPage}
        events={earthEvents} />

    </WhiteCard>

  )
}