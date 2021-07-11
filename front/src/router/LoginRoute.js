import { Route, Switch, useLocation } from "react-router-dom"
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import UserActivation from "../components/auth/UserActivation";
import Router from "./Router";
import RouteLinks from "./RouteLinks";
import ForgotPassword from "../components/auth/ForgotPassword";
import ResetPassword from "../components/auth/ResetPassword";
import loadjs from "loadjs";
import { useEffect } from "react";

const LoginRoute = () => {
    const {pathname} = useLocation();
    useEffect(()=>{
        loadjs('/assets/js/main.js',()=>{});
    },[pathname]);

    return (
        <>
           <Switch>
               <RouteLinks exact path="/login" component={Login} ></RouteLinks>
               <RouteLinks exact path="/register" component={Register} ></RouteLinks>
               <RouteLinks exact path="/user-activation/:token" component={UserActivation} ></RouteLinks>
               <RouteLinks exact path="/forgot-password" component={ForgotPassword} ></RouteLinks>
               <RouteLinks exact path="/reset-password/:token" component={ResetPassword} ></RouteLinks>
               <Route path="/" component={Router} ></Route>
           </Switch>
        </>
    );
}

export default LoginRoute;