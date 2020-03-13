import React, { Component } from 'react';
import { 
    Button, 
    Form, 
    Segment, 
    Header, 
    Image, 
    Modal, 
    Grid, 
    Icon, 
    Select, 
    Divider, 
    Breadcrumb } from 'semantic-ui-react';
import ListTable from '../components/ListTable';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';
import logo from '../assets/images/01.20686250.1.jpg';
import InstanceData from '../assets/data/InstanceData.json';
import SiteData from '../assets/data/SiteData.json';
import ServiceData from '../assets/data/ServiceData.json';
import RoleData from '../assets/data/RoleData.json';
import axios from 'axios';
import Gallery from '../utils/Gallery';

const headers = ['Service Name', 'Role', 'Company', 'Open Date', 'Endpoint'];

class ServiceDetails extends Component {
    constructor(props) {
        super(props);
        console.log(props);

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
                    instanceData: []
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
                        arr.push(instance.name, service.role, service.siteName, service.openDate);
                        data.cellData.push({
                            id: service.id,
                            serviceData: arr
                        });
                    });
                    data.cellData.splice(0,1)
                    resolve(data);
                });
            } catch (error) {
                reject(error);
            }
        });

        Promise.all([serviceDetail,instanceList]).then((values) =>{
            this.setState({
                site: values[0],
                serviceList: values[1]
            })
        })
    }

    static getDerivedStateFromProps(props, state) {
        let { siteOption, serviceOption } = state;
        // data.cellData.splice(0, data.cellData.length);
        // Array.prototype.forEach.call(InstanceData.instanceList, value => {
        //     let arr = [];
        //     arr.push(
        //         value.name,
        //         value.serviceName,
        //         value.siteName,
        //         value.status,
        //         value.endPoint
        //     );
        //     data.cellData.push(arr);
        // })

        // set site name search condition
        siteOption.splice(0, siteOption.length);
        Array.prototype.forEach.call(SiteData.siteList, value => {
            siteOption.push({
                key: value.name,
                text: value.name,
                value: value.name
            });
        })
        siteOption.unshift({
            key: 'All',
            text: 'All',
            value: 'All'
        })

        // set service name search condition
        serviceOption.splice(0, serviceOption.length);
        Array.prototype.forEach.call(ServiceData.serviceList, value => {
            serviceOption.push({
                key: value.name,
                text: value.name,
                value: value.name
            });
        });
        serviceOption.unshift({
            key: 'All',
            text: 'All',
            value: 'All'
        })

        return {
            ...siteOption, ...serviceOption
        }
    }

    handleClick = rowValue => {
        this.props.history.push({
            pathname: '/home/instances/instancedetails/',
            state: rowValue
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
            serviceName, 
            openDate, 
            role, 
            endPoint, 
            data, 
            addInstanceModalOpen, 
            closeOnEscape, 
            closeOnDimmerClick,
            siteOption
         } = this.state;

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
                        open={addInstanceModalOpen}
                        onClose={this.addInstanceModalClose}
                        closeOnEscape={closeOnEscape}
                        closeOnDimmerClick={closeOnDimmerClick}>
                        <Modal.Header>Add Instance</Modal.Header>
                        <Modal.Content>
                            <Form>
                                <Form.Group widths='equal'>
                                    <Form.Field
                                        control={Select}
                                        label='Site Name'
                                        options={siteOption}
                                        placeholder='Site name'
                                    />
                                </Form.Group>
                                <Form.Group widths='equal'>
                                    <Form.Input fluid label='Service name' placeholder='Service name' />
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
                    <ListTable
                        title={'Service List'}
                        handleClick={(rowValue) => this.handleClick(rowValue)}
                        headers={headers}
                        data={data} />
                </Segment>
            </div>
        )
    }
};

export default ServiceDetails;