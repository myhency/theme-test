import React from 'react';
import { Grid, Image } from 'semantic-ui-react';
import InstanceHealthCheckView from '../views/InstanceHealthCheckView';
import ApiCallsView from '../views/ApiCallsView';
import ErrorCountingView from '../views/ErrorCountingView';
import SiteCountingView from '../views/SiteCountingView';
import ServiceCountingView from '../views/ServiceCountingView';
import clockIcon from '../assets/images/icon_time.png';
import dataIcon from '../assets/images/icon_data.png';
import { Styles } from '../components/OverviewLayoutStyle';
import ServiceSliderView from '../views/ServiceSliderView';


const Overview = (props) => {

    return (
        <Styles>
            <Grid className='grid-style'>
                {/* 첫 번째 줄(Overview, InstanceHealthCheckView) */}
                <Grid.Row columns={2}>
                    <Grid.Column>
                        <Grid.Row>
                            <Grid>
                                <Grid.Row columns={2}>
                                    <Grid.Column verticalAlign='middle'>
                                        <span className='card-title'>Overview</span>
                                    </Grid.Column>
                                    <Grid.Column verticalAlign='middle' textAlign='right'>
                                        <Image
                                            className='clock-icon'
                                            src={clockIcon}
                                            avatar />
                                        <span className='period-text'>60m</span>
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
                                        <ServiceCountingView history={props.history} />
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
                                        <Image
                                            className='clock-icon'
                                            src={clockIcon}
                                            avatar />
                                        <span className='period-text'>60m</span>
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
                                        <Image
                                            className='clock-icon'
                                            src={clockIcon}
                                            avatar />
                                        <span className='period-text'>60m</span>
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
                {/* 두 번째 줄(서비스별 발급 현황) */}
                <Grid.Row columns={2}>
                    <Grid.Column width={12}>
                        <Grid.Row>
                            <Grid>
                                <Grid.Row columns={2}>
                                    <Grid.Column verticalAlign='middle'>
                                        <span className='card-title'>서비스별 발급 현황</span>
                                    </Grid.Column>
                                    <Grid.Column verticalAlign='middle' textAlign='right'>
                                        <Image
                                            className='clock-icon'
                                            src={clockIcon}
                                            avatar />
                                        <span className='period-text'>60m</span>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Grid.Row>
                    </Grid.Column>
                    <Grid.Column width={4}>
                        <Grid.Row>
                            <Grid>
                                <Grid.Row columns={1}>
                                    <Grid.Column verticalAlign='middle' textAlign='right'>
                                        <Image
                                            className='clock-icon'
                                            src={dataIcon} avatar />
                                        <span className='period-text'>금월/누적</span>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Grid.Row>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row >
                    <Grid.Column>
                        <ServiceSliderView />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Styles>
    );
};

export default Overview;