import { useState } from "react";
import useClients from "../../../hooks/useClients";
import { useNavigate } from "react-router-dom";


export const AddClient = () => {

  const { createClients } = useClients();
  const navigate = useNavigate();

  const [nombres, setNombres] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [email, setEmail] = useState('');
  const [documento, setDocumento] = useState('');
  const [celular, setCelular] = useState('');
  const [direccion, setDireccion] = useState(''); 

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

  const clearInputs = () => {
    setNombres('');
    setApellidos('');
    setDocumento('');
    setEmail('');
    setDireccion('');
    setCelular('');
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const contrasena = documento;
    const correo = email;
    createClients(documento,nombres,apellidos,celular,direccion,correo,contrasena);
    clearInputs();
    setTimeout(() => {
      navigate('/clientes');
    }, 2000);
    
  }

  return (
    <>
      <div className="formulario bg-white rounded shadow-sm">
          <h2 className="form__title">Agregar Cliente</h2>
          
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

                      </div>

                      <div className="col-12 d-flex justify-content-center gap-3">
                          <button className="btn btn-secondary" type="button" onClick={() => clearInputs()}>Limpiar</button>
                          <button className="btn btn-primary" type="submit">Agregar</button>
                      </div>
                  </form>
              </div>
          </div>
      </div> 
    </>
  )
}