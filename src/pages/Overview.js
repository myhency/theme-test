import React from 'react';
import { Grid, Container, Image, Item, List } from 'semantic-ui-react';
import InstanceHealthCheckView from '../views/InstanceHealthCheckView';
import ApiCallsView from '../views/ApiCallsView';
import ServiceStatusSliderView from '../views/ServiceStatusSliderView';
import ErrorCountingView from '../views/ErrorCountingView';
import SiteCountingView from '../views/SiteCountingView';
import ServiiceCountingView from '../views/ServiceCountingView';
import clockIcon from '../assets/images/icon_time.png';
import { Styles } from '../components/OverviewLayoutStyle';


const Overview = (props) => {

    return (
        <Styles>
            <Grid style={{ width: '75%', marginLeft: 'auto', marginRight: 'auto' }}>
                <Grid.Row columns={2}>
                    <Grid.Column>
                        <Grid.Row>
                            <Grid>
                                <Grid.Row columns={2}>
                                    <Grid.Column verticalAlign='middle'>
                                        <span className='card-title'>Overview</span>
                                    </Grid.Column>
                                    <Grid.Column verticalAlign='middle' textAlign='right'>
                                        <Image className='clock-icon' src={clockIcon} avatar /><span className='period-text'>60m</span>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid>
                                <Grid.Row columns={3}>
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
                        </Grid.Row>
                        <Grid.Row className='row-layout'>
                            <Grid>
                                <Grid.Row columns={2}>
                                    <Grid.Column verticalAlign='middle'>
                                        <span className='card-title'>API Calls</span>
                                    </Grid.Column>
                                    <Grid.Column verticalAlign='middle' textAlign='right'>
                                        <Image className='clock-icon' src={clockIcon} avatar /><span className='period-text'>60m</span>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid>
                                <Grid.Row columns={1}>
                                    <Grid.Column>
                                        <ApiCallsView />
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Grid.Row>
                    </Grid.Column>
                    <Grid.Column>
                        <Grid.Row>
                            <Grid>
                                <Grid.Row columns={2}>
                                    <Grid.Column verticalAlign='middle'>
                                        <span className='card-title'>Instance Health Check</span>
                                    </Grid.Column>
                                    <Grid.Column verticalAlign='middle' textAlign='right'>
                                        <Image className='clock-icon' src={clockIcon} avatar /><span className='period-text'>60m</span>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid>
                                <Grid.Row columns={1}>
                                    <Grid.Column>
                                        <InstanceHealthCheckView history={props.history} />
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Grid.Row>
                    </Grid.Column>
                </Grid.Row>
            </Grid>


            {/* <Grid>
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
            </Grid> */}
        </Styles>
    );
};

export default Overview;