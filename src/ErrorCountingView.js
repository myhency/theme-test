import React from 'react';
import { Button, Header, Segment, Icon } from 'semantic-ui-react';

const ErrorCountingView = () => (

    <Segment placeholder style={{ marginLeft: '2em' }}>
        <div>
            <h1>Errors</h1>
            <Header icon>
                <Icon name='pdf file outline' />
                No documents are listed for this customer.
                        </Header>
            <Button primary>Add Document</Button>
        </div>
    </Segment>
);

export default ErrorCountingView;