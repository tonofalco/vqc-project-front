import { useEffect } from 'react';
import { IoPersonAddOutline } from "react-icons/io5";

import { TooltipCustom, UsersTable } from '../../components';
import { WhiteCard } from '../../components/shared/cards/WhiteCard';
import { useTablePaginationStore, useUsersStore } from '../../stores';
import { EjemploBoton } from '../../components/config/form/userForm';
import { ModalForm } from '../../components/shared/modals/modalForm';



export const UserPageConfig = () => {

  const { fetchUsers, users } = useUsersStore()
  const { usersItemsPerPage, usersCurrentPage, usersSetPage } = useTablePaginationStore();


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
        <div className='inline-flex gap-3'>
          <h2>Lista de usuarios</h2>
          <TooltipCustom content="Registrar usuario" placement="top">
            <button className='edit-button'><IoPersonAddOutline /></button>
          </TooltipCustom>
            <EjemploBoton />
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
