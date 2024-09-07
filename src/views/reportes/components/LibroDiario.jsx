import React, { useEffect } from 'react'
import { PaginationProvider } from '../../../context/PaginationProvider'
import { TableList } from '../../../components/TableList/TableList'
import useKardex from '../../../hooks/useKardex'
import useDashborad from '../../../hooks/useDashborad'
import { useResolvedPath } from 'react-router-dom'
import { obtenerTitulosPorRuta } from '../../../helpers/OptionsSidebar'

const LibroDiario = () => {

    const {libroDiario} = useKardex();
    const {setTableHeaders} = useDashborad();

    const url = useResolvedPath("").pathname;
    //console.log({url});

    useEffect(() => {
        const tableHeaders = obtenerTitulosPorRuta(url);
        setTableHeaders(tableHeaders);
    }, [])

  return (
    <>
        <div className="container-fluid px-4 mt-5 mb-3">
            <div className="formulario bg-white rounded shadow-sm">
                <h2 className="form__title">LIBRO DIARIO</h2>
            </div>
        </div>

        <PaginationProvider data={libroDiario} >
            <TableList />
        </PaginationProvider>
    </>
  )
}

export default LibroDiario
