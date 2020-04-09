import React, { Component } from 'react';
import Slider from "react-slick";
import { Grid, Header, Segment, Image, Container, Statistic, Label, Card } from 'semantic-ui-react';
import { Bar } from 'react-chartjs-2';
import Gallery from '../utils/Gallery';
import styled from 'styled-components';

const Styles = styled.div`
    .counting-card {
        background-color: white;
        border-radius: 16px;
        box-shadow: 0 10px 15px 0 rgba(131, 145, 165, 0.1);
        height: 330px!important;
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
                stepSize: 20,
                suggestedMax: 100
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
};

class SliderCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ...props
        };
    }

    componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {
            this.setState({
                ...this.props
            });
        }
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
                                    backgroundColor: 'rgb(66,128,245,0.15)',
                                    borderColor: '#4280f5',
                                    borderCapStyle: 'butt',
                                    borderDash: [],
                                    borderDashOffset: 0.0,
                                    borderJoinStyle: 'miter',
                                    pointBorderColor: 'midnightblue',
                                    pointBackgroundColor: 'midnightblue',
                                    pointBorderWidth: 1,
                                    pointHoverRadius: 5,
                                    pointHoverBackgroundColor: 'midnightblue',
                                    pointHoverBorderColor: 'midnightblue',
                                    pointHoverBorderWidth: 2,
                                    pointRadius: 1,
                                    pointHitRadius: 10,
                                    data: value.transitionData.issuanceData
                                },
                                {
                                    label: 'Verification',
                                    fill: false,
                                    lineTension: 0.1,
                                    backgroundColor: 'dodgerblue',
                                    borderColor: 'dodgerblue',
                                    borderCapStyle: 'butt',
                                    borderDash: [],
                                    borderDashOffset: 0.0,
                                    borderJoinStyle: 'miter',
                                    pointBorderColor: 'dodgerblue',
                                    pointBackgroundColor: '#fff',
                                    pointBorderWidth: 1,
                                    pointHoverRadius: 5,
                                    pointHoverBackgroundColor: 'dodgerblue',
                                    pointHoverBorderColor: 'dodgerblue',
                                    pointHoverBorderWidth: 2,
                                    pointRadius: 1,
                                    pointHitRadius: 10,
                                    data: value.transitionData.verificationData
                                },
                            ]
                        }

                        return (
                            <Container className='counting-card' key={index}>
                                <Grid className='counting-card-content-box'>
                                    <Grid.Row columns={2}>
                                        <Grid.Column verticalAlign='middle'>
                                            <span className='card-title'>{value.serviceName}</span>
                                        </Grid.Column>
                                        <Grid.Column verticalAlign='middle' textAlign='right'>
                                            <span className='period-text'>60m</span>
                                        </Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row columns={1}>
                                        <Bar
                                            data={data}
                                            options={options}
                                        />
                                    </Grid.Row>
                                </Grid>
                                {/* <Grid style={{ marginTop: '0em' }}>
                                    <Grid.Row columns={1}>
                                        <Grid.Column>
                                                <Segment placeholder style={{ justifyContent: 'start' }}>
                                                    <Label attached='top right' size='mini'>1day</Label>
                                                    <div style={{ marginBottom: '2em' }}>
                                                        <Header as='h3'>{this.props.graphTitle}</Header>
                                                    </div>
                                                    <Bar data={data} height={60} options={options} />
                                                </Segment>
                                            </Grid.Column>
                                        <Grid.Column width={8}>
                                                    <Grid>
                                                        <Grid.Row columns={3} style={{ marginTop: '1em' }}>
                                                            <Grid.Column textAlign='center' verticalAlign='middle'>
                                                                <Container>
                                                                    <Statistic size='large' color='teal'>
                                                                        <Statistic.Value>{value.statisticsData.cumulativePairwisedid}</Statistic.Value>
                                                                        <Statistic.Label>누적 Pairwise DID</Statistic.Label>
                                                                    </Statistic>
                                                                </Container>
                                                            </Grid.Column>
                                                            <Grid.Column textAlign='center' verticalAlign='middle'>
                                                                <Container>
                                                                    <Statistic size='large' color='teal'>
                                                                        <Statistic.Value>{value.statisticsData.cumulativeCredentialIssuance}</Statistic.Value>
                                                                        <Statistic.Label>누적 DID 발급</Statistic.Label>
                                                                    </Statistic>
                                                                </Container>
                                                            </Grid.Column>
                                                            <Grid.Column textAlign='center' verticalAlign='middle'>
                                                                <Container>
                                                                    <Statistic size='large' color='teal'>
                                                                        <Statistic.Value>{value.statisticsData.cumulativeCredentialVerification}</Statistic.Value>
                                                                        <Statistic.Label>누적 DID 검증</Statistic.Label>
                                                                    </Statistic>
                                                                </Container>
                                                            </Grid.Column>
                                                        </Grid.Row>
                                                        <Grid.Row columns={3} style={{ marginTop: '1em' }}>
                                                            <Grid.Column textAlign='center' verticalAlign='middle'>
                                                                <Container>
                                                                    <Statistic size='large' color='blue'>
                                                                        <Statistic.Value>{value.statisticsData.todayPairwisedid}</Statistic.Value>
                                                                        <Statistic.Label>금일 Pairwise DID</Statistic.Label>
                                                                    </Statistic>
                                                                </Container>
                                                            </Grid.Column>
                                                            <Grid.Column textAlign='center' verticalAlign='middle'>
                                                                <Container>
                                                                    <Statistic size='large' color='blue'>
                                                                        <Statistic.Value>{value.statisticsData.todayCredentialIssuance}</Statistic.Value>
                                                                        <Statistic.Label>금일 DID 발급</Statistic.Label>
                                                                    </Statistic>
                                                                </Container>
                                                            </Grid.Column>
                                                            <Grid.Column textAlign='center' verticalAlign='middle'>
                                                                <Container>
                                                                    <Statistic size='large' color='blue'>
                                                                        <Statistic.Value>{value.statisticsData.todayCredentialVerification}</Statistic.Value>
                                                                        <Statistic.Label>금일 DID 검증</Statistic.Label>
                                                                    </Statistic>
                                                                </Container>
                                                            </Grid.Column>
                                                        </Grid.Row>
                                                    </Grid>
                                                </Grid.Column>
                                    </Grid.Row>
                                </Grid> */}
                            </Container>
                        );
                    })}
                </Slider>
            </Styles>
        )
    }
};

export default SliderCard;