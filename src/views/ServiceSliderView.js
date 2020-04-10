import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Slider from "react-slick";
import { Grid, Image, Container } from 'semantic-ui-react';
import { Bar } from 'react-chartjs-2';
import { format } from 'date-fns';
import constants from '../utils/constants';
import pairwiseIcon from '../assets/images/icon_pairwise.png';
import issuanceIcon from '../assets/images/icon_issuance.png';
import verificationIcon from '../assets/images/icon_verification.png';

const Styles = styled.div`
    .transition-column {
        padding-right: 0px!important;
    }

    .statistic-column {
        padding-left: 26px!important;
        padding-right: 0px!important;
    }

    .statistic-card-title {
        width: 117px;
        height: 24px;
        font-size: 16px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.5;
        letter-spacing: -0.64px;
        text-align: left;
        color: #3b4a5f;

    }

    .statistic-card-row {
        padding-top: 12px!important;
        padding-bottom: 0px!important;
    }

    .statistic-card-content-big {
        width: 43px;
        height: 36px;
        font-size: 24px;
        font-weight: bold;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.5;
        letter-spacing: normal;
        text-align: left;
        color: #3b4a5f;
    }

    .statistic-card-content-small {
        width: 60px;
        height: 24px;
        font-size: 16px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.5;
        letter-spacing: normal;
        text-align: left;
        color: #8391a5;
    }

    .graph-card {
        height: 250px!important;
        padding: 20px 0 20px 20px!important;
        margin: 0!important;
    }

    .transition-card {
        background-color: white;
        border-radius: 16px;
        height: 330px!important;
        margin: 0!important;
        padding: 12px;
    }

    .statistic-card {
        background-color: white;
        border-radius: 16px;
        box-shadow: 0 10px 15px 0 rgba(131, 145, 165, 0.1);
        height: 101px!important;
        margin: 0!important;
        padding: 22px 24px 22px 24px;
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

    .service-icon {
        width: 24px!important;
        height: 24px!important;
        object-fit: contain;
        vertical-align: middle;
        float: right;
    }

    .dot {
        height: 8px;
        width: 8px;
        border-radius: 50%;
        display: inline-block;
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
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
    // centerPadding: '0px'
    // dotsClass: 'slick-dot-position'
};


class ServiceSliderView extends Component {
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
                                        statisticsData: {
                                            cumulativePairwisedid: statisticRes.data.result.cumulativePairwisedid,
                                            cumulativeCredentialIssuance: statisticRes.data.result.cumulativeCredentialIssuance,
                                            cumulativeCredentialVerification: statisticRes.data.result.cumulativeCredentialVerification,
                                            todayPairwisedid: statisticRes.data.result.todayPairwisedid,
                                            todayCredentialIssuance: statisticRes.data.result.todayCredentialIssuance,
                                            todayCredentialVerification: statisticRes.data.result.todayCredentialVerification
                                        },
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
                            <Grid>
                                <Grid.Row columns={2}>
                                    <Grid.Column width={12} className='transition-column'>
                                        <Container className='transition-card'>
                                            <Grid className='counting-card-content-box' key={index}>
                                                <Grid.Row columns={2}>
                                                    <Grid.Column verticalAlign='middle'>
                                                        <span className='card-title'>{value.siteName}&nbsp;{value.serviceName}</span>
                                                    </Grid.Column>
                                                    <Grid.Column verticalAlign='middle' textAlign='right'>
                                                        <span className='dot' style={{ backgroundColor: '#4280f5' }}></span>
                                                        &nbsp;&nbsp;
                                                        <span className='period-text'>Verification</span>
                                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                        <span className='dot' style={{ backgroundColor: '#91e2ff' }}></span>
                                                        &nbsp;&nbsp;
                                                        <span className='period-text'>Issuance</span>
                                                    </Grid.Column>
                                                </Grid.Row>
                                                <Grid.Row columns={1}>
                                                    <Container className='graph-card'>
                                                        <Bar
                                                            data={data}
                                                            options={options}
                                                        />
                                                    </Container>
                                                </Grid.Row>
                                            </Grid>
                                        </Container>
                                    </Grid.Column>
                                    <Grid.Column width={4} className='statistic-column'>
                                        <Grid className='counting-card-content-box' key={index}>
                                            <Grid.Row style={{ padding: '0 0 12px 0'}}>
                                                <Container className='statistic-card'>
                                                    <Grid>
                                                        <Grid.Row columns={2} className='statistic-card-row'>
                                                            <Grid.Column width={10}>
                                                                <span className='statistic-card-title'>Pairwise DID</span>
                                                            </Grid.Column>
                                                            <Grid.Column width={6} verticalAlign='middle' textAlign='right'>
                                                                <Image
                                                                    className='service-icon'
                                                                    src={pairwiseIcon} />
                                                            </Grid.Column>
                                                        </Grid.Row>
                                                        <Grid.Row style={{ paddingTop: '0', paddingBottom: '0'}}>
                                                            <Grid.Column>
                                                                <span className='statistic-card-content-big'>{value.statisticsData.todayPairwisedid}</span>
                                                                <span className='statistic-card-content-small'>/{value.statisticsData.cumulativePairwisedid}</span>
                                                            </Grid.Column>
                                                        </Grid.Row>
                                                    </Grid>
                                                </Container>
                                            </Grid.Row>
                                            <Grid.Row style={{ padding: '0 0 12px 0' }}>
                                                <Container className='statistic-card'>
                                                    <Grid>
                                                        <Grid.Row columns={2} className='statistic-card-row'>
                                                            <Grid.Column width={10}>
                                                                <span className='statistic-card-title'>DID 발급</span>
                                                            </Grid.Column>
                                                            <Grid.Column width={6} verticalAlign='middle' textAlign='right'>
                                                                <Image
                                                                    className='service-icon'
                                                                    src={issuanceIcon} />
                                                            </Grid.Column>
                                                        </Grid.Row>
                                                        <Grid.Row style={{ paddingTop: '0', paddingBottom: '0' }}>
                                                            <Grid.Column>
                                                                <span className='statistic-card-content-big'>{value.statisticsData.todayCredentialIssuance}</span>
                                                                <span className='statistic-card-content-small'>/{value.statisticsData.cumulativeCredentialIssuance}</span>
                                                            </Grid.Column>
                                                        </Grid.Row>
                                                    </Grid>
                                                </Container>
                                            </Grid.Row>
                                            <Grid.Row style={{ padding: '0' }}>
                                                <Container className='statistic-card'>
                                                    <Grid>
                                                        <Grid.Row columns={2} className='statistic-card-row'>
                                                            <Grid.Column width={10}>
                                                                <span className='statistic-card-title'>DID 검증</span>
                                                            </Grid.Column>
                                                            <Grid.Column width={6} verticalAlign='middle' textAlign='right'>
                                                                <Image
                                                                    className='service-icon'
                                                                    src={verificationIcon} />
                                                            </Grid.Column>
                                                        </Grid.Row>
                                                        <Grid.Row style={{ paddingTop: '0', paddingBottom: '0' }}>
                                                            <Grid.Column>
                                                                <span className='statistic-card-content-big'>{value.statisticsData.todayCredentialVerification}</span>
                                                                <span className='statistic-card-content-small'>/{value.statisticsData.cumulativeCredentialVerification}</span>
                                                            </Grid.Column>
                                                        </Grid.Row>
                                                    </Grid>
                                                </Container>
                                            </Grid.Row>
                                        </Grid>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        );
                    })}
                </Slider>
            </Styles>
        );
    }

}

export default ServiceSliderView;