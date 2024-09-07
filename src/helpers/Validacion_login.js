//CODIGO PARA VALIDAR SI ESTA LOGUEADO:
import Swal from "sweetalert2"; 
import { useEffect, useState } from "react";

export const iniciarSesionAdmin = () => {
const [sesionIniciada, setSesionIniciada] = useState(false);

//VALIDAR EN CADA SECCION:    const [sesionIniciada, setSesionIniciada] = useState(false);    //ESTADO PARA QUE SE EJECUTE UNA VEZ EL VALIDADOR

        //Aqui es para eliminar el dato en localStorage y para cerrar sesion desde php
        const iniciarSesion = () => {
          // Verificar si el objeto storeData está vacío
            const storedData = localStorage.getItem('Usuario');
            // Convertir la cadena JSON de nuevo a un objeto
            const parsedData = JSON.parse(storedData);
            setSesionIniciada(true);    // cambio el estado para que se me ejecute una vez
              
            //Compruebo primero si en el storage hay informacion
          if (parsedData && Object.keys(parsedData).length>0) {
                if(parsedData.cod_rol==1){  // si el rol es 1 es administrador
            // Si hay informacion, entonces accede al dashboard
                }else{
                    //Si es otro rol se redirecciona al login
                    Swal.fire({
                      icon: 'info',
                      title: 'No tiene permisos para este apartado',
                  })
                      window.location.href = 'https://localhost/CODIGO/inicio';
                }
      
           
          } else {
            //Si no hay informacion en el json se redirecciona al login
            Swal.fire({
                icon: 'info',
                title: 'Debe iniciar sesion',
            })
                window.location.href = 'http://localhost/CODIGO/iniciar_sesion.php';
          }
        };

        useEffect(() => {
            //console.log(sesionIniciada);
            if (!sesionIniciada) {
                iniciarSesion(); // Llama a la función de inicio de sesión automáticamente al montar el componente
            }
          }, [sesionIniciada]); // El segundo argumento vacío indica que se ejecutará una vez al montar el componente

        }