class SessionHelpers {

    setUserName(UserName){
        sessionStorage.setItem("UserName",UserName)
    }

    getUserName(){
        return sessionStorage.getItem("UserName")
    }

    setPeerID(PeerID){
        sessionStorage.setItem("PeerID",PeerID)
    }

    getPeerID(){
        return sessionStorage.getItem("PeerID")
    }

    LogOut(){
        sessionStorage.clear();
    }


}
export const {
    setUserName,
    getUserName,
    setPeerID,
    getPeerID,
    LogOut
} = new SessionHelpers();