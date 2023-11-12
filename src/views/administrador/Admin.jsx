import React from 'react'
import { AdminProvider } from '../../context/AdminProvider'
import UpdateForm from './components/UpdateForm'

const Admin = () => {
  return (
    <AdminProvider>
        <UpdateForm />
    </AdminProvider>
  )
}

export default Admin
