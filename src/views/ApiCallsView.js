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
                    labels.push(value.timestamp);
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
        setInterval(this.getApiCallTransition, 3000);
    }

    componentWillUnmount() {
        clearInterval(this.getApiCallTransition);
    }

    render() {
        const { data } = this.state;
        let graphData = {
            labels: data.labels,
            datasets: [
                {
                    label: 'My First dataset',
                    fill: true,
                    lineTension: 0.1,
                    backgroundColor: 'lightskyblue',
                    borderColor: 'lightskyblue',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'lightskyblue',
                    pointBackgroundColor: 'lightskyblue',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'lightskyblue',
                    pointHoverBorderColor: 'lightskyblue',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
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