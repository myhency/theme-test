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

const SiteList = () => (
    <div style={{ marginTop: '4em' }}>
        <Segment style={{ marginLeft: '2em', marginRight: '2em' }}>
            <Form>
                <Form.Group widths='equal'>
                    <Form.Input fluid label='First name' placeholder='First name' />
                    <Form.Input fluid label='Last name' placeholder='Last name' />
                    <Form.Input fluid label='First name' placeholder='First name' />
                    <Form.Input fluid label='Last name' placeholder='Last name' />
                </Form.Group>
                <Form.Group widths='equal'>
                    <Form.Input fluid label='First name' placeholder='First name' />
                    <Form.Input fluid label='Last name' placeholder='Last name' />
                    <Form.Input fluid label='First name' placeholder='First name' />
                    <Form.Input fluid label='Last name' placeholder='Last name' />
                </Form.Group>
                <Button type='submit'>Search</Button>
            </Form>
        </Segment>
        <div style={{ marginLeft: '2em', marginRight: '2em' }}>
            <ListTable
                title={'Site List'}
                headers={headers}
                data={data} />
        </div>
    </div>
);

export default SiteList;