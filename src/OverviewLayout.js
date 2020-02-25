import React from 'react';
import { Grid } from 'semantic-ui-react';
import ErrorCountingView from './ErrorCountingView';
import TopMenuBarView from './TopMenuBarView';
import InstanceHealthCheckView from './InstanceHealthCheckView';
import ApiCallsView from './ApiCallsView';
import ServiceStatusSliderView from './ServiceStatusSliderView';

const OverviewLayout = () => (
    <div>
        {/* Top menu bar */}
        <TopMenuBarView />
        <Grid style={{ marginTop: '3em' }}>
            <Grid.Row columns={2}>
                <Grid.Column width={5}>
                    {/* Error counting view */}
                    <ErrorCountingView />
                </Grid.Column>

                <Grid.Column>
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
