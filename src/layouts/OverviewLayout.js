import React from 'react';
import { Grid, Segment } from 'semantic-ui-react';
import TopMenuBarView from '../views/TopMenuBarView';
import InstanceHealthCheckView from '../views/InstanceHealthCheckView';
import ApiCallsView from '../views/ApiCallsView';
import ServiceStatusSliderView from '../views/ServiceStatusSliderView';
import ErrorCountingView from '../views/ErrorCountingView';

const OverviewLayout = () => (
    <div>
        {/* Top menu bar */}
        <TopMenuBarView />
        <Grid>
            {/* <Grid.Row>
                <Grid>
                    <Grid.Row>

                    </Grid.Row>
                </Grid>
                <Grid>

                </Grid>
            </Grid.Row> */}
            <Grid.Row stretched columns={2} style={{ marginTop: '4em' }}>
                <Grid.Column style={{ paddingLeft: '3em' }}>
                    <Segment>
                        <Grid columns={3}>
                            <Grid.Row>
                                <Grid.Column>
                                    <ErrorCountingView />
                                </Grid.Column>
                                <Grid.Column>
                                    <ErrorCountingView />
                                </Grid.Column>
                                <Grid.Column>
                                    <ErrorCountingView />
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Segment>
                    <Segment>
                        <ApiCallsView />
                    </Segment>
                </Grid.Column>
                <Grid.Column style={{ paddingRight: '3em' }}>
                    <InstanceHealthCheckView />
                </Grid.Column>
            </Grid.Row>

            {/* 
            <Grid.Row columns={2} style={{ marginTop: '4em' }}>
                <Grid.Column width={5} style={{ paddingLeft: '3em' }}>
                    <ErrorCountingView />
                </Grid.Column>

                <Grid.Column width={11} style={{ paddingLeft: '1em', paddingRight: '3em' }}>
                    <InstanceHealthCheckView />
                </Grid.Column>
            </Grid.Row>

            <Grid.Row columns={2}>
                <Grid.Column style={{ paddingLeft: '3em', paddingRight: '3em' }}>
                    <ApiCallsView />
                </Grid.Column>
                <Grid.Column style={{ paddingLeft: '3em', paddingRight: '3em' }}>
                    <ApiCallsView />
                </Grid.Column>
            </Grid.Row>
             */}

            <Grid.Row>
                <Grid.Column style={{ paddingLeft: '3em', paddingRight: '3em' }}>
                    {/* Service status slider view */}
                    <ServiceStatusSliderView />
                </Grid.Column>
            </Grid.Row>
        </Grid>
    </div >
);

export default OverviewLayout;
