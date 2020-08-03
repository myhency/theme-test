import React from 'react';
import { Grid, Image } from 'semantic-ui-react';
import InstanceHealthCheckView from '../views/InstanceHealthCheckView';
import ApiCallsView from '../views/ApiCallsView';
import ErrorCountingView from '../views/ErrorCountingView';
import SiteCountingView from '../views/SiteCountingView';
import ServiceCountingView from '../views/ServiceCountingView';
// import clockIcon from '../assets/images/icon_time.png';
import clockIcon from '../assets/images/icon_time.svg';
import dataIcon from '../assets/images/icon_data.svg';
import { Styles } from '../components/OverviewLayoutStyle';
import ServiceSliderView from '../views/ServiceSliderView';


const Overview = (props) => {

    return (
        <Styles>
            <Grid className='grid-style'>
                <Grid.Row columns={2}>
                    <Grid.Column computer={8} tablet={16} stretched>
                        <Grid>
                            <Grid.Row columns={2}>
                                <Grid.Column width={8} verticalAlign='middle'>
                                    <span className='card-title'>Overview</span>
                                </Grid.Column>
                                <Grid.Column width={8} verticalAlign='middle' textAlign='right'>
                                    <Image
                                        className='clock-icon'
                                        src={clockIcon}
                                    />
                                    <span className='period-text'>60m</span>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row columns={3} className='grid-row-nopadding'>
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
                            <Grid.Row columns={2}>
                                <Grid.Column width={8} verticalAlign='middle'>
                                    <span className='card-title'>API Calls</span>
                                </Grid.Column>
                                <Grid.Column width={8} verticalAlign='middle' textAlign='right'>
                                    <Image
                                        className='clock-icon'
                                        src={clockIcon}
                                    />
                                    <span className='period-text'>60m</span>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row columns={1} className='grid-row-nopadding'>
                                <Grid.Column>
                                    <ApiCallsView />
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Grid.Column>
                    <Grid.Column computer={8} tablet={16} stretched>
                        <Grid>
                            <Grid.Row columns={2}>
                                <Grid.Column verticalAlign='middle'>
                                    <span className='card-title'>Instance Health Check</span>
                                </Grid.Column>
                                <Grid.Column verticalAlign='middle' textAlign='right'>
                                    <Image
                                        className='clock-icon'
                                        src={clockIcon}
                                    />
                                    <span className='period-text'>60m</span>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row columns={1} className='grid-row-nopadding'>
                                <Grid.Column>
                                    <InstanceHealthCheckView history={props.history} />
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <Grid>
                            <Grid.Row columns={3}>
                                <Grid.Column width={6} verticalAlign='middle'>
                                    <span className='card-title'>서비스별 발급 현황</span>
                                </Grid.Column>
                                <Grid.Column width={6} verticalAlign='middle' textAlign='right'>
                                    <Image
                                        className='clock-icon'
                                        src={clockIcon}
                                    />
                                    <span className='period-text'>60m</span>
                                </Grid.Column>
                                <Grid.Column width={4} verticalAlign='middle' textAlign='right'>
                                    <Image
                                        className='clock-icon'
                                        src={dataIcon} />
                                    <span className='period-text'>금월/누적</span>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row columns={1} className='grid-row-nopadding' stretched>
                                <Grid.Column width={16}>
                                    <ServiceSliderView />
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Styles>
    );
};

export default Overview;