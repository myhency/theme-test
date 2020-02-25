import React from 'react';
import { Button, Header, Segment, Icon } from 'semantic-ui-react';

const ErrorCountingView = () => (

    <Segment placeholder style={{ marginLeft: '2em', "justify-content": 'start' }}>
        <div style={{ marginTop: '0em', fontSize: '30px' }}>Errors</div>
    </Segment>
);

export default ErrorCountingView;