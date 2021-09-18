import React, {Component, Fragment} from 'react';
import io from 'socket.io-client';
import Peer from 'peerjs';
import {GiFragmentedMeteor} from "react-icons/all";

class MeetingPage extends Component {

    constructor(props) {
        super();
        this.state={
            peerID:""
        }
    }

    componentDidMount() {
        const socket = io.connect('/');

        this.GeneratePeerID();
    }

    GeneratePeerID=()=>{
        let peer = new Peer();
        peer.on('open',(id)=>{
            this.setState({peerID:id});
        });
    }

    render() {
        return (
            <Fragment>
              <h2>{this.state.peerID}</h2>
            </Fragment>
        );
    }
}

export default MeetingPage;