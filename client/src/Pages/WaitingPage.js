import React, {Component, Fragment} from 'react';
import NavHeader from "../Components/NavHeader";
import JoinForm from "../Components/JoinForm";

class WaitingPage extends Component {
    render() {
        return (
            <Fragment>
                <NavHeader/>
                <JoinForm/>
            </Fragment>
        );
    }
}

export default WaitingPage;