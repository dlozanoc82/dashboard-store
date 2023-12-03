import { useState } from "react";
import { TableList } from "../../../components/TableList/TableList"
import useCotizaciones from "../../../hooks/useCotizaciones"
import { formatDateToYearMonthDay } from "../../../helpers/GeneralFunctions";
import { PaginationProvider } from "../../../context/PaginationProvider";


const SearchQuotation = () => {

    const {getCotizacionesByDates, cotizacionesByDates} = useCotizaciones();

    const [fechaInicial, setFechaInicial] = useState('');
    const [fechaFinal, setFechaFinal] = useState('');

    const handleSearchByDates = async (e) => {
        e.preventDefault();
        getCotizacionesByDates(fechaInicial, fechaFinal);
    }


  return (
    <>
        <div className="bg-white rounded shadow-sm">
            <div>
                <form onSubmit={handleSearchByDates} className="mt-3">

                    <div className="row p-3 mb-3 d-flex justify-content-center">
                        <div className="col-md-4 mb-md-4">
                            <label className="form-label">Fecha Inicial *</label>
                            <input value={fechaInicial} onChange={(e) => setFechaInicial(formatDateToYearMonthDay(e.target.value))} type="date" className="form-control" required />
                        </div>

                        <div className="col-md-4 mb-md-4">
                            <label className="form-label">Fecha Final *</label>
                            <input value={fechaFinal} onChange={(e) => setFechaFinal(formatDateToYearMonthDay(e.target.value))} type="date" className="form-control" required />
                        </div>

                        <div className="col-12 d-flex justify-content-center">
                            <button className="btn btn-primary" type="submit">Consultar</button>
                        </div>
                    </div>
                    
                </form>
            </div>
        </div>

      <PaginationProvider data={cotizacionesByDates} >
            <TableList />
        </PaginationProvider>
    </>
  )
}

export default SearchQuotation
