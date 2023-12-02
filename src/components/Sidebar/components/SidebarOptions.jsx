import { ListOption } from "./ListOption"
import { listOptions } from "../../../helpers/OptionsSidebar"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPowerOff } from "@fortawesome/free-solid-svg-icons"
import Swal from "sweetalert2";

export const SidebarOptions = () => {

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
          //      console.log(Object.keys(parsedData).length);
          // Redirecciona y limpia el localstorage

          // Eliminar un elemento del localStorage por su clave y redirecciono a cerrar sesion para destruir la sesion en php
          localStorage.removeItem('Usuario');
          localStorage.removeItem('selectedOption');
          window.location.href = 'http://localhost/invensoft2/cerrar_sesion.php';
        } else {
          //Si no hay informacion en el localstorage redirecciono a cerrar sesion
          window.location.href = 'http://localhost/invensoft2/cerrar_sesion.php';
        }
      } else {  //Si dan clic en cancelar de la notificacion
        Swal.fire("Operación detenida", "", "info");
      }
    });
  };

  return (
    <>

        <div className="list-group list-group-flush my-3">

            {listOptions.map( (option) => <ListOption key={option.id} {...option} />)}

            <a onClick={handleCerrarSesion} className="list-group-item list-group-item-action bg-transparent text-danger fw-bold">
                <FontAwesomeIcon icon={faPowerOff} className="me-2" /> Logout
            </a>

        </div>
    </>
  )
}
