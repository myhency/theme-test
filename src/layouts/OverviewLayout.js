import React from 'react';
import { Grid } from 'semantic-ui-react';
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
            <Grid.Row columns={2} style={{ marginTop: '4em' }}>
                <Grid.Column width={5} style={{ paddingLeft: '3em' }}>
                    {/* Error counting view */}
                    <ErrorCountingView />
                </Grid.Column>

                <Grid.Column width={11} style={{ paddingLeft: '1em', paddingRight: '3em' }}>
                    {/* Instance health-check view */}
                    <InstanceHealthCheckView />
                </Grid.Column>
            </Grid.Row>

            <Grid.Row columns={1}>
                <Grid.Column style={{ paddingLeft: '3em', paddingRight: '3em' }}>
                    {/* API Calls */}
                    <ApiCallsView />
                </Grid.Column>
            </Grid.Row>

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
