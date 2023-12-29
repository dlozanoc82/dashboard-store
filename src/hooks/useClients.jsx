import { useContext } from "react"  // Importa el hook useContext de React. Este hook se utiliza para acceder al contexto de React desde cualquier lugar dentro de un componente funcional.
import ClientsContext from "../context/ClientsPrivider" // Importa el contexto ClientsContext desde el archivo donde está definido. Este contexto ha sido creado utilizando React.createContext y está envolviendo componentes dentro de un ClientsPrivider.

const useClients = () => {  //Declara una función useClients que utiliza el hook useContext.
  //iniciarSesionAdmin();

  return useContext(ClientsContext);
  //Dentro de useClients, se utiliza useContext para obtener el valor actual del contexto ClientsContext. 
  //Esto devuelve el valor proporcionado por ClientsPrivider que puede ser consumido en cualquier componente que use este useClients hook.
}

export default useClients;
//Exporta la función useClients para que pueda ser importada y utilizada en otros archivos de la aplicación.

//Este archivo es llamado en la carpeta src/views/clientes/components/Submenu.jsx