import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../../store/actions/AuthAction";
import toast, { Toaster } from 'react-hot-toast';
import Swal  from 'sweetalert2';
import { useRouteMatch } from "react-router-dom";
import { Helmet } from "react-helmet";
import { REMOVE_AUTH_ERRORS, REMOVE_AUTH_MESSAGE } from "../../store/types/AuthType";

const ResetPassword = (props) => {
    const {params : {token}} = useRouteMatch();
    const dispatch = useDispatch();
    const { loading, authErrors, message } = useSelector((state)=>state.AuthReducer);
    const [show, setShow] = useState(false);
    const [state, setState] = useState({
        password:'',
        c_password:'',
    });
    const handleInputs = (e) =>{
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }
    const showorHide = (e) =>{
        setShow(!show);
    }
    const handleSubmit = (e) =>{
        e.preventDefault();
        dispatch(resetPassword(token,state));
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
                <title>FlixTV - reset password</title>
                <meta name="description" content="FlixTV reset password" />
            </Helmet>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="sign__content">
                            {/* <!-- authorization form --> */}
                            <form onSubmit={handleSubmit} className="sign__form">
                                <a href="index.html" className="sign__logo">
                                    <img src="./assets/img/logo.svg" alt=""/>
                                </a>
                                <div className="sign__group">
                                    <input type={`${show?'text':'password'}`} name="password" value={state.password} onChange={handleInputs} className="sign__input" placeholder="New Password"/>
                                    {state.password? <span onClick={showorHide}><i className={`fa ${show?'fa-eye-slash':'fa-eye'}`}></i></span>:''}
                                </div>
                                <div className="sign__group">
                                    <input type="password" name="c_password" value={state.c_password} onChange={handleInputs} className="sign__input" placeholder="Confirm Password"/>
                                </div>
                                
                                <button className="sign__btn" type="submit">Reset Password</button>

                            </form>
                            {/* <!-- end authorization form --> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ResetPassword;