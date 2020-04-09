import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Slider from "react-slick";
import { Grid, Header, Segment, Image, Container, Statistic, Label, Card } from 'semantic-ui-react';
import { Bar } from 'react-chartjs-2';
import { format } from 'date-fns';
import constants from '../utils/constants';

const Styles = styled.div`
    .graph-card {
        /* background-color: white;
        border-radius: 16px;
        box-shadow: 0 10px 15px 0 rgba(131, 145, 165, 0.1); */
        height: 250px!important;
        padding: 20px 0 20px 20px!important;
        margin: 0!important;
    }

    .counting-card {
        background-color: white;
        border-radius: 16px;
        box-shadow: 0 10px 15px 0 rgba(131, 145, 165, 0.1);
        height: 330px!important;
        margin: 0!important;
    }

    .counting-card-content-box {
        width: 100%!important;
        margin: 0px!important;
    }

    .slider-card {
        width: 100%!important;
    }

    .slider-card-title {
        width: 221px;
        height: 24px;
        font-size: 16px;
        font-weight: bold;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.5;
        letter-spacing: -0.64px;
        text-align: left;
        color: #3b4a5f;
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
                stepSize: 1,
                suggestedMax: 5
            }
        }]
    },
    maintainAspectRatio: false,
}

let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
    centerPadding: '0px'
};

class ServiceTransitionSliderView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            serviceList: [],
            sliderCardData: [{
                siteName: '',
                serviceName: '',
                serviceId: 0,
                statisticsData: {},
                transitionData: {
                    labels: [],
                    issuanceData: [],
                    verificationData: []
                }
            }]
        }

        this.getServiceList();
    }

    componentDidMount() {
        let intervalId = setInterval(this.getServiceList, 10000);
        this.setState({ intervalId: intervalId });
    }

    componentWillUnmount() {
        clearInterval(this.state.intervalId);
    }

    getServiceList = () => {
        const SERVICE_LIST_URL = '/api/services';
        try {
            return axios.get(SERVICE_LIST_URL).then(response => {
                this.setState({
                    serviceList: response.data.result
                });
                this.getSliderCardData();
            });
        } catch (error) {
            console.log(error);
        }
    }

    getSliderCardData = () => {
        const { serviceList } = this.state;
        const sliderCardData = [];
        const promiseArray = [];

        serviceList.forEach(service => {
            promiseArray.push(
                new Promise((resolve, reject) => {
                    axios.get(`/api/services/${service.id}/statistic`)
                        .then(statisticRes => {
                            let labels = [];
                            let issuanceData = [];
                            let verificationData = [];

                            axios.get(`/api/services/${service.id}/transition`)
                                .then(response => {
                                    response.data.result.forEach(transition => {
                                        labels.push(format(new Date(transition.date), constants.TIME_FORMAT));
                                        // labels.push(transition.date);
                                        issuanceData.push(transition.issuance);
                                        verificationData.push(transition.verification);
                                    });

                                    sliderCardData.push({
                                        siteName: service.siteName,
                                        serviceName: service.name,
                                        serviceId: service.id,
                                        // statisticsData: {
                                        //     cumulativePairwisedid: statisticRes.data.result.cumulativePairwisedid,
                                        //     cumulativeCredentialIssuance: statisticRes.data.result.cumulativeCredentialIssuance,
                                        //     cumulativeCredentialVerification: statisticRes.data.result.cumulativeCredentialVerification,
                                        //     todayPairwisedid: statisticRes.data.result.todayPairwisedid,
                                        //     todayCredentialIssuance: statisticRes.data.result.todayCredentialIssuance,
                                        //     todayCredentialVerification: statisticRes.data.result.todayCredentialVerification
                                        // },
                                        transitionData: {
                                            labels,
                                            issuanceData,
                                            verificationData
                                        }
                                    });
                                    resolve();
                                });
                        });
                })
            )
        });

        Promise.all(promiseArray)
            .then(() => {
                this.setState({
                    sliderCardData
                });
            })
            .catch(err => {
                console.log(err);
            })
    }

    render() {
        const { sliderCardData } = this.state;

        return (
            <Styles>
                <Container className='counting-card'>
                    <Slider {...settings}>
                        {sliderCardData.map((value, index) => {
                            let data = {
                                labels: value.transitionData.labels,
                                datasets: [
                                    {
                                        label: 'Issuance',
                                        fill: false,
                                        lineTension: 0.1,
                                        backgroundColor: '#9adbff',
                                        borderColor: '#9adbff',
                                        borderCapStyle: 'butt',
                                        borderDash: [],
                                        barThickness: 6,
                                        categoryPercentage: 1,
                                        barPercentage: 0.5,
                                        borderDashOffset: 0.0,
                                        borderJoinStyle: 'miter',
                                        pointBorderColor: '#9adbff',
                                        pointBackgroundColor: '#9adbff',
                                        pointBorderWidth: 1,
                                        pointHoverRadius: 5,
                                        pointHoverBackgroundColor: '#9adbff',
                                        pointHoverBorderColor: '#9adbff',
                                        pointHoverBorderWidth: 2,
                                        pointRadius: 1,
                                        pointHitRadius: 10,
                                        data: value.transitionData.issuanceData
                                    },
                                    {
                                        label: 'Verification',
                                        fill: false,
                                        lineTension: 0.1,
                                        backgroundColor: '#4280f5',
                                        borderColor: '#000000',
                                        borderCapStyle: 'butt',
                                        borderDash: [],
                                        barThickness: 6,
                                        categoryPercentage: 1,
                                        barPercentage: 0.5,
                                        borderDashOffset: 0.0,
                                        borderJoinStyle: 'miter',
                                        pointBorderColor: '#4280f5',
                                        pointBackgroundColor: '#4280f5',
                                        pointBorderWidth: 1,
                                        pointHoverRadius: 5,
                                        pointHoverBackgroundColor: '#4280f5',
                                        pointHoverBorderColor: '#4280f5',
                                        pointHoverBorderWidth: 2,
                                        pointRadius: 1,
                                        pointHitRadius: 10,
                                        data: value.transitionData.verificationData
                                    },
                                ]
                            }
                            return (
                                <Grid className='counting-card-content-box' key={index}>
                                    <Grid.Row columns={2}>
                                        <Grid.Column verticalAlign='middle'>
                                            <span className='card-title'>{value.serviceName}</span>
                                        </Grid.Column>
                                        <Grid.Column verticalAlign='middle' textAlign='right'>
                                            <span className='period-text'>60m</span>
                                        </Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row columns={1}>
                                        {/* <Grid.Column> */}
                                        <Container className='graph-card'>
                                            <Bar
                                                data={data}
                                                options={options}
                                            />
                                        </Container>
                                        {/* </Grid.Column> */}
                                    </Grid.Row>
                                </Grid>
                            );
                        })}
                    </Slider>
                </Container>
            </Styles>
        );
    }
}

export default ServiceTransitionSliderView;

// {/* <Grid style={{ marginTop: '0em' }}>
//                                     <Grid.Row columns={1}>
//                                         <Grid.Column>
//                                                 <Segment placeholder style={{ justifyContent: 'start' }}>
//                                                     <Label attached='top right' size='mini'>1day</Label>
//                                                     <div style={{ marginBottom: '2em' }}>
//                                                         <Header as='h3'>{this.props.graphTitle}</Header>
//                                                     </div>
//                                                     <Bar data={data} height={60} options={options} />
//                                                 </Segment>
//                                             </Grid.Column>
//                                         <Grid.Column width={8}>
//                                                     <Grid>
//                                                         <Grid.Row columns={3} style={{ marginTop: '1em' }}>
//                                                             <Grid.Column textAlign='center' verticalAlign='middle'>
//                                                                 <Container>
//                                                                     <Statistic size='large' color='teal'>
//                                                                         <Statistic.Value>{value.statisticsData.cumulativePairwisedid}</Statistic.Value>
//                                                                         <Statistic.Label>누적 Pairwise DID</Statistic.Label>
//                                                                     </Statistic>
//                                                                 </Container>
//                                                             </Grid.Column>
//                                                             <Grid.Column textAlign='center' verticalAlign='middle'>
//                                                                 <Container>
//                                                                     <Statistic size='large' color='teal'>
//                                                                         <Statistic.Value>{value.statisticsData.cumulativeCredentialIssuance}</Statistic.Value>
//                                                                         <Statistic.Label>누적 DID 발급</Statistic.Label>
//                                                                     </Statistic>
//                                                                 </Container>
//                                                             </Grid.Column>
//                                                             <Grid.Column textAlign='center' verticalAlign='middle'>
//                                                                 <Container>
//                                                                     <Statistic size='large' color='teal'>
//                                                                         <Statistic.Value>{value.statisticsData.cumulativeCredentialVerification}</Statistic.Value>
//                                                                         <Statistic.Label>누적 DID 검증</Statistic.Label>
//                                                                     </Statistic>
//                                                                 </Container>
//                                                             </Grid.Column>
//                                                         </Grid.Row>
//                                                         <Grid.Row columns={3} style={{ marginTop: '1em' }}>
//                                                             <Grid.Column textAlign='center' verticalAlign='middle'>
//                                                                 <Container>
//                                                                     <Statistic size='large' color='blue'>
//                                                                         <Statistic.Value>{value.statisticsData.todayPairwisedid}</Statistic.Value>
//                                                                         <Statistic.Label>금일 Pairwise DID</Statistic.Label>
//                                                                     </Statistic>
//                                                                 </Container>
//                                                             </Grid.Column>
//                                                             <Grid.Column textAlign='center' verticalAlign='middle'>
//                                                                 <Container>
//                                                                     <Statistic size='large' color='blue'>
//                                                                         <Statistic.Value>{value.statisticsData.todayCredentialIssuance}</Statistic.Value>
//                                                                         <Statistic.Label>금일 DID 발급</Statistic.Label>
//                                                                     </Statistic>
//                                                                 </Container>
//                                                             </Grid.Column>
//                                                             <Grid.Column textAlign='center' verticalAlign='middle'>
//                                                                 <Container>
//                                                                     <Statistic size='large' color='blue'>
//                                                                         <Statistic.Value>{value.statisticsData.todayCredentialVerification}</Statistic.Value>
//                                                                         <Statistic.Label>금일 DID 검증</Statistic.Label>
//                                                                     </Statistic>
//                                                                 </Container>
//                                                             </Grid.Column>
//                                                         </Grid.Row>
//                                                     </Grid>
//                                                 </Grid.Column>
//                                     </Grid.Row>
//                                 </Grid> */}