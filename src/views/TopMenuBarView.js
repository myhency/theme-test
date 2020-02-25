import React from 'react';
import logo from '../assets/images/hyundai-autoever-ci.png';
import { Menu, Image } from 'semantic-ui-react';

const TopMenuBarView = () => (
    <Menu fixed='top' inverted>
        <Menu.Item>
            <Image src={logo} size='tiny' />
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
);

export default TopMenuBarView;