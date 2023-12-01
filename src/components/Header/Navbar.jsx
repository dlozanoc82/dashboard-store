import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useDashborad from "../../hooks/useDashborad";
import { MenuToggle } from "./components/MenuToggle";
import { faUser } from "@fortawesome/free-regular-svg-icons";

export const Navbar = () => {

  const title = 'Mi Cuenta';
  const icon = faUser;
  
  const {titleUrl, handleActiveOption} = useDashborad();
  const [pageTitle, setPageTitle] = useState(titleUrl); //useState para recuperar el modulo en el que esta el usuario

  useEffect(() => {
    const storedTitle = localStorage.getItem("selectedOption");     //Se accede al almacenamiento local para recuperar el modulo en el que estamos
    if (storedTitle) {
      setPageTitle(storedTitle);
    } else {
      setPageTitle(titleUrl);
    }
  }, [titleUrl]);
 

  return (
    <>
        <nav className="navbar navbar-expand-lg navbar-light bg-transparent py-4 px-4">

            <MenuToggle />
            
            <button className="navbar-toggler me-5" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle second-text fw-bold d-flex align-items-center" href="#" id="navbarDropdown"
                            role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <i className="fas fa-user me-1"></i>
                            <span className="me-5">Mireya Carvajal</span>
                        </a>
                        <ul className="dropdown-menu ms-4" aria-labelledby="navbarDropdown">
                            <li><Link onClick={() => handleActiveOption(title, icon)}  to={'/mi-cuenta'} className="dropdown-item" href="#">Mi cuenta</Link></li>
                            <li><a className="dropdown-item" href="http://localhost/invensoft/iniciar_sesion.php">Cerrar Sesión</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </nav>
        <h3 className="px-4">¡Bienvenido al modulo de {pageTitle} !</h3>
    </>        
  )
}
