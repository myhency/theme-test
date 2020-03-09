import React, { Component } from 'react';
import { Button, Form, Segment, Header, Modal, Grid, Icon, TextArea, Select, Divider } from 'semantic-ui-react';
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';
import ListTable from '../components/ListTable';
import SiteData from '../assets/data/SiteData.json';
import ServiceData from '../assets/data/ServiceData.json';
import LogData from '../assets/data/LogData.json';

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
            logDetailModalOpen: false,
            data: {
                cellData: []
            },
            siteOption: [],
            serviceOption: [],
            logData: {}
        };

    }

    static getDerivedStateFromProps(props, state) {
        console.log(state.logData);

        let { data, siteOption, serviceOption } = state;

        // set log list table data
        data.cellData.splice(0, data.cellData.length);
        Array.prototype.forEach.call(LogData.logList, value => {
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
        });

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
        if (rowValue) this.setState({ logDetailModalOpen: true, logData: rowValue });
    }

    handleAddServiceButton = (v, e) => {
        if (e) this.setState({ logDetailModalOpen: true });
    }

    logDetailModalClose = () => this.setState({ logDetailModalOpen: false });

    render() {
        const {
            logData,
            data,
            siteOption,
            logDetailModalOpen,
            closeOnEscape,
            closeOnDimmerClick
        } = this.state;

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
                    open={logDetailModalOpen}
                    onClose={this.logDetailModalClose}
                    closeOnEscape={closeOnEscape}
                    closeOnDimmerClick={closeOnDimmerClick}>
                    <Modal.Header>Log Detail</Modal.Header>
                    <Modal.Content>
                        <Grid celled='internally'>
                            <Grid.Row>
                                <Grid.Column verticalAlign='middle' width={2}>
                                    Date
                                </Grid.Column>
                                <Grid.Column floated='left' verticalAlign='middle' width={8}>
                                    {logData[0]}
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column verticalAlign='middle' width={2}>
                                    Log Level
                                </Grid.Column>
                                <Grid.Column floated='left' verticalAlign='middle' width={8}>
                                    {logData[4]}
                            </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column verticalAlign='middle' width={2}>
                                    Log Name
                                </Grid.Column>
                                <Grid.Column floated='left' verticalAlign='middle' width={8}>
                                    {logData[5]}
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column verticalAlign='middle' width={2}>
                                    Log Detail
                                </Grid.Column>
                                <Grid.Column floated='left' verticalAlign='middle' width={8}>
                                    <Form>
                                <TextArea style={{ minHeight: 300, width: '100%' }}
                                    value={logData[6]} />
                                </Form>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button onClick={this.logDetailModalClose} negative>No</Button>
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