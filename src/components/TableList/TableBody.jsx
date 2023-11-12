
import { TableItem } from "./TableItem"

export const TableBody = ({records}) => {
  return (
    <tbody>
      {records.map((info, index) => (
        <TableItem key={index} info={info} />
      ))}
    </tbody>
  )
}
