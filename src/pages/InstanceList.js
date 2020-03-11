import React, { Component } from 'react';
import { Button, Form, Segment, Header, Modal, Grid, Icon, Select, Divider, Table, Menu } from 'semantic-ui-react';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';
import ListTable from '../components/ListTable';
import SiteData from '../assets/data/SiteData.json';
import ServiceData from '../assets/data/ServiceData.json';
import InstanceData from '../assets/data/InstanceData.json';
import RoleData from '../assets/data/RoleData.json';
import InstanceStatusData from '../assets/data/InstanceStatusData.json';
import PageTitle from '../components/PageTitle';
import axios from 'axios';

const headers = ['Site name', 'Service name', 'Instance name', 'Endpoint', 'Status'];

const EmptyColumns = (length) => {
    let rows = [];
    let columnLength = length;

    for (let i = columnLength; i < 9; i++) {
        rows.push((
            <Table.Row key={i}>
                <EmptyCells data={columnLength} />
            </Table.Row>
        ))
    }
    return rows;
}

const EmptyCells = (length) => {
    let cells = [];
    let cellDataLength = length;

    for (let i = 0; i < cellDataLength; i++) {
        cells.push((
            <Table.Cell style={{ fontSize: '16px' }} textAlign='center' key={i}>&nbsp;</Table.Cell>
        ))
    }
    return cells;
}

class InstanceList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentDate: null,
            open: false,
            totalCount: 4,
            addServiceModalOpen: false,
            siteOption: [],
            serviceOption: [],
            instanceData: [{
                instanceId: 0,
                data: [['','','','','']]
            }],
        };

        // this.getInstanceList();

    }

    componentDidMount() {
        this.getInstanceList();
    }

    getInstanceList = () => {
        // set instance list table data
        // data.cellData.splice(0, data.cellData.length);
        let instanceData = [{}];

        Array.prototype.forEach.call(InstanceData.instanceList, instance => {
            instanceData.push({
                instanceId: instance.instanceId,
                data: [
                    instance.siteName,
                    instance.serviceName,
                    instance.name,
                    instance.endPoint,
                    instance.status
                ]
            });
        });

        this.setState({ instanceData });

        // return InstanceStatusData;
        // const url = `/api/instances/${id}`;

        // try {
        //     return axios.get(url).then(response => {
        //         console.log(response);
        //         this.setState({
        //             siteName: response.data.result.siteName,
        //             serviceName: response.data.result.serviceName,
        //             instanceName: response.data.result.instanceName,
        //             endPoint: response.data.result.endpoint,
        //             status: response.data.result.status.toString()
        //         })
        //     });
        // } catch (error) {
        //     console.log(error);
        // }
    }

    static getDerivedStateFromProps(props, state) {
        let { siteOption, serviceOption } = state;

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
        })

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
            ...siteOption, ...serviceOption
        }
    }

    onChange = (event, data) => this.setState({ currentDate: data.value });

    closeConfigShow = (closeOnEscape, closeOnDimmerClick) => () => {
        this.setState({ closeOnEscape, closeOnDimmerClick, open: true })
    }

    close = () => this.setState({ open: false });

    handleClick = id => {
        this.props.history.push({
            pathname: `/home/instances/instancedetails/${id}`,
            state: id
        });
    }

    handleAddServiceButton = (v, e) => {
        if (e) this.setState({ addServiceModalOpen: true });
    }

    addInstanceModalClose = () => this.setState({ addServiceModalOpen: false });

    render() {
        const { instanceData, siteOption, serviceOption, addServiceModalOpen, closeOnEscape, closeOnDimmerClick } = this.state;
        instanceData.splice(0,1);

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
                                        />
                                    </Form.Group>
                                    <Form.Group widths='equal'>
                                        <Form.Field
                                            control={Select}
                                            label='Service Name'
                                            options={serviceOption}
                                            placeholder='Service name'
                                        />
                                    </Form.Group>
                                    <Form.Group widths='equal'>
                                        <Form.Field
                                            control={Select}
                                            label='Status'
                                            options={InstanceStatusData.status}
                                            placeholder='Status'
                                        />
                                    </Form.Group>
                                    <Button type='submit'>Search</Button>
                                    <Button type='submit'>Clear</Button>
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
                            <Table celled selectable>
                                <Table.Header>
                                    <Table.Row>
                                        {headers.map((value, index) => {
                                            return <Table.HeaderCell
                                                style={{
                                                    fontSize: '20px',
                                                    backgroundColor: 'Gainsboro'
                                                }}
                                                textAlign='center'
                                                key={index}>{value}
                                            </Table.HeaderCell>
                                        })}
                                    </Table.Row>
                                </Table.Header>

                                <Table.Body>
                                    {instanceData.map((rowValue, rowIndex) => {
                                        return (
                                            <Table.Row
                                                key={rowIndex}
                                                onClick={() => this.handleClick(rowValue.instanceId)}>
                                                {rowValue.data.map((cellValue, cellIndex) => {
                                                    return (
                                                        <Table.Cell
                                                            style={{ fontSize: '16px' }}
                                                            textAlign='center'
                                                            key={cellIndex}>{cellValue}
                                                        </Table.Cell>)
                                                })}
                                            </Table.Row>
                                        );
                                    })}
                                    <EmptyColumns data={headers.length} />
                                </Table.Body>
                                <Table.Footer>
                                    <Table.Row>
                                        <Table.HeaderCell colSpan='5'>
                                            <Menu floated='right' pagination>
                                                <Menu.Item as='a' icon>
                                                    <Icon name='chevron left' />
                                                </Menu.Item>
                                                <Menu.Item as='a'>1</Menu.Item>
                                                <Menu.Item as='a'>2</Menu.Item>
                                                <Menu.Item as='a'>3</Menu.Item>
                                                <Menu.Item as='a'>4</Menu.Item>
                                                <Menu.Item as='a' icon>
                                                    <Icon name='chevron right' />
                                                </Menu.Item>
                                            </Menu>
                                        </Table.HeaderCell>
                                    </Table.Row>
                                </Table.Footer>
                            </Table>
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

export default InstanceList;