import React, { Component } from 'react';
import {
    Button,
    Form,
    Segment,
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
import ListTableNew from '../components/ListTableNew';

class SiteDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate: null,
            addServiceModalOpen: false,
            site: {
                id: props.location.state,
                name: '',
                openDate: ''
            },
            serviceList: {
                cellData: [{
                    id: 0,
                    data: []
                }]
            }
        };

        let siteId = props.location.state;
        this.getSiteInfo(siteId);
    }

    getSiteInfo = (id) => {
        let siteDetail = new Promise((resolve, reject) => {
            const url = `/api/sites/${id}`;
            try {
                axios.get(url).then(response => {
                    resolve(response.data.result);
                });
            } catch (error) {
                reject(error);
            }
        });

        let serviceList = new Promise((resolve, reject) => {
            const url = `/api/services?siteId=${id}`;

            try {
                axios.get(url).then(response => {
                    let data = {
                        cellData: [{}]
                    };
                    response.data.result.map((service) => {
                        let arr = [];
                        arr.push(service.name, service.role, service.siteName, service.openDate);
                        data.cellData.push({
                            id: service.id,
                            data: arr
                        });
                    });
                    data.cellData.splice(0, 1)
                    resolve(data);
                });
            } catch (error) {
                reject(error);
            }
        });

        Promise.all([siteDetail, serviceList]).then((values) => {
            this.setState({
                site: values[0],
                serviceList: values[1]
            })
        })
    }

    handleOnClick = id => {
        this.props.history.push({
            pathname: `/home/services/servicedetails/${id}`,
            state: id
        });
    }

    onChange = (event, data) => this.setState({ currentDate: data.value });

    closeConfigShow = (closeOnEscape, closeOnDimmerClick) => () => {
        this.setState({ closeOnEscape, closeOnDimmerClick, open: true })
    }

    close = () => this.setState({ open: false });

    addServiceModalclose = () => this.setState({ addServiceModalOpen: false });

    handleAddServiceButton = (v, e) => {
        if (e) this.setState({ addServiceModalOpen: true });
    }

    render() {
        const { site, serviceList, addServiceModalOpen, closeOnEscape, closeOnDimmerClick } = this.state;

        const headers = ['Service Name', 'Role', 'Site', 'Open Date'];

        return (
            <div style={{ marginTop: '4em', width: '80%', marginLeft: 'auto', marginRight: 'auto' }}>
                <DetailPageTop
                    headerList={[
                        {
                            name: site.name,
                            id: site.id,
                            onClick: () => {}
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
                    ]} />
                <Segment placeholder style={{ justifyContent: 'start', marginLeft: '2em', marginRight: '2em' }}>
                    <Modal
                        open={addServiceModalOpen}
                        onClose={this.addServiceModalclose}
                        closeOnEscape={closeOnEscape}
                        closeOnDimmerClick={closeOnDimmerClick}>
                        <Modal.Header>Add a Service</Modal.Header>
                        <Modal.Content>
                            <Form>
                                <Form.Group widths='equal'>
                                    <Form.Input fluid label='Site name' placeholder='Site name' value={site.name} readOnly />
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
                            <Button onClick={this.addServiceModalclose} negative>No</Button>
                            <Button
                                onClick={this.addServiceModalclose}
                                positive
                                labelPosition='right'
                                icon='checkmark'
                                content='Yes'
                            />
                        </Modal.Actions>
                    </Modal>
                    <Grid columns={2} style={{ marginBottom: '0em' }}>
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
                                    onClick={(v, e) => this.handleAddServiceButton(v, e)} />
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    <ListTableNew 
                        headers={headers}
                        data={serviceList} 
                        handleOnClick={(id) => this.handleOnClick(id)}
                    />
                </Segment>
            </div>
        )
    }
};

export default SiteDetails;