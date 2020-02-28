import React from 'react';
import { Button, Form, Segment, Image } from 'semantic-ui-react';
import ListTable from '../components/ListTable';
import headerImage from '../assets/images/dns-site-verification.png';

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
        <Segment style={{ marginLeft: '2em', marginRight: '2em',  }}>
            <Image src={headerImage} size='medium' centered />
        </Segment>
    </div>
);

export default RegisterSite;