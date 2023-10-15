import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useDashborad from "../../../hooks/useDashborad"

export const MenuToggle = () => {

    
    const { handleToggle, activeOption, iconNav } = useDashborad();

    return (
        <div className="d-flex align-items-center">
            <i onClick={handleToggle} className="fas fa-align-left primary-text fs-4 me-3" id="menu-toggle"></i>
            <FontAwesomeIcon className="fs-4 me-2" icon={iconNav} />
            <h2 className="fs-2 m-0">{activeOption}</h2>
        </div>
    )
}
