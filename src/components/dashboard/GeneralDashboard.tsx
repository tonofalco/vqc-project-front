import { useEffect } from "react";
import { WhiteCard } from "../shared/cards/WhiteCard"
import { useEarthEventStore, useTablePaginationStore } from "../../stores";
import { MyTravelsTable } from "./table/MyTravelsTable";



export const GeneralDashboard = () => {

  const { events, fetchEvents } = useEarthEventStore();
  const {myLandItemsPerPage, myLandCurrentPage, myLandSetPage} = useTablePaginationStore();

  // fetch inicial
  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  // log cada vez que cambian los eventos
  useEffect(() => {
    console.log('events', events[0]?.userId);
  }, [events]);


  return (
    <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-4">


      <WhiteCard centered>

        <h2>Mis registros Terrestres</h2>
        <hr />

        <MyTravelsTable
          currentPage={myLandCurrentPage}
          itemsPerPage={myLandItemsPerPage}
          setPage={myLandSetPage}
          events={events} />


      </WhiteCard>


      <WhiteCard centered>

        <h2>Mis registros Aéreos</h2>
        <hr className="bg-black" />
      </WhiteCard>

    </div>
  )
}
