import React, { Component } from 'react';
import CountingCard from '../components/CountingCard';
import axios from 'axios';

const url = `/api/services/count`;

class ServiiceCountingView extends Component {
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
    }

    render() {
        const { count } = this.state;
        return (
            <CountingCard title={'Services'} type='info' count={count} />
        );
    }
}

export default ServiiceCountingView;
