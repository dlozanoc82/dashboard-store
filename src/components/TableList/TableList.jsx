import { TableBody } from "./TableBody"
import { TableHead } from "./TableHead"
import usePagination from "../../hooks/usePagination";
import { Pagination } from "../Pagination/Pagination";

export const TableList = () => {

    const {records} =usePagination();

  return (

    <>
        <div className="row">

            <div className="col table__scroll">
                <table className="table bg-white rounded shadow-sm  table-hover">
                    <TableHead />
                    <TableBody records={records}/>
                </table>
            </div>

            <Pagination />
        </div>
    </>

  )
}
