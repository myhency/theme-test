import React, { Component } from 'react';
import { Button, Form, Segment, Header, Image, Modal, Grid, Menu, Icon, Select, Divider, Breadcrumb } from 'semantic-ui-react';
import ListTable from '../components/ListTable';
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';
import issuerIcon from '../assets/images/right-arrow.png';
import verifierIcon from '../assets/images/left-arrow.png';
import verissuerIcon from '../assets/images/up-arrow.png';
import logo from '../assets/images/01.20686250.1.jpg';
import RoleData from '../assets/data/RoleData.json';
import InstanceData from '../assets/data/InstanceData.json';

const headers = ['Service Name', 'Role', 'Company', 'Open Date', 'Endpoint'];

const roleOptions = [
    {
        key: 'Issuer',
        text: 'Issuer',
        value: 'Issuer'
    },
    {
        key: 'Verifier',
        text: 'Verifier',
        value: 'Verifier'
    },
    {
        key: 'Verissuer',
        text: 'Verissuer',
        value: 'Verissuer'
    },
]

class InstanceDetails extends Component {
    constructor(props) {
        super(props);
        console.log(props);

        this.state = {
            currentDate: null,
            open: false,
            siteName: this.props.location.state[0],
            serviceName: this.props.location.state[1],
            instanceName: this.props.location.state[2],
            endPoint: this.props.location.state[3],
            status: this.props.location.state[4],
            data: {
                cellData: []
            },
        };
    }

    static getDerivedStateFromProps(props, state) {
        let { data } = state;
        data.cellData.splice(0, data.cellData.length);
        InstanceData.instanceList.map((value, index) => {
            let arr = [];
            arr.push(
                value.name,
                value.serviceName,
                value.siteName,
                value.status,
                value.endPoint
            );
            data.cellData.push(arr);
        });
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
            instanceName,
            endPoint,
            status, 
            data, 
            open, 
            closeOnEscape, 
            closeOnDimmerClick 
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
                                    <Breadcrumb.Section>{instanceName}</Breadcrumb.Section>
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
                                {instanceName}
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