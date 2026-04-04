

import { useEffect } from 'react';
import { ExtraDayTable, TooltipCustom } from 'src/components';
import { WhiteCard } from 'src/components/shared/cards/WhiteCard';
import { useTablePaginationStore, useExtraDayStore } from 'src/stores';
import Modal from 'src/components/shared/modals/modalTemplate';
import { IoAddOutline } from 'react-icons/io5';
import { useExtraDay } from 'src/hooks';



export const ExtraDayPageConfig = () => {

  const { fetchExtraDays, extraDays } = useExtraDayStore()
  const { extraDayItemsPerPage, extraDayCurrentPage, extraDaySetPage } = useTablePaginationStore();

  const { handleCreateExtraDayModal } = useExtraDay();

// Se ejecuta UNA VEZ al montar el componente.
useEffect(() => {
  const init = async () => {
    await fetchExtraDays();
  };
  init();
}, []); 

// Se ejecuta cada vez que 'extraDays' cambie 
useEffect(() => {}, [extraDays]);

  return (
    <>
      <h1>COSTOS DÍA EXTRA</h1>
      <p>Administración de costos de día extra del sistema</p>
      <hr />

      <WhiteCard centered>

        <div className='inline-flex gap-3'>
          <h2>Lista de costos día extra</h2>
          {/* <btn crear costo /> */}
          <TooltipCustom content="Registrar nuevo costo" placement="top">
            <button
              onClick={() => handleCreateExtraDayModal()}
              className="primary-button"
            ><IoAddOutline />
            </button>
          </TooltipCustom>
        </div>

        <hr />

        <ExtraDayTable
          currentPage={extraDayCurrentPage}
          itemsPerPage={extraDayItemsPerPage}
          setPage={extraDaySetPage}
          events={extraDays} />
      </WhiteCard>
      <Modal />

    </>
  )
}
