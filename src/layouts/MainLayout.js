import React from 'react';
import { Menu, Image } from 'semantic-ui-react';
import { Route, NavLink as RRNavLink, withRouter, Switch, NavLink } from "react-router-dom";
import mainRoutes from '../routes/main';
import logo from '../assets/images/hyundai-autoever-ci.png';

const MainLayout = () => (
    <div>
        {/* Top menu bar */}
        <Menu fixed='top' inverted>
            <NavLink to="/home" >
                <Menu.Item style={{ height: '5vh' }}>
                    <Image src={logo} size={'tiny'} />
                    {/* <div style={{ 
                        display: 'block', 
                        marginLeft: 'auto', 
                        marginRight: 'auto' }}>
                            <img src={logo} style={{ width: '60%'}}/>
                    </div> */}
                </Menu.Item>
            </NavLink>
            {mainRoutes.map((route, key) => {
                if (route.topMenu) {
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
                }
            })}
            <Menu.Item position='right' style={{ height: '5vh' }}>
                <h4>Avatar</h4>
            </Menu.Item>
        </Menu>

        {/* Contents */}
        <div style={{ marginTop: '5em' }}>
            <Switch>
                {mainRoutes.map((route, key) => {
                    if (route.subRoutes) {
                        let subRoutes = [];
                        route.subRoutes.map((subRoute, subKey) => {
                            console.log(subRoute.path);
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
                {/* <Redirect to="/home/overview" /> */}
            </Switch>
        </div>
    </div >
);

export default withRouter(MainLayout);
