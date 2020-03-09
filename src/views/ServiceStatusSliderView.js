import React, { Component } from 'react';
import SliderCard from '../components/SliderCard';
import ServiceData from '../assets/data/ServiceData.json';
import ServiceStatisticsData from '../assets/data/ServiceStatisticsData.json';
import ServiceTransitionData from '../assets/data/ServiceTransitionData.json';

class ServiceStatusSliderView extends Component {
    constructor(props) {
        super(props);

        this.state = {
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
    }

    componentDidMount() {
        let { sliderCardData } = this.state;
        sliderCardData.splice(0, sliderCardData.length);
        Array.prototype.forEach.call(ServiceData.serviceList, value => {
            sliderCardData.push({
                siteName: value.siteName,
                serviceName: value.name,
                serviceId: value.id,
                statisticsData: this.getServiceStatisticsData(value.id),
                transitionData: this.getServiceTransitionData(value.id)
            });
        });

        this.setState({ sliderCardData });
    }

    getServiceStatisticsData = (id) => {
        let cumulativePairwisedid = 0;
        let cumulativeCredentialIssuance = 0;
        let cumulativeCredentialVerification = 0;
        let todayPairwisedid = 0;
        let todayCredentialIssuance = 0;
        let todayCredentialVerification = 0;

        ServiceStatisticsData.staticticsDataList.forEach(value => {
            if (value.serviceId === id) {
                cumulativePairwisedid = value.cumulativePairwisedid;
                cumulativeCredentialIssuance = value.cumulativeCredentialIssuance;
                cumulativeCredentialVerification = value.cumulativeCredentialVerification;
                todayPairwisedid = value.todayPairwisedid;
                todayCredentialIssuance = value.todayCredentialIssuance;
                todayCredentialVerification = value.todayCredentialVerification;
            }
        });

        return {
            cumulativePairwisedid,
            cumulativeCredentialIssuance,
            cumulativeCredentialVerification,
            todayPairwisedid,
            todayCredentialIssuance,
            todayCredentialVerification
        }
    }

    getServiceTransitionData = (id) => {
        let labels = [];
        let issuanceData = [];
        let verificationData = [];

        Array.prototype.forEach.call(ServiceTransitionData.transitionDataList, value => {
            if (value.serviceId === id) {
                Array.prototype.forEach.call(value.result, v => {
                    labels.push(v.timestamp);
                    issuanceData.push(v.issuance);
                    verificationData.push(v.verification);
                });
            }
        });

        return {
            labels,
            issuanceData,
            verificationData
        }
    }

    render() {
        const { sliderCardData } = this.state;
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