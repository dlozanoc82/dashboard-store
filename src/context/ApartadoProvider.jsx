import React, { createContext, useState } from 'react'

const ApartadoContext = createContext();

const ApartadoProvider = ({children}) => {

  const [apartados, setApartados] = useState([]);

  return (
    <ApartadoContext.Provider
        value={{
          apartados
        }}
    >
        {children}
    </ApartadoContext.Provider>
  )
}

export { 
    ApartadoProvider
}

export default ApartadoContext;
