import React, { Component } from 'react';
import LineGraphCard from '../components/LineGraphCard';
import ApiCallsData from '../assets/data/ApiCallsData.json';

class ApiCallsView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {
                labels: [],
                apiCallData: []
            }
        }
    }

    static getDerivedStateFromProps(props, state) {
        let { data } = state;
        let labels = [];
        let apiCallData = [];

        ApiCallsData.result.map((value, index) => {
            labels.push(value.timestamp);
            apiCallData.push(value.count);
        });

        return {
            data: {
                labels, 
                apiCallData
            }
        }
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