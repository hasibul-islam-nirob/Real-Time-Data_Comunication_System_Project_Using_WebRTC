import React, {Component, Fragment} from 'react';
import {Redirect} from "react-router";
import {UserNameRequired} from "../Helpers/ToastMessage";
import {setUserName} from "../Helpers/SessionHelpers";

class JoinForm extends Component {

    constructor() {
        super();
        this.state={
            UserName:"",
            UserNumber:"",
            Redirect:false
        }
    }

    RedirectPage = () =>{
        if (this.state.Redirect === true){
            return ( <Redirect to="/meeting" /> )
        }
    }

    JoinMeeting=()=>{
        let UserName = this.state.UserName;
        if (UserName.length === 0){
            UserNameRequired();
        }else {
            setUserName(UserName);
            this.setState({Redirect:true})
        }
    }

    render() {
        return (
            <Fragment>
                <div className="center text-center">
                    <h3 className="nav-item">Join This Meeting</h3>
                    <input onChange={(event)=>{this.setState({UserName:event.target.value})}} placeholder="Write Your Name" type="text" className="form-control text-center form-rounded mt-3"/>
                    <button onClick={this.JoinMeeting} className="btn w-100 mt-3 btn-rounded btn-success">Join</button>
                </div>
                {this.RedirectPage()}
            </Fragment>
        );
    }
}

export default JoinForm;