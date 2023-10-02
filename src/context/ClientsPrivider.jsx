import { createContext, useEffect, useState } from "react";
import axios from "axios";

const ClientsContext = createContext();

const ClientsPrivider = ({children}) => {       

    const [clients, setClients] = useState([]);

    const getClients = async () => {        
        try {
            const url = "http://localhost/invensoft/clientes?fecha_ini=2023-08-20&fecha_fin=2023-10-10";
            const { data } = await axios(url);
            console.log(data);
            setClients(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getClients();
    }, [])
    

    return (
        <ClientsContext.Provider
            value={{
                clients
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