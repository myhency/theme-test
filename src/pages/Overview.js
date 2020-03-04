import React from 'react';
import { Grid, Segment } from 'semantic-ui-react';
import InstanceHealthCheckView from '../views/InstanceHealthCheckView';
import ApiCallsView from '../views/ApiCallsView';
import ServiceStatusSliderView from '../views/ServiceStatusSliderView';
import ErrorCountingView from '../views/ErrorCountingView';
import SiteCountingView from '../views/SiteCountingView';
import ServiiceCountingView from '../views/ServiceCountingView';

const Overview = () => (
    <Grid>
        <Grid.Row stretched columns={2}>
            <Grid.Column style={{ paddingLeft: '3em' }}>
                <Grid columns={3}>
                    <Grid.Row>
                        <Grid.Column>
                            <ErrorCountingView />
                        </Grid.Column>
                        <Grid.Column>
                            <SiteCountingView />
                        </Grid.Column>
                        <Grid.Column>
                            <ServiiceCountingView />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <ApiCallsView />
            </Grid.Column>
            <Grid.Column style={{ paddingRight: '3em' }}>
                <InstanceHealthCheckView />
            </Grid.Column>
        </Grid.Row>

        <Grid.Row>
            <Grid.Column style={{ paddingLeft: '3em', paddingRight: '3em' }}>
                {/* Service status slider view */}
                <ServiceStatusSliderView />
            </Grid.Column>
        </Grid.Row>
    </Grid>
);

export default Overview;