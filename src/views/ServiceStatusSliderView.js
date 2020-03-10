import React, { Component } from 'react';
import SliderCard from '../components/SliderCard';
import ServiceData from '../assets/data/ServiceData.json';
import ServiceStatisticsData from '../assets/data/ServiceStatisticsData.json';
import ServiceTransitionData from '../assets/data/ServiceTransitionData.json';
import axios from 'axios';

const SERVICE_LIST_URL = '/api/services';

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

    static getDerivedStateFromProps(props, state) {
        const { serviceList, sliderCardData } = state;


        // console.log(sliderCardData);
        
        Array.prototype.forEach.call(serviceList, service => {
            try {
                axios.get(`/api/services/${service.serviceId}/statistic`)
                .then(response => {
                    let labels = [];
                    let issuanceData = [];
                    let verificationData = [];
                    // console.log(response.data.result)

                    axios.get(`/api/services/${service.serviceId}/transition`)
                    .then(response => {
                        Array.prototype.forEach.call(response.data.result, transition => {
                            labels.push(transition.timestamp);
                            issuanceData.push(transition.issuance);
                            verificationData.push(transition.verification);
                        });
                    });

                    sliderCardData.push({
                        siteName: service.siteName,
                        serviceName: service.serviceName,
                        serviceId: service.serviceId,
                        statisticsData: {
                            cumulativePairwisedid: response.data.result.cumulativePairwisedid,
                            cumulativeCredentialIssuance: response.data.result.cumulativeCredentialIssuance,
                            cumulativeCredentialVerification: response.data.result.cumulativeCredentialVerification,
                            todayPairwisedid: response.data.result.todayPairwisedid,
                            todayCredentialIssuance: response.data.result.todayCredentialIssuance,
                            todayCredentialVerification: response.data.result.todayCredentialVerification
                        },
                        transitionData: {
                            labels,
                            issuanceData,
                            verificationData
                        }
                    });
                });

                // console.log(sliderCardData)
            } catch (error) {
                console.log(error);
            }

            // try {
            //     return axios.get(`/api/services/${service.serviceId}/statistic`)
            //     .then(response => {
            //         console.log(response);
            //         sliderCardData.push({
            //             siteName: service.siteName,
            //             serviceName: service.name,
            //             serviceId: service.id,
                        
            //         });
            //     });
            // } catch (error) {
            //     console.log(error);
            // }
        });

        // console.log(arr);

        // let arr = [];
        // try {
        //     return axios.get(SERVICE_LIST_URL).then(response => {
        //         // this.setState({
        //         //     serviceList: response.data.result
        //         // })
        //         arr.push(response.data.result);
        //     });
        // } catch (error) {
        //     console.log(error);
        // }

        

        return { sliderCardData }
        
    }

    // componentDidMount() {
        
    //     let { serviceList, sliderCardData } = this.state;
    //     // let serviceList = this.getServiceList();
    //     console.log(serviceList);
    //     sliderCardData.splice(0, sliderCardData.length);
    //     Array.prototype.forEach.call(serviceList, service => {
    //         sliderCardData.push({
    //             siteName: service.siteName,
    //             serviceName: service.name,
    //             serviceId: service.id,
    //             statisticsData: this.getServiceStatisticsData(service.id),
    //             transitionData: this.getServiceTransitionData(service.id)
    //         });
    //     });

    //     this.setState({ sliderCardData });
    // }

    getServiceList = () => {
        try {
            return axios.get(SERVICE_LIST_URL).then(response => {
                this.setState({
                    serviceList: response.data.result
                })
            });
        } catch (error) {
            console.log(error);
        }
    }

    // getServiceStatisticsData = (id) => {
    //     let cumulativePairwisedid = 0;
    //     let cumulativeCredentialIssuance = 0;
    //     let cumulativeCredentialVerification = 0;
    //     let todayPairwisedid = 0;
    //     let todayCredentialIssuance = 0;
    //     let todayCredentialVerification = 0;

    //     Array.prototype.forEach.call(ServiceStatisticsData.staticticsDataList, value => {
    //         if (value.serviceId === id) {
    //             cumulativePairwisedid = value.cumulativePairwisedid;
    //             cumulativeCredentialIssuance = value.cumulativeCredentialIssuance;
    //             cumulativeCredentialVerification = value.cumulativeCredentialVerification;
    //             todayPairwisedid = value.todayPairwisedid;
    //             todayCredentialIssuance = value.todayCredentialIssuance;
    //             todayCredentialVerification = value.todayCredentialVerification;
    //         }
    //     });

    //     return {
    //         cumulativePairwisedid,
    //         cumulativeCredentialIssuance,
    //         cumulativeCredentialVerification,
    //         todayPairwisedid,
    //         todayCredentialIssuance,
    //         todayCredentialVerification
    //     }
    // }

    // getServiceTransitionData = (id) => {
    //     let labels = [];
    //     let issuanceData = [];
    //     let verificationData = [];

    //     Array.prototype.forEach.call(ServiceTransitionData.transitionDataList, value => {
    //         if (value.serviceId === id) {
    //             Array.prototype.forEach.call(value.result, v => {
    //                 labels.push(v.timestamp);
    //                 issuanceData.push(v.issuance);
    //                 verificationData.push(v.verification);
    //             });
    //         }
    //     });

    //     return {
    //         labels,
    //         issuanceData,
    //         verificationData
    //     }
    // }

    render() {
        const { sliderCardData } = this.state;
        // sliderCardData.splice(0);
        // console.log(sliderCardData);
        console.log(typeof(sliderCardData))
        return (
            <SliderCard
                sliderCardData = {sliderCardData}
                graphTitle={'발급현황'}
                count={30}
            />
        );
    }
}

export default ServiceStatusSliderView;