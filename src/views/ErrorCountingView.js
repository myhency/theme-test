import React, { Component } from 'react';
import CountingCard from '../components/CountingCard';
import axios from 'axios';

const url = `/api/logs/error/count`;

class ErrorCountingView extends Component {
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
            pathname: '/home/logs/'
        });
    }

    render() {
        const { count } = this.state;
        return (
            <CountingCard title={'Errors'} type='error' count={count} onClick={() => this.handleClick()}/>
        );
    }
}

export default ErrorCountingView;
