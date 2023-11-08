import { createContext, useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const ClientsContext = createContext();

const ClientsPrivider = ({children}) => {       

    const [clients, setClients] = useState([]);
    const [cliente, setCliente] = useState({})

    useEffect(() => {
        getClients();
    }, [])

    
    //CRUD CLIENTES
    const getClients = async () => {        
        try {
            const url = "http://localhost/invensoft/clientes?fecha_ini=2023-08-20&fecha_fin=2023-12-31";
            const { data } = await axios(url);
            console.log(data);
            setClients(data);
            setCliente({});
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
                title: 'Informción Almacenada Correctamente',
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

    const updateClients = async (cod_usu, documento,nombres,apellidos,celular,direccion,correo,contrasena) => {
        //Crear el producto en la API
        try {
            const respuesta = await axios.put(`http://localhost/invensoft/clientes?cod_usu=${cod_usu}`, {documento,nombres,apellidos,celular,direccion,correo,contrasena});
            
            Swal.fire({
                icon: 'success',
                title: 'Informción Actualizada Correctamente',
                showConfirmButton: false,
                timer: 2000
            })

            getClients();
            setCliente({});
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: '¡Algo salió mal!',
            })
        }
    }

    const handleDeleteCliente = async (cod_usu) => {
        try {
            const respuesta = await axios.delete(`http://localhost/invensoft/clientes?cod_usu=${cod_usu}`);
            
            Swal.fire({
                icon: 'success',
                title: 'Resgistro Eliminado Correctamente',
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

    return (
        <ClientsContext.Provider
            value={{
                clients,
                cliente,
                createClients,
                updateClients,
                handleDeleteCliente,
                setCliente
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