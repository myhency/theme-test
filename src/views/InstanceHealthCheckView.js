import React, { Component } from 'react';
import StatusCheckCard from '../components/StatusCheckCard';
import axios from 'axios';

const headers = ['Instance Name', 'Site Name', 'Status'];

const url = `/api/instances/health`;

class InstanceHealthCheckView extends Component {
    constructor(props) {
        super(props);

        console.log(props)

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

    handleClick = rowValue => {
        console.log(rowValue)
        this.props.history.push({
            pathname: '/home/instances/instancedetails/',
            state: rowValue
        });
    }

    componentDidMount() {
        let intervalId = setInterval(this.getCount, 3000);
        this.setState({ intervalId: intervalId});
    }

    componentWillUnmount() {
        clearInterval(this.state.intervalId);
    }

    render() {
        const { data } = this.state;
        return (
            <StatusCheckCard
                title={'Instance Health Check'}
                headers={headers}
                data={data}
                handleClick={(rowValue) => this.handleClick(rowValue)} />
        );
    }

}

export default InstanceHealthCheckView;
