import React, { Component } from 'react';
import {
    Button,
    Form,
    Segment,
    Header,
    Modal,
    Grid,
    Icon,
    TextArea,
    Select,
    Divider
} from 'semantic-ui-react';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';
import { DateTimeInput } from 'semantic-ui-calendar-react';
import PageTitle from '../components/PageTitle';
import axios from 'axios';
import LogLevelData from '../assets/data/LogLevelData.json';
import LogNameData from '../assets/data/LogNameData.json';
import { format } from 'date-fns';
import ListTable from '../components/ListTable';


class LogList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentDate: null,
            open: false,
            logDetailModalOpen: false,
            siteOption: [],
            serviceOption: [],
            instanceOption: [],
            logLevelOption: [],
            logData: {},
            occurredStartDate: '',
            occurredEndDate: '',
            siteName: '',
            serviceName: '',
            instanceName: '',
            logLevel: '',
            logName: '',
            logDetail: '',
            listTableData: [],
            searchCondition: '',
            totalCount: 0
        };

        this.getSiteNameList();
        this.getServiceNameList();
        this.getInstanceNameList();
    }

    onOccurredStartDateFieldChange = (event, { occurredStartDate, value }) => this.setState({ occurredStartDate: value });

    onOccurredEndDateFieldChange = (event, { occurredEndDate, value }) => this.setState({ occurredEndDate: value });

    onSiteNameFieldChange = (event, { siteName, value }) => this.setState({ siteName: value });

    onServiceNameFieldChange = (event, { serviceName, value }) => this.setState({ serviceName: value });

    onInstanceNameFieldChange = (event, { instanceName, value }) => this.setState({ instanceName: value });

    onLogLevelFieldChange = (event, { logLevel, value }) => this.setState({ logLevel: value });

    onLogNameFieldChange = (event, { logName, value }) => this.setState({ logName: value });

    onLogDetailFieldChange = (event, { logDetail, value }) => this.setState({ logDetail: value });

    handleOnClearButtonClick = (v, e) => this.setState({
        occurredStartDate: '',
        occurredEndDate: '',
        siteName: '',
        serviceName: '',
        instanceName: '',
        logLevel: '',
        logName: '',
        logDetail: ''
    });

    handleOnSearchButtonClick = () => {
        const {
            occurredStartDate,
            occurredEndDate,
            siteName,
            serviceName,
            instanceName,
            logLevel,
            logName,
            logDetail } = this.state;

        let siteNameSearchCondition = !siteName ? '' : siteName === 'All' ? '' : 'siteId=' + siteName;
        let serviceNameSearchCondition = !serviceName ? '' : serviceName === 'All' ? '' : 'serviceId=' + serviceName;
        let instanceNameSearchCondition = !instanceName ? '' : instanceName === 'All' ? '' : 'instanceId=' + instanceName;
        let occurredStartDateSearchCondition = occurredStartDate ? 'occurredDateStart=' + format(new Date(occurredStartDate), 'yyyy-MM-dd+HH:mm') : '';
        let occurredEndDateSearchCondition = occurredEndDate ? 'occurredDateEnd=' + format(new Date(occurredEndDate), 'yyyy-MM-dd+HH:mm') : '';
        let logLevelSearchCondition = !logLevel ? '' : logLevel === 'All' ? '' : 'logLevel=' + logLevel;
        let logNameSearchCondition = !logName ? '' : logName === 'All' ? '' : 'logName=' + logName;
        let logDetailSearchCondition = !logDetail ? '' : logDetail === 'All' ? '' : 'logDetail=' + logDetail;

        let arr = [];
        arr.push(
            siteNameSearchCondition,
            serviceNameSearchCondition,
            instanceNameSearchCondition,
            occurredStartDateSearchCondition,
            occurredEndDateSearchCondition,
            logLevelSearchCondition,
            logNameSearchCondition,
            logDetailSearchCondition
        )
        let searchCondition = '';
        arr.map((value, index) => {
            if (value === '') return;
            searchCondition = searchCondition.concat('&' + value);
        });

        this.setState({
            searchCondition
        })
    }

    handleOnFixedRangeButtonClick = (range) => {
        let now = format(new Date(), 'yyyy-MM-dd+HH:mm');
        let beforeXmins = format(new Date().setMinutes(new Date().getMinutes() - range), 'yyyy-MM-dd+HH:mm');
        let occurredStartDateSearchCondition = 'occurredDateStart=' + beforeXmins;
        let occurredEndDateSearchCondition = 'occurredDateEnd=' + now;
        let arr = [];

        arr.push(
            occurredStartDateSearchCondition,
            occurredEndDateSearchCondition
        )
        let searchCondition = '';
        arr.map((value, index) => {
            if (value === '') return;
            searchCondition = searchCondition.concat('&' + value);
        });

        this.setState({ searchCondition });
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

    getInstanceNameList = () => {
        const url = '/api/instances';
        let instanceOption = [{
            key: 'All',
            text: '전체',
            value: 'All'
        }];

        try {
            axios.get(url).then(response => {
                response.data.result.map((instance) => {
                    instanceOption.push({
                        key: instance.name,
                        text: instance.name,
                        value: instance.id
                    });
                });

                this.setState({
                    instanceOption
                })
            });
        } catch (error) {
            console.log(error);
        }
    }

    closeConfigShow = (closeOnEscape, closeOnDimmerClick) => () => {
        this.setState({ closeOnEscape, closeOnDimmerClick, open: true })
    }

    handleOccuredDateClick = (cellValue) => {
        const id = cellValue.row.values.id;
        const url = `/api/logs/${id}`;
        try {
            axios.get(url).then(response => {
                this.setState({
                    logDetailModalOpen: true,
                    logData: response.data.result
                });
            })
        } catch (error) {
            console.log(error);
        }
    }

    handleAddServiceButton = (v, e) => {
        if (e) this.setState({ logDetailModalOpen: true });
    }

    logDetailModalClose = () => this.setState({ logDetailModalOpen: false });

    onFetchData = (condition) => {
        console.log('onfetchdata:',condition)
        let searchCondition = condition.search;
        let pageIndex = condition.pageIndex + 1;
        let pageSize = condition.pageSize;
        let sortBy = condition.sortBy;
        let url = `/api/logs?perPage=${pageSize}&page=${pageIndex}`;

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

    handlePagination = (value) => {
        alert(value)
    }

    render() {
        const {
            listTableData,
            pageCount,
            logData,
            siteOption,
            serviceOption,
            instanceOption,
            logDetailModalOpen,
            closeOnEscape,
            closeOnDimmerClick,
            occurredStartDate,
            occurredEndDate,
            siteName,
            serviceName,
            instanceName,
            logLevel,
            logName,
            logDetail,
            searchCondition,
            totalCount
        } = this.state;

        console.log(searchCondition)

        const columns = [
            {
                Header: 'Id',
                accessor: 'id',
                show: false
            },
            {
                Header: 'Date',
                accessor: 'occurredDate'
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
                Header: 'Instance name',
                accessor: 'instanceName'
            },
            {
                Header: 'Log level',
                accessor: 'logLevel'
            },
            {
                Header: 'Log name',
                accessor: 'logName'
            },
            {
                Header: 'Log detail',
                accessor: 'logDetail'
            }
        ]

        return (
            <div style={{ marginTop: '4em', width: '70%', marginLeft: 'auto', marginRight: 'auto' }}>
                <Grid>
                    {/* Header */}
                    <Grid.Row>
                        <Grid.Column>
                            <PageTitle
                                title='Logs'
                                description='Autoever DID hub 에서 발생한 모든 log를 보여줍니다.'
                                iconName='heartbeat'
                            />
                        </Grid.Column>
                    </Grid.Row>
                    {/* Search Area */}
                    <Grid.Row>
                        <Grid.Column verticalAlign='bottom'>
                            <Segment>
                                <Form>
                                    <Form.Group widths='equal'>
                                        <DateTimeInput
                                            label='Start date'
                                            dateTimeFormat='YYYY-MM-DD HH:mm'
                                            name="Startdate"
                                            placeholder="YYYY-MM-DD HH:mm"
                                            value={occurredStartDate}
                                            iconPosition="right"
                                            onChange={this.onOccurredStartDateFieldChange}
                                        />
                                        <DateTimeInput
                                            label='End date'
                                            dateTimeFormat='YYYY-MM-DD HH:mm'
                                            name="Enddate"
                                            placeholder="YYYY-MM-DD HH:mm"
                                            value={occurredEndDate}
                                            iconPosition="right"
                                            onChange={this.onOccurredEndDateFieldChange}
                                        />
                                        <div style={{ paddingTop: '23px', width: '100%' }}>
                                            <Button.Group widths='4' size='small' compact style={{ height: '38px' }}>
                                                <Button onClick={() => this.handleOnFixedRangeButtonClick(60)}>60 min</Button>
                                                <Button onClick={() => this.handleOnFixedRangeButtonClick(1440)}>1 day</Button>
                                                <Button onClick={() => this.handleOnFixedRangeButtonClick(10080)}>1 week</Button>
                                                <Button onClick={() => this.handleOnFixedRangeButtonClick(43200)}>1 month</Button>
                                            </Button.Group>
                                        </div>
                                    </Form.Group>
                                    <Form.Group widths='equal'>
                                        <Form.Field
                                            control={Select}
                                            label='Site Name'
                                            options={siteOption}
                                            placeholder='Site name'
                                            onChange={this.onSiteNameFieldChange}
                                            value={siteName}
                                        />
                                        <Form.Field
                                            control={Select}
                                            label='Service Name'
                                            options={serviceOption}
                                            placeholder='Service name'
                                            onChange={this.onServiceNameFieldChange}
                                            value={serviceName}
                                        />
                                        <Form.Field
                                            control={Select}
                                            label='Instance Name'
                                            options={instanceOption}
                                            placeholder='Instance name'
                                            onChange={this.onInstanceNameFieldChange}
                                            value={instanceName}
                                        />
                                    </Form.Group>
                                    <Form.Group widths='equal'>
                                        <Form.Field
                                            control={Select}
                                            label='Log Level'
                                            options={LogLevelData.levels}
                                            placeholder='Log Level'
                                            onChange={this.onLogLevelFieldChange}
                                            value={logLevel}
                                        />
                                        <Form.Field
                                            control={Select}
                                            label='Log Name'
                                            options={LogNameData.names}
                                            placeholder='Log Name'
                                            onChange={this.onLogNameFieldChange}
                                            value={logName}
                                        />
                                        <Form.Input
                                            fluid
                                            label='Log Detail'
                                            placeholder='details'
                                            onChange={this.onLogDetailFieldChange}
                                            value={logDetail}
                                        />
                                    </Form.Group>
                                    <Button onClick={this.handleOnSearchButtonClick}>Search</Button>
                                    <Button onClick={this.handleOnClearButtonClick}>Clear</Button>
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
                                link={6}
                                columns={columns}
                                data={listTableData}
                                count={10}
                                onClick={(cellValue) => this.handleOccuredDateClick(cellValue)}
                                onFetchData={this.onFetchData}
                                pageCount={pageCount}
                                search={searchCondition}
                                totalCount={totalCount}
                            />
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
                                    {logData.occurredDate}
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column verticalAlign='middle' width={2}>
                                    Log Level
                                </Grid.Column>
                                <Grid.Column floated='left' verticalAlign='middle' width={8}>
                                    {logData.logLevel}
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column verticalAlign='middle' width={2}>
                                    Log Name
                                </Grid.Column>
                                <Grid.Column floated='left' verticalAlign='middle' width={8}>
                                    {logData.logName}
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column verticalAlign='middle' width={2}>
                                    Log Detail
                                </Grid.Column>
                                <Grid.Column floated='left' verticalAlign='middle' width={8}>
                                    <Form>
                                        <TextArea style={{ minHeight: 300, width: '100%' }}
                                            value={logData.logDetail} />
                                    </Form>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button onClick={this.logDetailModalClose} negative>Close</Button>
                    </Modal.Actions>
                </Modal>
            </div>
        );
    }
};

export default LogList;