import { useDispatch, useSelector } from "react-redux";
import { LOGOUT } from "../../store/types/AuthType";
import ProfileContent from "./ProfileContent";
import ProfileFavourite from "./ProfileFavourite";
import ProfileSetting from "./ProfileSetting";
import { NavLink } from 'react-router-dom';

const Profile = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state)=>state.AuthReducer);
    const SingnOut = () =>{
        dispatch({type: LOGOUT});
        localStorage.removeItem('userToken');
    }
    return (
        <> 
           <section class="section section--head">
            <div class="container">
                <div class="row">
                    <div class="col-12 col-xl-6">
                        <h1 class="section__title section__title--head">Profile</h1>
                    </div>

                    <div class="col-12 col-xl-6">
                        <ul class="breadcrumb">
                            <li class="breadcrumb__item"><NavLink to="/">Home</NavLink></li>
                            <li class="breadcrumb__item breadcrumb__item--active">Profile</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
           	{/* <!-- profile --> */}
            <div className="catalog catalog--page">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="profile">
                                <div className="profile__user">
                                    <div className="profile__avatar">
                                        <img src={`http://localhost:5000/images/front_user_images/${user.image}`} alt=""/>
                                    </div>
                                    <div className="profile__meta">
                                        <h3>{user.name}</h3>
                                        <span>FlixTV ID: {user._id}</span>
                                    </div>
                                </div>

                                {/* <!-- tabs nav --> */}
                                <ul className="nav nav-tabs profile__tabs" id="profile__tabs" role="tablist">
                                    <li className="nav-item">
                                        <a className="nav-link active" data-toggle="tab" href="#tab-1" role="tab" aria-controls="tab-1" aria-selected="true">Profile</a>
                                    </li>

                                    <li className="nav-item">
                                        <a className="nav-link" data-toggle="tab" href="#tab-2" role="tab" aria-controls="tab-2" aria-selected="false">Favorites</a>
                                    </li>

                                    <li className="nav-item">
                                        <a className="nav-link" data-toggle="tab" href="#tab-3" role="tab" aria-controls="tab-3" aria-selected="false">Settings</a>
                                    </li>
                                </ul>
                                {/* <!-- end tabs nav --> */}

                                <button onClick={SingnOut} className="profile__logout" type="button">
                                    <span>Sign out</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M4,12a1,1,0,0,0,1,1h7.59l-2.3,2.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0l4-4a1,1,0,0,0,.21-.33,1,1,0,0,0,0-.76,1,1,0,0,0-.21-.33l-4-4a1,1,0,1,0-1.42,1.42L12.59,11H5A1,1,0,0,0,4,12ZM17,2H7A3,3,0,0,0,4,5V8A1,1,0,0,0,6,8V5A1,1,0,0,1,7,4H17a1,1,0,0,1,1,1V19a1,1,0,0,1-1,1H7a1,1,0,0,1-1-1V16a1,1,0,0,0-2,0v3a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V5A3,3,0,0,0,17,2Z"></path></svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container">
                    {/* <!-- content tabs --> */}
                    <div className="tab-content">
                        <ProfileContent/>
                        <ProfileFavourite/>
                        <ProfileSetting/>
                    </div>
                    {/* <!-- end content tabs --> */}
                </div>
            </div>
            {/* <!-- end profile --> */}

            {/* <!-- partners --> */}
            <div className="section">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="partners owl-carousel">
                                <a href="#" className="partners__img">
                                    <img src="img/partners/3docean-light-background.png" alt=""/>
                                </a>

                                <a href="#" className="partners__img">
                                    <img src="img/partners/activeden-light-background.png" alt=""/>
                                </a>

                                <a href="#" className="partners__img">
                                    <img src="img/partners/audiojungle-light-background.png" alt=""/>
                                </a>

                                <a href="#" className="partners__img">
                                    <img src="img/partners/codecanyon-light-background.png" alt=""/>
                                </a>

                                <a href="#" className="partners__img">
                                    <img src="img/partners/photodune-light-background.png" alt=""/>
                                </a>

                                <a href="#" className="partners__img">
                                    <img src="img/partners/themeforest-light-background.png" alt=""/>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- end partners --> */}
        </>
    );
}

export default Profile;