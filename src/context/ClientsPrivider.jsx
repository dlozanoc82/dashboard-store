//Este archivo es llamado en la carpeta src/hooks/UseClients.jsx
//Aqui se hacen las respectivas consultas a la base de datos y se guarda la informacion en JSON
import { createContext, useEffect, useState } from "react"; //Importa las funciones y herramientas necesarias de React para manejar el estado, el ciclo de vida y el contexto en la aplicación.
import axios from "axios";  // Importa Axios, una biblioteca para hacer solicitudes HTTP.
import Swal from "sweetalert2"; //Importa SweetAlert2, una biblioteca para mostrar alertas personalizadas.
import jsPDF from "jspdf";      // Importa JSPDF y su extensión autoTable, que permiten generar y trabajar con archivos PDF en JavaScript.
import autoTable from "jspdf-autotable";    
import { formatDateToYearMonthDay, formatTime12Hours } from "../helpers/GeneralFunctions";  //Importa funciones de formateo de fechas y horas desde un archivo de utilidades (GeneralFunctions.js posiblemente) para manejar formatos específicos de fechas y horas.
import { useNavigate } from "react-router-dom";     //Importa useNavigate de React Router, un hook que proporciona navegación programática en la aplicación.
import { iniciarSesionAdmin } from "../helpers/Validacion_login";
import { botonAcessibilidad } from "../helpers/Acessibilidad";
//Importa funciones relacionadas con la validación del inicio de sesión y la accesibilidad, probablemente desde archivos de utilidades.

const ClientsContext = createContext();
//Crea un nuevo contexto llamado ClientsContext usando la función createContext() de React. Este contexto permite pasar datos a través de la jerarquía de componentes sin tener que pasar props manualmente en cada nivel.

const ClientsPrivider = ({ children }) => {
//Define un componente funcional ClientsPrivider que actuará como proveedor del contexto. Toma children como argumento, lo que permite que otros componentes se aniden dentro de él.

    iniciarSesionAdmin();   //Ejecucion de validacion login
    botonAcessibilidad();   //Ejecucion de colocar el boton de accesibilidad
    
    const navigate = useNavigate(); //Utiliza useNavigate() para obtener una función de navegación. Esta función se puede utilizar para redirigir a diferentes rutas dentro de la aplicación.
    
    const [clients, setClients] = useState([]);
    const [cliente, setCliente] = useState({});
    const [clientesByDates, setClientesByDates] = useState([])
    const [inputSearch, setInputSearch] = useState("");
    const [filteredClients, setFilteredClients] = useState([]);
    //Utiliza el hook useState() para crear diferentes estados dentro del componente. 
    //Cada estado tiene un valor inicial y una función para actualizar ese valor (setEstado).

    useEffect(() => {
        getClients();
    }, [])
    //Utiliza useEffect() para llamar a la función getClients() cuando el componente se monta (debido al array de dependencias vacío []).  
    //Esta función hace una solicitud para obtener todos los clientes.

    useEffect(() => {
        filterByDocumentNumber();
    }, [inputSearch])
    //Utiliza useEffect() para filtrar clientes por número de documento cuando inputSearch cambia. 
    //Esto se utiliza para filtrar los clientes según la entrada del usuario en un campo de búsqueda.


    // FILTRO PARA BUSCAR UN USUARIO POR DOCUMENTO
    const filterByDocumentNumber = () => {
        //Esta función se encarga de filtrar una lista de clientes basándose en un número de documento proporcionado a través de inputSearch.

        const searchValue = inputSearch; // No es necesario convertirlo a minúsculas si es un número

        // Si no hay texto en el campo de búsqueda y el estado está vacío, mostramos todos los clientes
        if (!searchValue) {
            setFilteredClients(clients);
            return;
        }

        let filteredData = clients;

        filteredData = filteredData.filter((client) =>
            client.documento.toString().startsWith(searchValue.toString())
        );
        //Crea una copia de la lista de clientes llamada filteredData para no modificar directamente el estado clients.
        //Utiliza el método filter() en filteredData para obtener solo los clientes cuyo número de documento empieza con el valor proporcionado en searchValue.

        setFilteredClients(filteredData);
        //Después de filtrar los datos, se actualiza el estado filteredClients con la lista filtrada obtenida anteriormente.
    };

    //CRUD CLIENTES
    const getSesion = async () => {
        try {
            const url = "https://invensoftvargas.com/invensoft/clientes?sesion";
            const { data } = await axios(url);
            console.log(data);
            setClients(data);
            setFilteredClients(data);
            setCliente({});
        } catch (error) {
            console.log(error);
        }
    };

    //CRUD CLIENTES
    const getClients = async () => {
        try {
            const url = "https://invensoftvargas.com/invensoft/clientes.php?fecha_ini=2023-08-20&fecha_fin=2023-12-31";
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
            //http://localhost/invensoft/
            const url = `https://invensoftvargas.com/invensoft/clientes?fecha_ini=${fechaInicial}&fecha_fin=${fechaFinal}`;
            const { data } = await axios(url);
            console.log(data);
            // Verificar si hay información en 'data'
        if (data && data.length > 0) {
            setClientesByDates(data);
            setCliente({});
        }else{
            Swal.fire({
                icon: 'info',
                title: 'No hay datos en ese intervalo de fechas',
                });
        }
        } catch (error) {
            console.log(error);
        }
    };

    const createClients = async (documento, nombres, apellidos, celular, direccion, correo, contrasena) => {
        //Crear el producto en la API
        try {
            const respuesta = await axios.post('https://invensoftvargas.com/invensoft/clientes', { documento, nombres, apellidos, celular, direccion, correo, contrasena });

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
        /*    let confirmado = await Swal.fire({
                title: "¿Esta seguro de actualizar datos?",
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: "Si",
                denyButtonText: `No`
            }); 
            if (confirmado.isConfirmed) {*/
                const respuesta = await axios.put(`https://invensoftvargas.com/invensoft/clientes?cod_usu=${cod_usu}`, { documento, nombres, apellidos, celular, direccion, correo, contrasena, estado });
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
          //  } else {
            //    Swal.fire("Operación detenida", "", "info");
            //}
            
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
                const respuesta = await axios.delete(`https://invensoftvargas.com/invensoft/clientes?cod_usu=${cod_usu}`);

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