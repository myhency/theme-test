import React, { Component } from 'react';
import { Card, Grid, Image } from 'semantic-ui-react';
import axios from 'axios';
import errorsIcon from '../assets/images/icon_errors.png';
import { Styles } from '../components/CountingCardStyle';

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
        this.setState({ intervalId: intervalId });
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
            <Styles color='#fc6386'>
                <Card className='counting-card' onClick={() => this.handleClick()}>
                    <Card.Content>
                        <Grid>
                            <Grid.Row className='grid-row-header' columns={2} >
                                <Grid.Column verticalAlign='bottom'>
                                    <span className='counting-card-title'>Errors</span>
                                </Grid.Column>
                                <Grid.Column textAlign='right'>
                                    <Image className='title-icon' src={errorsIcon} avatar />
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row className='grid-row-content' columns={1}>
                                <Grid.Column>
                                    <span className='counting-card-content'>{count}</span>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Card.Content>
                </Card>
            </Styles>
        );
    }
}

export default ErrorCountingView;
