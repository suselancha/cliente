import React from 'react';
import './RightHeader.css';
import { Icon, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom'
import useAuth from '../../../hooks/useAuth';
import ImageNofound from '../../../assets/png/avatar.png';

export default function RightHeader() {

    //Consumimos el context
    /*const data = useAuth();
    console.log(data);*/
    const { auth } = useAuth();
    //console.log(auth);
    return (
        <>
            <div className="right-header">
                <Link to="/administrador">
                    <Icon name="home" />
                </Link>
                <Icon name="plus" />
                <Link to={`/${auth.nombreUsuario}`}>
                    <Image src={ImageNofound} avatar />
                </Link> 
            </div>
        </>
    )
}
