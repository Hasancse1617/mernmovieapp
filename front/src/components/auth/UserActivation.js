import { useDispatch, useSelector } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import { accountActivation } from '../../store/actions/AuthAction';
import toast, { Toaster } from 'react-hot-toast';
import Swal  from 'sweetalert2';
import { Helmet } from "react-helmet";
import { REMOVE_AUTH_ERRORS, REMOVE_AUTH_MESSAGE } from "../../store/types/AuthType";
import { useEffect } from "react";

const UserActivation = (props) => {
    const {params : {token}} = useRouteMatch();
    const dispatch = useDispatch();
    const { loading, authErrors, message } = useSelector((state)=>state.AuthReducer);
    const handleSubmit = (e) =>{
         e.preventDefault();
         dispatch(accountActivation(token));
    }
    useEffect(()=>{
        if(authErrors.length > 0){
            authErrors.map((error)=>{
                toast.error(error.msg);
            });
          dispatch({type: REMOVE_AUTH_ERRORS});
        }
        if(message){
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: message,
                toast: true,
                showConfirmButton: false,
                timer: 5000
            });
            dispatch({type: REMOVE_AUTH_MESSAGE});
            props.history.push('/login');
        }
    },[authErrors,message])
    return (
        <div className="sign section--full-bg" data-bg="assets/img/bg.jpg">
            <Toaster position="top-right" reverseOrder={false}/>
            <Helmet>
                <title>FlixTV - user activation</title>
                <meta name="description" content="FlixTV user activation" />
            </Helmet>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="sign__content">
                            {/* <!-- authorization form --> */}
                            <form onSubmit={handleSubmit} className="sign__form">
                                <button className="sign__btn" type="submit">Account Activation</button>
                            </form>
                            {/* <!-- end authorization form --> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserActivation;