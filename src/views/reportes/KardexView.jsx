import { ComprasProvider } from "../../context/ComprasProvider"
import { KardexProvider } from "../../context/KardexProvider"
import Kardex from "./components/Kardex"

export const KardexView = () => {
  return (
    <ComprasProvider>
      <KardexProvider>
        <Kardex />
      </KardexProvider>
    </ComprasProvider>
  )
}
