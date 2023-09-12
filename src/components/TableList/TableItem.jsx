

export const TableItem = ({info}) => {
   const {id, first_name, last_name, email,  gender, ip_address} = info;
  return (
    <tr>
        <th scope="row">{id}</th>
        <td>{first_name}</td>
        <td>{last_name}</td>
        <td>{email}</td>
        <td>{gender}</td>
        <td>{ip_address}</td>
    </tr>
  )
}
