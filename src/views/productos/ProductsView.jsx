import React from 'react'
import { ProductsProvider } from '../../context/ProductsProvider'
import { Products } from './components/Products'

const ProductsView = () => {
  return (
    <ProductsProvider>
        <Products />
    </ProductsProvider>
  )
}

export default ProductsView;
