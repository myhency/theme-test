import React, { Component } from 'react';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';
import axios from 'axios';
import DetailPageTop from '../components/DetailPageTop';
import {
    Button,
    Form,
    Modal,
    Grid
} from 'semantic-ui-react';
import Swal from 'sweetalert2';

class InstanceDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            //Instance info
            instance: {
                id: 0,
                siteName: '',
                siteId: 0,
                serviceName: '',
                serviceId: 0,
                name: '',
                endpoint: '',
                status: ''
            },
            //Modify instance modal
            modifyInstanceModalOpen: false,
            siteIdModified: 0,
            serviceIdModified: 0,
            roleModified: '',
            instanceNameModified: '',
            endpointModified: '',
            serviceOptionForModifyInstance: []
        };

        let id = props.location.state;
        this.getInstanceDetail(id)
    }

    getInstanceDetail = (id) => {
        const url = `/api/instances/${id}`;

        try {
            return axios.get(url).then(response => {
                this.setState({
                    instance: {
                        siteName: response.data.result.siteName,
                        siteId: response.data.result.siteId,
                        serviceName: response.data.result.serviceName,
                        serviceId: response.data.result.serviceId,
                        name: response.data.result.name,
                        endpoint: response.data.result.endpoint,
                        status: response.data.result.status.toString()
                    }
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

    handleOnClickSiteBreadcrumb = (id) => {
        this.props.history.push({
            pathname: `/home/sites/sitedetails/${id}`,
            state: id
        });
    }

    handleOnClickServiceBreadcrumb = (id) => {
        this.props.history.push({
            pathname: `/home/services/servicedetails/${id}`,
            state: id
        });
    }

    //Modify Instance event
    handleOnClickModifyInstanceModalCloseButton = () => this.setState({ modifyInstanceModalOpen: false });

    //Modify Instance event
    handleOnClickModifyInstanceModalModifyButton = () => {
        const {
            instanceNameModified,
            endpointModified
        } = this.state;

        axios.put(`/api/instances/${this.props.location.state}`, {
            name: instanceNameModified,
            endpoint: endpointModified
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(() => {
            this.setState({
                modifyInstanceModalOpen: false,
                instanceNameModified: '',
                endpointModified: ''
            });
            this.getInstanceDetail(this.props.location.state);
        });
    }

    //Modify Instance event
    handleOnChangeInstanceNameModifyInstanceModal = (event, data) => {
        this.setState({ instanceNameModified: data.value });
    }

    //Modify Instance event
    handleOnChangeEndpointModifyInstanceModal = (event, data) => {
        this.setState({ endpointModified: data.value });
    }

    //Modify Instance event
    handleOnClickDetailPageTopModifyButton = (currentModifyingInstance, event) => {
        if (event) this.setState({ modifyInstanceModalOpen: true, ...currentModifyingInstance });
    }

    //Delete Instance event
    handleOnClickDetailPageTopDeleteButton = () => {
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
                axios.delete(`/api/instances/${this.props.location.state}`)
                    .then(() => {
                        Swal.fire(
                            'Deleted!',
                            `${this.state.instance.name} has been deleted.`,
                            'success'
                        )
                        this.props.history.push({
                            pathname: '/home/instances'
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


    render() {
        const {
            instance,
            modifyInstanceModalOpen,
            instanceNameModified,
            endpointModified,
            closeOnEscape,
            closeOnDimmerClick
        } = this.state;

        return (
            <div style={{ marginTop: '4em', width: '80%', marginLeft: 'auto', marginRight: 'auto' }}>
                <Grid columns={2} style={{ marginBottom: '0em', marginLeft: '4em', marginRight: '4em' }} >
                    <Grid.Row columns={1}>
                        <Grid.Column>
                            <DetailPageTop
                                headerList={[
                                    {
                                        name: instance.siteName,
                                        id: instance.siteId,
                                        onClick: this.handleOnClickSiteBreadcrumb
                                    },
                                    {
                                        name: instance.serviceName,
                                        id: instance.serviceId,
                                        onClick: this.handleOnClickServiceBreadcrumb
                                    },
                                    {
                                        name: instance.name,
                                        id: instance.id,
                                        onClick: () => { }
                                    }
                                ]}
                                detailList={[
                                    {
                                        title: 'Instance Name',
                                        description: instance.name
                                    },
                                    {
                                        title: 'Endpoint',
                                        description: instance.endpoint
                                    },
                                    {
                                        title: 'Status',
                                        description: instance.status
                                    },
                                    {
                                        title: 'Logs',
                                        description: 'View Logs'
                                    }
                                ]}
                                deleteButtonOnClick={this.handleOnClickDetailPageTopDeleteButton}
                                modifyButtonOnClick={(currentModifyingInstance, event) => this.handleOnClickDetailPageTopModifyButton({
                                    instanceIdModified: instance.id,
                                    instanceNameModified: instance.name,
                                    endpointModified: instance.endpoint
                                }, event)}
                            />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <Modal
                    open={modifyInstanceModalOpen}
                    onClose={this.handleOnClickModifyInstanceModalCloseButton}
                    closeOnEscape={closeOnEscape}
                    closeOnDimmerClick={closeOnDimmerClick}>
                    <Modal.Header>Modify Service</Modal.Header>
                    <Modal.Content>
                        <Form>
                            <Form.Group widths='equal'>
                                <Form.Input
                                    label='Site Name'
                                    value={instance.siteName}
                                    readOnly
                                />
                            </Form.Group>
                            <Form.Group widths='equal'>
                                <Form.Input
                                    fluid
                                    label='Service name'
                                    value={instance.serviceName}
                                    readOnly
                                />
                            </Form.Group>
                            {/* <Form.Group widths='equal'>
                                <Form.Field
                                    fluid
                                    label='Role'
                                    value={roleModified}
                                    readOnly
                                />
                            </Form.Group> */}
                            <Form.Group widths='equal'>
                                <Form.Input
                                    fluid
                                    label='Instance name'
                                    value={instanceNameModified}
                                    onChange={this.handleOnChangeInstanceNameModifyInstanceModal}
                                />
                            </Form.Group>
                            <Form.Group widths='equal'>
                                <Form.Input
                                    fluid
                                    label='Endpoint'
                                    value={endpointModified}
                                    onChange={this.handleOnChangeEndpointModifyInstanceModal}
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button
                            onClick={this.handleOnClickModifyInstanceModalCloseButton}
                            negative
                            content='Close'
                        />
                        <Button
                            onClick={this.handleOnClickModifyInstanceModalModifyButton}
                            positive
                            labelPosition='right'
                            icon='checkmark'
                            content='Modify'
                        />
                    </Modal.Actions>
                </Modal>
            </div>
        )
    }
};

export default InstanceDetails;