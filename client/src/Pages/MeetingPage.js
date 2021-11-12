import React, {Component, Fragment} from 'react';
import io from 'socket.io-client';
import Peer from 'peerjs'
import NavHeader from "../Components/NavHeader";
import UserCanvas from "../Components/UserCanvas";
import NavBottom from "../Components/NavBottom";
import {Redirect} from "react-router";
import {getUserName, LogOut, setPeerID} from "../Helpers/SessionHelpers";
import {LeftAlert, UserJoinAlert, RequestFailed} from "../Helpers/ToastMessage";
import { Helmet } from "react-helmet";
import UserList from "../Components/UserList";
import FullScreenLoader from "../Components/FullScreenLoader";

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
            AudioVideoPermission:{'video':true, 'audio':false},
            isLoading:"d-none"
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
        let STUNServer = "stun:stun.l.google.com:19302";
        let TURNServer = "turn:numb.viagenie.ca";
        let TurnUser = "rabbilIDLC@gmail.com";
        let TurnPass = "uscAgMf8vg7VAut";

        let StunTurnConfig={
            config:{
                'iceServers':[
                    {urls: STUNServer},
                    {
                        urls: TURNServer,
                        credential:TurnPass,
                        username: TurnUser
                    }
                ]
            }
        }
        let peer = new Peer(StunTurnConfig);
        this.setState({isLoading:""})

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

                this.CreateNewUser(id);
                this.AlertNewUserJoin();
                this.GetJoinerList();
                this.UpdateUserCountList();
                this.AlertLeftUser();

                this.setState({isLoading:"d-none"});
                this.CreateSelfVideoPreview();
            }else{
                RequestFailed();
                LogOut();
                this.setState({Redirect:true});
                this.setState({isLoading:"d-none"})
            }

        });
    }
    // Self Video Preview
    CreateSelfVideoPreview = () =>{
        const myVideo = document.createElement("video");
        myVideo.muted = true;
        navigator.mediaDevices.getUserMedia({
            video:true,
            audio:true
        }).then(stream=>{
            this.AddVideoStream(myVideo, stream);
        })
    }
    // Add Video Stream
    AddVideoStream = (video, stream) =>{
        const videoCard = document.getElementById("video-grid")
        video.srcObject = stream
        video.setAttribute('width','100');
        video.setAttribute("height", "150");
        video.classList.add('video-preview')
        video.addEventListener('loadedmetadata',()=>{
            video.play();
        })
        videoCard.append(video);
    }
    // Create New User Function
    CreateNewUser=(id)=>{
        let NewUser ={Name:getUserName(), PeerID:id}
        socket.emit('NewUserCreator', NewUser);
    }
    // Alert New User Joiner Function
    AlertNewUserJoin=()=>{
        socket.on('NewUserJoinerAlert', (Name)=>{
            UserJoinAlert(Name);
            let voiceMsg = new SpeechSynthesisUtterance();
            voiceMsg.text = Name +" has been joined";
            window.speechSynthesis.speak(voiceMsg);
        })
    }
    // Alert Left User Function
    AlertLeftUser=()=>{
        socket.on('UserLeftAlert', (Name)=>{
            LeftAlert(Name);
            let voiceMsg = new SpeechSynthesisUtterance();
            voiceMsg.text = Name + " has been left";
            window.speechSynthesis.speak(voiceMsg);

        })
    }
    //Update Joiner List
    UpdateUserCountList=()=>{
        socket.on('UserList', (UserList)=>{
            this.setState({UserList:UserList});
        })
    }
    //GetJoinerList
    GetJoinerList = () =>{
        socket.on('UserList', (UserListApp)=>{
            this.setState({UserList:UserListApp});
            UserListApp.map((list,i)=>{
                this.CreateMutualConnection(list['PeerID']);
                this.ReceiveMutualVideoCall();
                this.CreateMutualVideoCall(list['PeerID']);
            })
        })
    }
    // Create Mutual Connection
    CreateMutualConnection = (othersPeerID) =>{
        let connectedPeerList = this.state.ConnectedPeerList;
        if(!connectedPeerList.includes(othersPeerID)){
            let myPeer = this.state.PeerObj;
            let connected = myPeer.connect(othersPeerID)
            connected.on('open',()=>{
                let myConnectedPeerList = this.state.ConnectedPeerList;
                myConnectedPeerList.push(othersPeerID);
                this.setState({ConnectedPeerList:myConnectedPeerList});
                connected.send(getUserName());
            })
            myPeer.on('connection',(connected)=>{
                connected.on('data',(data)=>{
                    console.log(data);
                })
            })
        }
    }
    // Receive Mutual VideoCall
    ReceiveMutualVideoCall = () =>{
        let myPeerID = this.state.PeerObj;
        myPeerID.on('call', (call)=>{
            navigator.mediaDevices.getUserMedia(this.state.AudioVideoPermission)
                .then((stream)=>{
                    call.answer(stream)
                    call.on('stream', (remoteStream) => {})
                })
                .catch( ()=>{})
        })
    }
    //Create Mutual Video Call
    CreateMutualVideoCall = (othersPeerID) =>{
        let connectedPeerList = this.state.ConnectedPeerList;
        if (!connectedPeerList.includes(othersPeerID)){
            let myPeer = this.state.PeerObj;
            navigator.mediaDevices.getUserMedia(this.state.AudioVideoPermission)
                .then((stream)=>{
                    let call = myPeer.call(othersPeerID, stream)
                    const video = document.createElement('video')
                    call.on('stream', (remoteStream) => {
                        this.addVideoStream(video, remoteStream)
                    })
                }).catch(() => {})
        }
    }

    render() {
        return (
            <Fragment>
                {this.RedirectPage()}
                <Helmet>
                    <title>{getUserName()}</title>
                </Helmet>
                <NavHeader/>

                <div className = "container-fluid">
                    <div className = "row" >
                        <div className = "col-md-10" >
                            <div id = "video-grid" > </div>
                        </div>
                        <div className = "col-md-2 " >
                            <div className = "user-list-section" >
                                <UserList UserList = { this.state.UserList }/>
                            </div>
                        </div>
                    </div>
                </div>
                <FullScreenLoader isLoading={this.state.isLoading}/>
                <NavBottom UserList={this.state.UserList} />
            </Fragment>
        );
    }
}

export default MeetingPage;


