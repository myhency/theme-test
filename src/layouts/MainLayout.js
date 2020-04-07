import React from 'react';
import { Menu, Image } from 'semantic-ui-react';
import { Route, NavLink as RRNavLink, withRouter, Switch, NavLink, Redirect } from "react-router-dom";
import mainRoutes from '../routes/main';
// import logo from '../assets/images/hyundai-autoever-ci.png';
import logo from '../assets/images/logo@3x.png';


const MainLayout = () => (
    <div>
        {/* Top menu bar */}
        <Menu fixed='top' inverted >
            <NavLink to="/" style={{ width: '75%!important' }}>
                <Menu.Item style={{ height: '64px' }}>
                    <Image src={logo} size={'tiny'} />
                </Menu.Item>
            </NavLink>
            {
                mainRoutes.filter(route => route.topMenu).map((route, key) => {
                    return (
                        <NavLink to={route.path}
                            activeStyle={{ background: 'Gray' }}
                            tag={RRNavLink}
                            key={key}>
                            <Menu.Item style={{ height: '5vh', width: '100px' }}>
                                <h4 style={{ margin: 'auto' }}>{route.name}</h4>
                            </Menu.Item>
                        </NavLink>
                    );

                })
            }
        </Menu>
        {/* Contents */}
        <div style={{ marginTop: '5em' }}>
            <Switch>
                {mainRoutes.map((route, key) => {
                    if (route.subRoutes) {
                        let subRoutes = [];
                        route.subRoutes.map((subRoute, subKey) => {
                            subRoutes.push(
                                <Route
                                    path={subRoute.path}
                                    component={subRoute.component}
                                    key={subKey} />
                            )
                            return null;
                        });
                        return subRoutes;
                    } else {
                        return (
                            <Route
                                exact
                                path={route.path}
                                component={route.component}
                                key={key} />
                        )
                    }
                })}
                <Redirect to="/overview" />
            </Switch>
        </div>
    </div >
);

export default withRouter(MainLayout);
