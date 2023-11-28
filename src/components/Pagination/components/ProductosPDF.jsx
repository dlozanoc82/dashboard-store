import React from 'react'
import { useResolvedPath } from 'react-router-dom';
import useProducts from '../../../hooks/useProducts';

const ProductosPDF = () => {
    const url = useResolvedPath("").pathname;

    const {generarPDFProductos} = useProducts();
  return (
    <>
      {url === '/productos' ?  <a onClick={() => generarPDFProductos()} className="submenu__link btn-danger mb-4">GENERAR PDF</a> : <></> }
    </>
  )
}

export default ProductosPDF
