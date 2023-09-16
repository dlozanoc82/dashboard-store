import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export const TableItem = ({info}) => {
    const {id, first_name, last_name, email,  gender, ip_address} = info;
    return (
        <tr>
            <th>{id}</th>
            <td>{first_name}</td>
            <td>{last_name}</td>
            <td>{email}</td>
            <td>{gender}</td>
            <td>{ip_address}</td>
            <td>
                <div className="btn__actions">
                    <button className="btn btn-secondary btn-padding">
                        <FontAwesomeIcon icon={faPencil} />
                    </button>
                    <button className="btn btn-danger btn-padding">
                        <FontAwesomeIcon icon={faTrash} />
                    </button>
                </div>
            </td>
        </tr>
    )
}
