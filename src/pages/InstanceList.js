import React, { Component } from 'react';
import {
    Button,
    Form,
    Segment,
    Header,
    Modal,
    Grid,
    Icon,
    Select,
    Divider
} from 'semantic-ui-react';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';
import InstanceStatusData from '../assets/data/InstanceStatusData.json';
import PageTitle from '../components/PageTitle';
import axios from 'axios';
import ListTable from '../components/ListTable';
import Swal from 'sweetalert2';

class InstanceList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //Instance list
            totalCount: 0,
            listTableData: [],
            //Search
            siteOption: [],
            serviceOption: [],
            siteName: '',
            serviceName: '',
            status: '',
            searchCondition: '',
            //Add instance modal
            addInstanceModalOpen: false,
            siteIdAdded: 0,
            serviceIdAdded: 0,
            roleAdded: '',
            instanceNameAdded: '',
            endpointAdded: '',
            serviceOptionForAddInstance: []
        };

        this.getSiteNameList();
        this.getServiceNameList();
    }

    //Search
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

    //Search
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

    //Search
    onChangeSiteNameField = (event, data) => this.setState({ siteName: data.value });

    //Search
    onChangeServiceNameField = (event, data) => this.setState({ serviceName: data.value });

    //Search
    onChangeStatusField = (event, data) => this.setState({ status: data.value });

    //Search
    handleOnClickClearButton = () => this.setState({
        siteName: '',
        serviceName: '',
        status: ''
    });

    //Search
    handleOnClickSearchButton = () => {
        const { siteName, serviceName, status } = this.state;
        let siteNameSearchCondition = siteName ? 'siteId=' + siteName : '';
        let serviceNameSearchCondition = serviceName ? 'serviceId=' + serviceName : '';
        let statusSearchCondition = status ? 'status=' + status : '';
        let arr = [];
        arr.push(siteNameSearchCondition, serviceNameSearchCondition, statusSearchCondition)
        let searchCondition = '';
        arr.map((value, index) => {
            if (value !== '') return searchCondition = searchCondition.concat('&' + value);
        });

        this.setState({ searchCondition });
    }

    //Add Instance event
    getServiceNameListBySiteId = (id) => {
        const url = `/api/services?siteId=${id}`;
        let { serviceOptionForAddInstance } = this.state;

        try {
            axios.get(url).then(response => {
                if (response.data.result.length < 1) {
                    Swal.fire(
                        'Error',
                        'Add a service on your site first.',
                        'error'
                    );
                    return;
                }

                response.data.result.map((service) => {
                    return serviceOptionForAddInstance.push({
                        key: service.name,
                        text: service.name,
                        value: service.id
                    });
                });

                this.setState({
                    serviceOptionForAddInstance
                })
            });
        } catch (error) {
            console.log(error);
        }
    }

    //Add Instance event
    getRoleByServiceId = (id) => {
        const url = `/api/services/${id}`;

        axios.get(url).then(response => {
            this.setState({ roleAdded: response.data.result.role })
        });
    }

    //Add Instance event
    handleAddInstanceButton = (v, e) => {
        console.log(this.state)
        if (e) this.setState({ addInstanceModalOpen: true });
    }

    //Add Instance event
    handleOnClickAddInstanceModalCloseButton = () => this.setState({ addInstanceModalOpen: false });

    //Add Instance event
    handleOnChangeSiteNameAddInstanceModal = (event, data) => {
        this.setState({ siteIdAdded: data.value }, this.getServiceNameListBySiteId(data.value))
    }

    //Add Instance event
    handleOnChangeServiceNameAddInstanceModal = (event, data) => {
        this.setState({ serviceIdAdded: data.value }, this.getRoleByServiceId(data.value))
    }

    //Add Instance event
    handleOnChangeInstanceNameAddInstanceModal = (event, data) => {
        this.setState({ instanceNameAdded: data.value });
    }

    //Add Instance event
    handleOnChangeEndpointAddInstanceModal = (event, data) => {
        this.setState({ endpointAdded: data.value });
    }

    //Add Instance event
    handleOnClickAddInstanceModalAddButton = () => {
        const { instanceNameAdded, endpointAdded, serviceIdAdded } = this.state;

        axios.post('/api/instances', {
            serviceId: serviceIdAdded,
            name: instanceNameAdded,
            endpoint: endpointAdded
        })
            .then(() => {
                this.setState({
                    addInstanceModalOpen: false,
                    siteIdAdded: 0,
                    serviceIdAdded: 0,
                    roleAdded: '',
                    instanceNameAdded: '',
                    endpointAdded: ''
                });
                this.onFetchData({
                    pageIndex: 0,
                    pageSize: 10,
                    sortBy: [],
                    search: ''
                });
            })

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



    handleInstanceNameClick = (cellValue) => {
        const id = cellValue.row.values.id;
        this.props.history.push({
            pathname: `/home/instances/instancedetails/${id}`,
            state: id
        });
    }

    //Instance list
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
                    return sortCondition = sortCondition.concat('&sort=' + value.id + '+' + orderBy);
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
            serviceOptionForAddInstance,
            addInstanceModalOpen,
            roleAdded,
            closeOnEscape,
            closeOnDimmerClick
        } = this.state;

        let siteOptionForAddInstance = siteOption.slice(1, siteOption.length);

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
                                            onChange={this.onChangeSiteNameField}
                                        />
                                    </Form.Group>
                                    <Form.Group widths='equal'>
                                        <Form.Field
                                            control={Select}
                                            label='Service Name'
                                            options={serviceOption}
                                            placeholder='Service name'
                                            value={serviceName}
                                            onChange={this.onChangeServiceNameField}
                                        />
                                    </Form.Group>
                                    <Form.Group widths='equal'>
                                        <Form.Field
                                            control={Select}
                                            label='Status'
                                            options={InstanceStatusData.status}
                                            placeholder='Status'
                                            value={status}
                                            onChange={this.onChangeStatusField}
                                        />
                                    </Form.Group>
                                    <Button onClick={this.handleOnClickSearchButton}>Search</Button>
                                    <Button onClick={this.handleOnClickClearButton}>Clear</Button>
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
                            <Button
                                color='blue'
                                icon='plus'
                                content='Add instance'
                                floated='right'
                                onClick={this.handleAddInstanceButton}
                            />
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
                    open={addInstanceModalOpen}
                    onClose={this.handleOnClickAddInstanceModalCloseButton}
                    closeOnEscape={closeOnEscape}
                    closeOnDimmerClick={closeOnDimmerClick}>
                    <Modal.Header>Add Instance</Modal.Header>
                    <Modal.Content>
                        <Form>
                            <Form.Group widths='equal'>
                                <Form.Field
                                    control={Select}
                                    label='Site Name'
                                    options={siteOptionForAddInstance}
                                    placeholder='Site name'
                                    onChange={this.handleOnChangeSiteNameAddInstanceModal}
                                />
                            </Form.Group>
                            <Form.Group widths='equal'>
                                <Form.Field
                                    control={Select}
                                    options={serviceOptionForAddInstance}
                                    label='Service name'
                                    placeholder='Select a site name first'
                                    onChange={this.handleOnChangeServiceNameAddInstanceModal}
                                />
                            </Form.Group>
                            <Form.Group widths='equal'>
                                <Form.Input
                                    label='Role'
                                    placeholder='Select a service name first'
                                    value={roleAdded}
                                    readOnly
                                />
                            </Form.Group>
                            <Form.Group widths='equal'>
                                <Form.Input
                                    fluid
                                    label='Instance name'
                                    placeholder='service name + instance name + #x'
                                    onChange={this.handleOnChangeInstanceNameAddInstanceModal}
                                />
                            </Form.Group>
                            <Form.Group widths='equal'>
                                <Form.Input
                                    fluid
                                    label='Endpoint'
                                    placeholder='https://example.com/'
                                    onChange={this.handleOnChangeEndpointAddInstanceModal}
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button
                            onClick={this.handleOnClickAddInstanceModalCloseButton}
                            negative
                            content='Close'
                        />
                        <Button
                            onClick={this.handleOnClickAddInstanceModalAddButton}
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