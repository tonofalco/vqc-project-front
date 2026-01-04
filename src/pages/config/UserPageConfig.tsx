import { useEffect } from 'react';
import { UsersTable, ModalForm } from 'src/components';
import { WhiteCard } from 'src/components/shared/cards/WhiteCard';
import { useTablePaginationStore, useUsersStore } from 'src/stores';
import { CreateNewUser } from 'src/components/config/form/CreateNewUser';



export const UserPageConfig = () => {

  const { fetchUsers, users } = useUsersStore()
  const { usersItemsPerPage, usersCurrentPage, usersSetPage } = useTablePaginationStore();


  // fetch inicial
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // log cada vez que cambian los eventos
  useEffect(() => {
  }, [users]);

  return (
    <>
      <h1>USUARIOS</h1>
      <p>Administracion de usuarios del sistema</p>
      <hr />

      <WhiteCard centered>
        <div className='inline-flex gap-3'>
          <h2>Lista de usuarios</h2>
          <CreateNewUser />
          <ModalForm />
        </div>

        <hr />

        <UsersTable
          currentPage={usersCurrentPage}
          itemsPerPage={usersItemsPerPage}
          setPage={usersSetPage}
          events={users} />
      </WhiteCard>
    </>
  )
}
