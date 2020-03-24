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
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';
import RoleData from '../assets/data/RoleData.json';
import PageTitle from '../components/PageTitle';
import axios from 'axios';
import { format } from 'date-fns';
import ListTable from '../components/ListTable';
import constants from '../utils/constants';

class ServiceList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //Service list
            totalCount: 0,
            listTableData: [],
            //Search
            siteName: '',
            beginDate: '',
            endDate: '',
            role: '',
            searchCondition: '',
            //Add service modal
            addServiceModalOpen: false,
            siteOption: [],
            siteIdAdded: 0,
            serviceNameAdded: '',
            openDateAdded: '',
            roleAdded: '',
            endpointAdded: ''
        };

        this.getSiteNameList();
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
    onChangeBeginDateField = (event, { beginDate, value }) => this.setState({ beginDate: value });

    //Search
    onChangeEndDateField = (event, { endDate, value }) => this.setState({ endDate: value });

    //Search
    onChangeSiteNameField = (event, { siteName, value }) => this.setState({ siteName: value });

    //Search
    onChangeRoleField = (event, { role, value }) => this.setState({ role: value });

    //Search
    handleOnClickClearButton = (v, e) => this.setState({
        siteName: '',
        beginDate: '',
        endDate: '',
        role: ''
    });

    //Search
    handleOnClickSearchButton = () => {
        console.log('searchbuttonclick')
        const { siteName, beginDate, endDate, role } = this.state;
        let siteNameSearchCondition = siteName ? 'siteId=' + siteName : '';
        let beginDateSearchCondition = beginDate ? 'openDateStart=' + format(new Date(beginDate), 'yyyy-MM-dd') : '';
        let endDateSearchCondition = endDate ? 'openDateEnd=' + format(new Date(endDate), 'yyyy-MM-dd') : '';
        let roleSearchCondition = role ? 'role=' + role : '';
        let arr = [];
        arr.push(siteNameSearchCondition, beginDateSearchCondition, endDateSearchCondition, roleSearchCondition)
        let searchCondition = '';
        arr.map((value, index) => {
            if (value !== '') searchCondition = searchCondition.concat('&' + value);
        });

        this.setState({ searchCondition });
    }

    //Add Service Event
    handleOnClickAddServiceButton = (event, data) => {
        if (event) this.setState({ addServiceModalOpen: true });
    }

    //Add Service Event
    handleOnChangeSiteNameAddServiceModal = (event, data) => {
        this.setState({ siteIdAdded: data.value });
    }

    //Add Service Event
    handleOnChangeServiceNameAddServiceModal = (event, data) => {
        this.setState({ serviceNameAdded: data.value });
    }

    //Add Service Event
    handleOnChangeRoleAddServiceModal = (event, data) => {
        this.setState({ roleAdded: data.value });
    }

    //Add Service Event
    handleOnChangeOpenDateAddServiceModal = (event, data) => {
        this.setState({ openDateAdded: data.value });
    }

    //Add Service Event
    handleOnChangeEndpointAddServiceModal = (event, data) => {
        this.setState({ endpointAdded: data.value });
    }

    //Add Service Event
    handleOnClickAddServiceModalAddButton = () => {
        const { siteIdAdded, serviceNameAdded, openDateAdded, roleAdded, endpointAdded } = this.state;

        console.log({
            siteIdAdded,
            serviceNameAdded,
            openDateAdded,
            roleAdded,
            endpointAdded
        });

        axios.post('/api/services', {
            siteId: siteIdAdded,
            name: serviceNameAdded,
            role: roleAdded,
            openDate: format(openDateAdded, constants.DATE_FORMAT),
            endpoint: endpointAdded
        })
            .then(() => {
                this.setState({
                    addServiceModalOpen: false,
                    siteIdAdded: 0,
                    serviceNameAdded: '',
                    openDateAdded: '',
                    roleAdded: '',
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

    //Add Service Event
    handleOnClickAddServiceModalCloseButton = () => this.setState({ addServiceModalOpen: false });

    //Service List
    handleOnClickServiceListServiceName = (cellValue) => {
        const id = cellValue.row.values.id;
        this.props.history.push({
            pathname: `/home/services/servicedetails/${id}`,
            state: id
        });
    }

    //Service List
    onFetchData = (condition) => {
        console.log('onfetchdata:', condition)
        let searchCondition = condition.search;
        let pageIndex = condition.pageIndex + 1;
        let pageSize = condition.pageSize;
        let sortBy = condition.sortBy;
        let url = `/api/services?perPage=${pageSize}&page=${pageIndex}`;

        if (sortBy.length != 0) {
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
            siteOption,
            addServiceModalOpen,
            closeOnEscape,
            closeOnDimmerClick,
            siteName,
            beginDate,
            endDate,
            role
        } = this.state;

        const columns = [
            {
                Header: 'Id',
                accessor: 'id',
                show: false
            },
            {
                Header: 'Service name',
                accessor: 'name'
            },
            {
                Header: 'Role',
                accessor: 'role',
            },
            {
                Header: 'Site name',
                accessor: 'siteName'
            },
            {
                Header: 'Open date',
                accessor: 'openDate'
            },
            {
                Header: 'Endpoint',
                accessor: 'endpoint'
            }
        ]

        return (
            <div style={{ marginTop: '4em', width: '70%', marginLeft: 'auto', marginRight: 'auto' }}>
                <Grid>
                    <Grid.Row>
                        <Grid.Column>
                            <PageTitle
                                title='Services'
                                description='Autoever DID hub 에 등록된 모든 Service들을 보여줍니다.'
                                iconName='setting'
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
                                        <SemanticDatepicker
                                            fluid
                                            label='Begin date'
                                            datePickerOnly={true}
                                            onChange={this.onChangeBeginDateField}
                                            value={beginDate}
                                        />
                                        <SemanticDatepicker
                                            fluid
                                            label='End date'
                                            datePickerOnly={true}
                                            onChange={this.onChangeEndDateField}
                                            value={endDate}
                                        />
                                    </Form.Group>
                                    <Form.Group widths='equal'>
                                        <Form.Field
                                            control={Select}
                                            label='Role'
                                            options={RoleData.roles}
                                            placeholder='Role'
                                            value={role}
                                            onChange={this.onChangeRoleField}
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
                            <Header as='h3'><Icon name='list alternate outline' />Service List</Header>
                        </Grid.Column>
                        <Grid.Column floated='right' verticalAlign='bottom' width={5}>
                            <Button
                                color='blue'
                                icon='plus'
                                content='Add service'
                                floated='right'
                                onClick={(v, e) => this.handleOnClickAddServiceButton(v, e)}
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
                                onClick={(cellValue) => this.handleOnClickServiceListServiceName(cellValue)}
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
                    onClose={this.handleOnClickAddServiceModalCloseButton}
                    closeOnEscape={closeOnEscape}
                    closeOnDimmerClick={closeOnDimmerClick}>
                    <Modal.Header>Add Service</Modal.Header>
                    <Modal.Content>
                        <Form>
                            <Form.Group widths='equal'>
                                <Form.Field
                                    control={Select}
                                    label='Site Name'
                                    options={siteOption}
                                    placeholder='Site name'
                                    onChange={this.handleOnChangeSiteNameAddServiceModal}
                                />
                            </Form.Group>
                            <Form.Group widths='equal'>
                                <Form.Input
                                    fluid
                                    label='Service name'
                                    placeholder='Service name'
                                    onChange={this.handleOnChangeServiceNameAddServiceModal}
                                />
                            </Form.Group>
                            <Form.Group widths='equal'>
                                <Form.Field
                                    control={Select}
                                    label='Role'
                                    options={RoleData.roles}
                                    placeholder='Role'
                                    onChange={this.handleOnChangeRoleAddServiceModal}
                                />
                            </Form.Group>
                            <Form.Group widths='equal'>
                                <SemanticDatepicker
                                    label='Open date'
                                    datePickerOnly={true}
                                    onChange={this.handleOnChangeOpenDateAddServiceModal}
                                />
                            </Form.Group>
                            <Form.Group widths='equal'>
                                <Form.Input
                                    fluid
                                    label='Endpoint'
                                    placeholder='https://example.com/'
                                    onChange={this.handleOnChangeEndpointAddServiceModal}
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button
                            onClick={this.handleOnClickAddServiceModalCloseButton}
                            negative
                            content='Close'
                        />
                        <Button
                            onClick={this.handleOnClickAddServiceModalAddButton}
                            positive
                            labelPosition='right'
                            icon='checkmark'
                            content='Add'
                        />
                    </Modal.Actions>
                </Modal>
            </div>
        );
    }
};

export default ServiceList;