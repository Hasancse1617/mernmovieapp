import { Route, Switch, useRouteMatch } from "react-router-dom"
import Home from "../components/home/Home";
import Header from "../components/layouts/Header";
import Footer from "../components/layouts/Footer";
import PrivateRoute from "./PrivateRoute";
import Profile from "../components/profile/Profile";
import Movie from "../components/movie/Movie";
import Interview from "../components/interview/Interview";

const Router = () => {
    const { path } = useRouteMatch();
    return (
        <>
           <Header></Header>
           <Switch>
               <Route exact path={`${path}`} component={Home} ></Route>
               <PrivateRoute exact path={`${path}profile`} component={Profile} ></PrivateRoute>
               <PrivateRoute exact path={`${path}video/:id`} component={Movie} ></PrivateRoute>
               <Route exact path={`${path}interview/:id`} component={Interview} ></Route>
           </Switch>
           <Footer></Footer>
        </>
    );
}

export default Router;