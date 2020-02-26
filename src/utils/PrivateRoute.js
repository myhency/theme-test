import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({ mainPath, authPath, component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        localStorage.getItem('userId')
            ? <Redirect to={{ pathname: '/main/home' }} />
            : <Redirect to={{ pathname: '/auth/signIn', state: { from: props.location } }} />
    )} />
)