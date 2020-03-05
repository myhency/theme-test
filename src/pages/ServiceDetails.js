import React, { Component } from 'react';
import { Button, Form, Segment, Header, Image, Modal, Grid, Menu, Icon, Select, Divider, Breadcrumb } from 'semantic-ui-react';
import ListTable from '../components/ListTable';
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';
import logo from '../assets/images/01.20686250.1.jpg';
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

class ServiceDetails extends Component {
    constructor(props) {
        super(props);
        console.log(props);

        this.state = {
            currentDate: null,
            open: false,
            serviceName: this.props.location.state[0],
            openDate: this.props.location.state[3],
            role: this.props.location.state[1],
            endPoint: this.props.location.state[4],
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
        const { serviceName, openDate, role, endPoint, data, open, closeOnEscape, closeOnDimmerClick } = this.state;

        return (
            <div style={{ marginTop: '4em', width: '80%', marginLeft: 'auto', marginRight: 'auto' }}>
                <Segment style={{ marginLeft: '2em', marginRight: '2em' }}>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column verticalAlign='middle' width={2}>
                                <Image src={logo} size={'small'} />
                            </Grid.Column>
                            <Grid.Column floated='left' verticalAlign='middle' width={8}>
                                <Breadcrumb size='massive'>
                                    <Breadcrumb.Section link>Home</Breadcrumb.Section>
                                    <Breadcrumb.Divider icon='right angle' />
                                    <Breadcrumb.Section>{serviceName}</Breadcrumb.Section>
                                </Breadcrumb>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    <Divider />
                    <Header as='h3'>Detail</Header>
                    <Grid celled='internally'>
                        <Grid.Row>
                            <Grid.Column verticalAlign='middle' width={2}>
                                Service Name
                            </Grid.Column>
                            <Grid.Column floated='left' verticalAlign='middle' width={8}>
                                {serviceName}
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column verticalAlign='middle' width={2}>
                                Role
                            </Grid.Column>
                            <Grid.Column floated='left' verticalAlign='middle' width={8}>
                                {role}
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column verticalAlign='middle' width={2}>
                                Open Date
                            </Grid.Column>
                            <Grid.Column floated='left' verticalAlign='middle' width={8}>
                                {openDate}
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
                    </Grid>
                </Segment>
                <Segment placeholder style={{ justifyContent: 'start', marginLeft: '2em', marginRight: '2em' }}>
                    <Modal
                        open={open}
                        onClose={this.close}
                        closeOnEscape={closeOnEscape}
                        closeOnDimmerClick={closeOnDimmerClick}>
                        <Modal.Header>Add a Service</Modal.Header>
                        <Modal.Content>
                            <Form>
                                <Form.Group widths='equal'>
                                    <Form.Input fluid label='Site name' placeholder='Site name' />
                                </Form.Group>
                                <Form.Group widths='equal'>
                                    <Form.Input fluid label='Service name' placeholder='Service name' />
                                </Form.Group>
                                <Form.Group widths='equal'>
                                    <Form.Field
                                        control={Select}
                                        label='Role'
                                        options={roleOptions}
                                        placeholder='Role'
                                    />
                                </Form.Group>
                                <Form.Group widths='equal'>
                                    <SemanticDatepicker label='Open date' datePickerOnly={true} onChange={this.onChange} />
                                </Form.Group>
                                <Form.Group widths='equal'>
                                    <Form.Input fluid label='Endpoint' placeholder='https://example.com/' />
                                </Form.Group>
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
                    <Grid columns={2} style={{ marginBottom: '0em' }}>
                        <Grid.Row>
                            <Grid.Column floated='left'>
                                <Header as='h1'>Instance List</Header>
                            </Grid.Column>
                            <Grid.Column floated='right' textAlign='right'>
                                <Menu.Menu position='right'>
                                    <Menu.Item>
                                        <Button icon floated='right' onClick={this.closeConfigShow(true, false)}>
                                            <Icon name='plus square outline' size='large' />
                                        </Button>
                                    </Menu.Item>
                                </Menu.Menu>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    <ListTable
                        title={'Service List'}
                        headers={headers}
                        data={data} />
                </Segment>
            </div>
        )
    }
};

export default ServiceDetails;