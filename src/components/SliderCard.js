import React, { Component } from 'react';
import Slider from "react-slick";
import { Grid, Header, Segment, Image, Container, Statistic, Label } from 'semantic-ui-react';
import { Bar } from 'react-chartjs-2';
import Gallery from '../utils/Gallery';

const options = {
    legend: {
        display: true,
        position: 'right'
    },
    scales: {
        xAxes: [{
            gridLines: {
                display: false
            }
        }],
    },
    maintainAspectRatio: true,
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

        console.log(props);

        this.state = {
            ...props
        };
    }



    render() {
        const { sliderCardData } = this.state;

        console.log(sliderCardData);
        // console.log(Gallery.getLogoImage(sliderCardData.serviceName));

        return (
            <Slider {...settings}>
                {sliderCardData.map((value, index) => {
                    console.log(value);
                    let data = {
                        labels: value.transitionData.labels,
                        datasets: [
                            {
                                label: 'Issuance',
                                fill: false,
                                lineTension: 0.1,
                                backgroundColor: 'midnightblue',
                                borderColor: 'midnightblue',
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
                        <Segment>
                            <div>
                                <div style={{ overflow: 'hidden' }}>
                                    <div style={{ float: 'left', marginRight: '1em', marginTop: '-0.3em' }}>
                                        <Image src={Gallery.getLogoImage(value.siteName)} size={'small'} />
                                    </div>
                                    <div style={{ float: 'left' }}>
                                        <Header as='h1'>{value.serviceName}</Header>
                                    </div>
                                </div>
                                <Grid style={{ marginTop: '0em' }}>
                                    <Grid.Row columns={2}>
                                        <Grid.Column width={8}>
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
                                                {/* <Grid style={{ display: 'inline-block' }}> */}
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
                                </Grid>
                            </div>
                        </Segment>
                    );
                })}
            </Slider>
        )
    }
};

export default SliderCard;