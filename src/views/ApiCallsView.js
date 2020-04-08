import React, { Component } from 'react';
import LineGraphCard from '../components/LineGraphCard';
import axios from 'axios';

const url = `/api/logs/info/apicall/transition`;

class ApiCallsView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {
                labels: [],
                apiCallData: []
            }
        }

        this.getApiCallTransition();
    }

    getApiCallTransition = () => {
        try {
            let labels = [];
            let apiCallData = [];
            return axios.get(url).then(response => {
                Array.prototype.forEach.call(response.data.result, value => {
                    labels.push(value.date);
                    apiCallData.push(value.count);
                });
                this.setState({
                    data: {
                        labels, apiCallData
                    }
                });
            });
        } catch (error) {
            console.log(error);
        }
    }

    componentDidMount() {
        let intervalId = setInterval(this.getApiCallTransition, 3000);
        this.setState({ intervalId: intervalId});
    }

    componentWillUnmount() {
        clearInterval(this.state.intervalId);
    }

    render() {
        const { data } = this.state;
        let graphData = {
            labels: data.labels,
            datasets: [
                {
                    label: 'API Calls',
                    fill: true,
                    lineTension: 0.1,
                    backgroundColor: 'rgb(66,128,245,0.15)',
                    borderColor: '#4280f5',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderWidth: 1,
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: '#4280f5',
                    pointBackgroundColor: '#4280f5',
                    pointBorderWidth: 1,
                    pointHoverRadius: 3,
                    pointHoverBackgroundColor: '#4280f5',
                    pointHoverBorderColor: '#4280f5',
                    pointHoverBorderWidth: 1,
                    pointRadius: 0,
                    pointHitRadius: 3,
                    data: data.apiCallData
                }
            ]
        }

        return (
            <LineGraphCard
                title={'API Calls'}
                data={graphData}
            />
        );
    }
}

export default ApiCallsView;