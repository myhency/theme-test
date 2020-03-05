import React from 'react';
import LineGraphCard from '../components/LineGraphCard';

const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'January', 'February', 'March', 'April', 'May', 'June', 'July'],
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
            data: [65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56, 55, 40]
        }
    ]
};

const options = {
    legend: {
        display: false
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

const ApiCallsView = () => (
    <LineGraphCard
        title={'API Calls'}
        data={data}
        options={options}
    />
);

export default ApiCallsView;