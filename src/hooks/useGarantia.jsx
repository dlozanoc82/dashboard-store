import { useContext } from 'react'
import GarantiaContext from '../context/GarantiaProvider';

const useGarantia = () => {
  return useContext(GarantiaContext);
}

export default useGarantia;
