import React from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import ListTable from '../components/ListTable';

const headers = ['Service Name', 'Role', 'Company', 'Open Date'];

const data = {
    cellData: [
        ['재직증명서발급', 'Issuer', '현대카드', '2020-06-30'],
        ['갑근세영수증발급', 'Verissuer', '현대카드', '2020-06-30'],
        ['모바일전자사원증발급', 'Verifier', '현대카드', '2020-06-30'],
        ['법인카드발급증명서발급', 'Verissuer', '현대카드', '2020-07-30'],
    ]
}

const ServiceList = () => (
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
                title={'Service List'}
                headers={headers}
                data={data} />
        </div>
    </div>
);

export default ServiceList;