import React from 'react'
import ReactPlayer from 'react-player'
import Moment from 'react-moment';
import { NavLink, useLocation } from 'react-router-dom'
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchInterview, fetchNew } from "../../store/actions/InterviewAction";

const Interview = (props) => {
    const id = props.match.params.id;
    const dispatch = useDispatch();
    const location = useLocation();
    console.log(location.pathname)
    const { interview, newInterviews } = useSelector((state)=>state.InterviewReducer);
    useEffect(()=>{
        dispatch(fetchInterview(id));
        dispatch(fetchNew(id));
    },[location.pathname]);
    return (
        <section className="section section--head section--head-fixed section--gradient section--details">
            <div className="container">
                {/* <!-- article --> */}
                <div className="article">
                    <div className="row">
                        <div className="col-12 col-xl-8">
                            {/* <!-- article content --> */}
                            <div className="article__content">
                                <a href="category.html" className="article__category">Documentary</a>

                                <span className="article__date"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12,2A10,10,0,1,0,22,12,10.01114,10.01114,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8.00917,8.00917,0,0,1,12,20ZM14.09814,9.63379,13,10.26807V7a1,1,0,0,0-2,0v5a1.00025,1.00025,0,0,0,1.5.86621l2.59814-1.5a1.00016,1.00016,0,1,0-1-1.73242Z"/></svg><Moment format="DD.MM.YYYY, HH.mm">{ interview.createdAt }</Moment></span>

                                <h1>{ interview.title }</h1>

                                <ReactPlayer controls url={`http://localhost:5000/videos/interview/${interview.video}`} />

                                <p>{ interview.description }</p>
                            </div>
                            {/* <!-- end article content --> */}

                            {/* <!-- share --> */}
                            <div className="share">
                                <a href="#" className="share__link share__link--fb"><svg width="9" height="17" viewBox="0 0 9 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.56341 16.8197V8.65888H7.81615L8.11468 5.84663H5.56341L5.56724 4.43907C5.56724 3.70559 5.63693 3.31257 6.69042 3.31257H8.09873V0.5H5.84568C3.1394 0.5 2.18686 1.86425 2.18686 4.15848V5.84695H0.499939V8.6592H2.18686V16.8197H5.56341Z"/></svg> share</a>
                                <a href="#" className="share__link share__link--tw"><svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.55075 3.19219L7.58223 3.71122L7.05762 3.64767C5.14804 3.40404 3.47978 2.57782 2.06334 1.1902L1.37085 0.501686L1.19248 1.01013C0.814766 2.14353 1.05609 3.34048 1.843 4.14552C2.26269 4.5904 2.16826 4.65396 1.4443 4.38914C1.19248 4.3044 0.972149 4.24085 0.951164 4.27263C0.877719 4.34677 1.12953 5.31069 1.32888 5.69202C1.60168 6.22165 2.15777 6.74068 2.76631 7.04787L3.28043 7.2915L2.67188 7.30209C2.08432 7.30209 2.06334 7.31268 2.12629 7.53512C2.33613 8.22364 3.16502 8.95452 4.08833 9.2723L4.73884 9.49474L4.17227 9.8337C3.33289 10.321 2.34663 10.5964 1.36036 10.6175C0.888211 10.6281 0.5 10.6705 0.5 10.7023C0.5 10.8082 1.78005 11.4014 2.52499 11.6344C4.75983 12.3229 7.41435 12.0264 9.40787 10.8506C10.8243 10.0138 12.2408 8.35075 12.9018 6.74068C13.2585 5.88269 13.6152 4.315 13.6152 3.56293C13.6152 3.07567 13.6467 3.01212 14.2343 2.42953C14.5805 2.09056 14.9058 1.71983 14.9687 1.6139C15.0737 1.41264 15.0632 1.41264 14.5281 1.59272C13.6362 1.91049 13.5103 1.86812 13.951 1.39146C14.2762 1.0525 14.6645 0.438131 14.6645 0.258058C14.6645 0.22628 14.5071 0.279243 14.3287 0.374576C14.1398 0.480501 13.7202 0.639389 13.4054 0.734722L12.8388 0.914795L12.3247 0.565241C12.0414 0.374576 11.6427 0.162725 11.4329 0.0991699C10.8978 -0.0491255 10.0794 -0.0279404 9.59673 0.14154C8.2852 0.618204 7.45632 1.84694 7.55075 3.19219Z"/></svg> tweet</a>
                                <a href="#" className="share__link share__link--vk"><svg width="16" height="9" viewBox="0 0 16 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.78479 8.92255C8.78479 8.92255 9.07355 8.89106 9.22145 8.73512C9.35684 8.59224 9.35214 8.32262 9.35214 8.32262C9.35214 8.32262 9.33414 7.06361 9.92967 6.87771C10.5166 6.69489 11.2702 8.09524 12.07 8.63372C12.6741 9.04085 13.1327 8.95174 13.1327 8.95174L15.2699 8.92255C15.2699 8.92255 16.3874 8.85495 15.8576 7.99231C15.8137 7.92164 15.5485 7.35397 14.269 6.1879C12.9284 4.9673 13.1084 5.16472 14.7221 3.05305C15.705 1.76715 16.0978 0.982093 15.975 0.646407C15.8584 0.325317 15.1353 0.410582 15.1353 0.410582L12.7297 0.425177C12.7297 0.425177 12.5513 0.401365 12.419 0.478949C12.2899 0.554996 12.2061 0.732441 12.2061 0.732441C12.2061 0.732441 11.8258 1.72721 11.3179 2.57372C10.2466 4.35892 9.81855 4.4534 9.64326 4.34279C9.23554 4.08392 9.33727 3.30424 9.33727 2.75039C9.33727 1.01973 9.60491 0.298431 8.81687 0.111769C8.5555 0.0495478 8.36299 0.00883541 7.6939 0.00192196C6.83543 -0.00652779 6.10921 0.00499461 5.69758 0.202411C5.42369 0.333767 5.2124 0.627203 5.34152 0.644103C5.50038 0.664843 5.86036 0.739354 6.0513 0.994383C6.29781 1.32392 6.2892 2.06289 6.2892 2.06289C6.2892 2.06289 6.43084 4.10005 5.95818 4.35277C5.6342 4.52638 5.1897 4.17226 4.2342 2.55221C3.7451 1.7226 3.37573 0.805416 3.37573 0.805416C3.37573 0.805416 3.30451 0.634117 3.17696 0.541938C3.02279 0.430555 2.80759 0.395987 2.80759 0.395987L0.521729 0.410582C0.521729 0.410582 0.178185 0.4198 0.0521924 0.566519C-0.0597138 0.696338 0.0435842 0.965961 0.0435842 0.965961C0.0435842 0.965961 1.8333 5.07638 3.86013 7.1481C5.71871 9.04699 7.8285 8.92255 7.8285 8.92255H8.78479Z"/></svg> share</a>
                            </div>
                            {/* <!-- end share --> */}

                            {/* <!-- comments --> */}
                            <div className="comments">
                                <div className="comments__title">
                                    <h4>Comments</h4>
                                    <span>5</span>
                                </div>

                                <ul className="comments__list">
                                    <li className="comments__item">
                                        <div className="comments__autor">
                                            <img className="comments__avatar" src="img/avatar.svg" alt=""/>
                                            <span className="comments__name">John Doe</span>
                                            <span className="comments__time">30.08.2021, 17:53</span>
                                        </div>
                                        <p className="comments__text">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text.</p>
                                        <div className="comments__actions">
                                            <div className="comments__rate">
                                                <button type="button"><svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11 7.3273V14.6537" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M14.6667 10.9905H7.33333" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M15.6857 1H6.31429C3.04762 1 1 3.31208 1 6.58516V15.4148C1 18.6879 3.0381 21 6.31429 21H15.6857C18.9619 21 21 18.6879 21 15.4148V6.58516C21 3.31208 18.9619 1 15.6857 1Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg> 12</button>

                                                <button type="button">7 <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.6667 10.9905H7.33333" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M15.6857 1H6.31429C3.04762 1 1 3.31208 1 6.58516V15.4148C1 18.6879 3.0381 21 6.31429 21H15.6857C18.9619 21 21 18.6879 21 15.4148V6.58516C21 3.31208 18.9619 1 15.6857 1Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg></button>
                                            </div>

                                            <button type="button"><svg xmlns='http://www.w3.org/2000/svg' width='512' height='512' viewBox='0 0 512 512'><polyline points='400 160 464 224 400 288' style={{fill:'none',strokeLinecap:'round',strokeLinejoin:'round',strokeWidth:32+'px'}}/><path d='M448,224H154C95.24,224,48,273.33,48,332v20' style={{fill:'none',strokeLinecap:'round',strokeLinejoin:'round',strokeWidth:32+'px'}}/></svg><span>Reply</span></button>
                                        </div>
                                    </li>

                                    <li className="comments__item comments__item--answer">
                                        <div className="comments__autor">
                                            <img className="comments__avatar" src="img/avatar.svg" alt=""/>
                                            <span className="comments__name">John Doe</span>
                                            <span className="comments__time">24.08.2021, 16:41</span>
                                        </div>
                                        <p className="comments__text">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                                        <div className="comments__actions">
                                            <div className="comments__rate">
                                                <button type="button"><svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11 7.3273V14.6537" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M14.6667 10.9905H7.33333" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M15.6857 1H6.31429C3.04762 1 1 3.31208 1 6.58516V15.4148C1 18.6879 3.0381 21 6.31429 21H15.6857C18.9619 21 21 18.6879 21 15.4148V6.58516C21 3.31208 18.9619 1 15.6857 1Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg> 10</button>

                                                <button type="button">0 <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.6667 10.9905H7.33333" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M15.6857 1H6.31429C3.04762 1 1 3.31208 1 6.58516V15.4148C1 18.6879 3.0381 21 6.31429 21H15.6857C18.9619 21 21 18.6879 21 15.4148V6.58516C21 3.31208 18.9619 1 15.6857 1Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg></button>
                                            </div>

                                            <button type="button"><svg xmlns='http://www.w3.org/2000/svg' width='512' height='512' viewBox='0 0 512 512'><polyline points='400 160 464 224 400 288' style={{fill:'none',strokeLinecap:'round',strokeLinejoin:'round',strokeWidth:32+'px'}}/><path d='M448,224H154C95.24,224,48,273.33,48,332v20' style={{fill:'none',strokeLinecap:'round',strokeLinejoin:'round',strokeWidth:32+'px'}}/></svg><span>Reply</span></button>
                                        </div>
                                    </li>

                                    <li className="comments__item comments__item--quote">
                                        <div className="comments__autor">
                                            <img className="comments__avatar" src="img/avatar.svg" alt=""/>
                                            <span className="comments__name">John Doe</span>
                                            <span className="comments__time">11.08.2021, 11:11</span>
                                        </div>
                                        <p className="comments__text"><span>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.</span>It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                                        <div className="comments__actions">
                                            <div className="comments__rate">
                                                <button type="button"><svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11 7.3273V14.6537" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M14.6667 10.9905H7.33333" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M15.6857 1H6.31429C3.04762 1 1 3.31208 1 6.58516V15.4148C1 18.6879 3.0381 21 6.31429 21H15.6857C18.9619 21 21 18.6879 21 15.4148V6.58516C21 3.31208 18.9619 1 15.6857 1Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg> 9</button>

                                                <button type="button">2 <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.6667 10.9905H7.33333" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M15.6857 1H6.31429C3.04762 1 1 3.31208 1 6.58516V15.4148C1 18.6879 3.0381 21 6.31429 21H15.6857C18.9619 21 21 18.6879 21 15.4148V6.58516C21 3.31208 18.9619 1 15.6857 1Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg></button>
                                            </div>

                                            <button type="button"><svg xmlns='http://www.w3.org/2000/svg' width='512' height='512' viewBox='0 0 512 512'><polyline points='400 160 464 224 400 288' style={{fill:'none',strokeLinecap:'round',strokeLinejoin:'round',strokeWidth:32+'px'}}/><path d='M448,224H154C95.24,224,48,273.33,48,332v20' style={{fill:'none',strokeLinecap:'round',strokeLinejoin:'round',strokeWidth:32+'px'}}/></svg><span>Reply</span></button>
                                        </div>
                                    </li>

                                    <li className="comments__item">
                                        <div className="comments__autor">
                                            <img className="comments__avatar" src="img/avatar.svg" alt=""/>
                                            <span className="comments__name">John Doe</span>
                                            <span className="comments__time">07.08.2021, 14:33</span>
                                        </div>
                                        <p className="comments__text">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text.</p>
                                        <div className="comments__actions">
                                            <div className="comments__rate">
                                                <button type="button"><svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11 7.3273V14.6537" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M14.6667 10.9905H7.33333" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M15.6857 1H6.31429C3.04762 1 1 3.31208 1 6.58516V15.4148C1 18.6879 3.0381 21 6.31429 21H15.6857C18.9619 21 21 18.6879 21 15.4148V6.58516C21 3.31208 18.9619 1 15.6857 1Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg> 7</button>

                                                <button type="button">4 <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.6667 10.9905H7.33333" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M15.6857 1H6.31429C3.04762 1 1 3.31208 1 6.58516V15.4148C1 18.6879 3.0381 21 6.31429 21H15.6857C18.9619 21 21 18.6879 21 15.4148V6.58516C21 3.31208 18.9619 1 15.6857 1Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg></button>
                                            </div>

                                            <button type="button"><svg xmlns='http://www.w3.org/2000/svg' width='512' height='512' viewBox='0 0 512 512'><polyline points='400 160 464 224 400 288' style={{fill:'none',strokeLinecap:'round',strokeLinejoin:'round',strokeWidth:32+'px'}}/><path d='M448,224H154C95.24,224,48,273.33,48,332v20' style={{fill:'none',strokeLinecap:'round',strokeLinejoin:'round',strokeWidth:32+'px'}}/></svg><span>Reply</span></button>
                                        </div>
                                    </li>

                                    <li className="comments__item">
                                        <div className="comments__autor">
                                            <img className="comments__avatar" src="img/avatar.svg" alt=""/>
                                            <span className="comments__name">John Doe</span>
                                            <span className="comments__time">02.08.2021, 15:24</span>
                                        </div>
                                        <p className="comments__text">Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>
                                        <div className="comments__actions">
                                            <div className="comments__rate">
                                                <button type="button"><svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11 7.3273V14.6537" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M14.6667 10.9905H7.33333" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M15.6857 1H6.31429C3.04762 1 1 3.31208 1 6.58516V15.4148C1 18.6879 3.0381 21 6.31429 21H15.6857C18.9619 21 21 18.6879 21 15.4148V6.58516C21 3.31208 18.9619 1 15.6857 1Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg> 2</button>

                                                <button type="button">17 <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.6667 10.9905H7.33333" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M15.6857 1H6.31429C3.04762 1 1 3.31208 1 6.58516V15.4148C1 18.6879 3.0381 21 6.31429 21H15.6857C18.9619 21 21 18.6879 21 15.4148V6.58516C21 3.31208 18.9619 1 15.6857 1Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg></button>
                                            </div>

                                            <button type="button"><svg xmlns='http://www.w3.org/2000/svg' width='512' height='512' viewBox='0 0 512 512'><polyline points='400 160 464 224 400 288' style={{fill:'none',strokeLinecap:'round',strokeLinejoin:'round',strokeWidth:32+'px'}}/><path d='M448,224H154C95.24,224,48,273.33,48,332v20' style={{fill:'none',strokeLinecap:'round',strokeLinejoin:'round',strokeWidth:32+'px'}}/></svg><span>Reply</span></button>
                                        </div>
                                    </li>
                                </ul>

                                <div className="catalog__paginator-wrap catalog__paginator-wrap--comments">
                                    <span className="catalog__pages">5 from 16</span>

                                    <ul className="catalog__paginator">
                                        <li>
                                            <a href="#">
                                                <svg width="14" height="11" viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.75 5.36475L13.1992 5.36475" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/><path d="M5.771 10.1271L0.749878 5.36496L5.771 0.602051" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                                            </a>
                                        </li>
                                        <li className="active"><a href="#">1</a></li>
                                        <li><a href="#">2</a></li>
                                        <li><a href="#">3</a></li>
                                        <li><a href="#">4</a></li>
                                        <li>
                                            <a href="#">
                                                <svg width="14" height="11" viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.1992 5.3645L0.75 5.3645" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/><path d="M8.17822 0.602051L13.1993 5.36417L8.17822 10.1271" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                                            </a>
                                        </li>
                                    </ul>
                                </div>

                                <form action="#" className="comments__form">
                                    <div className="sign__group">
                                        <textarea id="text" name="text" className="sign__textarea" placeholder="Add comment"></textarea>
                                    </div>
                                    <button type="button" className="sign__btn">Send</button>
                                </form>
                            </div>
                            {/* <!-- end comments --> */}
                        </div>

                        <div className="col-12 col-xl-4">
                            <div className="sidebar">
                                <div className="row">
                                    <div className="col-12">
                                        {/* <!-- subscribe --> */}
                                        <form action="#" className="subscribe">
                                            <div className="subscribe__img">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M13.64,9.74l-.29,1.73A1.55,1.55,0,0,0,14,13a1.46,1.46,0,0,0,1.58.09L17,12.28l1.44.79A1.46,1.46,0,0,0,20,13a1.55,1.55,0,0,0,.63-1.51l-.29-1.73,1.2-1.22a1.54,1.54,0,0,0-.85-2.6l-1.62-.24-.73-1.55a1.5,1.5,0,0,0-2.72,0l-.73,1.55-1.62.24a1.54,1.54,0,0,0-.85,2.6Zm1.83-2.13a1.51,1.51,0,0,0,1.14-.85L17,5.93l.39.83a1.55,1.55,0,0,0,1.14.86l1,.14-.73.74a1.57,1.57,0,0,0-.42,1.34l.16,1-.79-.43a1.48,1.48,0,0,0-1.44,0l-.79.43.16-1a1.54,1.54,0,0,0-.42-1.33l-.73-.75ZM21,15.26a1,1,0,0,0-1,1v3a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V9.67l5.88,5.88a2.94,2.94,0,0,0,2.1.88l.27,0a1,1,0,0,0,.91-1.08,1,1,0,0,0-1.09-.91.94.94,0,0,1-.77-.28L5.41,8.26H9a1,1,0,0,0,0-2H5a3,3,0,0,0-3,3v10a3,3,0,0,0,3,3H19a3,3,0,0,0,3-3v-3A1,1,0,0,0,21,15.26Z"></path></svg>
                                            </div>
                                            <h4 className="subscribe__title">Subscribe to news</h4>
                                            <p className="subscribe__text">All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary.</p>
                                            <div className="sign__group">
                                                <input type="text" className="sign__input" placeholder="Email"/>
                                            </div>
                                            <button type="button" className="sign__btn">Send</button>
                                        </form>
                                        {/* <!-- end subscribe --> */}
                                    </div>
                                </div>

                                {/* <!-- new items --> */}
                                <div className="row">
                                    <div className="col-12">
                                        <h5 className="sidebar__title">New Interviews</h5>
                                    </div>
                                   {
                                       newInterviews?
                                       newInterviews.map((newinterview)=>(
                                            <div key={newinterview._id} className="col-12 col-md-6 col-lg-4 col-xl-12">
                                                <div className="interview">
                                                    <NavLink to={`/interview/${newinterview._id}`} className="interview__cover">
                                                    <img src={`http://localhost:5000/images/interview/${newinterview.thumbnail}`} alt=""/>
                                                        <span>
                                                            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M11 1C16.5228 1 21 5.47716 21 11C21 16.5228 16.5228 21 11 21C5.47716 21 1 16.5228 1 11C1 5.47716 5.47716 1 11 1Z" stroke-linecap="round" stroke-linejoin="round"/><path fill-rule="evenodd" clip-rule="evenodd" d="M14.0501 11.4669C13.3211 12.2529 11.3371 13.5829 10.3221 14.0099C10.1601 14.0779 9.74711 14.2219 9.65811 14.2239C9.46911 14.2299 9.28711 14.1239 9.19911 13.9539C9.16511 13.8879 9.06511 13.4569 9.03311 13.2649C8.93811 12.6809 8.88911 11.7739 8.89011 10.8619C8.88911 9.90489 8.94211 8.95489 9.04811 8.37689C9.07611 8.22089 9.15811 7.86189 9.18211 7.80389C9.22711 7.69589 9.30911 7.61089 9.40811 7.55789C9.48411 7.51689 9.57111 7.49489 9.65811 7.49789C9.74711 7.49989 10.1091 7.62689 10.2331 7.67589C11.2111 8.05589 13.2801 9.43389 14.0401 10.2439C14.1081 10.3169 14.2951 10.5129 14.3261 10.5529C14.3971 10.6429 14.4321 10.7519 14.4321 10.8619C14.4321 10.9639 14.4011 11.0679 14.3371 11.1549C14.3041 11.1999 14.1131 11.3999 14.0501 11.4669Z" stroke-linecap="round" stroke-linejoin="round"/></svg> {newinterview.video}
                                                        </span>
                                                    </NavLink>
                                                    <h3 className="interview__title"><NavLink to={`/interview/${newinterview._id}`}>{ newinterview.title }</NavLink></h3>
                                                </div>
                                            </div>
                                       ))
                                        
                                       :''
                                   }
                                </div>
                                {/* <!-- end new items --> */}
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- end article --> */}
            </div>
        </section>
    );
}

export default Interview;