import React, { Component } from 'react';
import { Button, Form, Segment, Header, Modal, Grid, Icon, Select, Divider } from 'semantic-ui-react';
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';
import RoleData from '../assets/data/RoleData.json';
import PageTitle from '../components/PageTitle';
import axios from 'axios';
import { format } from 'date-fns';
import ListTable from '../components/ListTable';

class ServiceList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate: null,
            open: false,
            totalCount: 4,
            addServiceModalOpen: false,
            siteOption: [],
            siteName: '',
            beginDate: '',
            endDate: '',
            role: '',
            listTableData: [{}]
        };

        this.getServiceList();
        this.getSiteNameList();
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

    getServiceList = (searchCondition) => {
        let url = '/api/services?perPage=10&page=1&sort=name+asc,role+asc,numberOfInstances+desc,openDate+asc,endpoint+asc';
        if (searchCondition)
            url = url + searchCondition;

        let listTableData = [{}];

        try {
            axios.get(url).then(response => {
                response.data.result.map((service) => {
                    listTableData.push({
                        id: service.id,
                        name: service.name, 
                        role: service.role, 
                        siteName: service.siteName, 
                        openDate: service.openDate, 
                        endpoint: service.endpoint
                    });
                });
                
                listTableData.splice(0, 1);
                this.setState({
                    listTableData,
                });

            });
        } catch (error) {
            console.log(error);
        }
    }

    onBeginDateFieldChange = (event, { beginDate, value }) => {
        this.setState({ beginDate: value });
    }

    onEndDateFieldChange = (event, { endDate, value }) => {
        this.setState({ endDate: value });
    }

    onSiteNameFieldChange = (event, { siteName, value }) => this.setState({ siteName: value });

    onRoleFieldChange = (event, { role, value }) => this.setState({ role: value });

    handleOnClearButtonClick = (v, e) => this.setState({ siteName: '', beginDate: '', endDate: '', role: '' });

    handleOnSearchButtonClick = () => {
        const { siteName, beginDate, endDate, role } = this.state;
        let siteNameSearchCondition = siteName ? 'siteId=' + siteName : '';
        let beginDateSearchCondition = beginDate ? 'openDateStart=' + format(new Date(beginDate), 'yyyy-MM-dd') : '';
        let endDateSearchCondition = endDate ? 'openDateEnd=' + format(new Date(endDate), 'yyyy-MM-dd') : '';
        let roleSearchCondition = role ? 'role=' + role : '';
        let arr = [];
        arr.push(siteNameSearchCondition, beginDateSearchCondition, endDateSearchCondition, roleSearchCondition)
        let searchCondition = '';
        arr.map((value, index) => {
            if (value === '') return;
            searchCondition = searchCondition.concat('&' + value);
        });

        this.getServiceList(searchCondition);
    }

    closeConfigShow = (closeOnEscape, closeOnDimmerClick) => () => {
        this.setState({ closeOnEscape, closeOnDimmerClick, open: true })
    }

    close = () => this.setState({ open: false });

    handleAddServiceButton = (v, e) => {
        if (e) this.setState({ addServiceModalOpen: true });
    }

    addSiteModalClose = () => this.setState({ addServiceModalOpen: false });

    handleServiceNameClick = (cellValue) => {
        const id = cellValue.row.values.id;
        this.props.history.push({
            pathname: `/home/services/servicedetails/${id}`,
            state: id
        });
    }


    render() {
        const { listTableData, siteOption, addServiceModalOpen, closeOnEscape, closeOnDimmerClick, siteName, beginDate, endDate, role } = this.state;
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
                                <Form onSubmit={this.handleOnSearchButtonClick}>
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
                                        <SemanticDatepicker
                                            fluid
                                            label='Begin date'
                                            datePickerOnly={true}
                                            onChange={this.onBeginDateFieldChange}
                                            value={beginDate}
                                        />
                                        <SemanticDatepicker
                                            fluid
                                            label='End date'
                                            datePickerOnly={true}
                                            onChange={this.onEndDateFieldChange}
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
                                            onChange={this.onRoleFieldChange}
                                        />
                                    </Form.Group>
                                    <Button type='submit'>Search</Button>
                                    <Button onClick={this.handleOnClearButtonClick}>Clear</Button>
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
                            <Button color='blue' icon='plus' content='Add service' floated='right' onClick={(v, e) => this.handleAddServiceButton(v, e)} />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <ListTable
                                link={0}
                                columns={columns}
                                data={listTableData}
                                count={10}
                                onClick={(cellValue) => this.handleServiceNameClick(cellValue)}
                            />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <Modal
                    open={addServiceModalOpen}
                    onClose={this.addSiteModalClose}
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
                                <SemanticDatepicker label='Open date' datePickerOnly={true} onChange={this.onChange} />
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

export default ServiceList;