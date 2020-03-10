import React, { Component } from 'react';
import { Button, Form, Segment, Header, Modal, Grid, Icon, Select, Divider } from 'semantic-ui-react';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';
import ListTable from '../components/ListTable';
import SiteData from '../assets/data/SiteData.json';
import ServiceData from '../assets/data/ServiceData.json';
import InstanceData from '../assets/data/InstanceData.json';
import RoleData from '../assets/data/RoleData.json';
import InstanceStatusData from '../assets/data/InstanceStatusData.json';
import PageTitle from '../components/PageTitle';

const headers = ['Site name', 'Service name', 'Instance name', 'Endpoint', 'Status'];

class InstanceList extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            currentDate: null,
            open: false,
            totalCount: 4,
            addServiceModalOpen: false,
            data: {
                cellData: []
            },
            siteOption: [],
            serviceOption: []
        };

    }
    
    static getDerivedStateFromProps(props, state) {
        console.log(InstanceData);
        
        let { data, siteOption, serviceOption } = state;

        // set instance list table data
        data.cellData.splice(0, data.cellData.length);
        Array.prototype.forEach.call(InstanceData.instanceList, value => {
            let arr = [];
            arr.push(value.siteName, value.serviceName, value.name, value.endPoint, value.status);
            data.cellData.push(arr);
        });
        
        // set site name search condition
        siteOption.splice(0, siteOption.length);
        Array.prototype.forEach.call(SiteData.siteList, value => {
            siteOption.push({
                key: value.name,
                text: value.name,
                value: value.name
            });
        });
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
            ...data, ...siteOption, ...serviceOption
        }
    }

    onChange = (event, data) => this.setState({ currentDate: data.value });

    closeConfigShow = (closeOnEscape, closeOnDimmerClick) => () => {
        this.setState({ closeOnEscape, closeOnDimmerClick, open: true })
    }

    close = () => this.setState({ open: false });

    handleClick = rowValue => {
        this.props.history.push({
            pathname: '/home/instances/instancedetails/',
            state: rowValue
        });
    }

    handleAddServiceButton = (v, e) => {
        if (e) this.setState({ addServiceModalOpen: true });
    }

    addInstanceModalClose = () => this.setState({ addServiceModalOpen: false });

    render() {
        const { data, siteOption, serviceOption, addServiceModalOpen, closeOnEscape, closeOnDimmerClick } = this.state;
        console.log(siteOption);
        console.log(RoleData.roles);
        return (
            <div style={{ marginTop: '4em', width: '70%', marginLeft: 'auto', marginRight: 'auto' }}>
                <Grid>
                    <Grid.Row>
                        <Grid.Column>
                            <PageTitle
                                title='Instances'
                                description='Autoever DID hub 에 등록된 모든 Instance들을 보여줍니다. Instance는 Host VM의 Docker container 단위를 의미합니다.' 
                                iconName='server'
                            />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <Segment>
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
                                        <Form.Field
                                            control={Select}
                                            label='Service Name'
                                            options={serviceOption}
                                            placeholder='Service name'
                                        />
                                    </Form.Group>
                                    <Form.Group widths='equal'>
                                        <Form.Field
                                            control={Select}
                                            label='Status'
                                            options={InstanceStatusData.status}
                                            placeholder='Status'
                                        />
                                    </Form.Group>
                                    <Button type='submit'>Search</Button>
                                    <Button type='submit'>Clear</Button>
                                </Form>
                            </Segment>
                        </Grid.Column>
                    </Grid.Row>
                    <Divider />
                    <Grid.Row>
                        <Grid.Column floated='left' verticalAlign='bottom' width={5}>
                            <Header as='h3'><Icon name='list alternate outline' />Instance List</Header>
                        </Grid.Column>
                        <Grid.Column floated='right' verticalAlign='bottom' width={5}>
                            <Button color='blue' icon='plus' content='Add instance' floated='right' onClick={(v, e) => this.handleAddServiceButton(v, e)} />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <ListTable
                                handleClick={(rowValue) => this.handleClick(rowValue)}
                                headers={headers}
                                data={data} />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <Modal
                    open={addServiceModalOpen}
                    onClose={this.addSiteModalClose}
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
                                <Form.Input fluid label='Instance name' placeholder='service name + instance name + #x'/>
                            </Form.Group>
                            <Form.Group widths='equal'>
                                <Form.Input fluid label='Endpoint' placeholder='https://example.com/' />
                            </Form.Group>
                        </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button onClick={this.addSiteModalClose} negative>No</Button>
                        <Button
                            onClick={this.close}
                            positive
                            labelPosition='right'
                            icon='checkmark'
                            content='Yes'
                        />
                    </Modal.Actions>
                </Modal>
            </div>
        );
    }
};

export default InstanceList;