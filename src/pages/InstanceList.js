import React, { Component } from 'react';
import { Button, Form, Segment, Header, Modal, Grid, Icon, Select, Divider } from 'semantic-ui-react';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';
import RoleData from '../assets/data/RoleData.json';
import InstanceStatusData from '../assets/data/InstanceStatusData.json';
import PageTitle from '../components/PageTitle';
import axios from 'axios';
import ListTable from '../components/ListTable';

class InstanceList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate: null,
            open: false,
            addServiceModalOpen: false,
            siteOption: [],
            serviceOption: [],
            siteName: '',
            serviceName: '',
            status: '',
            listTableData: [],
            searchCondition: '',
            totalCount: 0
        };

        this.getSiteNameList();
        this.getServiceNameList();
    }

    getSiteNameList = () => {
        const url = '/api/sites';
        let siteOption = [{
            key: 'All',
            text: '전체',
            value: 'All'
        }];

        try {
            axios.get(url).then(response => {
                response.data.result.map((site) => {
                    siteOption.push({
                        key: site.name,
                        text: site.name,
                        value: site.id
                    });
                });

                this.setState({
                    siteOption
                })
            });
        } catch (error) {
            console.log(error);
        }
    }

    getServiceNameList = () => {
        const url = '/api/services';
        let serviceOption = [{
            key: 'All',
            text: '전체',
            value: 'All'
        }];

        try {
            axios.get(url).then(response => {
                response.data.result.map((service) => {
                    serviceOption.push({
                        key: service.name,
                        text: service.name,
                        value: service.id
                    });
                });

                this.setState({
                    serviceOption
                })
            });
        } catch (error) {
            console.log(error);
        }
    }

    onChange = (event, data) => this.setState({ currentDate: data.value });

    closeConfigShow = (closeOnEscape, closeOnDimmerClick) => () => {
        this.setState({ closeOnEscape, closeOnDimmerClick, open: true })
    }

    close = () => this.setState({ open: false });

    handleAddServiceButton = (v, e) => {
        if (e) this.setState({ addServiceModalOpen: true });
    }

    addInstanceModalClose = () => this.setState({ addServiceModalOpen: false });

    onSiteNameFieldChange = (event, { siteName, value }) => this.setState({ siteName: value });

    onServiceNameFieldChange = (event, { serviceName, value }) => this.setState({ serviceName: value });

    onStatusFieldChange = (event, { status, value }) => this.setState({ status: value });

    handleOnClearButtonClick = (v, e) => this.setState({ 
        siteName: '', 
        serviceName: '', 
        status: '' 
    });

    handleOnSearchButtonClick = () => {
        const { siteName, serviceName, status } = this.state;
        let siteNameSearchCondition = siteName ? 'siteId=' + siteName : '';
        let serviceNameSearchCondition = serviceName ? 'serviceId=' + serviceName : '';
        let statusSearchCondition = status ? 'status=' + status : '';
        let arr = [];
        arr.push(siteNameSearchCondition, serviceNameSearchCondition, statusSearchCondition)
        let searchCondition = '';
        arr.map((value, index) => {
            if (value === '') return;
            searchCondition = searchCondition.concat('&' + value);
        });

        this.setState({ searchCondition });
    }

    handleInstanceNameClick = (cellValue) => {
        const id = cellValue.row.values.id;
        this.props.history.push({
            pathname: `/home/instances/instancedetails/${id}`,
            state: id
        });
    }

    onFetchData = (condition) => {
        console.log(condition)
        let searchCondition = condition.search;
        let pageIndex = condition.pageIndex + 1;
        let pageSize = condition.pageSize;
        let sortBy = condition.sortBy;
        let url = `/api/instances?perPage=${pageSize}&page=${pageIndex}`;

        if (sortBy.length !== 0) {
            let sortCondition = '';
            sortBy.map((value, index) => {
                console.log(index)
                let orderBy = 'asc'
                if (value.desc) orderBy = 'desc'
                if (index === 0) {
                    sortCondition = sortCondition.concat('&sort=' + value.id + '+' + orderBy)
                    return;
                }
                sortCondition = sortCondition.concat(',' + value.id + '+' + orderBy);
            });
            console.log(sortCondition)
            url = url.concat(sortCondition);
        }

        url = url.concat(searchCondition)
        console.log(url)

        try {
            axios.get(url).then(response => {
                console.log(response.data);
                this.setState({
                    listTableData: response.data.result,
                    pageCount: response.data.totalPage,
                    totalCount: response.data.totalCount
                });
            });
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        const { 
            totalCount, 
            searchCondition, 
            pageCount, 
            listTableData, 
            siteName, 
            serviceName, 
            status, 
            siteOption, 
            serviceOption, 
            addServiceModalOpen, 
            closeOnEscape, 
            closeOnDimmerClick 
        } = this.state;

        const columns = [
            {
                Header: 'Id',
                accessor: 'id',
                show: false
            },
            {
                Header: 'Instance name',
                accessor: 'name'
            },
            {
                Header: 'Site name',
                accessor: 'siteName',
            },
            {
                Header: 'Service name',
                accessor: 'serviceName'
            },
            {
                Header: 'Endpoint',
                accessor: 'endpoint'
            },
            {
                Header: 'Status',
                accessor: 'status'
            },
        ]

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
                                            value={siteName}
                                            onChange={this.onSiteNameFieldChange}
                                        />
                                    </Form.Group>
                                    <Form.Group widths='equal'>
                                        <Form.Field
                                            control={Select}
                                            label='Service Name'
                                            options={serviceOption}
                                            placeholder='Service name'
                                            value={serviceName}
                                            onChange={this.onServiceNameFieldChange}
                                        />
                                    </Form.Group>
                                    <Form.Group widths='equal'>
                                        <Form.Field
                                            control={Select}
                                            label='Status'
                                            options={InstanceStatusData.status}
                                            placeholder='Status'
                                            value={status}
                                            onChange={this.onStatusFieldChange}
                                        />
                                    </Form.Group>
                                    <Button onClick={this.handleOnSearchButtonClick}>Search</Button>
                                    <Button onClick={this.handleOnClearButtonClick}>Clear</Button>
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
                                link={0}
                                columns={columns}
                                data={listTableData}
                                count={10}
                                onClick={(cellValue) => this.handleInstanceNameClick(cellValue)}
                                onFetchData={this.onFetchData}
                                pageCount={pageCount}
                                search={searchCondition}
                                totalCount={totalCount}
                            />
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
                        <Button onClick={this.addInstanceModalClose} negative>No</Button>
                        <Button
                            onClick={this.addInstanceModalClose}
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