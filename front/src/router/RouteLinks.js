import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const RouteLinks = (props) => {
    const {user} = useSelector((state)=>state.AuthReducer);
    return user?( <Redirect to="/" />) : (<Route path={props.path}  component={props.component} />);
}

export default RouteLinks;