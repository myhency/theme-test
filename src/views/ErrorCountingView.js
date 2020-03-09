import React, { Component } from 'react';
import CountingCard from '../components/CountingCard';
import Fetch from '../utils/Fetch';

const url = '/sites/count';

class ErrorCountingView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            count: 0
        }
    }

    getErrorCount = () => {
        Fetch.GET(url)
            .then((res) => res.json())
            .then(res => {
                this.setState({
                    count: res.result
                })
            });
    }

    render() {
        const { count } = this.state;
        return (
            <CountingCard title={'Errors'} type='error' count={count} />
        );
    }
}

export default ErrorCountingView;