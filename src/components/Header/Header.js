import React from 'react';
import './Header.css';
import { Container, Grid, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/png/instaclone.png';
import  RightHeader from './RightHeader/';

export default function Header() {
    return (
        <div className="header">
            <Container>
                <Grid>
                    <Grid.Column width={3} className="header_logo">
                        <Link to="/administrador">
                            <Image className="header_img" src={Logo} alt="Instaclone" />
                        </Link>                        
                    </Grid.Column>
                    <Grid.Column width={10}>
                        <p>Buscador</p>
                    </Grid.Column>
                    <Grid.Column width={3}>
                        <RightHeader />
                    </Grid.Column>
                </Grid>
            </Container>
        </div>
    )
}
