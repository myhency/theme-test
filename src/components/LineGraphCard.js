import React from 'react';
import { Segment, Header } from 'semantic-ui-react';
import { Line } from 'react-chartjs-2';

const LineGraphCard = (props) => {
    console.log(props.options);
    return (
        <Segment style={{ justifyContent: 'start' }}>
            <div style={{ marginBottom: '1em' }}>
                <Header as='h1'>{props.title}</Header>
            </div>
            <Line
                data={props.data}
                height={60}
                options={props.options}
            />
        </Segment>
    )
};

export default LineGraphCard;
