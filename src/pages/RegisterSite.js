import React from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import ListTable from '../components/ListTable';

const headers = ['Site Name', 'Issued Credentials', 'Verified Credentials', 'Number of Services', 'Open Date'];

const data = {
    cellData: [
        ['현대카드', '30', '6', '4', '2020-06-30'],
        ['현대카드', '30', '6', '4', '2020-06-30'],
        ['현대카드', '30', '6', '4', '2020-06-30'],
        ['현대카드', '30', '6', '4', '2020-06-30'],
        ['현대카드', '30', '6', '4', '2020-06-30'],
        ['현대카드', '30', '6', '4', '2020-06-30'],
    ]
}

const RegisterSite = () => (
    <div style={{ marginTop: '4em' }}>
        <Segment style={{ marginLeft: '2em', marginRight: '2em' }}>
            
        </Segment>
    </div>
);

export default RegisterSite;