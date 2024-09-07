import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import { iniciarSesionAdmin } from "../helpers/Validacion_login";
import { botonAcessibilidad } from "../helpers/Acessibilidad";

const AdminContext = createContext();

const AdminProvider = ({children}) => {

    iniciarSesionAdmin();   //Ejecucion de validacion login
    botonAcessibilidad();   //Ejecucion de validacion login
    
    const [user, setUser] = useState({});
    const [nombres, setNombres] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [correo, setEmail] = useState('');

    useEffect(() => {
        getUser();
    }, [])
    
    const getUser = async () => {        
        try {
            const storedData = localStorage.getItem('Usuario');

           
        // Convertir la cadena JSON de nuevo a un objeto
        const parsedData = JSON.parse(storedData);
            const url = `http://localhost/CODIGO/invensoft/micuenta?cod_usu=${parsedData.cod_usu}`;
            const { data } = await axios(url);
            console.log(data[0]);
            setUser(data[0]);
            setNombres(data[0].nombres);
            setApellidos(data[0].apellidos);
            setEmail(data[0].correo);
        } catch (error) {
            console.log(error);
        }
    };

    const updateUser = async (pass_actual, pass_nueva, pass_bbdd) => {
        //Crear el producto en la API
        try {
        const storedData = localStorage.getItem('Usuario');

        // Convertir la cadena JSON de nuevo a un objeto
        const parsedData = JSON.parse(storedData);

            const respuesta = await axios.put(`http://localhost/CODIGO/invensoft/micuenta?cod_usu=${parsedData.cod_usu}`, {pass_actual, pass_nueva, pass_bbdd});
            
            Swal.fire({
                icon: 'success',
                title: 'Contraseña Actualizada Correctamente',
                showConfirmButton: false,
                timer: 2000
            })

        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: '¡Algo salió mal!',
            })
        }
    }
    


  return (
    <AdminContext.Provider
        value={{
            user,
            updateUser,
            nombres,
            apellidos,
            correo
        }}
    >
        {children}
    </AdminContext.Provider>
  )
}

export { 
    AdminProvider
}

export default AdminContext;
