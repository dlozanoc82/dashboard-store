import { useContext } from "react"
import ClientsContext from "../context/ClientsPrivider"

const useClients = () => {
  //iniciarSesionAdmin();

  return useContext(ClientsContext);
}

export default useClients;