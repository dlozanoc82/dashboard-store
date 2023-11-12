import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import useAdmin from '../../../hooks/useAdmin';
import CamposObligatorios from '../../../components/Textos/CamposObligatorios';

const UpdateForm = () => {

    const navigate = useNavigate();
    const {user, updateUser,nombres,apellidos,correo} = useAdmin();

    const [nuevaContrasena, setNuevaContrasena] = useState('');
    const [actualContrasena, setActualContrasena] = useState('');

    const handleNuevaContrasena = (event) => {
        setNuevaContrasena(event.target.value);
    }

    const handleActualContrasena = (event) => {
        setActualContrasena(event.target.value);
    }
  
    const clearInputs = () => {
      setNuevaContrasena('');
      setActualContrasena('');
    }
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
        updateUser(actualContrasena,nuevaContrasena,user.passwor);
        clearInputs();
        setTimeout(() => {
            navigate('/');
        }, 2000);
    }

  return (
    <div className="container-fluid px-4 mt-5">
        <div className="formulario bg-white rounded shadow-sm">
            <h2 className="form__title">MI CUENTA</h2>
            
            <div>
                <div className="form__header">
                    <h3 className="form__subtitle" >DATOS PERSONALES</h3>
                </div>

                <div>
                    <div className="mt-3">
                        <div className="row p-2 mb-3">

                            <div className="col-md-4 mb-md-4">
                                <label className="form-label">Nombres *</label>
                                <input type="text" className="form-control" value={nombres} required disabled />
                            </div>

                            <div className="col-md-4 mb-md-4">
                                <label className="form-label">Apellidos *</label>
                                <input type="text" className="form-control" value={apellidos} required disabled />
                            </div>

                            <div className="col-md-4 mb-md-4">
                                <label className="form-label">Correo Electronico *</label>
                                <input type="email" className="form-control" value={correo} required disabled />
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <div>
                <div className="form__header">
                    <h3 className="form__subtitle">CAMBIAR CONTRASEÑA</h3>
                </div>

                <div>
                    <form onSubmit={handleSubmit} className="mt-3">
                        <div className="row p-2 mb-3">

                            <div className="col-md-4 mb-md-4">
                                <label className="form-label">Contraseña Anterior *</label>
                                <input type="text" className="form-control" value={actualContrasena} onChange={handleActualContrasena} required />
                            </div>

                            <div className="col-md-4 mb-md-4">
                                <label className="form-label">Contraseña Nueva *</label>
                                <input type="text" className="form-control" value={nuevaContrasena} onChange={handleNuevaContrasena} required />
                            </div>

                            <CamposObligatorios />

                            <div className="col-12 d-flex justify-content-center gap-3">
                                <button className="btn btn-primary" type="submit">CAMBIAR CONTRASEÑA</button>
                            </div>

                        </div>
                    </form>
                </div>
            </div>

        </div>
    </div>
  )
}

export default UpdateForm
