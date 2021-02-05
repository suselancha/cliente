import React from 'react';
import { useParams } from 'react-router-dom';
import Perfil from '../components/Usuario/Perfil';

export default function Usuario() {

    //Utilizo para ver los parametros que llegan, esto se define en routes
    /*const params = useParams();
    console.log(params);*/
    const { nombreUsuario } = useParams(); 

    return (
        <>
            <Perfil nombreUsuario={nombreUsuario} />
        </>
    )
}
