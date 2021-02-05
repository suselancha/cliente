import React, { useCallback, useState } from 'react';
import './AvatarForm.css';
import { Button } from 'semantic-ui-react';
import { useDropzone } from 'react-dropzone';
import { useMutation } from '@apollo/client';
import { ACTUALIZAR_AVATAR, OBTENER_USUARIO, ELIMINAR_AVATAR } from '../../../gql/usuario';
import { toast } from 'react-toastify';

export default function AvatarForm(props) {
    const { setShowModal, auth } = props;

    const [loading, setLoading] = useState(false);

    //Actualiza cache de apollo con el nuevo valor del campo "avatar".
    //Esta query la usa RighHeader y Perfil para mostrar el avatar
    //Si tiene la misma extension no cambia, porque no cambia el nombre de la imagen
    const [actualizarAvatar] = useMutation(ACTUALIZAR_AVATAR, {
        update(cache, { data: { actualizarAvatar } }) {
            //console.log(actualizarAvatar);
            const { obtenerUsuario } = cache.readQuery({
                query: OBTENER_USUARIO,
                variables: { nombreUsuario: auth.nombreUsuario },
            });

            cache.writeQuery({
                query: OBTENER_USUARIO,
                variables: { nombreUsuario: auth.nombreUsuario },
                data: {
                    obtenerUsuario: { ...obtenerUsuario, avatar: actualizarAvatar.urlAvatar } 
                }
            })
        },
    });

    //Actuaiza cache de apollo con el nuevo valor del campo "avatar".
    //Esta query la usa RighHeader y Perfil para mostrar el avatar
    const [eliminarAvatar] = useMutation(ELIMINAR_AVATAR, {
        update(cache, { data: { actualizarAvatar } }) {
            //console.log(actualizarAvatar);
            const { obtenerUsuario } = cache.readQuery({
                query: OBTENER_USUARIO,
                variables: { nombreUsuario: auth.nombreUsuario },
            });

            cache.writeQuery({
                query: OBTENER_USUARIO,
                variables: { nombreUsuario: auth.nombreUsuario },
                data: {
                    obtenerUsuario: { ...obtenerUsuario, avatar: '' } 
                }
            })
        },
    });

    const onDrop = useCallback(async acceptedFiles => {
        //console.log(acceptedFiles)
        const file = acceptedFiles[0];

        try {
            setLoading(true);
            //console.log(file);
            const result = await actualizarAvatar({
                variables: {file}
            });
            const { data } = result;
            if(!data.actualizarAvatar.estado) {
                toast.warning("Error al actualizar el avatar");
                setLoading(false);
            } else {
                setLoading(false);
                setShowModal(false);
            }
            console.log(result);
            
        } catch (error) {
            console.log(error);
        }
      }, [actualizarAvatar, setShowModal]); //Revisar, por defecto estaba en []

    const { getRootProps, getInputProps } = useDropzone({
        accept: "image/jpeg, image/png",
        noKeyboard: true,
        multiple: false,
        onDrop
    });

    const onDeleteAvatar = async () => {
        //console.log('Eliminando avatar');
        try {
            const result = await eliminarAvatar();
            const { data } = result;
            if(!data.eliminarAvatar){
                toast.warning("Error al eliminar el avatar");
            } else {
                setShowModal(false);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="avatar-form">
            <Button
                {...getRootProps()}
                loading={loading}
            >
                Cargar una foto
            </Button>
            <Button 
                onClick={onDeleteAvatar}
            >
                Eliminar foto actual
            </Button>
            <Button
                 onClick={() => setShowModal(false)}
            >
                Cancelar
            </Button>
            <input {...getInputProps()} />
        </div>
    )
}
