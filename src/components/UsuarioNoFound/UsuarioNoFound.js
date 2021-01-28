import React from 'react';
import './UsuarioNoFound.css';
import { Link } from 'react-router-dom';

export default function UsuarioNoFound() {
    return (
        <div className="usuario-no-encontrado">
            <p>Usuario no encontrado</p>
            <p>Es posible que el enlace que has seguido sea incorrecto o que el usuario se haya eliminado</p>
            <Link to='/administrador'>Volver al Inicio</Link>
        </div>
    )
}
