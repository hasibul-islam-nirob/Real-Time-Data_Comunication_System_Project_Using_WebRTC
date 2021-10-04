
import toast from 'cogo-toast';

class ToastMessage {

    UserNameRequired(){
        toast.error(
            <div className="toast-text" >
                Name is Required !
            </div>,
            {position:"top-right"}
        )
    }

    RequestFailed(){
        toast.error(
            <div className="toast-text" >
                Request Failed !
            </div>,
            {position:"top-right"}
        )
    }

    UserJoinAlert(Name){
        toast.success(
            <div className="toast-text" >
                {Name} is Join !
            </div>,
            {position:"top-right"}
        )
    }

    LeftAlert(Name){
        toast.error(
            <div className="toast-text" >
                {Name} is Left !
            </div>,
            {position:"top-right"}
        )
    }


}

export const {
    UserNameRequired,
    RequestFailed,
    UserJoinAlert,
    LeftAlert
} = new ToastMessage();