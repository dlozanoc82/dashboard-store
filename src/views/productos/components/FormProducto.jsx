import React from 'react'
import useProducts from '../../../hooks/useProducts'
import UpdateProduct from './UpdateProduct';
import { AddProduct } from './AddProduct';

const FormProducto = () => {

    const {product} = useProducts();

    console.log(product)

  return (
    <>
        {Object.keys(product).length > 0 ? 
            <UpdateProduct product={product} />
        :
            <AddProduct />
        }
    </>
  )
}

export default FormProducto
