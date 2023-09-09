import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import useDashborad from "../../hooks/useDashborad"

export const ListOption = ({id, title, url, icon}) => {

    const {activeOption, handleActiveOption} = useDashborad();

  return (
    <a 
        onClick={() => handleActiveOption(title)} 
        href={url} 
        className={ `list-group-item list-group-item-action bg-transparent second-text fw-bold ${activeOption === title ? 'active' : ''} ` }>
        <FontAwesomeIcon className="me-2" icon={icon} />
        {title}
    </a>
  )
}
