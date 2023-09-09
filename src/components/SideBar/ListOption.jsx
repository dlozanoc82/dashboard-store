import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import useDashborad from "../../hooks/useDashborad"
import { Link } from "react-router-dom";

export const ListOption = ({id, title, url, icon}) => {

    const {activeOption, handleActiveOption} = useDashborad();

  return (
    <Link 
        onClick={() => handleActiveOption(title)} 
        to={url} 
        className={ `list-group-item list-group-item-action bg-transparent second-text fw-bold ${activeOption === title ? 'active' : ''} ` }>
        <FontAwesomeIcon className="me-2" icon={icon} />
        {title}
    </Link>
  )
}
