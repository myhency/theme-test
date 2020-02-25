import React from 'react';
import { Grid } from 'semantic-ui-react';
import TopMenuBarView from './TopMenuBarView';
import InstanceHealthCheckView from './InstanceHealthCheckView';
import ApiCallsView from './ApiCallsView';
import ServiceStatusSliderView from './ServiceStatusSliderView';
import ErrorCountingView from './ErrorCountingView';

const OverviewLayout = () => (
    <div>
        {/* Top menu bar */}
        <TopMenuBarView />
        <Grid>
            <Grid.Row columns={2} style={{ marginTop: '3em' }}>
                <Grid.Column width={5}>
                    {/* Error counting view */}
                    <ErrorCountingView />
                </Grid.Column>

                <Grid.Column style={{ marginLeft: '-2em' }}>
                    {/* Instance health-check view */}
                    <InstanceHealthCheckView />
                </Grid.Column>
            </Grid.Row>

            <Grid.Row>
                <Grid.Column>
                    {/* API Calls */}
                    <ApiCallsView />
                </Grid.Column>
            </Grid.Row>

            <Grid.Row>
                <Grid.Column>
                    {/* Service status slider view */}
                    <ServiceStatusSliderView />
                </Grid.Column>
            </Grid.Row>
        </Grid>
    </div >
);

export default OverviewLayout;
