import { listOptions } from '../../helpers/OptionsSidebar';
import { Card } from './Card';
import axios from 'axios';
import { useEffect, useState } from "react";

export const CardsContainer = () => {
    const [sesionIniciada, setSesionIniciada] = useState(false);

    // console.log("DASHBOAR PRINCIPAL"); 
    const iniciarSesion = async () => {
        try {
          const url = "http://localhost/invensoft/clientes?sesio";
          const response = await axios(url);
          setSesionIniciada(true);
          console.log(response);
          if(response && response.length>0){
            console.log("HAY DATOS Y SESION");
          }else{
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
console.log("DASHBOAR RAIZ 2")

