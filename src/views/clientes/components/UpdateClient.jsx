import React, { useState } from 'react'
import useClients from '../../../hooks/useClients';
import { useNavigate } from 'react-router-dom';

const UpdateClient = ({cliente}) => {

    const {updateClients} = useClients();
    const navigate = useNavigate();

    const [nombres, setNombres] = useState(cliente.nombres);
    const [apellidos, setApellidos] = useState(cliente.apellidos);
    const [email, setEmail] = useState(cliente.correo);
    const [documento, setDocumento] = useState(cliente.documento);
    const [celular, setCelular] = useState(cliente.celular);
    const [estado, setEstado] = useState(cliente.estado)
    const [direccion, setDireccion] = useState(cliente.direccion); 
  
    const handleNombres = (event) => {
      setNombres(event.target.value);
    }
  
    const handleApellidos = (event) => {
      setApellidos(event.target.value);
    }
  
    const handleEmail = (event) => {
      setEmail(event.target.value);
    }
  
    const handleDocumento = (event) => {
      setDocumento(event.target.value);
    }
  
    const handleCelular = (event) => {
      setCelular(event.target.value);
    }
    
    const handleDireccion = (event) => {
      setDireccion(event.target.value);
    }

    const handleChangeEstado = (event) => {
      setEstado(event.target.value);
    }
  
    const clearInputs = () => {
      setNombres('');
      setApellidos('');
      setDocumento('');
      setEmail('');
      setDireccion('');
      setCelular('');
      setEstado('');
    }
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const contrasena = documento;
      const correo = email;
      updateClients(cliente.cod_usu,documento,nombres,apellidos,celular,direccion,correo,contrasena,estado);
      //clearInputs();
    }

  return (
    <div className="formulario bg-white rounded shadow-sm">
    <h2 className="form__title">Editar Cliente</h2>
    
    <div>
        <div className="form__header">
            <h3 className="form__subtitle" >DATOS DEL CLIENTE</h3>
        </div>

        <div>
            <form onSubmit={handleSubmit} className="mt-3">
                <div className="row p-2 mb-3">

                <div className="col-md-4 mb-md-4">
                    <label className="form-label">Nombres *</label>
                    <input type="text" className="form-control" value={nombres} onChange={handleNombres} required />
                </div>

                <div className="col-md-4 mb-md-4">
                    <label className="form-label">Apellidos *</label>
                    <input type="text" className="form-control" value={apellidos} onChange={handleApellidos} required />
                </div>

                <div className="col-md-4 mb-md-4">
                    <label className="form-label">Correo Electronico *</label>
                    <input type="email" className="form-control" value={email} onChange={handleEmail} required />
                </div>

                <div className="col-md-4 mb-md-4">
                    <label className="form-label">Número de Documento *</label>
                    <input type="number" className="form-control" value={documento} onChange={handleDocumento} required />
                </div>

                <div className="col-md-4 mb-md-4">
                    <label className="form-label">Celular *</label>
                    <input type="number" className="form-control" value={celular} onChange={handleCelular} required />
                </div>

                <div className="col-md-4 mb-md-4">
                    <label className="form-label">Dirección *</label>
                    <input type="text" className="form-control" value={direccion} onChange={handleDireccion} required />
                </div>

                <div className="col-md-4 mb-md-4">
                    <label className="form-label">Categoria *</label>
                    <select className="form-select" value={estado} onChange={handleChangeEstado}>
                        <option value="ACTIVO">ACTIVO</option>
                        <option value="INACTIVO">INACTIVO</option>
                    </select>
                </div>

                </div>

                <div className="col-12 d-flex justify-content-center gap-3">
                    <button className="btn btn-secondary" type="button" onClick={() => clearInputs()}>Limpiar</button>
                    <button className="btn btn-primary" type="submit">Editar Cliente</button>
                </div>
            </form>
        </div>
    </div>
</div>
  )
}

export default UpdateClient
