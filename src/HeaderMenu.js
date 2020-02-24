import React from 'react';
import { Button, Container, Divider, Grid, Header, Image, Menu, Segment } from 'semantic-ui-react';
import logo from './hyundai-autoever-ci.png';

const HeaderMenu = () => (
    <div>
        <Menu fixed='top' inverted>
            <Menu.Item>
                <Image src={logo} size='tiny' fluid />
            </Menu.Item>
            <Menu.Item>
                <h4>Overview</h4>
            </Menu.Item>
            <Menu.Item>
                <h4>Sites</h4>
            </Menu.Item>
            <Menu.Item>
                <h4>Services</h4>
            </Menu.Item>
            <Menu.Item position='right'>
                <h4>Avatar</h4>
            </Menu.Item>
        </Menu>
    </div>
);

export default HeaderMenu;
