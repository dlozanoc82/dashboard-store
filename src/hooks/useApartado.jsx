import { useContext } from 'react'
import ApartadoContext from '../context/ApartadoProvider';

const useApartado = () => {
  return useContext(ApartadoContext);
}

export default useApartado;
