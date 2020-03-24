import React, { Component } from 'react';
import {
    Button,
    Form,
    Header,
    Modal,
    Grid,
    Icon,
    Select
} from 'semantic-ui-react';
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';
import axios from 'axios';
import RoleData from '../assets/data/RoleData.json';
import DetailPageTop from '../components/DetailPageTop';
import ListTable from '../components/ListTable';
import { format } from 'date-fns';
import constants from '../utils/constants';

class SiteDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //Site info
            site: {
                id: props.location.state,
                name: '',
                openDate: ''
            },
            //Add service modal
            addServiceModalOpen: false,
            siteOption: [],
            siteIdAdded: props.location.state,
            serviceNameAdded: '',
            openDateAdded: '',
            roleAdded: '',
            endpointAdded: '',
            //Service list
            totalCount: 0,
            pageCount: 0,
            listTableData: []
        };

        this.getSiteInfo(props.location.state);
    }

    //Site info
    getSiteInfo = (id) => {
        const url = `/api/sites/${id}`;
        try {
            axios.get(url).then(response => {
                this.setState({ site: response.data.result });
            });
        } catch (error) {
            console.log(error);
        }
    }

    

    handleOnClickDetailPageTopDeleteButton = (event, data) => {

    }

    handleOnClickDetailPageTopModifyButton = (event, data) => {

    }

    //Add Service Event
    handleAddServiceButton = (v, e) => {
        if (e) this.setState({ addServiceModalOpen: true });
    }

    //Add Service Event
    handleOnClickAddServiceModalCloseButton = () => this.setState({ addServiceModalOpen: false });

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
            site,
            addServiceModalOpen,
            closeOnEscape,
            closeOnDimmerClick,
            listTableData,
            pageCount,
            totalCount,
            searchCondition
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
            <div style={{ marginTop: '4em', width: '80%', marginLeft: 'auto', marginRight: 'auto' }}>
                <Grid columns={2} style={{ marginBottom: '0em', marginLeft: '4em', marginRight: '4em' }} >
                    <Grid.Row columns={1}>
                        <Grid.Column>
                            <DetailPageTop
                                headerList={[
                                    {
                                        name: site.name,
                                        id: site.id,
                                        onClick: () => { }
                                    }
                                ]}
                                detailList={[
                                    {
                                        title: 'Site Name',
                                        description: site.name
                                    },
                                    {
                                        title: 'Open Date',
                                        description: site.openDate
                                    }
                                ]}
                                deleteButtonOnClick={this.handleOnClickDetailPageTopDeleteButton}
                                modifyButtonOnClick={this.handleOnClickDetailPageTopModifyButton}
                            />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={2}>
                        <Grid.Column floated='left' verticalAlign='bottom'>
                            <Header as='h3'><Icon name='list alternate outline' />Service List</Header>
                        </Grid.Column>
                        <Grid.Column floated='right' verticalAlign='bottom'>
                            <Button
                                color='blue'
                                icon='plus'
                                content='Add service'
                                floated='right'
                                onClick={(v, e) => this.handleAddServiceButton(v, e)} />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={1}>
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
                                <Form.Input
                                    fluid
                                    label='Site name'
                                    placeholder='Site name'
                                    value={site.name}
                                    readOnly
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
        )
    }
};

export default SiteDetails;