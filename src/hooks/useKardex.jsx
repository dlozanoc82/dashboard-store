import { useContext } from 'react'
import KardexContext from '../context/KardexProvider';


const useKardex = () => {
  return useContext(KardexContext);
}

export default useKardex;
