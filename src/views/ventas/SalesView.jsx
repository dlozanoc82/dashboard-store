import { ComprasProvider } from "../../context/ComprasProvider"
import { VentasProvider } from "../../context/VentasProvider"
import Sales from "./components/Sales"

export const SalesView = () => {
  return (
    <ComprasProvider>
      <VentasProvider>
        <Sales />
      </VentasProvider>
    </ComprasProvider>
  )
}
