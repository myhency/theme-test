import React, { Component } from 'react';
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
        padding-right: 0px!important;
        margin-right: 0px!important;
    }
`
class MainLayout extends Component {
    constructor(props) {
        super(props);

        console.log(props.location.pathname)

        

        this.state = {
            activeItem: ''
        }
    }

    handleOnClickMenuItem = (event, { name }) => {
        console.log(name)
        this.setState({
            activeItem: name
        })
    }

    render() {
        const { activeItem } = this.state;

        return (
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
                                    let color = activeItem === route.name || this.props.location.pathname.includes(route.name.toLowerCase()) ? 'white' : '#8391a5';
                                    console.log(activeItem)
                                    console.log(color)
                                    return (
                                        <Link
                                            style={{ float: 'right' }}
                                            to={route.path}
                                            tag={RRNavLink}
                                            key={key}>
                                            <Menu.Item
                                                name={route.name}
                                                className='top-menu-item'
                                                active={activeItem === route.name}
                                                onClick={this.handleOnClickMenuItem}
                                            >
                                                <p className='top-menu-item-text' style={{ color: `${color}` }}>{route.name}</p>
                                            </Menu.Item>
                                        </Link>
                                    );
                                })
                            }
                        </Menu.Menu>

                    </Container>
                </Menu>
                {/* Contents */}
                <div style={{ paddingTop: '9vh' }}>
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
            </Styles>
        );
    }
}

export default withRouter(MainLayout);
