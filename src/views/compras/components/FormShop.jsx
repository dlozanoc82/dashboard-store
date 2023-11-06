import React from 'react'
import useCompras from '../../../hooks/useCompras'
import { AddShop } from './AddShop';
import { UpdateShop } from './UpdateShop';

const FormShop = () => {

  const {compra} = useCompras();
  console.log(compra)

  return (
    <>
        {Object.keys(compra).length > 0 ? 
            <UpdateShop compra={compra}/>
            :
            <AddShop />
        }
    </>
  )
}

export default FormShop
