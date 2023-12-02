import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useDashborad from "../../hooks/useDashborad";
import { MenuToggle } from "./components/MenuToggle";
import { faUser } from "@fortawesome/free-regular-svg-icons";
//import { useHistory } from 'react-router-dom';


export const Navbar = () => {
  //const history = useHistory();

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

  //Aqui es para eliminar el dato en localStorage y para cerrar sesion desde php
  const handleCerrarSesion = () => {
    let confirmado = Swal.fire({
      title: "¿Desea cerrar sesión?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Si",
      denyButtonText: `No`
    });

    if(confirmado.isConfirmed){
    // Verificar si el objeto userData está vacío
      const storedData = localStorage.getItem('Usuario');

      // Convertir la cadena JSON de nuevo a un objeto
      const parsedData = JSON.parse(storedData);

    if (!Object.keys(parsedData).length) {
      // Redirecciona y limpia el localstorage

      // Eliminar un elemento del localStorage por su clave
      localStorage.removeItem('userData');
      //history.push('http://localhost/invensoft2/cerrar_sesion');
    } else {
      // Aquí puedes realizar otras acciones si userData tiene datos
      console.log('El objeto userData no está vacío:', userData);
    }
  }else{
    Swal.fire("Operación detenida", "", "info");
  }
  };
 

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
                            <li><a onClick={handleCerrarSesion} className="dropdown-item" href="http://localhost/invensoft2/cerrar_sesion.php">Cerrar Sesión</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </nav>
        <h3 className="px-4">¡Bienvenido al modulo de {pageTitle} !</h3>
    </>        
  )
}
