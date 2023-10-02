
import { TableItem } from "./TableItem"

export const TableBody = ({records}) => {
  return (
    <tbody>
        {records.map(info => <TableItem key={info.documento} info={info} />)}
    </tbody>
  )
}
