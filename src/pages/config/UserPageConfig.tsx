import { useEffect } from 'react';
import { UsersTable } from '../../components';
import { WhiteCard } from '../../components/shared/cards/WhiteCard';
import { useTablePaginationStore, useUsersStore } from '../../stores';



export const UserPageConfig = () => {

  const { fetchUsers, users } = useUsersStore()
    const {usersItemsPerPage, usersCurrentPage, usersSetPage} = useTablePaginationStore();
  

  // fetch inicial
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // log cada vez que cambian los eventos
  useEffect(() => {
    console.log('users', users);
  }, [users]);

  return (
    <>
      <h1>USUARIOS</h1>
      <p>Administracion de usuarios del sistema</p>
      <hr />

      <WhiteCard centered>
        <UsersTable 
          currentPage={usersCurrentPage}
          itemsPerPage={usersItemsPerPage}
          setPage={usersSetPage}
          events={users} />
      </WhiteCard>
    </>
  )
}
