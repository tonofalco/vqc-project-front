
import { useEffect } from 'react';
import { FirstDayTable, TooltipCustom } from 'src/components';
import { WhiteCard } from 'src/components/shared/cards/WhiteCard';
import { useTablePaginationStore, useFirstDayStore } from 'src/stores';
import Modal from 'src/components/shared/modals/modalTemplate';
import { IoPencilSharp } from 'react-icons/io5';
import { useFirstDay } from 'src/hooks';



export const FirstDayPageConfig = () => {

  const { fetchFirstDayCosts, firstDays } = useFirstDayStore()
  const { firstDayItemsPerPage, firstDayCurrentPage, firstDaySetPage } = useTablePaginationStore();

  const { handleUpdateFirstDayModal } = useFirstDay();

// Se ejecuta UNA VEZ al montar el componente.
useEffect(() => {
  const init = async () => {
    await fetchFirstDayCosts();
  };
  init();
}, []); 

// Se ejecuta cada vez que 'firstDays' cambie 
useEffect(() => {}, [firstDays]);

  return (
    <>
      <h1>COSTOS PRIMER DÍA</h1>
      <p>Administración de costos del primer día del sistema</p>
      <hr />

      <WhiteCard centered>

        <div className='inline-flex gap-3'>
          <h2>Lista de costos primer día</h2>
          {/* <btn editar costos /> */}
          <TooltipCustom content="Editar costos" placement="top">
            <button
              onClick={() => handleUpdateFirstDayModal(firstDays[0])}
              className="primary-button"
            ><IoPencilSharp />
            </button>
          </TooltipCustom>
        </div>

        <hr />

        <FirstDayTable
          currentPage={firstDayCurrentPage}
          itemsPerPage={firstDayItemsPerPage}
          setPage={firstDaySetPage}
          events={firstDays} />
      </WhiteCard>
      <Modal />

    </>
  )
}
