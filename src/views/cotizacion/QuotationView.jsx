import { CotizacionesProvider } from "../../context/CotizacionesProvider"
import Quotation from "./components/Quotation"

export const QuotationView = () => {
  return (
    <CotizacionesProvider>
      <Quotation />
    </CotizacionesProvider>
  )
}
