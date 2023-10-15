import { VentasProvider } from "../../context/VentasProvider"
import Sales from "./components/Sales"

export const SalesView = () => {
  return (
    <VentasProvider>
      <Sales />
    </VentasProvider>
  )
}
