import React, { useState } from 'react';
import './LoginForm.css';
import { Form, Button } from 'semantic-ui-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@apollo/client';
import { AUTENTICAR_USUARIO } from '../../../gql/usuario';
import { setToken } from '../../../utils/token';
import { decodeToken } from '../../../utils/token';
import useAuth from '../../../hooks/useAuth';

export default function LoginForm() {

    const [error, setError] = useState("");
    
    // Mutation
    const [autenticarUsuario] = useMutation(AUTENTICAR_USUARIO);

    //A trave del hook podemos usar las funciones del App
    const { setUser } = useAuth();
    
    const formik = useFormik({
        initialValues: initialValue(),
        validationSchema: Yup.object({
            correo: Yup.string()
                            .email("El correo no es válido")
                            .required("Correo obligatorio"),
            clave: Yup.string()
                            .required("Clave obligatoria")
                            .min(5, 'Mínimo 5 caracteres'),
        }),
        onSubmit: async (valores) => {
            /*console.log("Formulario enviado");
            console.log(valores);*/
            setError("");
            try {
                const { data } = await autenticarUsuario({
                    variables: {
                        input: valores
                    }
                })
                //console.log(data);

                //Guardamos el token en el storage
                const { token } = data.autenticarUsuario;
                setToken(token);
                //console.log(token);

                //Usamos esta funcion del APP desde aca!!
                //Pasamo el token decodificado
                setUser(decodeToken(token));
            } catch (error) {
                setError(error.message);
                //console.log(error);
            }
        }
    });

    return (
        <>
            <h2 className="login-form-title">Entra para ver fotos y videos de tus amigos.</h2>
            <Form className="login-form" onSubmit={formik.handleSubmit}>
                <Form.Input
                    onChange={formik.handleChange}
                    type="text"
                    placeholder="Correo"
                    name="correo"
                    value={formik.values.correo}
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
            
                <Button
                    type="submit"
                    className="btn-submit"
                >
                    Iniciar Sesión
                </Button>

                <Button
                    type="button"
                    className="btn-submit"
                    onClick={formik.handleReset}
                >
                    Reset
                </Button>

                {error && <p className="submit-error">{error}</p>}

            </Form>
        </>
    )
}

function initialValue() {
    return {
        correo: "",
        clave: ""
    };
}
