import React from 'react'
import useClients from '../../../hooks/useClients';
import UpdateClient from './UpdateClient';
import { AddClient } from './AddClient';

const FormClient = () => {

  const { cliente } = useClients();
  
  //console.log(cliente.length);

  return (
    <>
        {Object.keys(cliente).length > 0 ? 
            <UpdateClient cliente={cliente} />
        :
            <AddClient />
        }
    </>
  )
}

export default FormClient
