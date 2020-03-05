import React, { Component } from 'react';
import { Button, Form, Segment, Header, Modal, Grid, Icon, Select, Divider } from 'semantic-ui-react';
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';
import ListTable from '../components/ListTable';
import ServiceData from '../assets/data/ServiceData.json';
import SiteData from '../assets/data/SiteData.json';
import RoleData from '../assets/data/RoleData.json';

const headers = ['Service Name', 'Role', 'Company', 'Open Date', 'Endpoint'];

class ServiceList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate: null,
            open: false,
            totalCount: 4,
            addServiceModalOpen: false,
            data: {
                cellData: []
            },
            siteOption: []
        };
    }

    static getDerivedStateFromProps(props, state) {

        let { data, siteOption } = state;
        data.cellData.splice(0,data.cellData.length);
        ServiceData.serviceList.map((value, index) => {
            let arr = [];
            arr.push(value.name, value.role, value.siteName, value.openDate, value.endPoint);
            data.cellData.push(arr);
        });
        
        siteOption.splice(0,siteOption.length);
        SiteData.siteList.map((value, index) => {
            siteOption.push({
                key: value.name,
                text: value.name,
                value: value.name
            });
        });

        return {
            ...data, ...siteOption
        }
    }

    onChange = (event, data) => this.setState({ currentDate: data.value });

    closeConfigShow = (closeOnEscape, closeOnDimmerClick) => () => {
        this.setState({ closeOnEscape, closeOnDimmerClick, open: true })
    }

    close = () => this.setState({ open: false });

    handleClick = rowValue => {
        this.props.history.push({
            pathname: '/home/services/servicedetails/',
            state: rowValue
        });
    }

    handleAddServiceButton = (v, e) => {
        if (e) this.setState({ addServiceModalOpen: true });
    }

    addSiteModalClose = () => this.setState({ addServiceModalOpen: false });

    render() {
        const { data, siteOption, addServiceModalOpen, closeOnEscape, closeOnDimmerClick } = this.state;
        console.log(siteOption);
        console.log(RoleData.roles);
        return (
            <div style={{ marginTop: '4em', width: '70%', marginLeft: 'auto', marginRight: 'auto' }}>
                <Grid>
                    <Grid.Row>
                        <Grid.Column>
                            <Grid>
                                <Grid.Row>
                                    <Grid.Column floated='left' verticalAlign='middle' width={5}>
                                        <Header as='h1'><Icon name='setting' />Services</Header>
                                        <p style={{ fontSize: '12px', color: 'grey' }}>Autoever DID hub 에 등록된 모든 Service들을 보여줍니다.</p>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
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
                            <Header as='h3'><Icon name='list alternate outline'/>Service List</Header>
                        </Grid.Column>
                        <Grid.Column floated='right' verticalAlign='bottom' width={5}>
                            <Button color='blue' icon='plus' content='Add service' floated='right' onClick={(v, e) => this.handleAddServiceButton(v, e)} />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <ListTable
                                handleClick={(rowValue) => this.handleClick(rowValue)}
                                headers={headers}
                                data={data} />
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