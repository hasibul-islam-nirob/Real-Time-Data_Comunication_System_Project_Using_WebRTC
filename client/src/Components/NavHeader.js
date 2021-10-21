import React, {Component, Fragment} from 'react';
import {Container, Navbar} from "react-bootstrap";
import navIcon from '../Assets/images/teams.svg';
import logo from '../Assets/images/Logo.webp';
import cLogo from '../Assets/images/cuLogo.png';
import {ImExit} from "react-icons/all";
import {getUserName, LogOut} from "../Helpers/SessionHelpers";
import {Redirect} from "react-router";
import {LeftAlert} from "../Helpers/ToastMessage";

class NavHeader extends Component {

    constructor() {
        super();
        this.state={
            Redirect:false
        }
    }


    RedirectPage=()=>{
        if (this.state.Redirect === true){
            return ( <Redirect to="/" /> );
            LogOut();
        }
    }

    ExitBtn = () =>{
        let name = getUserName();
        if (name !== null){
            LeftAlert(name);
            LogOut();
        }

    }


    render() {

        return (
            <Fragment>
                <Navbar className="sticky-top" bg="dark" >
                    <Container fluid={true}>
                        <Navbar.Brand href="/">
                            <img className="nav-icon" src={cLogo} alt="" />
                            <span onClick={this.ExitBtn} className="nav-item mx-2"> City University - WebRTC </span>

                        </Navbar.Brand>
                    </Container>


                </Navbar>
                {this.RedirectPage()}
            </Fragment>
        );
    }
}

export default NavHeader;