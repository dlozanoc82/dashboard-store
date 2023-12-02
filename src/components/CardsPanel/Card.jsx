import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useDashborad from '../../hooks/useDashborad';


export const Card = ({option}) => {
    const {handleActiveOption} = useDashborad();

    const {id, title, url, icon} = option;
    return (
        <Link onClick={() => handleActiveOption(title)} to={url} className="cpanel shadow-sm">
            <div className="card-content-part">
                <p className='title__card'>{title}</p>
            </div>
            <div className="icon-part">
                <FontAwesomeIcon className='icon' icon={icon} />
            </div>
        </Link>    
    )
}
