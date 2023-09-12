import { useState } from "react";
import { TableBody } from "./TableBody"
import { TableHead } from "./TableHead"
import { data } from "../../data/data";

export const TableList = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 10;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = data.slice(firstIndex, lastIndex);
    const npage = Math.ceil(data.length / recordsPerPage);
    const numbers = [...Array(npage+1).keys()].slice(1);

    const prePage = () => {
        if (currentPage != 1) {
            setCurrentPage(currentPage-1)
        }
    }

    const changePage = (id) => {
        setCurrentPage(id);
    }

    const nextPage = () => {
        if (currentPage != npage) {
            setCurrentPage(currentPage+1)
        }
    }

  return (

    <div className="container-fluid px-4">

        <div className="row my-5">
            <h3 className="fs-4 mb-3">Recent Orders</h3>
            <div className="col">
                <table className="table bg-white rounded shadow-sm  table-hover">
                    <TableHead />
                    <TableBody records={records}/>
                </table>

                <nav aria-label="Page navigation example">
                    <ul className="pagination justify-content-end">
                        <li className="page-item disabled">
                            <a className="page-link" onClick={prePage}>Previous</a>
                        </li>
                        { numbers.map((n,i) => (
                            <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={i}>
                                <a 
                                    className="page-link"
                                    onClick={() => changePage(n)}
                                >{n}</a>
                            </li>
                        )) }

                        <li className="page-item">
                            <a className="page-link" onClick={nextPage}>Next</a>
                        </li>
                    </ul>
                </nav>

            </div>
        </div>

    </div>

  )
}
