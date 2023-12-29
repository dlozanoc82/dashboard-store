import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useDashborad from "../../hooks/useDashborad";
import { MenuToggle } from "./components/MenuToggle";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import Swal from "sweetalert2";
import { parse } from "@fortawesome/fontawesome-svg-core";
import axios from "axios";

export const Navbar = () => {
  //const history = useHistory();

  const title = 'Mi Cuenta';
  const icon = faUser;

  const { titleUrl, handleActiveOption } = useDashborad();
  const [pageTitle, setPageTitle] = useState(titleUrl); //useState para recuperar el modulo en el que esta el usuario
  const [userName, setUserName] = useState(''); // Estado para almacenar el nombre del usuario


    //AQUI EMPIEZA EL CODIGO PARA VALIDAR EL INICIO DE SESION POR PRIMERA VEZ
    const [sesionIniciada, setSesionIniciada] = useState(false);

    // console.log("DASHBOAR PRINCIPAL"); 
    const iniciarSesion = async () => {
        // Obtener la cadena del localStorage
        const storedData = localStorage.getItem('Usuario');

        try {

            const url = "https://invensoftvargas.com/invensoft/clientes?sesion";
            const response = await axios(url);
            setSesionIniciada(true);    //Doy valor al state para que me ejecute una sola vez la consulta
            //console.log(response.data);

            if (response && Object.keys(response.data).length > 0) {    //Compruebo si el json que devuelve la api tiene datos
                //console.log("HAY DATOS Y SESION");
                // Convertir el objeto JSON a cadena
                if(response.data.cod_rol!=1){
                  Swal.fire({
                    icon: 'info',
                    title: 'No tiene permisos para este apartado',
                })
                    window.location.href = 'https://invensoftvargas.com/inicio';
                }
                const jsonDataString = JSON.stringify(response.data);

                // Guardar la cadena en el localStorage
                localStorage.setItem('Usuario', jsonDataString);
                const nombre = `${response.data.nombre} ${response.data.apellido}`;
                setUserName(nombre); 

            } else {
                //Si no se retorna ningun valor desde la api entonces no ha iniciado sesion el usuario
                Swal.fire({
                    icon: 'info',
                    title: 'Debe iniciar sesion',
                }).then((result) => {
                    window.location.href = 'https://invensoftvargas.com/iniciar_sesion.php';
                })
                setTimeout(() => {
                    window.location.href = 'https://invensoftvargas.com/iniciar_sesion.php';
                }, 2000);
            }
        } catch (error) {
        }
    };

    useEffect(() => {
        console.log(sesionIniciada);
        if (!sesionIniciada) {
            iniciarSesion(); // Llama a la función de inicio de sesión automáticamente al montar el componente
        }
    }, [sesionIniciada]); // El segundo argumento vacío indica que se ejecutará una vez al montar el componente


/*
  useEffect(() => {
    const storedTitle = localStorage.getItem("selectedOption");     //Se accede al almacenamiento local para recuperar el modulo en el que estamos
    const usuario_sesion = localStorage.getItem("Usuario");
    const parsedData = JSON.parse(usuario_sesion);
    if (parsedData && parsedData.nombre) {
      const nombre = `${parsedData.nombre} ${parsedData.apellido}`;
      setUserName(nombre);
    }

    if (storedTitle) {
      setPageTitle(storedTitle);

    } else {
      setPageTitle(titleUrl);
    }
  }, [titleUrl]);
  */

  //Aqui es para eliminar el dato en localStorage y para cerrar sesion desde php
  const handleCerrarSesion = () => {  //Este se ejecuta si dan clic en cerrar sesion
    Swal.fire({
      title: "¿Desea cerrar sesión?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Si",
      denyButtonText: `No`
    }).then((result) => {
      if (result.isConfirmed) {
        // Verificar si el objeto storeData está vacío
        const storedData = localStorage.getItem('Usuario');

        // Convertir la cadena JSON de nuevo a un objeto
        const parsedData = JSON.parse(storedData);

        if (parsedData && Object.keys(parsedData).length > 0) { //Compruebo de que haya informacion en el localstorage
          // Redirecciona y limpia el localstorage

          // Eliminar un elemento del localStorage por su clave y redirecciono a cerrar sesion para destruir la sesion en php
          localStorage.removeItem('Usuario');
          localStorage.removeItem('selectedOption');
          localStorage.removeItem('ruta');
          window.location.href = 'https://invensoftvargas.com/cerrar_sesion.php';
        } else {
          //Si no hay informacion en el localstorage redirecciono a cerrar sesion
          window.location.href = 'https://invensoftvargas.com/cerrar_sesion.php';
        }
      } else {  //Si dan clic en cancelar de la notificacion
        Swal.fire("Operación detenida", "", "info");
      }
    });
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
                <span className="me-5">{userName}</span>
              </a>
              <ul className="dropdown-menu ms-4" aria-labelledby="navbarDropdown">
                <li><Link onClick={() => handleActiveOption(title, icon)} to={'/mi-cuenta'} className="dropdown-item" href="#">Mi cuenta</Link></li>
                <li><a onClick={handleCerrarSesion} className="dropdown-item">Cerrar Sesión</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
      <h3 className="px-4">¡Bienvenido al modulo de {titleUrl} !</h3>
    </>
  )
}
