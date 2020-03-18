import React, { Component } from 'react';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';
import axios from 'axios';
import DetailPageTop from '../components/DetailPageTop';

class InstanceDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
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

    render() {
        const {
            instance
        } = this.state;

        return (
            <div style={{ marginTop: '4em', width: '80%', marginLeft: 'auto', marginRight: 'auto' }}>
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
                            onClick: () => {}
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
                    ]} />
            </div>
        )
    }
};

export default InstanceDetails;