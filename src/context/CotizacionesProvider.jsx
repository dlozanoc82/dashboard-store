import React, { createContext, useState } from 'react'

const CotizacionesContext = createContext();

const CotizacionesProvider = ({children}) => {

  const [cotizaciones, setCotizaciones] = useState([]);

  return (
    <CotizacionesContext.Provider
        value={{
            cotizaciones
        }}
    >
        {children}
    </CotizacionesContext.Provider>
  )
}

export { 
    CotizacionesProvider
}

export default CotizacionesContext;
