import React from 'react';
import { Segment, Header } from 'semantic-ui-react';
import { Line, defaults } from 'react-chartjs-2';

defaults.global.legend.display = false;

const LineGraphCard = (props) => {
    console.log(props);
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
