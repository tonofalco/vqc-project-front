import { useEffect } from "react";
import { WhiteCard } from "../shared/cards/WhiteCard"
import { useEarthEventsStore, useTablePaginationStore } from "src/stores";
import { MyTravelsTable } from "./table/MyTravelsTable";



export const GeneralDashboard = () => {

  const { earthEvents, fetchEarthEvents } = useEarthEventsStore();
  const { myLandItemsPerPage, myLandCurrentPage, myLandSetPage } = useTablePaginationStore();

  // fetch inicial
  useEffect(() => {
    fetchEarthEvents();
  }, [fetchEarthEvents]);

  // log cada vez que cambian los eventos
  useEffect(() => {
  }, [earthEvents]);


  return (
    <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-4">

      <WhiteCard centered className="min-w-0">
        <h2 className="text-start">Mis viajes Terrestres</h2>
        <hr />

        <MyTravelsTable
          currentPage={myLandCurrentPage}
          itemsPerPage={myLandItemsPerPage}
          setPage={myLandSetPage}
          events={earthEvents} />
      </WhiteCard>

      <WhiteCard centered className="min-w-0">
        <h2>Mis registros Aéreos</h2>
        <hr className="bg-black" />
      </WhiteCard>

    </div>
  )
}
