import React from 'react';
import { Container, Grid, Button, Table, Input, Dropdown, Modal, Form } from 'semantic-ui-react';
import styled from 'styled-components';
import { Line, Bar } from 'react-chartjs-2';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import closeIcon from '../assets/images/icon_close.png';


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

    &&&:hover {
        border-radius: 24px;
        background-color: #3373eb;
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
    /* width: 32px; */
    &&& .menu.transition.visible {
        border-radius: 4px;
        border: solid 1px #8391a5;
    }

    &&& .menu.transition.visible > .item {
        /* width: 41px; */
        /* height: 22px; */
        /* font-family: SpoqaHanSans; */
        font-size: 15px;
        font-weight: bold;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.47;
        letter-spacing: normal;
        text-align: left;
        color: #4280f5;
    }

    &&&:hover {
        background-color: #e4e7ef;
    }

    &&& i.icon {
        margin: 0;
    }

    &&& i.icon:before {
        content: ${props => props.customIcon ? 'url(' + props.customIcon + ')' : props.icon};
        margin: 0;
    }
`

export const JamesModal = styled(Modal)`
    /* width: 368px; */
    /* height: 464px; */
    border-radius: 12px!important;
    box-shadow: 0 6px 6px 0 rgba(0, 0, 0, 0.08)!important;
    padding: 24px;
    width: 40%;

    @media only screen and (min-width: 992px) {
        width: 450px !important;
        margin: 0em 0em 0em 0em;
    }

    &&& .header {
        border-radius: 12px 12px 0 0 !important;
        padding-left: 0;
        padding-right: 0;
        border-bottom-color: #f7f8fb;
    }

    &&& .content {  
        padding-left: 0;
        padding-right: 0;
    }
`

export const JamesForm = styled(Form)`
    &&& label {
        /* width: 32px; */
        /* height: 19px; */
        /* font-family: SpoqaHanSans; */
        font-size: 13px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.46;
        letter-spacing: -0.26px;
        text-align: left;
        color: #8391a5;
    }

    &&& input {
        /* width: 320px; */
        /* height: 40px; */
        border-radius: 4px;
        border: solid 1px #e4e7ef;
        background-color: #ffffff;
    }

    &&& input:focus {
        /* width: 320px; */
        /* height: 40px; */
        border-radius: 4px;
        border: solid 1px #8391a5;
        background-color: #ffffff;
    }

    &&& .field.required > label:after {
        content: '*';
        font-size: 13px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.46;
        letter-spacing: -0.26px;
        text-align: left;
        color: #8391a5;
        margin: -0.1em 0em 0em 0.2em;
    }

    &&& .field.error > .ui.pointing.label, .ui[class*="pointing above"].label {
        /* background: #000000 !important;  */
        margin: 0;
    }

    &&& .field.error > .prompt {
        background: unset !important; 
        border: unset !important;
        color: #fc6386 !important;
        /* width: 160px; */
        /* height: 19px; */
        /* font-family: SpoqaHanSans; */
        font-size: 13px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.46;
        letter-spacing: -0.52px;
        text-align: left;
        padding: 0;
        /* padding-left: 1px; */
    }

    &&& .field.error > .pointing.label:before {
        content: unset;
    }

    &&& .field.error > .ui.input > input {
        /* width: 320px; */
        /* height: 40px; */
        border-radius: 4px;
        border: solid 1px #fc6386;
        background-color: #ffffff;
    }

    /* &&& .field.error > .ui.input > input::placeholder {
        color: unset;
    } */

    &&& .field.error.input > input:focus {
        /* width: 320px; */
        /* height: 40px; */
        border-radius: 4px;
        border: solid 1px #8391a5;
        background-color: #ffffff;
    }
`

export const JamesDateInput = styled(Input)`
    &&& input {
        /* width: 240px; */
        /* height: 40px; */
        border-radius: 4px;
        border: solid 1px #e4e7ef;
        background-color: #ffffff;
        /* width: 184px; */
        /* height: 22px; */
        /* font-family: SpoqaHanSans; */
        font-size: 15px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.47;
        letter-spacing: normal;
        text-align: left;
        color: #2f3d50;
    }

    &&& input::placeholder {
        /* width: 184px; */
        /* height: 22px; */
        opacity: 0.35;
        /* font-family: SpoqaHanSans; */
        font-size: 15px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.47;
        letter-spacing: -0.3px;
        text-align: left;
        color: #2f3d50;
    }

    &&& i.icon:before {
        color: #8391a5;
    }
`

export class DatePickerWrapper extends React.Component {
    render() {
        const Styles = styled.div`
            button.react-datepicker__close-icon:after {
                background-color: white;
                color: unset;
                content: url(${closeIcon})
            }
        `

        return (
            <Styles>
                <DatePicker
                    customInput={
                        <JamesDateInput
                            icon='calendar outline'
                        />}
                    {...this.props}
                />
            </Styles>
        );
    }
}

// export const JamesDatePicker = styled(DatePickerWrapper)`
export const JamesDatePicker = styled(DatePicker)`
    /* width: 240px; */
    height: 40px;
    border-radius: 4px;
    border: solid 1px #e4e7ef;
    background-color: #ffffff;

    &&& input::placeholder {
        /* width: 184px; */
        /* height: 22px; */
        opacity: 0.35;
        /* font-family: SpoqaHanSans; */
        font-size: 15px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.47;
        letter-spacing: -0.3px;
        text-align: left;
        color: #2f3d50;
    }

    /* &&& button {
        background-color: #000000;
    } */
`