import React, { Component } from 'react';
import CountingCard from '../components/CountingCard';
import Fetch from '../utils/Fetch';
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
        setInterval(this.getCount, 3000);
    }

    componentWillUnmount() {
        clearInterval(this.getCount);
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
        // Fetch.GET(url)
        //     .then((res) => {
        //         res.json()
        //     })
        //     .then(response => {
        //         console.log(response)
        //         // this.setState({
        //         //     count: res.result
        //         // })
        //     });
    }

    render() {
        const { count } = this.state;
        return (
            <CountingCard title={'Errors'} type='error' count={count} />
        );
    }
}

export default ErrorCountingView;
