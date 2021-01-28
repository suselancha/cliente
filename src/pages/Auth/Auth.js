import React, { useState } from 'react';
import { Container, Image } from 'semantic-ui-react';
import instaclone from '../../assets/png/instaclone.png';
import RegisterForm from '../../components/Auth/RegisterForm';
import LoginForm from '../../components/Auth/LoginForm';

import './Auth.css';

export default function Auth() {

    //Por defecto muestra el form de registro
    const [showLogin, setShowLogin] = useState(true);

    return (
        <Container fluid className="auth">
            <Image src={instaclone} />

            <div className="container-form">
                {showLogin ? <LoginForm /> : <RegisterForm setShowLogin={setShowLogin} />}
            </div>

            <div className="change-form">
                <p>                    
                    {showLogin ? (
                        <>
                            ¿No tienes cuenta?
                            <span 
                                className="span"
                                onClick={() => setShowLogin(!showLogin) }
                            >
                                Registrate
                            </span>
                        </>
                    ) : (
                        <>
                            ¡Entra con tu cuenta!
                            <span
                                className="span span-hover"
                                onClick={() => setShowLogin(!showLogin) }
                            >
                                Iniciar Sesión
                            </span>
                        </>
                    )}
                </p>
            </div>

        </Container>
    )
}
