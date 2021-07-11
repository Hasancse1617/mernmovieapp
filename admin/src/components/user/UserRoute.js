import { Route, Switch, useRouteMatch } from "react-router-dom"
import AddUser from "./AddUser";
import AllUser from "./AllUser";
import DemoChat from "./DemoChat";
import UpdatePassword from "./UpdatePassword";
import UpdateProfile from "./UpdateProfile";


const UserRoute = ({socket}) => {
    const { path } = useRouteMatch();
    return (
        <>
            <Switch>
                <Route exact path={`${path}/all`} component={AllUser}></Route>
                <Route exact path={`${path}/create`} component={AddUser}></Route>
                <Route exact path={`${path}/update-profile/:id`} component={UpdateProfile}></Route>
                <Route exact path={`${path}/update-password/:id`} component={UpdatePassword}></Route>
                <Route exact path={`${path}/send-message/:id`} render={()=><DemoChat socket={socket}/>}></Route>
            </Switch>
        </>
    );
}

export default UserRoute;