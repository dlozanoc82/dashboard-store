import { createContext, useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const ClientsContext = createContext();

const ClientsPrivider = ({children}) => {       

    const [clients, setClients] = useState([]);
    const [cliente, setCliente] = useState({});
    const [clientesByDates, setClientesByDates] = useState([])
    const [inputSearch, setInputSearch] = useState("");
    const [filteredClients, setFilteredClients] = useState([]);
    

    useEffect(() => {
        getClients();
    }, [])

    useEffect(() => {
        filterByName();
    }, [inputSearch])


    // FILTRO
    const filterByName = () => {
        const searchValue = inputSearch.toLowerCase();

        // Si no hay texto en el campo de búsqueda y el estado está vacío, mostramos todos los pagos
        if (searchValue.trim() === "") {
            setFilteredClients(clients);
            return;
        }

        let filteredData = clients;

        filteredData = filteredData.filter((client) =>
            client.nombres.toLowerCase().includes(searchValue)
        );

        setFilteredClients(filteredData);

    }
    
    //CRUD CLIENTES
    const getClients = async () => {        
        try {
            const url = "http://localhost/invensoft/clientes?fecha_ini=2023-08-20&fecha_fin=2023-12-31";
            const { data } = await axios(url);
            console.log(data);
            setClients(data);
            setFilteredClients(data);
            setCliente({});
        } catch (error) {
            console.log(error);
        }
    };

    const getClientsByDates = async (fechaInicial, fechaFinal) => {        
        try {
            const url = `http://localhost/invensoft/clientes?fecha_ini=${fechaInicial}&fecha_fin=${fechaFinal}`;
            const { data } = await axios(url);
            console.log(data);
            setClientesByDates(data);
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
                title: 'Información Almacenada Correctamente',
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

    const updateClients = async (cod_usu, documento,nombres,apellidos,celular,direccion,correo,contrasena,status) => {
        //Crear el producto en la API
        try {
            const estado = status === 'INACTIVO' ? 0 : 1;
            console.log({estado, status});
            const respuesta = await axios.put(`http://localhost/invensoft/clientes?cod_usu=${cod_usu}`, {documento,nombres,apellidos,celular,direccion,correo,contrasena,estado});
            
            Swal.fire({
                icon: 'success',
                title: 'Información Actualizada Correctamente',
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
        let confirmado = await Swal.fire({
            title: "¿Esta seguro de eliminar este usuario?",
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: "Si",
            denyButtonText: `No`
          });

        try {
            
              if(confirmado.isConfirmed){
            const respuesta = await axios.delete(`http://localhost/invensoft/clientes?cod_usu=${cod_usu}`);
            
            Swal.fire({
                icon: 'success',
                title: 'Registro Eliminado Correctamente',
                showConfirmButton: false,
                timer: 2000
            })
        }else{
            Swal.fire("Operación detenida", "", "info");
        }

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
                setCliente,
                clientesByDates,
                getClientsByDates,
                setClientesByDates,
                setInputSearch,
                inputSearch,
                filteredClients
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