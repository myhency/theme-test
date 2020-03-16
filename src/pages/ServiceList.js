import React, { Component } from 'react';
import { Button, Form, Segment, Header, Modal, Grid, Icon, Select, Divider } from 'semantic-ui-react';
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';
import RoleData from '../assets/data/RoleData.json';
import PageTitle from '../components/PageTitle';
import axios from 'axios';
import ListTableNew from '../components/ListTableNew';

class ServiceList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate: null,
            open: false,
            totalCount: 4,
            addServiceModalOpen: false,
            siteOption: [],
            serviceList: {
                cellData: [{
                    id: 0,
                    data: []
                }]
            }
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
                        value: site.name
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

    getServiceList = () => {
        const url = '/api/services';
        let data = {
            cellData: [{}]
        };

        try {
            axios.get(url).then(response => {
                response.data.result.map((service) => {
                    let arr = [];
                    arr.push(service.name, service.role, service.siteName, service.openDate, service.endpoint);
                    data.cellData.push({
                        id: service.id,
                        data: arr
                    });
                });
                data.cellData.splice(0, 1);
                this.setState({
                    serviceList: data
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

    handleOnClick = id => {
        this.props.history.push({
            pathname: `/home/services/servicedetails/${id}`,
            state: id
        });
    }

    handleAddServiceButton = (v, e) => {
        if (e) this.setState({ addServiceModalOpen: true });
    }

    addSiteModalClose = () => this.setState({ addServiceModalOpen: false });

    render() {
        const { serviceList, data, siteOption, addServiceModalOpen, closeOnEscape, closeOnDimmerClick } = this.state;

        const headers = ['Service Name', 'Role', 'Company', 'Open Date', 'Endpoint'];

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
                                        />
                                    </Form.Group>
                                    <Form.Group widths='equal'>
                                        <SemanticDatepicker
                                            label='Open date'
                                            datePickerOnly={true}
                                            onChange={this.onChange} />
                                    </Form.Group>
                                    <Form.Group widths='equal'>
                                        <Form.Field
                                            control={Select}
                                            label='Role'
                                            options={RoleData.roles}
                                            placeholder='Role'
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
                            <Header as='h3'><Icon name='list alternate outline' />Service List</Header>
                        </Grid.Column>
                        <Grid.Column floated='right' verticalAlign='bottom' width={5}>
                            <Button color='blue' icon='plus' content='Add service' floated='right' onClick={(v, e) => this.handleAddServiceButton(v, e)} />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <ListTableNew
                                foots
                                headers={headers}
                                count={10}
                                data={serviceList}
                                handleOnClick={(id) => this.handleOnClick(id)}
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