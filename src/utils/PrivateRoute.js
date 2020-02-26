import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ mainPath, authPath, component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        localStorage.getItem('userId')
            ? <Redirect to={{ pathname: mainPath }} />
            : <Redirect to={{ pathname: authPath, state: { from: props.location } }} />
    )} />
)

export default PrivateRoute;