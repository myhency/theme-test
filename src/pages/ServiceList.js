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

class ServiceList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate: null,
            open: false,
            addServiceModalOpen: false,
            siteOption: [],
            siteName: '',
            beginDate: '',
            endDate: '',
            role: '',
            listTableData: [],
            searchCondition: '',
            totalCount: 0
        };

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

    onBeginDateFieldChange = (event, { beginDate, value }) => this.setState({ beginDate: value });

    onEndDateFieldChange = (event, { endDate, value }) => this.setState({ endDate: value });

    onSiteNameFieldChange = (event, { siteName, value }) => this.setState({ siteName: value });

    onRoleFieldChange = (event, { role, value }) => this.setState({ role: value });

    handleOnClearButtonClick = (v, e) => this.setState({
        siteName: '',
        beginDate: '',
        endDate: '',
        role: ''
    });

    handleOnSearchButtonClick = () => {
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
            if (value === '') return;
            searchCondition = searchCondition.concat('&' + value);
        });

        this.setState({ searchCondition });
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

    onFetchData = (condition) => {
        console.log('onfetchdata:',condition)
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
            siteOption, 
            addServiceModalOpen, 
            closeOnEscape, 
            closeOnDimmerClick, 
            siteName, 
            beginDate, 
            endDate, 
            role } = this.state;

        console.log(searchCondition)

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
                                    <Button onClick={this.handleOnSearchButtonClick}>Search</Button>
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