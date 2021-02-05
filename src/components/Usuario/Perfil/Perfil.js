import React, { useState } from 'react';
import { Grid, Image } from 'semantic-ui-react';
import ImageNoFound from '../../../assets/png/avatar.png';
import './Perfil.css';
import { useQuery } from '@apollo/client';
import { OBTENER_USUARIO }from '../../../gql/usuario';
import UsuarioNoFound from '../../UsuarioNoFound';
import ModalBasic from '../../Modal/ModalBasic';
import AvatarForm from '../AvatarForm';
import useAuth from '../../../hooks/useAuth';

export default function Perfil(props) {
    //console.log(props);
    const { nombreUsuario } = props;
    //console.log(nombreUsuario);

    const [showModal, setShowModal] = useState(false);
    const [tituloModal, setTituloModal] = useState("");
    const [childrenModal, setChildrenModal] = useState(null);

    //Usamos hooks Auth para verificar el usuario logueado
    const { auth } = useAuth();
    /*console.log(nombreUsuario);
    console.log(auth);*/

    //const result = useQuery(OBTENER_USUARIO, {
    const { data, loading, error } = useQuery(OBTENER_USUARIO, {
        variables: { nombreUsuario },
    });

    if(loading) return null;
    if(error) return <UsuarioNoFound />
    
    const { obtenerUsuario } = data;

    //console.log(result);
    //console.log(data);
    //console.log(obtenerUsuario);

    const handlerModal = (type) => {
        switch (type) {
            case "avatar":
                setTituloModal("Cambiar foto de perfil");
                setChildrenModal(<AvatarForm setShowModal={setShowModal} auth={auth} />);
                setShowModal(true);
                break;
        
            default:
                break;
        }
    }

    return (
        <>
            <Grid className="perfil">
                <Grid.Column width={5} className="perfil_left">
                    <Image
                        src={obtenerUsuario.avatar ? obtenerUsuario.avatar : ImageNoFound}
                        //Se valida que solo el usuario cambie su avatar
                        avatar onClick={() => nombreUsuario === auth.nombreUsuario && handlerModal("avatar")}
                    />
                </Grid.Column>
                <Grid.Column width={11} className="perfil_right">
                    <div>HeaderPerfil</div>
                    <div>Seguidores</div>
                    <div className="other">
                        <p className="nombre">{obtenerUsuario.nombre} {obtenerUsuario.apellido} </p>
                        {obtenerUsuario.sitioWeb && (
                            <a href={obtenerUsuario.sitioWeb} className="sitioWeb" target="_blank" rel="noopener noreferrer">
                                {obtenerUsuario.sitioWeb}
                            </a>
                        )}

                        {obtenerUsuario.descripcion && (
                            <p className="descripcion">{obtenerUsuario.descripcion}</p>
                        )}
                    </div>
                </Grid.Column>
            </Grid>
            <ModalBasic show={showModal} setShow={setShowModal} titulo={tituloModal}>
                {childrenModal}
            </ModalBasic>
        </>
    )
}
