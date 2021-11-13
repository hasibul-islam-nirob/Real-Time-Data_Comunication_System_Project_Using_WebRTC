import React, {Component, Fragment} from 'react';
import {FaUsers, FaVideo, MdMessage, MdScreenShare, TiMicrophone} from "react-icons/all";
import {Button, Col, Container, Form, InputGroup, Modal, Row} from "react-bootstrap";
import io from "socket.io-client";
import {getUserName} from "../Helpers/SessionHelpers";

const socket = io.connect('/');

class NavBottom extends Component {

    constructor() {
        super();
        this.state={
            modalShow:false,
            modalHide:true
        }
    }

    modalShow=()=>{
        this.setState({modalShow:true});
        this.setState({modalHide:false});
    }
    modalHide=()=>{
        this.setState({modalShow:false});
        this.setState({modalHide:true});
    }
    sendMsg=()=> {
        let inputMsg = document.getElementById("chatInputField").value;
        if (inputMsg.length > 0){
            socket.emit("msgSendServer",inputMsg);
            document.getElementById("chatInputField").value = " ";
        }

    }
    b= socket.on("magTransfer",function (chatMsg) {
        let listItem = document.createElement('li');
        let hr = document.createElement('hr');
        listItem.textContent = chatMsg;

        let chatHistory = document.getElementById("chatHistory");
        chatHistory.appendChild(listItem);
        chatHistory.appendChild(hr);
    })


    onScreenShare=()=>{
        let askBrowser = {'video':true, 'audio':false};
        navigator.mediaDevices.getDisplayMedia(askBrowser)
            .then(function (stream){
                let video = document.createElement('video');
                video.srcObject = stream;
                video.play();
            }).catch(function(){

        })
    }




    render() {

        let UserList = this.props.UserList;
        let UserListCount = UserList.length;

        return (
            <Fragment>
                <div className=" bottom-navbar   p-3 fixed-bottom container-fluid">
                    <div className="row  justify-content-center">
                        <div className="col-md-6 col-lg-6 text-center col-sm-12">
                            <div className="d-inline-flex">


                                <button  className="btn mx-1">
                                    <FaVideo className="bottom-nav-item"/>
                                </button>


                                <button  className="btn mx-1">
                                    <TiMicrophone className="bottom-nav-item"/>
                                </button>


                                <button onClick={this.onScreenShare} className="btn mx-1">
                                    <MdScreenShare className="bottom-nav-item"/>
                                </button>


                                <button onClick={this.modalShow} className="btn mx-1">
                                    <MdMessage  className="bottom-nav-item"/>
                                </button>


                                <button  className="btn mx-1">
                                    <FaUsers className="bottom-nav-item"/> <span className="badge">{UserListCount}</span>
                                </button>

                            </div>
                        </div>
                    </div>
                </div>


                <Modal
                    size="lg"
                    show={this.state.modalShow}
                    onHide={this.modalHide}
                    aria-labelledby="example-modal-sizes-title-lg"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="example-modal-sizes-title-lg">Group Chat</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Container className="pb-2">
                            <div className="chatModal">
                                <div className="chatShow">
                                    <Row>
                                        <Col className="chatHistory col-md-12 col-sm-12">
                                            <div className="conversation">
                                                <ul id="chatHistory">

                                                </ul>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>

                                <div className="chatBox col-md-12 col-sm-12">
                                    <InputGroup>
                                        <Form.Control id="chatInputField" type="text" placeholder="Write Your Text"/>
                                        <InputGroup.Text> <Button onClick={this.sendMsg} >Send</Button> </InputGroup.Text>
                                    </InputGroup>
                                </div>

                            </div>
                        </Container>
                    </Modal.Body>
                </Modal>




            </Fragment>
        );
    }
}

export default NavBottom;