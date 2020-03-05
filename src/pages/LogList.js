import React, { Component } from 'react';
import { Button, Form, Segment, Header, Modal, Grid, Input, Menu, Icon, Search, Card, Image, Dropdown, Select, Statistic, Label, Divider } from 'semantic-ui-react';
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';
import ListTable from '../components/ListTable';
import SiteData from '../assets/data/SiteData.json';
import ServiceData from '../assets/data/ServiceData.json';
import InstanceData from '../assets/data/InstanceData.json';
import RoleData from '../assets/data/RoleData.json';
import LogData from '../assets/data/LogData.json';
import InstanceStatusData from '../assets/data/InstanceStatusData.json';

const headers = [
    'Date',
    'Site name',
    'Service name',
    'Instance name',
    'Log level',
    'Log name',
    'Log detail'
];

class LogList extends Component {

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

        // set log list table data
        data.cellData.splice(0, data.cellData.length);
        LogData.logList.map((value, index) => {
            let arr = [];
            arr.push(
                value.date,
                value.siteName,
                value.serviceName,
                value.instanceName,
                value.level,
                value.name,
                value.logDetail
            );
            data.cellData.push(arr);
        });

        // set site name search condition
        siteOption.splice(0, siteOption.length);
        SiteData.siteList.map((value, index) => {
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
        ServiceData.serviceList.map((value, index) => {
            serviceOption.push({
                key: value.name,
                text: value.name,
                value: value.name
            })
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
            pathname: '/home/services/servicedetails/',
            state: rowValue
        });
    }

    handleAddServiceButton = (v, e) => {
        if (e) this.setState({ addServiceModalOpen: true });
    }

    addSiteModalClose = () => this.setState({ addServiceModalOpen: false });

    render() {
        const { data, siteOption, serviceOption, addServiceModalOpen, closeOnEscape, closeOnDimmerClick } = this.state;
        console.log(siteOption);
        console.log(RoleData.roles);
        return (
            <div style={{ marginTop: '4em', width: '70%', marginLeft: 'auto', marginRight: 'auto' }}>
                <Grid>
                    {/* Header */}
                    <Grid.Row>
                        <Grid.Column>
                            <Grid>
                                <Grid.Row>
                                    <Grid.Column floated='left' verticalAlign='middle'>
                                        <Header as='h1'><Icon name='heartbeat' />Logs</Header>
                                        <p style={{ fontSize: '12px', color: 'grey' }}>Autoever DID hub 에서 발생한 모든 log를 보여줍니다.</p>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Grid.Column>
                    </Grid.Row>
                    {/* Search Area */}
                    <Grid.Row>
                        <Grid.Column>
                            <Segment>
                                <Form>
                                    <Grid>
                                        <Grid.Row>
                                            <Grid.Column width={4} verticalAlign='bottom'>
                                                <Form.Group widths='equal'>
                                                    <SemanticDatepicker
                                                        label='Start date'
                                                        datePickerOnly={true}
                                                        onChange={this.onChange} />
                                                </Form.Group>
                                            </Grid.Column>
                                            <Grid.Column width={4} verticalAlign='bottom'>
                                                <Form.Group widths='equal'>
                                                    <SemanticDatepicker
                                                        label='End date'
                                                        datePickerOnly={true}
                                                        onChange={this.onChange} />
                                                </Form.Group>
                                            </Grid.Column>
                                            <Grid.Column width={2} verticalAlign='medium' style={{ paddingTop: '24px' }}>
                                                <Button type='submit'>Last 60 min</Button>
                                            </Grid.Column>
                                            <Grid.Column width={2} verticalAlign='medium' style={{ paddingTop: '24px' }}>
                                                <Button type='submit'>Last 1 day</Button>
                                            </Grid.Column>
                                            <Grid.Column width={2} verticalAlign='medium' style={{ paddingTop: '24px' }}>
                                                <Button type='submit'>Last 1 week</Button>
                                            </Grid.Column>
                                            <Grid.Column width={2} verticalAlign='medium' style={{ paddingTop: '24px' }}>
                                                <Button type='submit'>Last 1 month</Button>
                                            </Grid.Column>
                                        </Grid.Row>
                                        <Grid.Row>
                                            <Grid.Column width={4}>
                                                <Form.Group widths='equal'>
                                                    <Form.Field
                                                        control={Select}
                                                        label='Site Name'
                                                        options={siteOption}
                                                        placeholder='Site name'
                                                    />
                                                </Form.Group>
                                            </Grid.Column>
                                            <Grid.Column width={6}>
                                                <Form.Group widths='equal'>
                                                    <Form.Field
                                                        control={Select}
                                                        label='Service Name'
                                                        options={siteOption}
                                                        placeholder='Service name'
                                                    />
                                                </Form.Group>
                                            </Grid.Column>
                                            <Grid.Column width={6}>
                                                <Form.Group widths='equal'>
                                                    <Form.Field
                                                        control={Select}
                                                        label='Instance Name'
                                                        options={siteOption}
                                                        placeholder='Instance name'
                                                    />
                                                </Form.Group>
                                            </Grid.Column>
                                        </Grid.Row>
                                        <Grid.Row>
                                            <Grid.Column width={4}>
                                                <Form.Group widths='equal'>
                                                    <Form.Field
                                                        control={Select}
                                                        label='Log Level'
                                                        options={siteOption}
                                                        placeholder='Log Level'
                                                    />
                                                </Form.Group>
                                                <Button type='submit'>Search</Button>
                                                <Button type='submit'>Clear</Button>
                                            </Grid.Column>
                                            <Grid.Column width={6}>
                                                <Form.Group widths='equal'>
                                                    <Form.Field
                                                        control={Select}
                                                        label='Log Name'
                                                        options={siteOption}
                                                        placeholder='Log Name'
                                                    />
                                                </Form.Group>
                                            </Grid.Column>
                                            <Grid.Column width={6}>
                                                <Form.Group widths='equal'>
                                                    <Form.Input fluid label='Endpoint' placeholder='https://example.com/' />
                                                </Form.Group>
                                            </Grid.Column>
                                        </Grid.Row>
                                    </Grid>
                                </Form>
                            </Segment>
                        </Grid.Column>
                    </Grid.Row>
                    <Divider />
                    {/* List */}
                    <Grid.Row>
                        <Grid.Column floated='left' verticalAlign='bottom' width={5}>
                            <Header as='h3'><Icon name='list alternate outline' />Log List</Header>
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
                                <Form.Input fluid label='Instance name' placeholder='service name + instance name + #x' />
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

export default LogList;