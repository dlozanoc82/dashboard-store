import React, { useState, useRef } from 'react'
import useClients from '../../../hooks/useClients';
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";

const UpdateClient = ({cliente}) => {

    const {updateClients} = useClients();
    const navigate = useNavigate();
    const solo_numeros = /^[0-9]*$/; // Expresión regular para permitir solo números
    const solo_texto = /^[A-Za-z\sáéíóúüñÁÉÍÓÚÜÑ]+$/u;
    const emailExpresion = /^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    const direccionExpresion = /^[\w\s\d#,-]+$/i;

    const nombresRef = useRef(null);
    const apellidosRef = useRef(null);
    const emailRef = useRef(null);
    const documentoRef = useRef(null);
    const celularRef = useRef(null);
    const direccionRef = useRef(null);
    const estadoRef = useRef(null);

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
  
      //Validacion de campos:
    // Validar que los campos obligatorios no estén vacíos y validar entrada de solo texto
    if (!solo_texto.test(nombres) || nombres.length<3) {  
      apellidosRef.current.style.borderColor = '';
      emailRef.current.style.borderColor = '';
      documentoRef.current.style.borderColor = '';
      celularRef.current.style.borderColor = '';
      direccionRef.current.style.borderColor = '';
      nombresRef.current.focus();
      nombresRef.current.style.borderColor = 'red';
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'El campo nombre debe ser texto',
        });
      return;

    } 

    if (!solo_texto.test(apellidos) || apellidos.length<3) {
      nombresRef.current.style.borderColor = '';
      emailRef.current.style.borderColor = '';
      documentoRef.current.style.borderColor = '';
      celularRef.current.style.borderColor = '';
      direccionRef.current.style.borderColor = '';
      apellidosRef.current.focus();
      apellidosRef.current.style.borderColor = 'red';
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'El campo apellido debe ser texto',
        });
      return;

    }

    if (!emailExpresion.test(email) || email.length<8) {
      apellidosRef.current.style.borderColor = '';
      nombresRef.current.style.borderColor = '';
      documentoRef.current.style.borderColor = '';
      celularRef.current.style.borderColor = '';
      direccionRef.current.style.borderColor = '';
      emailRef.current.focus();
      emailRef.current.style.borderColor = 'red';
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'El campo Email debe ser texto',
        });
      return;
    }
    const dominio = /(?:@gmail\.com|@hotmail\.com|@hotmail\.es|@outlook\.com|@itfip\.edu\.co)$/;
    if (!dominio.test(email)) {
      apellidosRef.current.style.borderColor = '';
      nombresRef.current.style.borderColor = '';
      documentoRef.current.style.borderColor = '';
      celularRef.current.style.borderColor = '';
      direccionRef.current.style.borderColor = '';
      emailRef.current.focus();
      emailRef.current.style.borderColor = 'red';
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'El dominio del correo no es permitido',
        });
      return;
    }

    if (!solo_numeros.test(documento) || documento <5000000) {
      apellidosRef.current.style.borderColor = '';
      nombresRef.current.style.borderColor = '';
      emailRef.current.style.borderColor = '';
      celularRef.current.style.borderColor = '';
      direccionRef.current.style.borderColor = '';
      documentoRef.current.focus();
      documentoRef.current.style.borderColor = 'red';
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'El campo documento es incorrecto revisa la longitud y que sea un número',
        });
      return;
    }

    if (!solo_numeros.test(celular) || celular <2000000) {
      apellidosRef.current.style.borderColor = '';
      nombresRef.current.style.borderColor = '';
      emailRef.current.style.borderColor = '';
      documentoRef.current.style.borderColor = '';
      direccionRef.current.style.borderColor = '';
      celularRef.current.focus();
      celularRef.current.style.borderColor = 'red';
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'El campo celular debe ser un número válido',
        });
      return;
    }

    if (!direccionExpresion.test(direccion) || direccion.length <5) {
      apellidosRef.current.style.borderColor = '';
      nombresRef.current.style.borderColor = '';
      emailRef.current.style.borderColor = '';
      documentoRef.current.style.borderColor = '';
      celularRef.current.style.borderColor = '';
      direccionRef.current.focus();
      direccionRef.current.style.borderColor = 'red';
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'El campo direccion es muy corto, no es una dirección válida',
        });
      return;
    }
    if (estado!=="INACTIVO" && estado !== "ACTIVO") {
      console.log(estado);
      apellidosRef.current.style.borderColor = '';
      nombresRef.current.style.borderColor = '';
      emailRef.current.style.borderColor = '';
      documentoRef.current.style.borderColor = '';
      celularRef.current.style.borderColor = '';
      direccionRef.current.style.borderColor = '';
      estadoRef.current.focus();
      estadoRef.current.style.borderColor = 'red';
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'La seleccion de estado no es válido',
        });
        console.log(estado);
      return;
    }

    let confirmado = await Swal.fire({
      title: "¿Esta seguro de actualizar este Usuario?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Si",
      denyButtonText: `No`
    });
      const contrasena = documento;
      const correo = email;
      try{
        if(confirmado.isConfirmed){
      updateClients(cliente.cod_usu,documento,nombres,apellidos,celular,direccion,correo,contrasena,estado);
      //clearInputs();
    }else{
      Swal.fire("Operación detenida", "", "info");
      apellidosRef.current.style.borderColor = '';
      nombresRef.current.style.borderColor = '';
      emailRef.current.style.borderColor = '';
      documentoRef.current.style.borderColor = '';
      celularRef.current.style.borderColor = '';
      direccionRef.current.style.borderColor = '';
      estadoRef.current.style.borderColor = '';
  }
    } catch (error) {
      console.log(error);
      Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: '¡Algo salió mal!',
      })
  }
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
                    <input type="text" className="form-control" value={nombres} onChange={handleNombres} ref={nombresRef} required />
                </div>

                <div className="col-md-4 mb-md-4">
                    <label className="form-label">Apellidos *</label>
                    <input type="text" className="form-control" value={apellidos} onChange={handleApellidos} ref={apellidosRef} required />
                </div>

                <div className="col-md-4 mb-md-4">
                    <label className="form-label">Correo Electronico *</label>
                    <input type="email" className="form-control" value={email} onChange={handleEmail} ref={emailRef} required />
                </div>

                <div className="col-md-4 mb-md-4">
                    <label className="form-label">Número de Documento *</label>
                    <input type="number" className="form-control" value={documento} onChange={handleDocumento} ref={documentoRef} required />
                </div>

                <div className="col-md-4 mb-md-4">
                    <label className="form-label">Celular *</label>
                    <input type="number" className="form-control" value={celular} onChange={handleCelular} ref={celularRef} required />
                </div>

                <div className="col-md-4 mb-md-4">
                    <label className="form-label">Dirección *</label>
                    <input type="text" className="form-control" value={direccion} onChange={handleDireccion} ref={direccionRef}  required />
                </div>

                <div className="col-md-4 mb-md-4">
                    <label className="form-label">Estado *</label>
                    <select className="form-select" value={estado} onChange={handleChangeEstado} ref={estadoRef}>
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
