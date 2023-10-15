import { ComprasProvider } from "../../context/ComprasProvider"
import { Shopping } from "./components/Shopping"


const ShoppingView = () => {
  return (
    <ComprasProvider>
        <Shopping />
    </ComprasProvider>
  )
}

export default ShoppingView
