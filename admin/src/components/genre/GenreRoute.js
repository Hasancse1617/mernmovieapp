import { useRouteMatch, Switch, Route } from "react-router-dom";
import Genre from "./Genre";

const GenreRoute = () => {
    const { path } = useRouteMatch();
    return (
        <>
            <Switch>
                <Route exact path={`${path}/all`} component={Genre}></Route>
            </Switch>
        </>
    );
}

export default GenreRoute;