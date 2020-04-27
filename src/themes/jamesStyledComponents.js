import React from 'react';
import { Container, Grid, Button, Table, Input, Image } from 'semantic-ui-react';
import styled from 'styled-components';
import { Line, Bar } from 'react-chartjs-2';
import searchIcon from '../assets/images/icon_search.png';

export const JamesCard = styled(Container)({
    backgroundColor: 'white',
    borderRadius: '16px',
    boxShadow: '0 10px 14px 0 rgba(131, 145, 165, 0.1)',
    padding: '14px'
});

export const JamesGrid = styled(Grid)({
    color: props => props.color
});

export const JamesRow = styled(Grid.Row)({
    padding: '0px!important'
});

export const JamesColumn = styled(Grid.Column)({
    padding: '14px!important'
});

export const JamesButton = styled(Button)({
    backgroundColor: props => props.color
});

export const JamesHeader = styled.span({
    width: '83px',
    height: '27px',
    fontSize: '18px',
    fontWeight: 'bold',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: '1.5',
    letterSpacing: '-0.18px',
    textAlign: 'left',
    color: '#3b4a5f'
});

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

// export const JamesInput = styled.input({
//     backgroundColor : '#eff1f7',
//     padding: '8px',
//     display: 'block',
//     border: 'none',
//     borderBottom: '1px solid #ccc',
//     width: '100%'
// })

// export const JamesInput = styled(Input)({
//     background: '#eff1f7',
//     padding: '8px',
//     display: 'block',
//     border: 'none',
//     width: '100%'
// })

export class JamesInput extends React.Component {

    render() {
        const Styles = styled.div`
            .james-input-field input { 
                background: #eff1f7;
                padding: 8px;
                display: block;
                border: none;
                width: 100%;
                -webkit-tap-highlight-color: #eff1f7;
            }

            .james-input-field input:focus{
                outline: none;
                background: #eff1f7;
                padding: 8px;
                display: block;
                border: none;
                width: 100%;
                -webkit-tap-highlight-color: #eff1f7;
            }

            .james-input-icon {
                width: 10px;
            }
        `

        return (
            <Styles>
                <Image src={searchIcon} className='james-input-icon' />
                <Input className='james-input-field' placeholder='Site name' />
            </Styles>
        );
    }
}