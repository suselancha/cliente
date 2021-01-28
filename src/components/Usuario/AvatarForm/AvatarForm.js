import React, { useCallback } from 'react';
import './AvatarForm.css';
import { Button } from 'semantic-ui-react';
import { useDropzone } from 'react-dropzone';
import { useMutation } from '@apollo/client';
import { ACTUALIZAR_AVATAR } from '../../../gql/usuario';

export default function AvatarForm(props) {
    const { setShowModal } = props;

    const [actualizarAvatar] = useMutation(ACTUALIZAR_AVATAR);

    const onDrop = useCallback(async acceptedFiles => {
        //console.log(acceptedFiles)
        const file = acceptedFiles[0];

        try {
            const result = await actualizarAvatar({
                variables: {file}
            });
            console.log(result);
        } catch (error) {
            console.log(error);
        }
      }, []);

    const { getRootProps, getInputProps } = useDropzone({
        accept: "image/jpeg, image/png",
        noKeyboard: true,
        multiple: false,
        onDrop
    });

    return (
        <div className="avatar-form">
            <Button {...getRootProps()}>Cargar una foto</Button>
            <Button>Eliminar foto actual</Button>
            <Button onClick={() => setShowModal(false)}>Cancelar</Button>
            <input {...getInputProps()} />
        </div>
    )
}
