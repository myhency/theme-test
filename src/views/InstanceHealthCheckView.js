import React, { Component } from 'react';
import StatusCheckCard from '../components/StatusCheckCard';
import axios from 'axios';

const headers = ['Service Name', 'Site Name', 'Status'];

const url = `/api/instances/health`;

class InstanceHealthCheckView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {
                cellData: []
            }
        }

        this.getInstanceHealth();
    }

    getInstanceHealth = () => {
        try {
            let cellData = [];
            return axios.get(url).then(response => {
                Array.prototype.forEach.call(response.data.result, value => {
                    let data = [];
                    data.push(value.instanceName, value.siteName, value.status.toString());
                    cellData.push(data);
                });
                this.setState({
                    data: {
                        cellData
                    }
                });
            });
        } catch (error) {
            console.log(error);
        }
    }

    componentDidMount() {
        setInterval(this.getInstanceHealth, 3000);
    }

    componentWillUnmount() {
        clearInterval(this.getInstanceHealth);
    }

    render() {
        const { data } = this.state;
        return (
            <StatusCheckCard
                title={'Instance Health Check'}
                headers={headers}
                data={data} />
        );
    }

}

export default InstanceHealthCheckView;
