import { TableList } from "../../components/TableList/TableList"
import { PaginationProvider } from "../../context/PaginationProvider"

export const Shopping = () => {
  return (
    <PaginationProvider >
        <TableList />
    </PaginationProvider>
  )
}
