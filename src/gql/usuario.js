import { gql } from '@apollo/client';

export const NUEVO_USUARIO = gql `
    mutation nuevoUsuario($input: UsuarioInput) {
        nuevoUsuario(input: $input) {
        id
        nombre
        apellido
        correo
        clave
        nombreUsuario
        rol
        activo 
        creado
        }
    }
`;

export const AUTENTICAR_USUARIO = gql `
    mutation autenticarUsuario($input: AutenticarInput) {
        autenticarUsuario(input: $input) {
        token
        }
    }
`;

export const OBTENER_USUARIO = gql `
query obtenerUsuario($id: ID, $nombreUsuario: String) {
    obtenerUsuario(id: $id, nombreUsuario: $nombreUsuario) {
        id
        nombre
        apellido
        nombreUsuario
        correo
        avatar
        rol
        activo
        descripcion
        sitioWeb
        }
    }
`;

export const ACTUALIZAR_AVATAR = gql `
    mutation actualizarAvatar($file: Upload) {
        actualizarAvatar(file: $file){
            estado
            urlAvatar        
        }
    }
`;

export const ELIMINAR_AVATAR = gql `
    mutation eliminarAvatar {
        eliminarAvatar
    }
`;