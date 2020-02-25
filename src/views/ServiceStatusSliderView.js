import React from 'react';
import Carousel from 'semantic-ui-carousel-react';
import { Button, Grid, Header, Segment, Icon } from 'semantic-ui-react';

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

const ServiceStatusSliderView = () => (
    <div style={{ marginLeft: '2em', marginRight: '2em' }}>
        <Carousel style={{ marginLeft: '2em' }}
            elements={elements}
            duration={3000}
            animation='slide left'
            showNextPrev={false}
            showIndicators={false}
        />
    </div>
);

export default ServiceStatusSliderView;