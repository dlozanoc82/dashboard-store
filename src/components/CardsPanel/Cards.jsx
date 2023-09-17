import { Link } from 'react-router-dom';
import './cards.css';
import { faFileLines, faUser } from "@fortawesome/free-regular-svg-icons"
import { faBasketShopping, faCashRegister, faShoppingCart, faTags } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useDashborad from '../../hooks/useDashborad';

export const Cards = () => {

    const {handleActiveOption} = useDashborad();

  return (
    <div className="main-part">

        <Link onClick={() => handleActiveOption('Compras')} to={'/compras'} className="cpanel shadow-sm rounded">
            <div className="card-content-part">
                <p className='title__card'>Compras</p>
            </div>
            <div className="icon-part">
                <FontAwesomeIcon className='icon' icon={faShoppingCart} />
            </div>
        </Link>

        <Link className="cpanel shadow-sm rounded">
            <div className="card-content-part">
                <p className='title__card'>Clientes</p>
            </div>
            <div className="icon-part">
                <FontAwesomeIcon className='icon' icon={faUser} />
            </div>
        </Link>

        <Link className="cpanel shadow-sm rounded">
            <div className="card-content-part">
                <p className='title__card'>Productos</p>
            </div>
            <div className="icon-part">
                <FontAwesomeIcon className='icon' icon={faBasketShopping} />
            </div>
        </Link>

        <Link className="cpanel shadow-sm rounded">
            <div className="card-content-part">
                <p className='title__card'>Ventas</p>
            </div>
            <div className="icon-part">
                <FontAwesomeIcon className='icon' icon={faTags} />
            </div>
        </Link>

        <Link className="cpanel shadow-sm rounded">
            <div className="card-content-part">
                <p className='title__card'>Cotizacion</p>
            </div>
            <div className="icon-part">
                <FontAwesomeIcon className='icon' icon={faCashRegister} />
            </div>
        </Link>

        <Link className="cpanel shadow-sm rounded">
            <div className="card-content-part">
                <p className='title__card'>Reportes</p>
            </div>
            <div className="icon-part">
                <FontAwesomeIcon className='icon' icon={faFileLines} />
            </div>
        </Link>

    </div>
  )
}
