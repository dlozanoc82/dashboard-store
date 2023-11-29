import React from 'react'
import { SubMenu } from './SubMenu'
import TableKardex from './TableKardex'
import LibroDiario from './LibroDiario'
import { Route, Routes, useResolvedPath } from 'react-router-dom'

const Kardex = () => {

    const url = useResolvedPath("").pathname;
    console.log({url});

  return (
    <>
      <div className="container-fluid px-4 mt-5">

            <SubMenu url={url} />

          <Routes>
              <Route exact ={true} index element={<TableKardex />} />
              <Route exact ={true} path="/libro-diario" element={<LibroDiario />} />
          </Routes>
      </div>
    </>
  )
}

export default Kardex
