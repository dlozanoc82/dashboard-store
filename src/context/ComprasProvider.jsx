import React, { createContext, useState } from 'react'

const ComprasContext = createContext();

const ComprasProvider = ({children}) => {

  const [compras, setCompras] = useState([]);

  return (
    <ComprasContext.Provider
        value={{
            compras
        }}
    >
        {children}
    </ComprasContext.Provider>
  )
}

export { 
    ComprasProvider
}

export default ComprasContext;
