import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Button, Form, Segment, Header, Modal, Grid, Input, Menu, Icon, Search, Card, Image, Dropdown, Select } from 'semantic-ui-react';
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';
import siteData from '../assets/data/SiteData.json';
import roleData from '../assets/data/RoleData.json';
import Gallery from '../utils/Gallery';
import { InputFile } from 'semantic-ui-react-input-file';

const fileSelector = document.createElement('input');

class SiteList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentDate: null,
            open: false,
            totalCount: 3
        };

        fileSelector.setAttribute('type', 'file');
        fileSelector.setAttribute('multiple', 'multiple');
    }

    handleFileSelect = (e) => {
        e.preventDefault();
        fileSelector.click();
    }

    onChange = (event, data) => this.setState({ currentDate: data.value });

    closeConfigShow = (closeOnEscape, closeOnDimmerClick) => () => {
        this.setState({ closeOnEscape, closeOnDimmerClick, open: true })
    }

    close = () => this.setState({ open: false });

    handleAddSiteButton = (v, e) => {
        if (e) this.setState({ open: true });
    }

    alarm = () => {
        alert('aaa')
    }

    render() {
        const { totalCount, open, closeOnEscape, closeOnDimmerClick } = this.state;

        return (
            <div style={{ marginTop: '4em', width: '80%', marginLeft: 'auto', marginRight: 'auto' }}>
                <Modal
                    open={open}
                    onClose={this.close}
                    closeOnEscape={closeOnEscape}
                    closeOnDimmerClick={closeOnDimmerClick}>
                    <Modal.Header>Add a Site</Modal.Header>
                    <Modal.Content>
                        <Form>
                            <Form.Group widths='equal'>
                                <Form.Input fluid label='Site name' placeholder='Site name' />
                            </Form.Group>
                            <Form.Group widths='equal'>
                                <SemanticDatepicker label='Open date' datePickerOnly={true} onChange={this.onChange} />
                            </Form.Group>
                            <Form.Group widths='equal'>
                                <Form.Input
                                    ref={(ref) => this.upload = ref}
                                    action={{
                                        icon: 'file image',
                                        onClick: this.handleFileSelect
                                    }}
                                    label='Site Logo Image'
                                    placeholder='Logo file...' />
                            </Form.Group>
                            {/* <InputFile 
                            label='Logo image'
                            button={{ }}
                            input={{
                                id: 'input-control-id',

                            }} /> */}

                        </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button onClick={this.close} negative>No</Button>
                        <Button
                            onClick={this.close}
                            positive
                            labelPosition='right'
                            icon='checkmark'
                            content='Yes'
                        />
                    </Modal.Actions>
                </Modal>
                <Grid>
                    <Grid.Row>
                        <Grid.Column floated='left' verticalAlign='middle' width={5}>
                            <Header as='h1'>Sites</Header>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <Search />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column floated='left' verticalAlign='middle' width={5}>
                            <Header as='h4' textAlign='left'>{'Total : '}{totalCount}</Header>
                        </Grid.Column>
                        <Grid.Column floated='right' verticalAlign='middle' width={5}>
                            <Button floated='right' onClick={(v, e) => this.handleAddSiteButton(v, e)}>Add site</Button>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <Card.Group centered>
                                {/* Card #1 */}
                                {siteData.siteList.map((cardValue, index) => {
                                    return (
                                        <Card style={{ width: '300px', marginLeft: 'auto', marginRight: 'auto' }}>
                                            <Image
                                                style={{
                                                    paddingTop: '5px',
                                                    paddingBottom: '5px',
                                                    paddingLeft: '5px',
                                                    paddingRight: '5px'
                                                }}
                                                size='medium'
                                                src={Gallery.getLogoImage(cardValue.name)}
                                                as={Link}
                                                to={{
                                                    pathname: "/home/sites/sitedetails",
                                                    state: [cardValue.name, cardValue.openDate, cardValue.numberOfServices]
                                                }} />
                                            <Card.Content>
                                                <Grid columns={2} style={{ paddingTop: '-1em', paddingBottom: '-1em' }}>
                                                    <Grid.Row
                                                        style={{ paddingTop: '-1em', paddingBottom: '-1em' }}
                                                    >
                                                        <Grid.Column floated='left' verticalAlign='middle'>
                                                            <Card.Header
                                                                as={Link}
                                                                to={{
                                                                    pathname: "/home/sites/sitedetails",
                                                                    state: [
                                                                        cardValue.name,
                                                                        cardValue.openDate,
                                                                        cardValue.numberOfServices
                                                                    ]
                                                                }}>
                                                                <Header as='h3'>{cardValue.name}</Header>
                                                            </Card.Header>
                                                        </Grid.Column>
                                                        <Grid.Column floated='right' verticalAlign='middle'>
                                                            {/* <Icon name='ellipsis vertical' style={{ float: 'right' }} /> */}
                                                            <Menu secondary style={{ float: 'right' }}>
                                                                <Dropdown item icon='ellipsis vertical' simple>
                                                                    <Dropdown.Menu>
                                                                        <Dropdown.Item>Modify</Dropdown.Item>
                                                                        <Dropdown.Item>Delete</Dropdown.Item>
                                                                    </Dropdown.Menu>
                                                                </Dropdown>
                                                            </Menu>
                                                        </Grid.Column>
                                                    </Grid.Row>
                                                </Grid>
                                                <Card.Meta>{cardValue.openDate}</Card.Meta>
                                            </Card.Content>
                                            <Card.Content extra>
                                                <Grid columns={2}>
                                                    <Grid.Row>
                                                        <Grid.Column floated='left' verticalAlign='middle' width={1} style={{ marginRight: '0em' }}>
                                                            <Icon fitted name='setting' size='large' />
                                                        </Grid.Column>
                                                        <Grid.Column floated='left' verticalAlign='middle'>
                                                            {cardValue.numberOfServices} Services
                                                        </Grid.Column>
                                                    </Grid.Row>
                                                </Grid>
                                            </Card.Content>
                                        </Card>
                                    );
                                })}
                                {/* Card #2 */}
                                {siteData.siteList.map((cardValue, index) => {
                                    return (
                                        <Card style={{ width: '300px', height: '20vh', marginLeft: 'auto', marginRight: 'auto' }}>
                                            <Grid
                                                columns={2}
                                                style={{
                                                    paddingTop: '5px',
                                                    paddingBottom: '5px',
                                                    paddingLeft: '5px',
                                                    paddingRight: '5px'
                                                }}>
                                                <Grid.Column floated='left' verticalAlign='middle'>
                                                    <Image
                                                        floated='left'
                                                        size='small'
                                                        src={Gallery.getLogoImage(cardValue.name)}
                                                        as={Link}
                                                        to={{
                                                            pathname: "/home/sites/sitedetails",
                                                            state: [
                                                                cardValue.name,
                                                                cardValue.openDate,
                                                                cardValue.numberOfServices
                                                            ]
                                                        }}
                                                    />
                                                </Grid.Column>
                                                <Grid.Column floated='right' verticalAlign='middle'>
                                                    <Menu secondary style={{ float: 'right' }}>
                                                        <Dropdown item icon='ellipsis vertical' simple>
                                                            <Dropdown.Menu>
                                                                <Dropdown.Item>Modify</Dropdown.Item>
                                                                <Dropdown.Item>Delete</Dropdown.Item>
                                                            </Dropdown.Menu>
                                                        </Dropdown>
                                                    </Menu>
                                                </Grid.Column>
                                            </Grid>
                                            <Card.Content>
                                                <Card.Header
                                                    as={Link}
                                                    to={{
                                                        pathname: "/home/sites/sitedetails",
                                                        state: [
                                                            cardValue.name,
                                                            cardValue.openDate,
                                                            cardValue.numberOfServices
                                                        ]
                                                    }}>{cardValue.name}</Card.Header>
                                                <Card.Meta>{cardValue.openDate}</Card.Meta>
                                            </Card.Content>
                                            <Card.Content extra>
                                                <Grid columns={2}>
                                                    <Grid.Row>
                                                        <Grid.Column floated='left' verticalAlign='middle' width={1} style={{ marginRight: '0em' }}>
                                                            <Icon fitted name='setting' size='large' />
                                                        </Grid.Column>
                                                        <Grid.Column floated='left' verticalAlign='middle'>
                                                            {cardValue.numberOfServices} Services
                                                        </Grid.Column>
                                                    </Grid.Row>
                                                </Grid>
                                            </Card.Content>
                                        </Card>
                                    );
                                })}
                                {/* Card #3 */}
                                {siteData.siteList.map((cardValue, index) => {
                                    return (
                                        <Card style={{ width: '300px', height: '20vh', marginLeft: 'auto', marginRight: 'auto' }}>
                                            <Grid columns={3} style={{ paddingTop: '5px', paddingBottom: '5px', paddingLeft: '5px', paddingRight: '5px' }}>
                                                <Grid.Column floated='left' verticalAlign='middle'>
                                                    <Header as='h3' style={{
                                                        paddingTop: '5px',
                                                        paddingBottom: '5px',
                                                        paddingLeft: '5px',
                                                        paddingRight: '5px'
                                                    }}>{cardValue.name}</Header>
                                                </Grid.Column>
                                                <Grid.Column floated='left' verticalAlign='middle'>
                                                    <Image
                                                        style={{ marginLeft: '-2em' }}
                                                        floated='left'
                                                        size='large'
                                                        src={Gallery.getLogoImage(cardValue.name)}
                                                        as={Link}
                                                        to={{
                                                            pathname: "/home/sites/sitedetails",
                                                            state: [
                                                                cardValue.name,
                                                                cardValue.openDate,
                                                                cardValue.numberOfServices
                                                            ]
                                                        }}
                                                    />
                                                </Grid.Column>
                                                <Grid.Column floated='right' verticalAlign='middle'>
                                                    <Menu secondary style={{ float: 'right' }}>
                                                        <Dropdown item icon='ellipsis vertical' simple>
                                                            <Dropdown.Menu>
                                                                <Dropdown.Item>Modify</Dropdown.Item>
                                                                <Dropdown.Item>Delete</Dropdown.Item>
                                                            </Dropdown.Menu>
                                                        </Dropdown>
                                                    </Menu>
                                                </Grid.Column>
                                            </Grid>
                                            <Card.Content>
                                                <Card.Meta>{cardValue.openDate}</Card.Meta>
                                            </Card.Content>
                                            <Card.Content extra>
                                                <Grid columns={2}>
                                                    <Grid.Row>
                                                        <Grid.Column floated='left' verticalAlign='middle' width={1} style={{ marginRight: '0em' }}>
                                                            <Icon fitted name='setting' size='large' />
                                                        </Grid.Column>
                                                        <Grid.Column floated='left' verticalAlign='middle'>
                                                            {cardValue.numberOfServices} Services
                                                        </Grid.Column>
                                                    </Grid.Row>
                                                </Grid>
                                            </Card.Content>
                                        </Card>
                                    );
                                })}
                            </Card.Group>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        )
    }
};

export default (withRouter(SiteList));