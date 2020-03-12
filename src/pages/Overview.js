import React from 'react';
import { Grid } from 'semantic-ui-react';
import InstanceHealthCheckView from '../views/InstanceHealthCheckView';
import ApiCallsView from '../views/ApiCallsView';
import ServiceStatusSliderView from '../views/ServiceStatusSliderView';
import ErrorCountingView from '../views/ErrorCountingView';
import SiteCountingView from '../views/SiteCountingView';
import ServiiceCountingView from '../views/ServiceCountingView';

const Overview = (props) => {
    console.log(props);

    return (
        <Grid>
            <Grid.Row stretched columns={2}>
                <Grid.Column style={{ paddingLeft: '3em' }}>
                    <Grid columns={3}>
                        <Grid.Row>
                            <Grid.Column>
                                <ErrorCountingView history={props.history} />
                            </Grid.Column>
                            <Grid.Column>
                                <SiteCountingView history={props.history} />
                            </Grid.Column>
                            <Grid.Column>
                                <ServiiceCountingView history={props.history} />
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    <ApiCallsView />
                </Grid.Column>
                <Grid.Column style={{ paddingRight: '3em' }}>
                    <InstanceHealthCheckView history={props.history} />
                </Grid.Column>
            </Grid.Row>

            <Grid.Row>
                <Grid.Column style={{ paddingLeft: '3em', paddingRight: '3em' }}>
                    <ServiceStatusSliderView />
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
};

export default Overview;