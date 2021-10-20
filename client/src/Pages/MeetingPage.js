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
            SelfPeerID:"",
            ConnectedPeerList:[],
            AudioVideoPermission:{'video':true, 'audio':false}
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

                // Push Peer ID All In One
                let SetConnectedPeerList = this.state.ConnectedPeerList;
                SetConnectedPeerList.push(id);
                this.setState({ConnectedPeerList: SetConnectedPeerList});

                // Store PeerID On Session
                setPeerID(id);
                this.setState({SelfPeerID:id});

                // Create New User & Send Socket Server
                this.CreateNewUser(id);
                //let NewUser ={Name:getUserName(), PeerID:id}
                //socket.emit('NewUserCreator', NewUser);

                // Alert New Joiner Received From Socket Server
                this.AlertNewUserJoin();
                /*
                socket.on('NewUserJoinerAlert', (Name)=>{
                    UserJoinAlert(Name);
                }) */

                //Update Joiner List
                socket.on('UserList', (UserList)=>{
                    this.setState({UserList:UserList});
                })

                // Alert Left User

                /*
                socket.on('UserLeftAlert', (Name)=>{
                    LeftAlert(Name);
                }) */

            }else{
                RequestFailed();
                LogOut();
                this.setState({Redirect:true});
            }

        });
    }

    // Create New User Function
    CreateNewUser=(id)=>{
        let NewUser ={Name:getUserName(), PeerID:id}
        socket.emit('NewUserCreator', NewUser);
    }

    // Alert New User Joiner Function
    AlertNewUserJoin=()=>{
        socket.on('NewUserJoinerAlert', (Name)=>{
            UserJoinAlert(Name + " Joined");
            let voiceMsg = new SpeechSynthesisUtterance();
            voiceMsg.text = Name +" has been joined";
            window.speechSynthesis.speak(voiceMsg);
        })
    }




    render() {
        return (
            <Fragment>
                <NavHeader UserList={this.state.UserList} />
                <UserCanvas/>
                <NavBottom UserList={this.state.UserList} />
                {this.RedirectPage()}
            </Fragment>
        );
    }
}

export default MeetingPage;


