import React, { Component } from 'react';
import CountingCard from '../components/CountingCard';
import axios from 'axios';

class SiteCountingView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            count: 0
        }

        this.getCount();
    }

    componentDidMount() {
        let intervalId = setInterval(this.getCount, 3000);
        this.setState({ intervalId: intervalId});
    }

    componentWillUnmount() {
        clearInterval(this.state.intervalId);
    }

    getCount = () => {
        const url = `/api/sites/count`;
        try {
            return axios.get(url).then(response => {
                this.setState({
                    count: response.data.result
                })
            });
        } catch (error) {
            console.log(error);
        }
    }

    handleClick = () => {
        this.props.history.push({
            pathname: '/home/sites/'
        });
    }

    render() {
        const { count } = this.state;
        return (
            <CountingCard title={'Sites'} type='info' count={count} onClick={() => this.handleClick()} />
        );
    }
}

export default SiteCountingView;
