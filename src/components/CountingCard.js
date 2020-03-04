import React from 'react';
import { Segment, Container, Header } from 'semantic-ui-react';

const getTextColor = (props) => {
    if (props.type == 'info') return '#0A1654';
    return props.count > 0 ? 'red' : 'green';
}

const CountingCard = (props) => {

    let textColor = getTextColor(props);

    return (
        <Segment style={{ justifyContent: 'start' }}>
            <Header as='h1'>{props.title}</Header>
            <p style={{
                fontSize: '100px',
                fontWeight: 'bold',
                color: textColor,
                textAlign: 'center'
            }}>{props.count}</p>
        </Segment>
    )
};

export default CountingCard;
