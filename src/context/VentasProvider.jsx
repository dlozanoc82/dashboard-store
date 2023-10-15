import React, { createContext, useState } from 'react'

const VentasContext = createContext();

const VentasProvider = ({children}) => {

  const [ventas, setVentas] = useState([]);

  return (
    <VentasContext.Provider
        value={{
            ventas
        }}
    >
        {children}
    </VentasContext.Provider>
  )
}

export { 
    VentasProvider
}

export default VentasContext;
