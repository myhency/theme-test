import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Slider from "react-slick";
import { Grid, Header, Segment, Image, Container, Statistic, Label, Card } from 'semantic-ui-react';
import { Bar } from 'react-chartjs-2';
import { format } from 'date-fns';
import constants from '../utils/constants';

const Styles = styled.div`
    .counting-card {
        background-color: white;
        border-radius: 16px;
        box-shadow: 0 10px 15px 0 rgba(131, 145, 165, 0.1);
        height: 90px!important;
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

let settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    // accessibility: false
    arrows: false
};

class ServiceStatisticsSliderView extends Component {
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
                {/* <Container className='counting-card'> */}
                    <Slider {...settings}>
                        {sliderCardData.map((value, index) => {
                            return (
                                <Grid className='counting-card-content-box' key={index}>
                                    <Grid.Row>
                                        <Container className='counting-card'>

                                        </Container>
                                    </Grid.Row>
                                    <Grid.Row>
                                        <Container className='counting-card'>

                                        </Container>
                                    </Grid.Row>
                                    <Grid.Row>
                                        <Container className='counting-card'>

                                        </Container>
                                    </Grid.Row>
                                </Grid>
                            );
                        })}
                    </Slider>
                {/* </Container> */}
            </Styles>
        );
    }
}

export default ServiceStatisticsSliderView;

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