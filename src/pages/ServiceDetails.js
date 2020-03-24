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
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';
import RoleData from '../assets/data/RoleData.json';
import axios from 'axios';
import DetailPageTop from '../components/DetailPageTop';
import ListTable from '../components/ListTable';
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import constants from '../utils/constants';
import { format, parse } from 'date-fns';
import Swal from 'sweetalert2'

class ServiceDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            //Service info
            service: {
                id: 0,
                name: '',
                role: '',
                openDate: '',
                endPoint: '',
                siteId: 0,
                siteName: ''
            },
            //Modify service modal
            modifyServiceModalOpen: false,
            siteOption: [],
            siteIdModified: 0,
            siteNameModified: '',
            serviceNameModified: '',
            openDateModified: '',
            roleModified: '',
            endpointModified: '',
            //Add instance modal
            serviceOption: [],
            addInstanceModalOpen: false,
            //Instance list
            totalCount: 0,
            pageCount: 0,
            listTableData: [],
        };

        let serviceId = props.location.state;
        this.getServiceInfo(serviceId);
    }

    //Service info
    getServiceInfo = (id) => {
        const url = `/api/services/${id}`;
        try {
            axios.get(url).then(response => {
                this.setState({ service: response.data.result })
            });
        } catch (error) {
            console.log(error);
        }
    }

    //Modify Service Event
    handleOnClickDetailPageTopModifyButton = (currentModifyingService, event) => {
        if (event) this.setState({ modifyServiceModalOpen: true, ...currentModifyingService });
    }

    //Modify Service Event
    handleOnClickModifyServiceModalCloseButton = () => this.setState({ modifyServiceModalOpen: false });

    //Modify Service Event
    handleOnChangeSiteNameModifyServiceModal = (event, data) => {
        this.setState({ siteIdModified: data.value });
    }

    //Modify Service Event
    handleOnChangeServiceNameModifyServiceModal = (event, data) => {
        this.setState({ serviceNameModified: data.value });
    }

    //Modify Service Event
    handleOnChangeRoleModifyServiceModal = (event, data) => {
        this.setState({ roleModified: data.value });
    }

    //Modify Service Event
    handleOnChangeOpenDateModifyServiceModal = (event, data) => {
        this.setState({ openDateModified: data.value });
    }

    //Modify Service Event
    handleOnChangeEndpointModifyServiceModal = (event, data) => {
        this.setState({ endpointModified: data.value });
    }

    //Modify Service Event
    handleOnClickModifyServiceModalModifyButton = () => {
        const {
            serviceNameModified,
            openDateModified,
            roleModified,
            endpointModified
        } = this.state;

        axios.put(`/api/services/${this.props.location.state}`, {
            name: serviceNameModified,
            role: roleModified,
            openDate: format(openDateModified, constants.DATE_FORMAT),
            endpoint: endpointModified
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(() => {
            this.setState({
                modifyServiceModalOpen: false,
                siteIdModified: 0,
                siteNameModified: '',
                serviceNameModified: '',
                openDateModified: '',
                roleModified: '',
                endpointModified: '',
            });
            this.getServiceInfo(this.props.location.state);
        })
    }

    //Add Instance event
    handleAddInstanceButton = (v, e) => {
        if (e) this.setState({ addInstanceModalOpen: true });
    }

    //Add Instance event
    addInstanceModalClose = () => this.setState({ addInstanceModalOpen: false });

    //Breadcrumb event
    handleOnClickBreadcrumb = (id) => {
        this.props.history.push({
            pathname: `/home/sites/sitedetails/${id}`,
            state: id
        });
    }

    //Delete Service Event 
    handleOnClickDetailPageTopDeleteButton = (event, data) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        }).then((result) => {
            if (result.value) {
                axios.delete(`/api/services/${this.props.location.state}`)
                    .then(() => {
                        Swal.fire(
                            'Deleted!',
                            `${this.state.service.name} has been deleted.`,
                            'success'
                        )
                        this.props.history.push({
                            pathname: '/home/services'
                        });
                    }).catch(error => {
                        if (error.response.status === 409)
                            Swal.fire(
                                'Error',
                                'You cannot delete the service has the instance(s)',
                                'error'
                            )
                    })
            }
        })
    }

    //Instance list
    onFetchData = (condition) => {
        console.log(condition)
        let searchCondition = condition.search;
        let pageIndex = condition.pageIndex + 1;
        let pageSize = condition.pageSize;
        let sortBy = condition.sortBy;
        let url = `/api/instances?perPage=${pageSize}&page=${pageIndex}&serviceId=${this.props.location.state}`;

        if (sortBy.length !== 0) {
            let sortCondition = '';
            sortBy.map((value, index) => {
                console.log(index)
                let orderBy = 'asc'
                if (value.desc) orderBy = 'desc'
                if (index === 0) {
                    return sortCondition = sortCondition.concat('&sort=' + value.id + '+' + orderBy)
                }
                sortCondition = sortCondition.concat(',' + value.id + '+' + orderBy);
            });
            console.log(sortCondition)
            url = url.concat(sortCondition);
        }

        if (searchCondition) url = url.concat(searchCondition)
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

    //Instance list
    handleInstanceNameClick = (cellValue) => {
        const id = cellValue.row.values.id;
        this.props.history.push({
            pathname: `/home/instances/instancedetails/${id}`,
            state: id
        });
    }

    render() {
        const {
            addInstanceModalOpen,
            closeOnEscape,
            closeOnDimmerClick,
            service,
            listTableData,
            totalCount,
            searchCondition,
            pageCount,
            modifyServiceModalOpen,
            siteNameModified,
            serviceNameModified,
            openDateModified,
            roleModified,
            endpointModified
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
            <div style={{ marginTop: '4em', width: '80%', marginLeft: 'auto', marginRight: 'auto' }}>
                <Grid columns={2} style={{ marginBottom: '0em', marginLeft: '4em', marginRight: '4em' }} >
                    <Grid.Row columns={1}>
                        <Grid.Column>
                            <DetailPageTop
                                headerList={[
                                    {
                                        name: service.siteName,
                                        id: service.siteId,
                                        onClick: this.handleOnClickBreadcrumb
                                    },
                                    {
                                        name: service.name,
                                        id: service.id,
                                        onClick: () => { }
                                    }
                                ]}
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
                                ]}
                                deleteButtonOnClick={this.handleOnClickDetailPageTopDeleteButton}
                                modifyButtonOnClick={(currentModifyingService, event) => this.handleOnClickDetailPageTopModifyButton({
                                    siteIdModified: service.siteId,
                                    siteNameModified: service.siteName,
                                    serviceIdModified: service.id,
                                    serviceNameModified: service.name,
                                    roleModified: service.role,
                                    openDateModified: parse(service.openDate, constants.DATE_FORMAT, new Date()),
                                    endpointModified: service.endpoint
                                }, event)}
                            />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={2}>
                        <Grid.Column floated='left' verticalAlign='bottom' width={5}>
                            <Header as='h3'><Icon name='list alternate outline' />Instance List</Header>
                        </Grid.Column>
                        <Grid.Column floated='right' verticalAlign='bottom' width={5}>
                            <Button color='blue' icon='plus' content='Add instance' floated='right' onClick={(v, e) => this.handleAddInstanceButton(v, e)} />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={1}>
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
                    open={modifyServiceModalOpen}
                    onClose={this.handleOnClickModifyServiceModalCloseButton}
                    closeOnEscape={closeOnEscape}
                    closeOnDimmerClick={closeOnDimmerClick}>
                    <Modal.Header>Modify Service</Modal.Header>
                    <Modal.Content>
                        <Form>
                            <Form.Group widths='equal'>
                                <Form.Input
                                    label='Site Name'
                                    value={siteNameModified}
                                    readOnly
                                    onChange={this.handleOnChangeSiteNameModifyServiceModal}
                                />
                            </Form.Group>
                            <Form.Group widths='equal'>
                                <Form.Input
                                    fluid
                                    label='Service name'
                                    value={serviceNameModified}
                                    onChange={this.handleOnChangeServiceNameModifyServiceModal}
                                />
                            </Form.Group>
                            <Form.Group widths='equal'>
                                <Form.Field
                                    control={Select}
                                    label='Role'
                                    options={RoleData.roles}
                                    value={roleModified}
                                    onChange={this.handleOnChangeRoleModifyServiceModal}
                                />
                            </Form.Group>
                            <Form.Group widths='equal'>
                                <SemanticDatepicker
                                    label='Open date'
                                    datePickerOnly={true}
                                    value={openDateModified}
                                    onChange={this.handleOnChangeOpenDateModifyServiceModal}
                                />
                            </Form.Group>
                            <Form.Group widths='equal'>
                                <Form.Input
                                    fluid
                                    label='Endpoint'
                                    value={endpointModified}
                                    onChange={this.handleOnChangeEndpointModifyServiceModal}
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button
                            onClick={this.handleOnClickModifyServiceModalCloseButton}
                            negative
                            content='Close'
                        />
                        <Button
                            onClick={this.handleOnClickModifyServiceModalModifyButton}
                            positive
                            labelPosition='right'
                            icon='checkmark'
                            content='Modify'
                        />
                    </Modal.Actions>
                </Modal>
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
                                <Form.Input
                                    fluid
                                    label='Instance name'
                                    placeholder='service name + instance name + #x'
                                />
                            </Form.Group>
                            <Form.Group widths='equal'>
                                <Form.Input
                                    fluid
                                    label='Endpoint'
                                    placeholder='https://example.com/'
                                />
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
            </div>
        )
    }
};

export default ServiceDetails;