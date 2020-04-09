import React from 'react';
import { Card, Container } from 'semantic-ui-react';
import { Line } from 'react-chartjs-2';
import styled from 'styled-components';

const Styles = styled.div`
    .graph-card {
        width: 100%!important;
        height: 28.6vh!important;
    }

`

const options = {
    tooltips: {
        titleFontSize: 16,
        bodyFontSize: 18,
        rtl: false,
        backgroundColor: 'rgb(47,61,80)',
        // position: 'nearest',
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
                // minRotation: 180,
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
                stepSize: 20,
                suggestedMax: 100
            }
        }]
    },
    maintainAspectRatio: false,
}

const LineGraphCard = (props) => {

    return (
        <Styles>
            <Card className='graph-card'>
                <Card.Content>
                    <Line
                        data={props.data}
                        height={60}
                        options={options}
                    />
                </Card.Content>
            </Card>
        </Styles>
    )
};

export default LineGraphCard;