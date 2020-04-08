import React from 'react';
import { Header, Card, Label, Grid, Image } from 'semantic-ui-react';
import styled from 'styled-components';
import clockIcon from '../assets/images/icon_time.png';

const Styles = styled.div`
    .counting-card-title {
        width: 44px;
        height: 24px;
        font-size: 16px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.5;
        letter-spacing: -0.16px;
        text-align: left;
    }
`

const getTextColor = (props) => {
    if (props.type === 'info') return '#0A1654';
    return props.count > 0 ? '#fc6386' : '#3b4a5f';
}

const CountingCard = (props) => {
    let textColor = getTextColor(props);

    return (
        <Styles>
        <Card onClick={() => props.onClick()}>
        <Card.Content>
            <Grid>
                <Grid.Row columns={2}>
                    <Grid.Column>
                        <span className='counting-card-title'>{props.title}</span>
                    </Grid.Column>
                    <Grid.Column>
                        <Image className='clock-icon' src={clockIcon} avatar />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Card.Content>
            {/* <Header as='h1' style={{ marginTop: '14px', marginLeft: '14px' }}>
                 {props.title}
             </Header> */}
        </Card>
        {/* <Card onClick={() => props.onClick()}>
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
        </Card> */}
        </Styles>
    )
};

export default CountingCard;
