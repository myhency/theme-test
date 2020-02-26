import React from 'react';
import Slider from "react-slick";
import { Grid, Header, Segment, Image, Container, Statistic } from 'semantic-ui-react';
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

    let settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
    };

    return (
        <Slider {...settings}>
            <Segment>
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
                            <Grid.Column width={8}>
                                <Segment placeholder style={{ justifyContent: 'start' }}>
                                    <div style={{ marginBottom: '2em' }}>
                                        <Header as='h2'>{props.secondCardTitle}</Header>
                                    </div>
                                    <Bar data={data} height={50} option={options} />
                                </Segment>
                            </Grid.Column>
                            <Grid.Column width={8}>
                                <Grid style={{ display: 'inline-block' }}>
                                    <Grid.Row columns={3} style={{ marginTop: '1em' }}>
                                        <Grid.Column textAlign='center' verticalAlign='middle'>
                                            <Container>
                                                <Statistic size='huge' color='red'>
                                                    <Statistic.Value>12,550</Statistic.Value>
                                                    <Statistic.Label>누적 Pairwise DID</Statistic.Label>
                                                </Statistic>
                                            </Container>
                                        </Grid.Column>
                                        <Grid.Column textAlign='center' verticalAlign='middle'>
                                            <Container>
                                                <Statistic size='huge' color='orange'>
                                                    <Statistic.Value>5,650</Statistic.Value>
                                                    <Statistic.Label>누적 DID 발급</Statistic.Label>
                                                </Statistic>
                                            </Container>
                                        </Grid.Column>
                                        <Grid.Column textAlign='center' verticalAlign='middle'>
                                            <Container>
                                                <Statistic size='huge' color='yellow'>
                                                    <Statistic.Value>20</Statistic.Value>
                                                    <Statistic.Label>누적 DID 검증</Statistic.Label>
                                                </Statistic>
                                            </Container>
                                        </Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row columns={3} style={{ marginTop: '1em' }}>
                                        <Grid.Column textAlign='center' verticalAlign='middle'>
                                            <Container>
                                                <Statistic size='huge' color='green'>
                                                    <Statistic.Value>1</Statistic.Value>
                                                    <Statistic.Label>누적 장애 발생</Statistic.Label>
                                                </Statistic>
                                            </Container>
                                        </Grid.Column>
                                        <Grid.Column textAlign='center' verticalAlign='middle'>
                                            <Container>
                                                <Statistic size='huge' color='blue'>
                                                    <Statistic.Value>135,550</Statistic.Value>
                                                    <Statistic.Label>누적 Pairwise DID</Statistic.Label>
                                                </Statistic>
                                            </Container>
                                        </Grid.Column>
                                        <Grid.Column textAlign='center' verticalAlign='middle'>
                                            <Container>
                                                <Statistic size='huge' color='purple'>
                                                    <Statistic.Value>45,556</Statistic.Value>
                                                    <Statistic.Label>누적 Pairwise DID</Statistic.Label>
                                                </Statistic>
                                            </Container>
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </div>
            </Segment>
            <Segment>
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
                            <Grid.Column width={8}>
                                <Segment placeholder style={{ justifyContent: 'start' }}>
                                    <div style={{ marginBottom: '2em' }}>
                                        <Header as='h2'>{props.secondCardTitle}</Header>
                                    </div>
                                    <Bar data={data} height={50} option={options} />
                                </Segment>
                            </Grid.Column>
                            <Grid.Column width={8}>
                                <Grid style={{ display: 'inline-block' }}>
                                    <Grid.Row columns={3} style={{ marginTop: '1em' }}>
                                        <Grid.Column textAlign='center' verticalAlign='middle'>
                                            <Container>
                                                <Statistic size='huge' color='teal'>
                                                    <Statistic.Value>12,550</Statistic.Value>
                                                    <Statistic.Label>누적 Pairwise DID</Statistic.Label>
                                                </Statistic>
                                            </Container>
                                        </Grid.Column>
                                        <Grid.Column textAlign='center' verticalAlign='middle'>
                                            <Container>
                                                <Statistic size='huge' color='teal'>
                                                    <Statistic.Value>5,650</Statistic.Value>
                                                    <Statistic.Label>누적 DID 발급</Statistic.Label>
                                                </Statistic>
                                            </Container>
                                        </Grid.Column>
                                        <Grid.Column textAlign='center' verticalAlign='middle'>
                                            <Container>
                                                <Statistic size='huge' color='teal'>
                                                    <Statistic.Value>20</Statistic.Value>
                                                    <Statistic.Label>누적 DID 검증</Statistic.Label>
                                                </Statistic>
                                            </Container>
                                        </Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row columns={3} style={{ marginTop: '1em' }}>
                                        <Grid.Column textAlign='center' verticalAlign='middle'>
                                            <Container>
                                                <Statistic size='huge' color='teal'>
                                                    <Statistic.Value>1</Statistic.Value>
                                                    <Statistic.Label>누적 장애 발생</Statistic.Label>
                                                </Statistic>
                                            </Container>
                                        </Grid.Column>
                                        <Grid.Column textAlign='center' verticalAlign='middle'>
                                            <Container>
                                                <Statistic size='huge' color='teal'>
                                                    <Statistic.Value>135,550</Statistic.Value>
                                                    <Statistic.Label>누적 Pairwise DID</Statistic.Label>
                                                </Statistic>
                                            </Container>
                                        </Grid.Column>
                                        <Grid.Column textAlign='center' verticalAlign='middle'>
                                            <Container>
                                                <Statistic size='huge' color='teal'>
                                                    <Statistic.Value>45,556</Statistic.Value>
                                                    <Statistic.Label>누적 Pairwise DID</Statistic.Label>
                                                </Statistic>
                                            </Container>
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </div>
            </Segment>
        </Slider>
    )
};

export default SliderCard;