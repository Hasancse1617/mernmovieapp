import { useRouteMatch, Switch, Route } from "react-router-dom";
import Category from "./Category";

const CategoryRoute = () => {
    const { path } = useRouteMatch();
    return (
        <>
            <Switch>
                <Route exact path={`${path}/all`} component={Category}></Route>
            </Switch>
        </>
    );
}

export default CategoryRoute;