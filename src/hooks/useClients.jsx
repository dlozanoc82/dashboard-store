import { useContext } from "react"
import ClientsContext from "../context/ClientsPrivider"

const useClients = () => {
  return useContext(ClientsContext);
}

export default useClients;