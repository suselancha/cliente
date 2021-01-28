import React from 'react';
import './RegisterForm.css';
import { Form, Button } from 'semantic-ui-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from'react-toastify';
import { useMutation } from '@apollo/client';
import { NUEVO_USUARIO } from '../../../gql/usuario';

export default function RegisterForm(props) {

    const { setShowLogin} = props;
    //console.log(props);

    // Mutation
    const [nuevoUsuario] = useMutation(NUEVO_USUARIO);

    const formik = useFormik({
        initialValues: initialValue(),
        validationSchema: Yup.object({
            nombre: Yup.string()
                        .required("Nombre obligatorio"),
            apellido: Yup.string()
                        .required("Apellido obligatorio"),
            nombreUsuario: Yup.string()
                            .matches(/^[a-zA-Z0-9-]*$/, "El nombre del usuario no puede tener espacio")
                            .required("Nombre usuario obligatorio"),
            correo: Yup.string()
                            .email("El correo no es válido")
                            .required("Correo obligatorio"),
            clave: Yup.string()
                            .required("Clave obligatoria")
                            .min(5, 'Mínimo 5 caracteres')
                            .oneOf([Yup.ref("repetirClave")], "Las claves no son iguales"),
            repetirClave: Yup.string()
                            .required("Clave obligatoria")
                            .min(5, 'Mínimo 5 caracteres')
                            .oneOf([Yup.ref("clave")], "Las claves no son iguales"),
        }),
        onSubmit: async (valores) => {
            /*console.log("Formulario enviado");
            console.log(valores);*/
            try {
                const newUser = valores;
                delete newUser.repetirClave;
                //console.log(newUser);
                await nuevoUsuario({
                    variables: {
                        input: newUser
                    }
                })
                toast.success("Usuario registrado correctamente");
                //Seteo el estado para que se visualize el form de login
                setShowLogin(true);
            } catch (error) {
                toast.error(error.message);
                console.log(error);
            }
        }
    });

    return (
        <>
            <h2 className="register-form-title">Regístrate para ver fotos y videos de tus amigos.</h2>
            <Form className="register-form" onSubmit={formik.handleSubmit}>
                <Form.Input
                    onChange={formik.handleChange}
                    type="text"
                    placeholder="Nombre"
                    name="nombre"
                    value={formik.values.nombre}
                    error={formik.errors.nombre}
                />
                <Form.Input
                    onChange={formik.handleChange}
                    type="text"
                    placeholder="Apellido"
                    name="apellido"
                    value={formik.values.apellido}
                    error={formik.errors.apellido}
                />
                <Form.Input
                    onChange={formik.handleChange}
                    type="text"
                    placeholder="Nombre de usuario"
                    name="nombreUsuario"
                    value={formik.values.nombreUsuario}
                    error={formik.errors.nombreUsuario}
                />
                <Form.Input
                    onChange={formik.handleChange}
                    type="text"
                    placeholder="Correo"
                    name="correo"
                    value={formik.values.correo}
                    /*error={formik.errors.correo && true}*/
                    error={formik.errors.correo}
                />
                <Form.Input
                    onChange={formik.handleChange}
                    type="password"
                    placeholder="Clave"
                    name="clave"
                    value={formik.values.clave}
                    error={formik.errors.clave}
                />
                <Form.Input
                    onChange={formik.handleChange}
                    type="password"
                    placeholder="Repetir clave"
                    name="repetirClave"
                    value={formik.values.repetirClave}
                    error={formik.errors.repetirClave}
                />

                <Button
                    type="submit"
                    className="btn-submit"
                >
                    Registrate
                </Button>

                <Button
                    type="button"
                    className="btn-submit"
                    onClick={formik.handleReset}
                >
                    Reset
                </Button>
            </Form>
        </>
    )
}

function initialValue() {
    return {
        nombre: "",
        apellido: "",
        nombreUsuario: "",
        correo: "",
        clave: "",
        repetirClave:""
    };
}
