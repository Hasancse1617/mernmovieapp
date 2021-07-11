import { Route, Switch, useRouteMatch } from "react-router-dom"
import AddVideo from "./AddVideo";
import EditVideo from "./EditVideo";
import Video from "./Video";
import ViewVideo from "./ViewVideo";


const VideoRoute = () => {
    const { path } = useRouteMatch();
    return (
        <>
            <Switch>
                <Route exact path={`${path}/all`} component={Video}></Route>
                <Route exact path={`${path}/create`} component={AddVideo}></Route>
                <Route exact path={`${path}/edit/:id`} component={EditVideo}></Route>
                <Route exact path={`${path}/details/:id`} component={ViewVideo}></Route>
            </Switch>
        </>
    );
}

export default VideoRoute;