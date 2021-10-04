import React, {Component, Fragment} from 'react';
import {Container, Navbar} from "react-bootstrap";
import navIcon from '../Assets/images/teams.svg';
class NavHeader extends Component {
    render() {
        return (
            <Fragment>
                <Navbar className="sticky-top" bg="dark" >
                    <Container fluid={true}>
                        <Navbar.Brand href="#home">
                            <img className="nav-icon" src={navIcon} />
                            <span className="nav-item mx-2"> Our Team </span>
                        </Navbar.Brand>
                    </Container>
                </Navbar>
            </Fragment>
        );
    }
}

export default NavHeader;