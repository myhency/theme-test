import React, { Component } from 'react';
import axios from 'axios';
import { Container } from 'semantic-ui-react';
import { Line } from 'react-chartjs-2';
import styled from 'styled-components';

const Styles = styled.div`
    .graph-card {
        background-color: white;
        border-radius: 16px;
        box-shadow: 0 10px 15px 0 rgba(131, 145, 165, 0.1);
        height: 285px!important;
        padding: 20px 0 20px 20px!important;
    }
`

const options = {
    tooltips: {
        titleFontSize: 16,
        bodyFontSize: 18,
        rtl: false,
        backgroundColor: 'rgb(47,61,80)',
        titleAlign: 'right',
        bodyAlign: 'right'
    },
    legend: {
        display: false
    },
    scales: {
        xAxes: [{
            display: true,
            gridLines: {
                zeroLineWidth: 0,
                drawBorder: false,
                color: '#f1f2f5',
                display: true
            },
            ticks: {
                labelOffset: 15,
                fontColor: '#8391a5',
                fontSize: 13,
                autoSkipPadding: 80,
                maxRotation: 0,
                padding: 5,
                max: 'now'
            }
        }],
        yAxes: [{
            display: true,
            gridLines: {
                display: false
            },
            ticks: {
                fontColor: '#8391a5',
                fontSize: 13,
                beginAtZero: true,
                stepSize: 20,
                suggestedMax: 100
            }
        }]
    },
    maintainAspectRatio: false,
}

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
            return axios.get('/api/logs/info/apicall/transition').then(response => {
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
        this.setState({ intervalId: intervalId });
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
            <Styles>
                <Container className='graph-card'>
                    <Line
                        data={graphData}
                        options={options}
                    />
                </Container>
            </Styles>
        );
    }
}

export default ApiCallsView;