import { ListOption } from "./ListOption"
import { listOptions } from "../../../helpers/OptionsSidebar"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPowerOff } from "@fortawesome/free-solid-svg-icons"


export const SidebarOptions = () => {
  return (
    <>

        <div className="list-group list-group-flush my-3">

            {listOptions.map( (option) => <ListOption key={option.id} {...option} />)}

            <a href="http://localhost/invensoft/iniciar_sesion.php" className="list-group-item list-group-item-action bg-transparent text-danger fw-bold">
                <FontAwesomeIcon icon={faPowerOff} className="me-2" /> Logout
            </a>

        </div>
    </>
  )
}
