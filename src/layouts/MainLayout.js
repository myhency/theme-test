import React from 'react';
import { Menu, Image, Container, Grid, Header } from 'semantic-ui-react';
import { Link, Route, NavLink as RRNavLink, withRouter, Switch, NavLink, Redirect } from "react-router-dom";
import mainRoutes from '../routes/main';
// import logo from '../assets/images/hyundai-autoever-ci.png';
import logo from '../assets/images/logo@2x.png';
import styled from 'styled-components';
const Styles = styled.div`
    .logo {
        width: 97.4px;
        height: 28px;
        object-fit: contain;
    }

    .top-menu-item-text {
        margin: auto;
        color: white;
        width: 74px;
        height: 24px;
        font-size: 16px;
        font-weight: bold;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.5;
        letter-spacing: -0.16px;
        text-align: center;
    }

    .top-menu-logo {
        height: 5.925vh;
    }

    .top-menu-item {
        height: 5.925vh;
        width: 100px;
    }
`

const MainLayout = () => (
    <Styles>
        {/* Top menu bar */}
        <Menu fixed='top' secondary className='top-menu'>
            <Container style={{ width: '75%' }}>
                <NavLink to="/">
                    <Menu.Item className='top-menu-logo'>
                        <Image src={logo} size={'tiny'} />
                    </Menu.Item>
                </NavLink>
                <Menu.Menu position='right'>
                {
                    mainRoutes.filter(route => route.topMenu).map((route, key) => {
                        return (
                            <Link 
                                style={{float:'right'}}
                                to={route.path}
                                tag={RRNavLink}
                                key={key}>
                                <Menu.Item className='top-menu-item'>
                                    <Header as='h6' className='top-menu-item-text'>{route.name}</Header>
                                </Menu.Item>
                            </Link>
                        );
                    })
                }
                </Menu.Menu>
                
            </Container>
        </Menu>
        {/* Contents */}
        <div style={{ marginTop: '10.37vh' }}>
            <Container style={{ width: '75%' }}>
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
            </Container>
        </div>
    </Styles>
);

export default withRouter(MainLayout);
