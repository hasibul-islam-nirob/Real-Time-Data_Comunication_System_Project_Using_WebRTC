import React, {Component, Fragment} from 'react';
import {FaUsers, FaVideo, MdMessage, MdScreenShare, TiMicrophone} from "react-icons/all";

class NavBottom extends Component {
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


                                <button  className="btn mx-1">
                                    <MdScreenShare className="bottom-nav-item"/>
                                </button>


                                <button  className="btn mx-1">
                                    <MdMessage className="bottom-nav-item"/>
                                </button>


                                <button  className="btn mx-1">
                                    <FaUsers className="bottom-nav-item"/> <span className="badge">{UserListCount}</span>
                                </button>

                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default NavBottom;