import React from 'react';
import { Segment, Header, Container } from 'semantic-ui-react';
import { Line } from 'react-chartjs-2';

const LineGraphCard = (props) => {

    return (
        <Segment placeholder style={{ justifyContent: 'start' }}>
            <div style={{ marginBottom: '2em' }}>
                <Header as='h1'>{props.title}</Header>
            </div>
            <Line data={props.data} height={30} option={props.options} />
        </Segment>
    )
};

export default LineGraphCard;
