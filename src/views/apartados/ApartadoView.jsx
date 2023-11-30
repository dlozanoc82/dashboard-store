import { ApartadoProvider } from "../../context/ApartadoProvider"
import { VentasProvider } from "../../context/VentasProvider"
import Apartado from "./components/Apartado"

export const ApartadoView = () => {
  return (
    <VentasProvider>
      <ApartadoProvider>
        <Apartado />
      </ApartadoProvider>
    </VentasProvider>
  )
}


