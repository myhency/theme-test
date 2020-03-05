import React from 'react';
import { Segment, Header, Card, Label } from 'semantic-ui-react';
import { Line } from 'react-chartjs-2';

const LineGraphCard = (props) => {

    return (
        <Card style={{ width: '100%' }}>
            <Header as='h1' style={{ marginTop: '14px', marginLeft: '14px' }}>
                {props.title}
                <Label attached='top right' size='mini'>60m</Label>
            </Header>
            <Card.Content>
                <Card.Description>
                    <Line
                        data={props.data}
                        height={60}
                        options={props.options}
                    />
                </Card.Description>
            </Card.Content>
        </Card>

    )
};

export default LineGraphCard;