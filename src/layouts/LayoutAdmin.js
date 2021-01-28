import React from 'react';
import { Container } from 'semantic-ui-react';
import Header  from '../components/Header';

export default function LayoutAdmin(props) {
    //Llega un children en los props
    //console.log(props);
    const { children } = props;

    return (
        <>
            <Header />
            <Container className="layout-admin">
                {children}
            </Container>            
        </>
    )
}
