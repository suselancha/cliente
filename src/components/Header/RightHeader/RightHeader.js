import React from 'react';
import './RightHeader.css';
import { Icon, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom'
import useAuth from '../../../hooks/useAuth';
import ImageNofound from '../../../assets/png/avatar.png';
import { useQuery } from '@apollo/client';
import { OBTENER_USUARIO }from '../../../gql/usuario';

export default function RightHeader() {

    //Consumimos el context
    /*const data = useAuth();
    console.log(data);*/
    const { auth } = useAuth();
    //console.log(auth);

    const { data, loading, error } = useQuery(OBTENER_USUARIO, {
        variables: { nombreUsuario: auth.nombreUsuario },
    });

    if(loading || error) return null;
        
    const { obtenerUsuario } = data;

    return (
        <>
            <div className="right-header">
                <Link to="/administrador">
                    <Icon name="home" />
                </Link>
                <Icon name="plus" />
                <Link to={`/${auth.nombreUsuario}`}>
                    <Image src={obtenerUsuario.avatar ? obtenerUsuario.avatar : ImageNofound} avatar />
                </Link> 
            </div>
        </>
    )
}
