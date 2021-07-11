import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Route, Switch, Redirect } from "react-router";
import ForgotPassword from "../components/auth/ForgotPassword";
import Login from "../components/auth/Login";
import ResetPassword from "../components/auth/ResetPassword";
import DashboardRoute from "./DashboardRoute";
import PrivateRoute from "./PrivateRoute";
import RouteLink from "./RouteLink";
import io from "socket.io-client";
import Swal from 'sweetalert2'

const Router = () => {
    const { user } = useSelector((state)=>state.AuthReducer);
    const [socket, setSocket] = useState(null);
    const setupSocket = () =>{
        const token = localStorage.getItem('myToken');
        if(token && !socket){
            const newSocket = io("http://localhost:5000",{
                query:{
                    token: localStorage.getItem('myToken')
                }
            });
            newSocket.on("disconnect", ()=>{
                setSocket(null);
                // setTimeout(setupSocket, 3000);
            //     Swal.fire({
            //       position: 'top-end',
            //       icon: 'success',
            //       title: 'Connection Fail',
            //       toast: true,
            //       showConfirmButton: false,
            //       timer: 2000
            //   })
            });
            newSocket.on("connect",()=>{
                // Swal.fire({
                //     position: 'top-end',
                //     icon: 'success',
                //     title: 'Connection Success',
                //     toast: true,
                //     showConfirmButton: false,
                //     timer: 2000
                // })
            });
            
            setSocket(newSocket);
        }
    }
    useEffect(()=>{
        setupSocket();
    },[socket]);
    return (
        <>
           <Switch>
                <Route exact path="/" 
                        render={()=>{
                            return (
                                user? <Redirect to="/admin/dashboard" /> : <Redirect to="/admin/login" />
                            )
                        }}>
                </Route>
               <RouteLink exact path="/admin/login" render={()=><Login setupSocket={setupSocket} />}></RouteLink>
               <RouteLink exact path="/admin/forgot-password" component={ForgotPassword}></RouteLink>
               <RouteLink exact path="/admin/reset-password/:token" component={ResetPassword}></RouteLink>
               <PrivateRoute path="/admin" render={()=><DashboardRoute socket={socket}/>}></PrivateRoute>
           </Switch>
        </>
    );
}

export default Router;