import React from 'react';
import Carousel from 'semantic-ui-carousel-react';
import { Grid, Header, Segment, Image, Container } from 'semantic-ui-react';
import logo from '../assets/images/01.20686250.1.jpg';
import { Bar, defaults } from 'react-chartjs-2';

defaults.global.legend.display = false;

const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'My First dataset',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(0,0,0,1)',
            borderColor: 'green',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56, 55, 40]
        }
    ]
};

const options = {
    maintainAspectRatio: true,
}

const SliderCard = (props) => {
    let elements = [
        {
            render: () => {
                return (
                    <div>
                        <div style={{ overflow: 'hidden' }}>
                            <div style={{ float: 'left', marginRight: '1em', marginTop: '-0.3em' }}>
                                <Image src={logo} size={'small'} />
                            </div>
                            <div style={{ float: 'left' }}>
                                <Header as='h1'>{props.title}</Header>
                            </div>
                        </div>
                        <Grid style={{ marginTop: '1em' }}>
                            <Grid.Row columns={2}>
                                <Grid.Column width={5}>
                                    <Segment placeholder style={{ justifyContent: 'start' }}>
                                        <div style={{ marginBottom: '2em' }}>
                                            <Header as='h2'>{props.firstCardTitle}</Header>
                                        </div>
                                        <div style={{ height: '1vh' }}>
                                            <Container textAlign='center'>
                                                <p style={{ fontSize: '100px', fontWeight: 'bold', color: 'blue' }}>{props.count}</p>
                                            </Container>
                                        </div>
                                    </Segment>
                                </Grid.Column>
                                <Grid.Column width={11}>
                                    <Segment placeholder style={{ justifyContent: 'start' }}>
                                        <div style={{ marginBottom: '2em' }}>
                                            <Header as='h2'>{props.secondCardTitle}</Header>
                                        </div>
                                        <Bar data={data} height={50} option={options} />
                                    </Segment>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </div>);
            }
        },
        {
            render: () => {
                return (
                    <div>
                        <div style={{ overflow: 'hidden' }}>
                            <div style={{ float: 'left', marginRight: '1em', marginTop: '-0.3em' }}>
                                <Image src={logo} size={'small'} />
                            </div>
                            <div style={{ float: 'left' }}>
                                <Header as='h1'>{props.title}</Header>
                            </div>
                        </div>
                        <Grid style={{ marginTop: '1em' }}>
                            <Grid.Row columns={2}>
                                <Grid.Column width={5}>
                                    <Segment placeholder style={{ justifyContent: 'start' }}>
                                        <div style={{ marginBottom: '2em' }}>
                                            <Header as='h2'>{props.firstCardTitle}</Header>
                                        </div>
                                        <div style={{ height: '1vh' }}>
                                            <Container textAlign='center'>
                                                <p style={{ fontSize: '80px', fontWeight: 'bold', color: 'blue' }}>{props.count}</p>
                                            </Container>
                                        </div>
                                    </Segment>
                                </Grid.Column>
                                <Grid.Column width={11}>
                                    <Segment placeholder style={{ justifyContent: 'start' }}>
                                        <div style={{ marginBottom: '2em' }}>
                                            <Header as='h2'>{props.secondCardTitle}</Header>
                                        </div>
                                        <Bar data={data} height={50} option={options} />
                                    </Segment>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </div>);
            }
        },
    ]

    return (
        <Carousel style={{ marginLeft: '2em' }}
            elements={elements}
            duration={5000}
            animation='slide left'
            showNextPrev={false}
            showIndicators={false}
        />
    )
};

export default SliderCard;