import { createContext, useState } from "react";
import { data } from "../data/data";


const PaginationContext = createContext();

const PaginationProvider = ({children}) => {

    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 10;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = data.slice(firstIndex, lastIndex);
    const npage = Math.ceil(data.length / recordsPerPage);
    const numbers = [...Array(npage+1).keys()].slice(1);
    const ndata = data.length;

    
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
        <PaginationContext.Provider
            value={{
                currentPage,
                records,
                numbers,
                prePage,
                changePage,
                nextPage,
                lastIndex,
                firstIndex,
                ndata
            }}
        >
            {children}
        </PaginationContext.Provider>
    )
}

export {
    PaginationProvider
}

export default PaginationContext;
