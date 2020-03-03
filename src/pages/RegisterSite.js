import React from 'react';
import { Segment, Image } from 'semantic-ui-react';
import headerImage from '../assets/images/dns-site-verification.png';

const RegisterSite = () => (
    <div style={{ marginTop: '4em' }}>
        <Segment style={{ marginLeft: '2em', marginRight: '2em', backgroundColor: '#ffd265' }}>
            <Image src={headerImage} size='medium' centered />
        </Segment>
    </div>
);

export default RegisterSite;