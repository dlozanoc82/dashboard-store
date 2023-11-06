import { createContext, useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const ClientsContext = createContext();

const ClientsPrivider = ({children}) => {       

    const [clients, setClients] = useState([]);

    const getClients = async () => {        
        try {
            const url = "http://localhost/invensoft/clientes?fecha_ini=2023-08-20&fecha_fin=2023-11-06";
            const { data } = await axios(url);
            console.log(data);
            setClients(data);
        } catch (error) {
            console.log(error);
        }
    };

    const createClients = async (documento,nombres,apellidos,celular,direccion,correo,contrasena) => {
        //Crear el producto en la API
        try {
            const respuesta = await axios.post('http://localhost/invensoft/clientes', {documento,nombres,apellidos,celular,direccion,correo,contrasena});
            
            Swal.fire({
                icon: 'success',
                title: 'Informcaion Almacenada Correctamente',
                showConfirmButton: false,
                timer: 2000
            })

            getClients();
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: '¡Algo salió mal!',
            })
        }
    }

    const handleDeleteCliente = async (cod_cli) => {
        try {
            const respuesta = await axios.delete('http://localhost/invensoft/clientes', {cod_cli});
            
            Swal.fire({
                icon: 'success',
                title: respuesta.data.result.msj,
                showConfirmButton: false,
                timer: 2000
            })

            getClients();
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: '¡Algo salió mal!',
            })
        }
    }

    useEffect(() => {
        getClients();
    }, [])

    return (
        <ClientsContext.Provider
            value={{
                clients,
                createClients,
                handleDeleteCliente
            }}
        >
            {children}
        </ClientsContext.Provider>
    )
}

export {
    ClientsPrivider
}

export default ClientsContext;