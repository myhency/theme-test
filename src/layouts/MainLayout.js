import React from 'react';
import { Grid, Segment, Menu, Image } from 'semantic-ui-react';
import TopMenuBarView from '../views/TopMenuBarView';
import InstanceHealthCheckView from '../views/InstanceHealthCheckView';
import ApiCallsView from '../views/ApiCallsView';
import ServiceStatusSliderView from '../views/ServiceStatusSliderView';
import ErrorCountingView from '../views/ErrorCountingView';
import { Route, Link, NavLink as RRNavLink, withRouter, Redirect, Switch, NavLink } from "react-router-dom";
import mainRoutes from '../routes/main';
import logo from '../assets/images/hyundai-autoever-ci.png';

const MainLayout = () => (
    <div>
        {/* Top menu bar */}
        <Menu fixed='top' inverted>
            <NavLink to="/" >
                <Menu.Item style={{ height: '5vh' }}>
                    <Image src={logo} size={'tiny'} />
                </Menu.Item>
            </NavLink>
            {mainRoutes.map((route, key) => {
                if (route.topMenu) {
                    return (
                        <NavLink to={route.path}
                            activeStyle={{ background: 'Gray' }}
                            tag={RRNavLink}
                            key={key}>
                            <Menu.Item style={{ height: '5vh' }}>
                                <h4>{route.name}</h4>
                            </Menu.Item>
                        </NavLink>
                    );
                }
            })}
            <Menu.Item position='right' style={{ height: '5vh' }}>
                <h4>Avatar</h4>
            </Menu.Item>
        </Menu>

        {/* Contents */}
        <Switch>
            {mainRoutes.map((route, key) => {
                if (route.subRoutes) {
                    let subRoutes = [];
                    route.subRoutes.map((subRoute, subKey) => {
                        subRoutes.push(
                            <Route path={subRoute.path} component={subRoute.component} key={subKey} />
                        )
                        return null;
                    });
                    return subRoutes;
                } else {
                    return (
                        <Route path={route.path} component={route.component} key={key} />
                    )
                }
            })}
            {/* <Redirect to="/home/overview" /> */}
        </Switch>
    </div >
);

export default MainLayout;
