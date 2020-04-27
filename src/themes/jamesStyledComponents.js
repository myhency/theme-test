import React from 'react';
import { Container, Grid, Button, Table, Input, Dropdown, Modal } from 'semantic-ui-react';
import styled from 'styled-components';
import { Line, Bar } from 'react-chartjs-2';
import moreIcon from '../assets/images/btn_more.png';

export const JamesCard = styled(Container)({
    backgroundColor: 'white',
    borderRadius: '16px',
    boxShadow: '0 10px 14px 0 rgba(131, 145, 165, 0.1)',
    padding: '24px'
});

export const JamesEmptyCard = styled(Container)`
    width: 342px;
    height: 160px;
    border-radius: 12px;
    background-color: #e4e7ef;
`

export const JamesGrid = styled(Grid)({
    color: props => props.color
});

export const JamesRow = styled(Grid.Row)({
    padding: '0px!important'
});

export const JamesColumn = styled(Grid.Column)({
    padding: '0px!important'
});

export const JamesButton = styled(Button)`
    &&& {
        border-radius: 24px;
        background-color: #4280f5;
        color: white;
        height: 40px;
    }
`

// export const JamesHeader = styled.span({
//     width: '83px',
//     height: '27px',
//     fontSize: '18px',
//     fontWeight: 'bold',
//     fontStretch: 'normal',
//     fontStyle: 'normal',
//     lineHeight: '1.5',
//     letterSpacing: '-0.18px',
//     textAlign: 'left',
//     color: '#3b4a5f'
// });

export const JamesHeader = styled.span`
    font-size: ${props => props.size === 1 ? '28px' : props.size === 2 ? '24px' : props.size === 3 ? '18px' : '18px'};
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.5;
    letter-spacing: normal;
    text-align: left;
    color: #3b4a5f;
`

export const JamesBodyText = styled.span`
    /* width: 61px; */
    /* height: 27px; */
    /* font-family: SpoqaHanSans; */
    font-size: ${props => props.size === 1 ? '18px' : props.size === 2 ? '15px' : props.size === 3 ? '13px' : '13px'};
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.5;
    letter-spacing: normal;
    text-align: left;
    color: ${props => props.color ? props.color : '#3b4a5f'};
`

export const JamesTable = styled(Table)({
    borderWidth: '0px!important'
});

export const JamesTableHeader = styled(Table.Header)({
});

export const JamesTableRow = styled(Table.Row)({
});

export const JamesTableBody = styled(Table.Body)({
});

export const JamesTableHeaderCell = styled(Table.HeaderCell)({
    fontSize: '13px!important',
    color: '#8391a5!important',
    backgroundColor: '#f7f8fb!important',
    padding: '7px 0px 7px 16px!important'
});

export const JamesTableCell = styled(Table.Cell)({
    padding: '9px 0px 9px 16px!important',
    fontSize: '16px!important',
    color: '#3b4a5f!important'
});

export class JamesLineGraph extends React.Component {
    render() {
        const options = {
            tooltips: {
                titleFontSize: 16,
                bodyFontSize: 18,
                // rtl: false,
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
                        // max: 'now'
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

        let graphData = {
            labels: this.props.data.labels,
            datasets: [
                {
                    label: 'Sample Data',
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
                    data: this.props.data.values
                }
            ]
        }

        return (
            <Line
                data={graphData}
                options={options}
            />
        );
    }
}

export class JamesBarGraph extends React.Component {


    render() {

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

        let graphData = {
            labels: this.props.data.labels,
            datasets: [
                {
                    label: 'Sample Data',
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
                    data: this.props.data.values
                }
            ]
        }

        return (
            <Bar
                data={graphData}
                options={options}
            />
        );
    }
}

export const JamesInput = styled(Input)`
    &&& input {
        background: #eff1f7;
        padding: 8px;
        display: block;
        border: none;
        width: 100%;
        -webkit-tap-highlight-color: #eff1f7;
        float: left;
    }

    &&& input:focus{
        outline: none;
        background: #eff1f7;
        padding: 8px;
        display: block;
        border: none;
        width: 100%;
        -webkit-tap-highlight-color: #eff1f7;
        float: left;
    }
`

export const JamesDropdown = styled(Dropdown)`
    &&& i.icon:before {
        content: url(${moreIcon});
    }
`

export const JamesModal = styled(Modal)`
    width: 368px;
    height: 464px;
    border-radius: 12px!important;
    box-shadow: 0 6px 6px 0 rgba(0, 0, 0, 0.08)!important;
    padding: 24px;

    &&& .header {
        border-radius: 12px 12px 0 0 !important;
        padding-left: 0;
        padding-right: 0;
    }

    &&& .content {  
        padding-left: 0;
        padding-right: 0;
    }
`

