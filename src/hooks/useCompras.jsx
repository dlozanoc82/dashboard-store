import { useContext } from 'react'
import ComprasContext from '../context/ComprasProvider'

const useCompras = () => {
  return useContext(ComprasContext);
}

export default useCompras
