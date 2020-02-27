import React from 'react';
import CountingCard from '../components/CountingCard';

const ErrorCountingView = () => (
    <CountingCard title={'Errors'} type='error' count={2} />
);

export default ErrorCountingView;