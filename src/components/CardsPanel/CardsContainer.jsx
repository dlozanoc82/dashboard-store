import { listOptions } from '../../helpers/OptionsSidebar';
import Swal from "sweetalert2";
import { Card } from './Card';
import axios from 'axios';
import { useEffect, useState } from "react";

export const CardsContainer = () => {
    const [sesionIniciada, setSesionIniciada] = useState(false);

    // console.log("DASHBOAR PRINCIPAL"); 
    const iniciarSesion = async () => {
        // Obtener la cadena del localStorage
        const storedData = localStorage.getItem('Usuario');

        // Convertir la cadena JSON de nuevo a un objeto
        const parsedData = JSON.parse(storedData);
        console.log(parsedData);
        //console.log("JSON "+Object.keys(parsedData).length);
        if(parsedData!=null && (Object.keys(parsedData).length)>0){ //Si hay datos en el almacenamiento local
        try {
            const url = "http://localhost/invensoft/clientes?sesion";
            const response = await axios(url);
            setSesionIniciada(true);
            console.log(response.data);
            if (response && Object.keys(response.data).length > 0) {    //Compruebo si el json tiene datos
                console.log("HAY DATOS Y SESION");
                // Convertir el objeto JSON a cadena
                const jsonDataString = JSON.stringify(response.data);

                // Guardar la cadena en el localStorage
                localStorage.setItem('Usuario', jsonDataString);

                // Opcional: también puedes guardar una bandera para indicar que la sesión está iniciada
            } else {
                Swal.fire({
                    icon: 'info',
                    title: 'No ha iniciado sesion',
                });
                console.log("NO HA INICIADO SESION");
            }
            /*
            if (response.success) {
              console.log('Inicio de sesión exitoso. Token:', response.token);
              // Realizar acciones adicionales después del inicio de sesión
            } else {
              console.error('Error al iniciar sesión:', response.message);
            }
            */
        } catch (error) {
            console.error('Error al iniciar sesión:', error.message);
        }
    }
    };

    useEffect(() => {
        console.log(sesionIniciada);
        if (!sesionIniciada) {
            iniciarSesion(); // Llama a la función de inicio de sesión automáticamente al montar el componente
        }
    }, [sesionIniciada]); // El segundo argumento vacío indica que se ejecutará una vez al montar el componente

    return (
        <div className="main-part">
            {listOptions.map((option) => option.url !== '/' && <Card key={option.id} option={option} />)}
        </div>
    )
}

