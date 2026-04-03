import { useEffect } from 'react';
import { UsersTable, TooltipCustom } from 'src/components';
import { WhiteCard } from 'src/components/shared/cards/WhiteCard';
import { useTablePaginationStore, useUsersStore } from 'src/stores';
import Modal from 'src/components/shared/modals/modalTemplate';
import { IoPersonAddOutline } from 'react-icons/io5';
import { useUser } from 'src/hooks';



export const UserPageConfig = () => {

  const { fetchUsers, users } = useUsersStore()
  const { usersItemsPerPage, usersCurrentPage, usersSetPage } = useTablePaginationStore();

  const { handleCreateUserModal } = useUser();

// Se ejecuta UNA VEZ al montar el componente.
useEffect(() => {
  const init = async () => {
    await fetchUsers();
  };
  init();
}, []); 

// Se ejecuta cada vez que 'users' cambie 
useEffect(() => {}, [users]);

  return (
    <>
      <h1>USUARIOS</h1>
      <p>Administracion de usuarios del sistema</p>
      <hr />

      <WhiteCard centered>

        <div className='inline-flex gap-3'>
          <h2>Lista de usuarios</h2>
          {/* <btn crear usuario /> */}
          <TooltipCustom content="Registrar nuevo usuario" placement="top">
            <button
              onClick={() => handleCreateUserModal()}
              className="primary-button"
            ><IoPersonAddOutline />
            </button>
          </TooltipCustom>
        </div>

        <hr />

        <UsersTable
          currentPage={usersCurrentPage}
          itemsPerPage={usersItemsPerPage}
          setPage={usersSetPage}
          events={users} />
      </WhiteCard>
      <Modal />

    </>
  )
}
