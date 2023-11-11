import usePagination from "../../hooks/usePagination";


export const Pagination = () => {
    const {
        currentPage, 
        numbers, 
        prePage, 
        changePage, 
        nextPage,  
        lastIndex,   
        firstIndex,
        ndata} =usePagination();

    return (
        <>
            <div className="pagination">
                <div className="mb-2">
                    <span>
                        Compras del {firstIndex +1} al {lastIndex} de un total de {ndata}
                    </span>
                </div>
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
            <div>
                <a className="submenu__link btn-danger mb-4">GENERAR PDF</a>
            </div>
        </>
    )
}
