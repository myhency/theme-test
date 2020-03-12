import React, { Component } from 'react';
import { Button, Segment, Header, Image, Grid, Divider, Breadcrumb } from 'semantic-ui-react';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';
import logo from '../assets/images/01.20686250.1.jpg';
import axios from 'axios';

class InstanceDetails extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
        };
            
        let id = props.location.state;
        this.getInstanceDetail(id)
    }

    getInstanceDetail = (id) => {
        const url = `/api/instances/${id}`;

        try {
            return axios.get(url).then(response => {
                console.log(response);
                this.setState({
                    siteName: response.data.result.siteName,
                    serviceName: response.data.result.serviceName,
                    name: response.data.result.name,
                    endPoint: response.data.result.endpoint,
                    status: response.data.result.status.toString()
                })
            });
        } catch (error) {
            console.log(error);
        }
    }

    handleClick = rowValue => {
        this.props.history.push({
            pathname: '/home/services/servicedetails/',
            state: rowValue
        });
    }

    onChange = (event, data) => this.setState({ currentDate: data.value });

    closeConfigShow = (closeOnEscape, closeOnDimmerClick) => () => {
        this.setState({ closeOnEscape, closeOnDimmerClick, open: true })
    }

    close = () => this.setState({ open: false });

    render() {
        const { 
            siteName, 
            serviceName, 
            name,
            endPoint,
            status
        } = this.state;

        return (
            <div style={{ marginTop: '4em', width: '80%', marginLeft: 'auto', marginRight: 'auto' }}>
                <Segment style={{ marginLeft: '2em', marginRight: '2em' }}>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column verticalAlign='middle' width={2}>
                                <Image src={logo} size={'small'} />
                            </Grid.Column>
                            <Grid.Column floated='left' verticalAlign='middle' width={14}>
                                <Breadcrumb size='massive'>
                                    <Breadcrumb.Section link>{siteName}</Breadcrumb.Section>
                                    <Breadcrumb.Divider icon='right angle' />
                                    <Breadcrumb.Section link>{serviceName}</Breadcrumb.Section>
                                    <Breadcrumb.Divider icon='right angle' />
                                    <Breadcrumb.Section>{name}</Breadcrumb.Section>
                                </Breadcrumb>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    <Divider />
                    <Header as='h3'>Detail</Header>
                    <Grid celled='internally'>
                        <Grid.Row>
                            <Grid.Column verticalAlign='middle' width={2}>
                                Instance Name
                            </Grid.Column>
                            <Grid.Column floated='left' verticalAlign='middle' width={8}>
                                {name}
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column verticalAlign='middle' width={2}>
                                Endpoint
                            </Grid.Column>
                            <Grid.Column floated='left' verticalAlign='middle' width={8}>
                                {endPoint}
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column verticalAlign='middle' width={2}>
                                Status
                            </Grid.Column>
                            <Grid.Column floated='left' verticalAlign='middle' width={8}>
                                {status}
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column verticalAlign='middle' width={2}>
                                Logs
                            </Grid.Column>
                            <Grid.Column floated='left' verticalAlign='middle' width={8}>
                                <Button>View Logs</Button>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Segment>
            </div>
        )
    }
};

export default InstanceDetails;