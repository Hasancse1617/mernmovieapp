import { Route, Switch, useRouteMatch } from "react-router-dom"
import AddInterview from "./AddInterview";
import EditInterview from "./EditInterview";
import Interview from "./Interview";


const InterviewRoute = () => {
    const { path } = useRouteMatch();
    return (
        <>
            <Switch>
                <Route exact path={`${path}/all`} component={Interview}></Route>
                <Route exact path={`${path}/create`} component={AddInterview}></Route>
                <Route exact path={`${path}/edit/:id`} component={EditInterview}></Route>
            </Switch>
        </>
    );
}

export default InterviewRoute;