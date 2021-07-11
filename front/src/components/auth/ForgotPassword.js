import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../../store/actions/AuthAction";
import toast, { Toaster } from 'react-hot-toast';
import Swal  from 'sweetalert2';
import { Helmet } from "react-helmet";
import { REMOVE_AUTH_ERRORS, REMOVE_AUTH_MESSAGE } from "../../store/types/AuthType";


const ForgotPassword = (props) => {
    const dispatch = useDispatch();
    const { loading, authErrors, message } = useSelector((state)=>state.AuthReducer);
    const [email, setEmail] = useState('');
    const handleInput = (e) =>{
        setEmail(e.target.value);
    }
    const handleSubmit = (e) =>{
        e.preventDefault();
        dispatch(forgotPassword(email));
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
        }
    },[authErrors,message])
    return (
        <div class="sign section--full-bg" data-bg="assets/img/bg.jpg">
            <Toaster position="top-right" reverseOrder={false}/>
            <Helmet>
                <title>FlixTV - forgot password</title>
                <meta name="description" content="FlixTV forgot password" />
            </Helmet>
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <div class="sign__content">
                            {/* <!-- authorization form --> */}
                            <form onSubmit={handleSubmit} class="sign__form">
                                <a href="index.html" class="sign__logo">
                                    <img src="assets/img/logo.svg" alt=""/>
                                </a>

                                <div class="sign__group">
                                    <input type="text" name="email" onChange={handleInput} value={email} class="sign__input" placeholder="Email"/>
                                </div>
                                <button class="sign__btn" type="submit">Send</button>

                                <span class="sign__text">We will send a password to your Email</span>
                            </form>
                            {/* <!-- end authorization form --> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;