import React, { Component } from 'react';
import SliderCard from '../components/SliderCard';
import axios from 'axios';

class ServiceStatusSliderView extends Component {
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
        this.setState({ intervalId: intervalId});
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
                                labels.push(transition.timestamp);
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
            <SliderCard
                sliderCardData={sliderCardData}
                graphTitle={'발급현황'}
                count={30}
            />
        );
    }
}

export default ServiceStatusSliderView;