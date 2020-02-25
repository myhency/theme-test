import React from 'react';
import { Table, Segment, Label } from 'semantic-ui-react';

const TopMenuBarView = () => (
    <Segment placeholder style={{ marginLeft: '2em' }}>
        <h1>Service Status</h1>
        <Table celled>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Header</Table.HeaderCell>
                    <Table.HeaderCell>Header</Table.HeaderCell>
                    <Table.HeaderCell>Header</Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                <Table.Row>
                    <Table.Cell>
                        <Label ribbon>First</Label>
                    </Table.Cell>
                    <Table.Cell>Cell</Table.Cell>
                    <Table.Cell>Cell</Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell>Cell</Table.Cell>
                    <Table.Cell>Cell</Table.Cell>
                    <Table.Cell>Cell</Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell>Cell</Table.Cell>
                    <Table.Cell>Cell</Table.Cell>
                    <Table.Cell>Cell</Table.Cell>
                </Table.Row>
            </Table.Body>
        </Table>
    </Segment>
);

export default TopMenuBarView;