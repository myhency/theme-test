import React, { Component } from 'react';
import {
    Button,
    Form,
    Segment,
    Header,
    Modal,
    Grid,
    Icon,
    Select
} from 'semantic-ui-react';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';
import RoleData from '../assets/data/RoleData.json';
import axios from 'axios';
import DetailPageTop from '../components/DetailPageTop';
import ListTableNew from '../components/ListTableNew';

class ServiceDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentDate: null,
            addInstanceModalOpen: false,
            serviceName: this.props.location.state[0],
            openDate: this.props.location.state[3],
            role: this.props.location.state[1],
            endPoint: this.props.location.state[4],
            service: {
                id: 0,
                name: '',
                role: '',
                openDate: '',
                endPoint: '',
                siteId: 0,
                siteName: ''
            },
            instanceList: {
                cellData: [{
                    id: 0,
                    data: []
                }]
            },
            siteOption: [],
            serviceOption: []
        };

        let serviceId = props.location.state;
        this.getServiceInfo(serviceId);
    }

    getServiceInfo = (id) => {
        let serviceDetail = new Promise((resolve, reject) => {
            const url = `/api/services/${id}`;
            try {
                axios.get(url).then(response => {
                    resolve(response.data.result);
                });
            } catch (error) {
                reject(error);
            }
        });

        let instanceList = new Promise((resolve, reject) => {
            const url = `/api/instances?serviceId=${id}`;

            try {
                axios.get(url).then(response => {
                    let data = {
                        cellData: [{}]
                    };
                    response.data.result.map((instance) => {
                        let arr = [];
                        arr.push(
                            instance.name,
                            instance.serviceName,
                            instance.siteName,
                            instance.status.toString(),
                            instance.endpoint
                        );
                        data.cellData.push({
                            id: instance.id,
                            data: arr
                        });
                    });
                    data.cellData.splice(0, 1)
                    resolve(data);
                });
            } catch (error) {
                reject(error);
            }
        });

        Promise.all([serviceDetail, instanceList]).then((values) => {
            this.setState({
                service: values[0],
                instanceList: values[1]
            })
        })
    }

    handleOnClick = id => {
        this.props.history.push({
            pathname: `/home/instances/instancedetails/${id}`,
            state: id
        });
    }

    onChange = (event, data) => this.setState({ currentDate: data.value });

    closeConfigShow = (closeOnEscape, closeOnDimmerClick) => () => {
        this.setState({ closeOnEscape, closeOnDimmerClick, open: true })
    }

    addInstanceModalclose = () => this.setState({ addInstanceModalOpen: false });

    handleAddInstanceButton = (v, e) => {
        if (e) this.setState({ addInstanceModalOpen: true });
    }

    addInstanceModalClose = () => this.setState({ addInstanceModalOpen: false });

    render() {
        const {
            addInstanceModalOpen,
            closeOnEscape,
            closeOnDimmerClick,
            service,
            instanceList
        } = this.state;

        const headers = ['Instance Name', 'Service Name', 'Site Name', 'Status', 'Endpoint'];

        return (
            <div style={{ marginTop: '4em', width: '80%', marginLeft: 'auto', marginRight: 'auto' }}>
                <DetailPageTop
                    headerList={[service.siteName, service.name]}
                    detailList={[
                        {
                            title: 'Service Name',
                            description: service.name
                        },
                        {
                            title: 'Role',
                            description: service.role
                        },
                        {
                            title: 'Open Date',
                            description: service.openDate
                        },
                        {
                            title: 'Endpoint',
                            description: service.endpoint
                        }
                    ]} />
                <Segment placeholder style={{ justifyContent: 'start', marginLeft: '2em', marginRight: '2em' }}>
                    <Grid columns={2} style={{ marginBottom: '0em' }}>
                        <Grid.Row>
                            <Grid.Column floated='left' verticalAlign='bottom' width={5}>
                                <Header as='h3'><Icon name='list alternate outline' />Instance List</Header>
                            </Grid.Column>
                            <Grid.Column floated='right' verticalAlign='bottom' width={5}>
                                <Button color='blue' icon='plus' content='Add instance' floated='right' onClick={(v, e) => this.handleAddInstanceButton(v, e)} />
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    <ListTableNew 
                        headers={headers}
                        data={instanceList}
                        handleOnClick={(id) => this.handleOnClick(id)}
                    />
                    <Modal
                        open={addInstanceModalOpen}
                        onClose={this.addInstanceModalClose}
                        closeOnEscape={closeOnEscape}
                        closeOnDimmerClick={closeOnDimmerClick}>
                        <Modal.Header>Add Instance</Modal.Header>
                        <Modal.Content>
                            <Form>
                                <Form.Group widths='equal'>
                                <Form.Input fluid label='Site name' placeholder='Site name' value={service.siteName} readOnly />
                                </Form.Group>
                                <Form.Group widths='equal'>
                                    <Form.Input fluid label='Service name' placeholder='Service name' value={service.name} readOnly />
                                </Form.Group>
                                <Form.Group widths='equal'>
                                    <Form.Field
                                        control={Select}
                                        label='Role'
                                        options={RoleData.roles}
                                        placeholder='Role'
                                    />
                                </Form.Group>
                                <Form.Group widths='equal'>
                                    <Form.Input fluid label='Instance name' placeholder='service name + instance name + #x' />
                                </Form.Group>
                                <Form.Group widths='equal'>
                                    <Form.Input fluid label='Endpoint' placeholder='https://example.com/' />
                                </Form.Group>
                            </Form>
                        </Modal.Content>
                        <Modal.Actions>
                            <Button onClick={this.addInstanceModalClose} negative>No</Button>
                            <Button
                                onClick={this.close}
                                positive
                                labelPosition='right'
                                icon='checkmark'
                                content='Yes'
                            />
                        </Modal.Actions>
                    </Modal>
                </Segment>
            </div>
        )
    }
};

export default ServiceDetails;