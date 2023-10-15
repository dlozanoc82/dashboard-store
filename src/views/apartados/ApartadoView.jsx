import { ApartadoProvider } from "../../context/ApartadoProvider"
import Apartado from "./components/Apartado"

export const ApartadoView = () => {
  return (
    <ApartadoProvider>
      <Apartado />
    </ApartadoProvider>
  )
}


