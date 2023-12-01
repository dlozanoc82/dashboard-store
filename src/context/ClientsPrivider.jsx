import { createContext, useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { formatDateToYearMonthDay, formatTime12Hours } from "../helpers/GeneralFunctions";
import { useNavigate } from "react-router-dom";

const ClientsContext = createContext();

const ClientsPrivider = ({ children }) => {

    const navigate = useNavigate();
    const [clients, setClients] = useState([]);
    const [cliente, setCliente] = useState({});
    const [clientesByDates, setClientesByDates] = useState([])
    const [inputSearch, setInputSearch] = useState("");
    const [filteredClients, setFilteredClients] = useState([]);


    useEffect(() => {
        getClients();
    }, [])

    useEffect(() => {
        filterByDocumentNumber();
    }, [inputSearch])


    // FILTRO
    const filterByDocumentNumber = () => {
        const searchValue = inputSearch; // No es necesario convertirlo a minúsculas si es un número

        // Si no hay texto en el campo de búsqueda y el estado está vacío, mostramos todos los pagos
        if (!searchValue) {
            setFilteredClients(clients);
            return;
        }

        let filteredData = clients;

        filteredData = filteredData.filter((client) =>
            client.documento.toString().startsWith(searchValue.toString())
        );

        setFilteredClients(filteredData);
    };

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

    const createClients = async (documento, nombres, apellidos, celular, direccion, correo, contrasena) => {
        //Crear el producto en la API
        try {
            const respuesta = await axios.post('http://localhost/invensoft/clientes', { documento, nombres, apellidos, celular, direccion, correo, contrasena });

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

    const updateClients = async (cod_usu, documento, nombres, apellidos, celular, direccion, correo, contrasena, status) => {

        try {
            const estado = status === 'INACTIVO' ? 0 : 1;
            console.log({ estado, status });
            let confirmado = await Swal.fire({
                title: "¿Esta seguro de actualizar datos?",
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: "Si",
                denyButtonText: `No`
            });
            if (confirmado.isConfirmed) {
                const respuesta = await axios.put(`http://localhost/invensoft/clientes?cod_usu=${cod_usu}`, { documento, nombres, apellidos, celular, direccion, correo, contrasena, estado });
                Swal.fire({
                    icon: 'success',
                    title: 'Información Actualizada Correctamente',
                    showConfirmButton: false,
                    timer: 2000
                });
                getClients();
                setTimeout(() => {
                    navigate('/clientes');
                  }, 2000);
            } else {
                Swal.fire("Operación detenida", "", "info");
            }

            
            //setCliente({});
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

            if (confirmado.isConfirmed) {
                const respuesta = await axios.delete(`http://localhost/invensoft/clientes?cod_usu=${cod_usu}`);

                Swal.fire({
                    icon: 'success',
                    title: 'Registro Eliminado Correctamente',
                    showConfirmButton: false,
                    timer: 2000
                })
            } else {
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

    //REPORTES
    const generarPDFClientes = () => {
        const doc = new jsPDF('landscape');

        // Logo
        const logoUrl = '/logo-circular.png'; // Replace with the path to your logo image
        doc.addImage(logoUrl, 'PNG', 10, 10, 30, 30); // Adjust the coordinates and dimensions as needed

        // Title
        const title = 'LISTADO DE CLIENTES';
        doc.text(title, doc.internal.pageSize.width / 2, 28, 'center');

        // Date and Time
        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleDateString();
        const formattedTime = formatTime12Hours(currentDate);
        const dateTimeText = `Generado el ${formattedDate} a las ${formattedTime}`;
        doc.setFontSize(11);
        doc.setFont('arial', 'italic', 'normal');
        doc.text(dateTimeText, doc.internal.pageSize.width - 15, 43, 'right');
        doc.setFont('normal');

        // Table
        const columns = ["#", "Fecha de Registro", "Nombre Completo", "Apellido Completo", "Numero de Documento", "Correo", "Telefono", "Estado"];

        // Data
        const data = [];
        clients.forEach((client, index) => {
            data.push([
                index + 1, // Index + 1 to start the numbering from 1
                formatDateToYearMonthDay(client.fecha_reg),
                client.nombres,
                client.apellidos,
                client.documento,
                client.correo,
                client.celular,
                client.estado
            ]);
        });

        // Generate table
        doc.autoTable({
            head: [columns],
            body: data,
            startY: 45 // Adjust startY based on your needs
        });

        // Save the PDF
        doc.save('lista_clientes.pdf');
    }

    const generarPDFClientesByDates = () => {
        const doc = new jsPDF('landscape');

        // Logo
        const logoUrl = '/logo-circular.png'; // Replace with the path to your logo image
        doc.addImage(logoUrl, 'PNG', 10, 10, 30, 30); // Adjust the coordinates and dimensions as needed

        // Title
        const title = 'LISTADO DE CLIENTES';
        doc.text(title, doc.internal.pageSize.width / 2, 28, 'center');

        // Date and Time
        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleDateString();
        const formattedTime = formatTime12Hours(currentDate);
        const dateTimeText = `Generado el ${formattedDate} a las ${formattedTime}`;
        doc.setFontSize(11);
        doc.setFont('arial', 'italic', 'normal');
        doc.text(dateTimeText, doc.internal.pageSize.width - 15, 43, 'right');
        doc.setFont('normal');

        // Table
        const columns = ["#", "Fecha de Registro", "Nombre Completo", "Apellido Completo", "Numero de Documento", "Correo", "Telefono", "Estado"];

        // Data
        const data = [];
        clientesByDates.forEach((client, index) => {
            data.push([
                index + 1, // Index + 1 to start the numbering from 1
                formatDateToYearMonthDay(client.fecha_reg),
                client.nombres,
                client.apellidos,
                client.documento,
                client.correo,
                client.celular,
                client.estado
            ]);
        });

        // Generate table
        doc.autoTable({
            head: [columns],
            body: data,
            startY: 45 // Adjust startY based on your needs
        });

        // Save the PDF
        doc.save('lista_clientes_filtro.pdf');
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
                filteredClients,
                generarPDFClientes,
                generarPDFClientesByDates
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