import React from 'react';
import { Grid, Segment } from 'semantic-ui-react';
import InstanceHealthCheckView from '../views/InstanceHealthCheckView';
import ApiCallsView from '../views/ApiCallsView';
import ServiceStatusSliderView from '../views/ServiceStatusSliderView';
import ErrorCountingView from '../views/ErrorCountingView';

const SiteList = () => (
    <InstanceHealthCheckView />

);

export default SiteList;