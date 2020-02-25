import React from 'react';
import { Segment, Container, Header } from 'semantic-ui-react';

const CountingCard = (props) => {
    let textColor = props.count > 0 ? 'red' : 'green';

    return (
        <Segment placeholder style={{ marginLeft: '2em', justifyContent: 'start' }}>
            <Header as='h1'>{props.title}</Header>
            <Container textAlign='center'>
                <p style={{ fontSize: '120px', fontWeight: 'bold', color: textColor }}>{props.count}</p>
            </Container>
        </Segment>
    )
};

export default CountingCard;
