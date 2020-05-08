import React from 'react';
import { Header, Container, Grid, Button, Table, Input, Dropdown, Modal, Form, Image } from 'semantic-ui-react';
import styled from 'styled-components';
import { Line, Bar } from 'react-chartjs-2';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import closeIcon from '../assets/images/icon_close.png';
import fileIcon from '../assets/images/icon_file.png';
import { useDropzone } from 'react-dropzone';

const JamesDropZoneStyles = styled.div`
    .dropzone {
        flex: 1;
        display: flex;
        flex-direction: column;
        padding: 20px;
        border-width: 1px;
        border-radius: 4px;
        border-color: #e4e7ef;
        border-style: dashed;
        background-color: #f7f8fb;
        color: grey;
        font-size: 1rem;
        outline: none;
        transition: border .24s ease-in-out;
        cursor: pointer;
        min-height: 100px;
        
        &:hover {
            border-color: #e4edfe;
            background-color: #e4edfe;
        }
    }

    .dropzone-active {
        flex: 1;
        display: flex;
        flex-direction: column;

        padding: 20px;
        border-width: 2px;
        border-radius: 2px;
        border-color: deeppink;
        border-style: dashed;
        background-color: hotpink;
        color: grey;
        font-size: 1rem;
        outline: none;
        transition: border .24s ease-in-out;
        cursor: pointer;
        min-height: 100px;
    }

    .thumbInner {
        /* min-width: 0; */
        /* min-height: 10em; */
        /* overflow: hidden; */
        /* border-radius: 2; */
        /* border: 2px solid grey; */
        /* box-sizing: border-box; */
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
    };

    .img {
        display: block;
        width: auto;
        height: 100%;
    };
`

export const JamesDropZone = ({ onLoadEnd, onOpen, getLogo }) => {
    const [files, setFiles] = React.useState([]);
    const [thumbs, setThumbs] = React.useState('');
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: 'image/*',
        onDrop: acceptedFiles => {
            var reader = new FileReader();
            var url = reader.readAsDataURL(acceptedFiles[0]);
            reader.onloadend = (e) => {
                setFiles([reader.result]);
                onLoadEnd(acceptedFiles[0]);
            }
        }
    });

    React.useEffect(() => {
        console.log(files.length)
        if (files.length > 0) {
            console.log('aaaa')
            return setThumbs(<Image src={files[0]} centered size='small' className='img' />);
        }
        if (onOpen) {
            console.log('bbbb')
            return getLogo((logofile) => {
                setThumbs(<Image src={'/' + logofile} centered size='small' className='img' />);
            });
        }
    }, [onOpen, files]);

    React.useEffect(() => () => {
        // Make sure to revoke the data uris to avoid memory leaks
        files.forEach(file => URL.revokeObjectURL(file));
    }, [files]);

    return (
        <JamesDropZoneStyles>
            <Container textAlign='center'>
                <div {...getRootProps({ className: 'dropzone', ...(isDragActive ? { className: 'dropzone-active' } : {}) })}>
                    <input {...getInputProps()} />
                    
                    <Container textAlign='center'>
                        
                        <Image centered src={fileIcon}/>
                        <JamesBodyText style={{ textAlign: 'center' }}>Click here to upload an image</JamesBodyText>
                        <div className='thumbInner'>
                            {thumbs}
                        </div>
                    </Container>
                </div>
            </Container>
            <Container textAlign='center' style={{ marginTop: '10px' }}>
                <div className='thumbInner'>
                    {thumbs}
                </div>
            </Container>
        </JamesDropZoneStyles>
    );
}

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

export const JamesBodyText = styled.p`
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
        /* width: 240px; */
        height: 40px;
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

    &&& input:focus {
        /* width: 320px; */
        /* height: 40px; */
        border-radius: 4px;
        border: solid 1px #8391a5;
        background-color: #ffffff;
    }

    &&& i.icon:before {
        color: #8391a5;
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
        width: 100%;
        height: 40px;
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

export class JamesDatePicker extends React.Component {
    render() {
        console.log('render!!!!!!!!')
        const Styles = styled.div`
            &&& .ui.input {
                width: 100%;
            }

            &&& .react-datepicker-wrapper {
                width: 100%;
            }

            &&& :focus {
                outline: unset;
            }
            button.react-datepicker__close-icon:after {
                background-color: white;
                color: unset;
                content: url(${closeIcon})
            }

            &&& .react-datepicker {
                border: 1px solid #8391a5;
            }

            &&& .react-datepicker__header {
                background-color: white;
                border-bottom: unset;
            }

            &&& .react-datepicker__navigation {
                top: 15px;
            }

            &&& .react-datepicker__navigation--previous {
                border-right-color: #8391a5;
            }

            &&& .react-datepicker__navigation--next {
                border-left-color: #8391a5;
            }

            &&& .react-datepicker__current-month {
                /* width: 65px; */
                /* height: 22px; */
                /* font-family: SpoqaHanSans; */
                font-size: 15px;
                font-weight: bold;
                font-stretch: normal;
                font-style: normal;
                line-height: 1.47;
                letter-spacing: normal;
                text-align: center;
                color: #3b4a5f;
                margin-bottom: 27px;
            }

            &&& .react-datepicker__day-name {
                width: 32px;
                height: 32px;
                /* font-family: SpoqaHanSans; */
                font-size: 13px;
                font-weight: bold;
                font-stretch: normal;
                font-style: normal;
                line-height: 1.46;
                letter-spacing: normal;
                text-align: center;
                color: #3b4a5f;
                padding-top: 9px;
            }

            &&& .react-datepicker__day-names > :first-child {
                font-size: 13px;
                font-weight: bold;
                font-stretch: normal;
                font-style: normal;
                line-height: 1.46;
                letter-spacing: normal;
                text-align: center;
                color : #fc6386;
                padding-top: 9px;
            }

            &&& .react-datepicker__week > :first-child {
                font-size: 13px;
                font-weight: normal;
                font-stretch: normal;
                font-style: normal;
                line-height: 1.46;
                letter-spacing: normal;
                text-align: center;
                color : #fc6386;
            }

            &&& .react-datepicker__day {
                width: 32px;
                height: 32px;
                padding-top: 7px;
            }

            &&& .react-datepicker__day .react-datepicker__day--030 .react-datepicker__day--outside-month {
                color : #fc6386;
            }

            &&& .react-datepicker__day, .react-datepicker__month-text, .react-datepicker__quarter-text {
                /* width: 8px; */
                /* height: 19px; */
                /* font-family: SpoqaHanSans; */
                font-size: 13px;
                font-weight: normal;
                font-stretch: normal;
                font-style: normal;
                line-height: 1.46;
                letter-spacing: normal;
                text-align: center;
                color: #3b4a5f;
            }

            &&& .react-datepicker__day:hover, .react-datepicker__month-text:hover, .react-datepicker__quarter-text:hover {
                /* width: 30px; */
                /* height: 30px; */
                border-radius: 15px;
                background-color: #f7f8fb; 
            }

            &&& .react-datepicker__day--today {
                background-color: #e4edfe;
                border-radius: 15px;
            }

            /* &&& .react-datepicker__month-text--keyboard-selected {
                background-color: #4280f5;
                border-radius: 15px;
            } */

            &&& .react-datepicker__day--keyboard-selected, .react-datepicker__month-text--keyboard-selected, .react-datepicker__quarter-text--keyboard-selected {
                border-radius: 15px;
                background-color: #4280f5;
            }

            &&& .react-datepicker__day--selected, .react-datepicker__day--in-selecting-range, .react-datepicker__day--in-range, .react-datepicker__month-text--selected, .react-datepicker__month-text--in-selecting-range, .react-datepicker__month-text--in-range, .react-datepicker__quarter-text--selected, .react-datepicker__quarter-text--in-selecting-range, .react-datepicker__quarter-text--in-range {
                border-radius: 15px;
                background-color: #4280f5;
            }

            .react-datepicker-popper[data-placement^="bottom"] .react-datepicker__triangle, .react-datepicker-popper[data-placement^="bottom"] .react-datepicker__triangle::before {
                border-top: unset;
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
