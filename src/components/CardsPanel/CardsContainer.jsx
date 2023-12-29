import { listOptions } from '../../helpers/OptionsSidebar';
import Swal from "sweetalert2";
import { Card } from './Card';
import axios from 'axios';
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const CardsContainer = () => {
    const location = useLocation();
    console.log(location.pathname);

    // Almacena la ruta actual en el localStorage
  useEffect(() => {
    localStorage.setItem("ruta", location.pathname);
  }, [location.pathname]);



    //AQUI EMPIEZA EL CODIGO PARA VALIDAR EL INICIO DE SESION POR PRIMERA VEZ
  //  const [sesionIniciada, setSesionIniciada] = useState(false);

/*    // console.log("DASHBOAR PRINCIPAL"); 
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
                const jsonDataString = JSON.stringify(response.data);

                // Guardar la cadena en el localStorage
                localStorage.setItem('Usuario', jsonDataString);

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
*/
    //ACA TERMINA EL CODIGO PARA VALIDAR EL INICIO DE SESION
    return (
        <div className="main-part">
            {listOptions.map((option) => option.url !== '/' && <Card key={option.id} option={option} />)}
        </div>
    )
}

