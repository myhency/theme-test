import React from 'react';
import { Header, Grid, Icon } from 'semantic-ui-react';

const PageTitle = (props) => {
    return (
        <Grid>
            <Grid.Row>
                <Grid.Column floated='left' verticalAlign='middle' width={16}>
                    <Header as='h1'><Icon name={props.iconName} />{props.title}</Header>
                    <p style={{ fontSize: '12px', color: 'grey' }}>{props.description}</p>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
}

export default PageTitle;
