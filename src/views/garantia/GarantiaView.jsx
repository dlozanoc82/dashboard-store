import React from 'react'
import Garantia from './components/Garantia'
import { GarantiaProvider } from '../../context/GarantiaProvider'

export const GarantiaView = () => {
  return (
    <GarantiaProvider>
      <Garantia />
    </GarantiaProvider>
  )
}

