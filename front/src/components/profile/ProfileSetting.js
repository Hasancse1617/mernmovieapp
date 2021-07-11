import { useEffect, useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import Swal  from 'sweetalert2';
import { useDispatch, useSelector } from "react-redux";
import { passwordUpdate, profileUpdate } from "../../store/actions/ProfileAction";
import { REMOVE_PROFILE_ERRORS, REMOVE_PROFILE_MESSAGE } from "../../store/types/ProfileType";
import MiniLoader from "../loader/MiniLoader";

const ProfileSetting = () => {
    const dispatch = useDispatch();
    const { user:{_id,name,email,image} } = useSelector((state)=>state.AuthReducer);
    const {loading, profileErrors, message, passwordLoading} = useSelector((state)=>state.ProfileReducer);
    const [user, setUser] = useState(name);
    const [userImage, setUserImage] = useState('');
    const [preview, setPreview] = useState(`http://localhost:5000/images/front_user_images/${image}`);
    const [state, setState] = useState({
        o_password: '',
        n_password: '',
        c_password: ''
    });
    const handleInput = (e) =>{
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    }
    const handleImage = (e) =>{
        if(e.target.files.length !== 0){
            const reader = new FileReader();
            setUserImage(e.target.files[0]);
            reader.onloadend = () =>{
                setPreview(reader.result);
            }
            reader.readAsDataURL(e.target.files[0]);
        }
    }
    const updateProfile = (e) =>{
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', user);
        formData.append('image', userImage);
        dispatch(profileUpdate(_id,formData));
    }
    const updatePassword = (e) =>{
        e.preventDefault();
        dispatch(passwordUpdate(_id, state));
    }
    useEffect(()=>{
        if(profileErrors.length > 0){
            profileErrors.map((error)=>{
                toast.error(error.msg);
            });
          dispatch({type: REMOVE_PROFILE_ERRORS});
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
            dispatch({type: REMOVE_PROFILE_MESSAGE});
            setState({
                o_password:'',
                n_password:'',
                c_password:''
            });
        }
    },[profileErrors,message]);
    return (
        <div className="tab-pane fade" id="tab-3" role="tabpanel">
            <Toaster position="top-right" reverseOrder={false}/>
            <div className="row">
                <div className="col-12">
                    <div className="sign__wrap">
                        <div className="row">
                            {/* <!-- details form --> */}
                            <div className="col-12 col-lg-6">
                                {!loading?
                                <form onSubmit={updateProfile} class="sign__form sign__form--profile sign__form--first">
                                    <div class="row">
                                        <div class="col-12">
                                            <h4 class="sign__title">Profile details</h4>
                                        </div>

                                        <div class="col-12 col-md-6 col-lg-12 col-xl-6">
                                            <div class="sign__group">
                                                <label class="sign__label" for="username">Login</label>
                                                <input id="name" type="text" name="name" class="sign__input" value={user} onChange={(e)=>setUser(e.target.value)} />
                                            </div>
                                        </div>

                                        <div class="col-12 col-md-6 col-lg-12 col-xl-6">
                                            <div class="sign__group">
                                                <label class="sign__label" for="email">Email</label>
                                                <input id="email" type="text" name="email" class="sign__input" value={email} readOnly />
                                            </div>
                                        </div>

                                        <div class="col-12 col-md-6 col-lg-12 col-xl-6">
                                            <div class="sign__group">
                                                <label class="sign__label" for="firstname">Image</label>
                                                <input id="image" type="file" name="image" class="sign__input" onChange={handleImage} />
                                            </div>
                                        </div>
                                        {preview?
                                        <div class="col-12 col-md-6 col-lg-12 col-xl-6">
                                            <div class="sign__group">
                                                <img src={preview} width={100} height={100} ></img>
                                            </div>
                                        </div>:''}
                                         
                                        <div class="col-12">
                                            <button class="sign__btn" type="submit">Save</button>
                                        </div>
                                    </div>
                                </form>:<MiniLoader/>}
                            </div>
                            {/* <!-- end details form --> */}

                            {/* <!-- password form --> */}
                            <div className="col-12 col-lg-6">
                                {!passwordLoading?
                                <form onSubmit={updatePassword} className="sign__form sign__form--profile">
                                    <div className="row">
                                        <div className="col-12">
                                            <h4 className="sign__title">Change password</h4>
                                        </div>

                                        <div className="col-12 col-md-12 col-lg-12 col-xl-12">
                                            <div className="sign__group">
                                                <label className="sign__label" for="o_password">Old password</label>
                                                <input id="oldpass" type="password" name="o_password" value={state.o_password} onChange={handleInput} className="sign__input"/>
                                            </div>
                                        </div>

                                        <div className="col-12 col-md-6 col-lg-12 col-xl-6">
                                            <div className="sign__group">
                                                <label className="sign__label" for="n_password">New password</label>
                                                <input id="newpass" type="password" name="n_password" value={state.n_password} onChange={handleInput} className="sign__input"/>
                                            </div>
                                        </div>

                                        <div className="col-12 col-md-6 col-lg-12 col-xl-6">
                                            <div className="sign__group">
                                                <label className="sign__label" for="c_password">Confirm new password</label>
                                                <input id="confirmpass" type="password" name="c_password" value={state.c_password} onChange={handleInput} className="sign__input"/>
                                            </div>
                                        </div>

                                        <div className="col-12">
                                            <button className="sign__btn" type="submit">Change</button>
                                        </div>
                                    </div>
                                </form>:<MiniLoader/>}
                            </div>
                            {/* <!-- end password form --> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileSetting;