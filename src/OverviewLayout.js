import React from 'react';
import { Button, Container, Divider, Grid, Header, Image, Menu, Segment, Icon, Table, Label } from 'semantic-ui-react';
import logo from './hyundai-autoever-ci.png';
import { Line } from 'react-chartjs-2';
import Carousel from 'semantic-ui-carousel-react';

const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'My First dataset',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
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
            data: [65, 59, 80, 81, 56, 55, 40]
        }
    ]
};

const options = {
    maintainAspectRatio: false
}

let elements = [
    {
        render: () => {
            return (
                <div>
                    <Grid>
                        <Grid.Row columns={2}>
                            <Grid.Column width={5}>
                            <Segment placeholder>
                            <div>
                                <h2>Line Example</h2>
                                <Header icon>
                                    <Icon name='pdf file outline' />
                                    No documents are listed for this customer.
                        </Header>
                                <Button primary>Add Document</Button>
                            </div>
                        </Segment>
                            </Grid.Column>
                            <Grid.Column>
                            <Segment placeholder>
                            <div>
                                <h2>Line Example</h2>
                                <Header icon>
                                    <Icon name='pdf file outline' />
                                    No documents are listed for this customer.
                        </Header>
                                <Button primary>Add Document</Button>
                            </div>
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
                    <Grid>
                        <Grid.Row columns={2}>
                            <Grid.Column width={5}>
                            <Segment placeholder>
                            <div>
                                <h2>Line Example</h2>
                                <Header icon>
                                    <Icon name='pdf file outline' />
                                    No documents are listed for this customer.
                        </Header>
                                <Button primary>Add Document</Button>
                            </div>
                        </Segment>
                            </Grid.Column>
                            <Grid.Column>
                            <Segment placeholder>
                            <div>
                                <h2>Line Example</h2>
                                <Header icon>
                                    <Icon name='pdf file outline' />
                                    No documents are listed for this customer.
                        </Header>
                                <Button primary>Add Document</Button>
                            </div>
                        </Segment>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </div>);
        }
    },
]

const OverviewLayout = () => (
    <div>
        <Menu fixed='top' inverted>
            <Menu.Item>
                <Image src={logo} size='tiny' fluid />
            </Menu.Item>
            <Menu.Item>
                <h4>Overview</h4>
            </Menu.Item>
            <Menu.Item>
                <h4>Sites</h4>
            </Menu.Item>
            <Menu.Item>
                <h4>Services</h4>
            </Menu.Item>
            <Menu.Item position='right'>
                <h4>Avatar</h4>
            </Menu.Item>
        </Menu>
        <Grid style={{ marginTop: '3em' }}>
            <Grid.Row columns={2}>
                <Grid.Column width={5}>
                    <Segment placeholder style={{ marginLeft: '2em' }}>
                        <div>
                            <h1>Errors</h1>
                            <Header icon>
                                <Icon name='pdf file outline' />
                                No documents are listed for this customer.
                        </Header>
                            <Button primary>Add Document</Button>
                        </div>
                    </Segment>
                </Grid.Column>

                <Grid.Column>
                    <Segment placeholder style={{ marginLeft: '2em' }}>
                        <h1>Service Status</h1>
                        <Table celled>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Header</Table.HeaderCell>
                                    <Table.HeaderCell>Header</Table.HeaderCell>
                                    <Table.HeaderCell>Header</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>
                                <Table.Row>
                                    <Table.Cell>
                                        <Label ribbon>First</Label>
                                    </Table.Cell>
                                    <Table.Cell>Cell</Table.Cell>
                                    <Table.Cell>Cell</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>Cell</Table.Cell>
                                    <Table.Cell>Cell</Table.Cell>
                                    <Table.Cell>Cell</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>Cell</Table.Cell>
                                    <Table.Cell>Cell</Table.Cell>
                                    <Table.Cell>Cell</Table.Cell>
                                </Table.Row>
                            </Table.Body>

                            <Table.Footer>
                                <Table.Row>
                                    <Table.HeaderCell colSpan='3'>
                                        <Menu floated='right' pagination>
                                            <Menu.Item as='a' icon>
                                                <Icon name='chevron left' />
                                            </Menu.Item>
                                            <Menu.Item as='a'>1</Menu.Item>
                                            <Menu.Item as='a'>2</Menu.Item>
                                            <Menu.Item as='a'>3</Menu.Item>
                                            <Menu.Item as='a'>4</Menu.Item>
                                            <Menu.Item as='a' icon>
                                                <Icon name='chevron right' />
                                            </Menu.Item>
                                        </Menu>
                                    </Table.HeaderCell>
                                </Table.Row>
                            </Table.Footer>
                        </Table>
                    </Segment>
                </Grid.Column>
            </Grid.Row>

            <Grid.Row>
                <Grid.Column>
                    <Segment placeholder style={{ marginLeft: '2em', marginRight: '2em' }}>
                        <div>
                            <h1>API Calls</h1>
                            <Line data={data} height={30} option={options} />
                        </div>
                    </Segment>
                </Grid.Column>
            </Grid.Row>

            <Grid.Row>
                <Grid.Column>
            <div style={{ marginLeft: '2em', marginRight: '2em' }}>
                <Carousel style={{ marginLeft: '2em' }}
                    elements={elements}
                    duration={3000}
                    animation='slide left'
                    showNextPrev={false}
                    showIndicators={false}
                />
                </div>
                </Grid.Column>
            </Grid.Row>
        </Grid>



    </div >
);

export default OverviewLayout;
