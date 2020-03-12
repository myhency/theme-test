import React, { Component } from 'react';
import {
    Button,
    Form,
    Segment,
    Header,
    Image,
    Modal,
    Grid,
    Icon,
    Select,
    Divider,
    Table
} from 'semantic-ui-react';
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';
import axios from 'axios';
import Gallery from '../utils/Gallery';
import RoleData from '../assets/data/RoleData.json';

const headers = ['Service Name', 'Role', 'Site', 'Open Date'];



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
                cellData: []
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
                        cellData: []
                    };
                    response.data.result.map((service) => {
                        let arr = [];
                        arr.push(service.name, service.role, service.siteName, service.openDate);
                        data.cellData.push(arr);
                    })
                    resolve(data);
                });
            } catch (error) {
                reject(error);
            }
        });

        Promise.all([siteDetail,serviceList]).then((values) =>{
            this.setState({
                site: values[0],
                serviceList: values[1]
            })
        })
    }

    handleClick = rowValue => {
        this.props.history.push({
            pathname: '/home/services/servicedetails/',
            state: rowValue
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

        return (
            <div style={{ marginTop: '4em', width: '80%', marginLeft: 'auto', marginRight: 'auto' }}>
                <Segment style={{ marginLeft: '2em', marginRight: '2em' }}>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column verticalAlign='middle' width={2}>
                                <Image src={Gallery.getLogoImage(site.name)} size={'small'} />
                            </Grid.Column>
                            <Grid.Column floated='left' verticalAlign='middle' width={8}>
                                <Header as='h1'>{site.name}</Header>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    <Divider />
                    <Header as='h3'>Detail</Header>
                    <Grid celled='internally'>
                        <Grid.Row>
                            <Grid.Column verticalAlign='middle' width={2}>
                                Site Name
                            </Grid.Column>
                            <Grid.Column floated='left' verticalAlign='middle' width={8}>
                                {site.name}
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column verticalAlign='middle' width={2}>
                                Open Date
                            </Grid.Column>
                            <Grid.Column floated='left' verticalAlign='middle' width={8}>
                                {site.openDate}
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    {/* <Divider /> */}
                </Segment>
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
                                    <Form.Input fluid label='Site name' placeholder='Site name' />
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
                    <Table selectable celled style={{ height: '100px', overflowY: 'scroll' }}>
                        <Table.Header>
                            <Table.Row>
                                {headers.map((value, index) => {
                                    return <Table.HeaderCell
                                        style={{
                                            fontSize: '18px',
                                            backgroundColor: 'Gainsboro'
                                        }}
                                        textAlign='center'
                                        key={index}>
                                        {value}
                                    </Table.HeaderCell>
                                })}
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            {serviceList.cellData.map((rowValue, rowIndex) => {
                                return (
                                    <Table.Row
                                        key={rowIndex}
                                        onClick={() => this.handleClick(rowValue)}>
                                        {rowValue.map((cellValue, cellIndex) => {
                                            return <Table.Cell
                                                style={{ fontSize: '16px' }}
                                                textAlign='center'
                                                key={cellIndex}>
                                                {cellValue}
                                            </Table.Cell>
                                        })}
                                    </Table.Row>
                                );
                            })}
                            {/* <EmptyColumns data={instanceHealthData} /> */}
                        </Table.Body>
                    </Table>
                </Segment>
            </div>
        )
    }
};

export default SiteDetails;