import React, {Component, Fragment} from 'react';
import io from 'socket.io-client';
import Peer from 'peerjs'
import NavHeader from "../Components/NavHeader";
import UserCanvas from "../Components/UserCanvas";
import NavBottom from "../Components/NavBottom";
import {Redirect} from "react-router";
import {getUserName, LogOut, setPeerID} from "../Helpers/SessionHelpers";
import {LeftAlert, UserJoinAlert, RequestFailed} from "../Helpers/ToastMessage";

const socket = io.connect('/');

class MeetingPage extends Component {

    constructor() {
        super();
        this.state={
            Redirect:false,
            UserList:[],
            PeerObj:null,
            SelfPeerID:""
        }
    }

    RedirectPage=()=>{
        if (this.state.Redirect === true){
            return ( <Redirect to="/" /> )
        }
    }

    componentDidMount() {
        if (getUserName() === null){
            this.setState({Redirect:true});
        }else {
            this.GeneratePeerID();
        }
    }

    GeneratePeerID=()=>{
        let peer = new Peer();
        this.setState({PeerObj:peer});

        peer.on('open',(id)=>{

            if (id.length !== 0){

                // Store PeerID On Session
                setPeerID(id);
                this.setState({SelfPeerID:id});

                // Create New User & Send Socket Server
                let NewUser ={Name:getUserName(), PeerID:id}
                socket.emit('NewUserCreator', NewUser);

                // Alert New Joiner Received From Socket Server
                socket.on('NewUserJoinerAlert', (Name)=>{
                    UserJoinAlert(Name);
                })

                //Update Joiner List
                socket.on('UserList', (UserList)=>{
                    this.setState({UserList:UserList});
                })

                // Alert Left User
                socket.on('UserLeftAlert', (Name)=>{
                    LeftAlert(Name);
                })



            }else{
                RequestFailed();
                LogOut();
                this.setState({Redirect:true});
            }



        });
    }

    render() {
        return (
            <Fragment>
                <NavHeader/>
                <UserCanvas/>
                <NavBottom/>


                {this.RedirectPage()}
            </Fragment>
        );
    }
}

export default MeetingPage;