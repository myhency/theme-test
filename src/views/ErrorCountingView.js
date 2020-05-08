import React, { Component } from 'react';
import { Grid, Image, Container } from 'semantic-ui-react';
import axios from 'axios';
// import errorsIcon from '../assets/images/icon_errors@3x.png';
import errorsIcon from '../assets/images/icon_errors.svg';
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
                <Container className='counting-card' onClick={() => this.handleClick()}>
                    <Grid className='counting-card-content-box'>
                        <Grid.Row className='grid-row-header' columns={2} >
                            <Grid.Column verticalAlign='bottom'>
                                <span className='counting-card-title'>Errors</span>
                            </Grid.Column>
                            <Grid.Column textAlign='right'>
                                <Image className='title-icon' src={errorsIcon} />
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row className='grid-row-content' columns={1}>
                            <Grid.Column>
                                <span className='counting-card-content'>{count}</span>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
            </Styles>
        );
    }
}

export default ErrorCountingView;
