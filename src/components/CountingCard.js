import React from 'react';
import { Header, Card, Label } from 'semantic-ui-react';

const getTextColor = (props) => {
    if (props.type == 'info') return '#0A1654';
    return props.count > 0 ? 'red' : 'green';
}

const CountingCard = (props) => {

    let textColor = getTextColor(props);

    return (
        <Card>
            <Header as='h1' style={{ marginTop: '14px', marginLeft: '14px' }}>
                {props.title}
                <Label attached='top right' size='mini'>60m</Label>
            </Header>
            <Card.Content>
                <Card.Description>
                    <p style={{
                        fontSize: '100px',
                        fontWeight: 'bold',
                        color: textColor,
                        textAlign: 'center'
                    }}>
                        {props.count}
                    </p>
                </Card.Description>
            </Card.Content>
        </Card>
    )
};

export default CountingCard;
