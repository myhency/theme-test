import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Button, Form, Segment, Header, Modal, Grid, Menu, Icon, Search, Card, Image } from 'semantic-ui-react';
import ListTable from '../components/ListTable';
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';

const headers = ['Site Name', 'Number of Services', 'Open Date'];

const data = {
    cellData: [
        ['현대카드', '4', '2020-06-30'],
        ['현대카드', '4', '2020-06-30'],
        ['현대카드', '4', '2020-06-30'],
        ['현대카드', '4', '2020-06-30'],
        ['현대카드', '4', '2020-06-30'],
        ['현대카드', '4', '2020-06-30'],
    ]
}

class SiteList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentDate: null,
            open: false,
            totalCount: 3
        };

    }

    onChange = (event, data) => this.setState({ currentDate: data.value });

    closeConfigShow = (closeOnEscape, closeOnDimmerClick) => () => {
        this.setState({ closeOnEscape, closeOnDimmerClick, open: true })
    }

    close = () => this.setState({ open: false });

    render() {
        const { totalCount, open, closeOnEscape, closeOnDimmerClick } = this.state;


        return (
            <div style={{ marginTop: '4em', width: '80%', marginLeft: 'auto', marginRight: 'auto' }}>
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
                            <Button floated='right'>Add site</Button>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <Card.Group centered>
                                <Link to={{ pathname: "/home/sites/sitedetails", state: ['1','2','3','4'] }}>
                                <Card style={{ width: '300px', height: '20vh', marginLeft: 'auto', marginRight: 'auto' }}>
                                    <Card.Content>
                                        <Image
                                            floated='right'
                                            size='mini'
                                            src='/images/avatar/large/steve.jpg'
                                        />
                                        <Card.Header>Steve Sanders</Card.Header>
                                        <Card.Meta>Friends of Elliot</Card.Meta>
                                        <Card.Description>
                                            Steve wants to add you to the group <strong>best friends</strong>
                                        </Card.Description>
                                    </Card.Content>
                                    <Card.Content extra>
                                        <div className='ui two buttons'>
                                            <Button basic color='green'>Approve</Button>
                                            <Button basic color='red'>Decline</Button>
                                        </div>
                                    </Card.Content>
                                </Card>
                                </Link>
                                <Card style={{ width: '300px', height: '20vh', marginLeft: 'auto', marginRight: 'auto' }}>
                                    <Card.Content>
                                        <Image
                                            floated='right'
                                            size='mini'
                                            src='/images/avatar/large/molly.png'
                                        />
                                        <Card.Header>Molly Thomas</Card.Header>
                                        <Card.Meta>New User</Card.Meta>
                                        <Card.Description>
                                            Molly wants to add you to the group <strong>musicians</strong>
                                        </Card.Description>
                                    </Card.Content>
                                    <Card.Content extra>
                                        <div className='ui two buttons'>
                                            <Button basic color='green'>Approve</Button>
                                            <Button basic color='red'>Decline</Button>
                                        </div>
                                    </Card.Content>
                                </Card>
                                <Card style={{ width: '300px', height: '20vh', marginLeft: 'auto', marginRight: 'auto' }}>
                                    <Card.Content>
                                        <Image
                                            floated='right'
                                            size='mini'
                                            src='/images/avatar/large/jenny.jpg'
                                        />
                                        <Card.Header>Jenny Lawrence</Card.Header>
                                        <Card.Meta>New User</Card.Meta>
                                        <Card.Description>
                                            Jenny requested permission to view your contact details</Card.Description>
                                    </Card.Content>
                                    <Card.Content extra>
                                        <div className='ui two buttons'>
                                            <Button basic color='green'>Approve</Button>
                                            <Button basic color='red'>Decline</Button>
                                        </div>
                                    </Card.Content>
                                </Card>
                                <Card style={{ width: '300px', height: '20vh', marginLeft: 'auto', marginRight: 'auto' }}>
                                    <Card.Content>
                                        <Image
                                            floated='right'
                                            size='mini'
                                            src='/images/avatar/large/jenny.jpg'
                                        />
                                        <Card.Header>Jenny Lawrence</Card.Header>
                                        <Card.Meta>New User</Card.Meta>
                                        <Card.Description>Jenny requested permission to view your contact details</Card.Description>
                                    </Card.Content>
                                    <Card.Content extra>
                                        <div className='ui two buttons'>
                                            <Button basic color='green'>Approve</Button>
                                            <Button basic color='red'>Decline</Button>
                                        </div>
                                    </Card.Content>
                                </Card>
                                <Card style={{ width: '300px', height: '20vh', marginLeft: 'auto', marginRight: 'auto' }}>
                                    <Card.Content>
                                        <Image
                                            floated='right'
                                            size='mini'
                                            src='/images/avatar/large/steve.jpg'
                                        />
                                        <Card.Header>Steve Sanders</Card.Header>
                                        <Card.Meta>Friends of Elliot</Card.Meta>
                                        <Card.Description>
                                            Steve wants to add you to the group <strong>best friends</strong>
                                        </Card.Description>
                                    </Card.Content>
                                    <Card.Content extra>
                                        <div className='ui two buttons'>
                                            <Button basic color='green'>Approve</Button>
                                            <Button basic color='red'>Decline</Button>
                                        </div>
                                    </Card.Content>
                                </Card>
                                <Card style={{ width: '300px', height: '20vh', marginLeft: 'auto', marginRight: 'auto' }}>
                                    <Card.Content>
                                        <Image
                                            floated='right'
                                            size='mini'
                                            src='/images/avatar/large/molly.png'
                                        />
                                        <Card.Header>Molly Thomas</Card.Header>
                                        <Card.Meta>New User</Card.Meta>
                                        <Card.Description>
                                            Molly wants to add you to the group <strong>musicians</strong>
                                        </Card.Description>
                                    </Card.Content>
                                    <Card.Content extra>
                                        <div className='ui two buttons'>
                                            <Button basic color='green'>Approve</Button>
                                            <Button basic color='red'>Decline</Button>
                                        </div>
                                    </Card.Content>
                                </Card>
                                <Card style={{ width: '300px', height: '20vh', marginLeft: 'auto', marginRight: 'auto' }}>
                                    <Card.Content>
                                        <Image
                                            floated='right'
                                            size='mini'
                                            src='/images/avatar/large/jenny.jpg'
                                        />
                                        <Card.Header>Jenny Lawrence</Card.Header>
                                        <Card.Meta>New User</Card.Meta>
                                        <Card.Description>
                                            Jenny requested permission to view your contact details</Card.Description>
                                    </Card.Content>
                                    <Card.Content extra>
                                        <div className='ui two buttons'>
                                            <Button basic color='green'>Approve</Button>
                                            <Button basic color='red'>Decline</Button>
                                        </div>
                                    </Card.Content>
                                </Card>
                                <Card style={{ width: '300px', height: '20vh', marginLeft: 'auto', marginRight: 'auto' }}>
                                    <Card.Content>
                                        <Image
                                            floated='right'
                                            size='mini'
                                            src='/images/avatar/large/jenny.jpg'
                                        />
                                        <Card.Header>Jenny Lawrence</Card.Header>
                                        <Card.Meta>New User</Card.Meta>
                                        <Card.Description>Jenny requested permission to view your contact details</Card.Description>
                                    </Card.Content>
                                    <Card.Content extra>
                                        <div className='ui two buttons'>
                                            <Button basic color='green'>Approve</Button>
                                            <Button basic color='red'>Decline</Button>
                                        </div>
                                    </Card.Content>
                                </Card>
                            </Card.Group>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        )
    }
};

export default (withRouter(SiteList));