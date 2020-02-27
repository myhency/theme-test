import React from 'react';
import { Table, Segment, Header, Menu, Icon } from 'semantic-ui-react';

const EmptyColumns = (data) => {

    let rows = [];
    for (let i = data.data.cellData.length; i < 11; i++) {
        rows.push((
            <Table.Row key={i}>
                <Table.Cell style={{ fontSize: '16px' }} textAlign='center' key={i + 1}>&nbsp;</Table.Cell>
                <Table.Cell style={{ fontSize: '16px' }} textAlign='center' key={i + 2}>&nbsp;</Table.Cell>
                <Table.Cell style={{ fontSize: '16px' }} textAlign='center' key={i + 3}>&nbsp;</Table.Cell>
                <Table.Cell style={{ fontSize: '16px' }} textAlign='center' key={i + 2}>&nbsp;</Table.Cell>
                <Table.Cell style={{ fontSize: '16px' }} textAlign='center' key={i + 3}>&nbsp;</Table.Cell>
            </Table.Row>
        ))
    }
    return rows;
}

const ListTable = (props) => {
    let headers = props.headers;
    let data = props.data;

    return (
        <Segment placeholder style={{ justifyContent: 'start' }}>
            <div style={{ marginBottom: '2em' }}>
                <Header as='h1'>{props.title}</Header>
            </div>
            <div>
                <Table celled>
                    
                    <Table.Header>
                        <Table.Row>
                            {headers.map((value, index) => {
                                return <Table.HeaderCell style={{ fontSize: '20px', backgroundColor: 'Gainsboro' }} textAlign='center' key={index}>{value}</Table.HeaderCell>
                            })}
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {data.cellData.map((rowValue, rowIndex) => {
                            return (
                                <Table.Row key={rowIndex}>
                                    {rowValue.map((cellValue, cellIndex) => {
                                        return <Table.Cell style={{ fontSize: '16px' }} textAlign='center' key={cellIndex}>{cellValue}</Table.Cell>
                                    })}
                                </Table.Row>
                            );
                        })}
                        <EmptyColumns data={data} />
                    </Table.Body>
                    <Table.Footer>
                        <Table.Row>
                            <Table.HeaderCell colSpan='5'>
                                <Menu floated='right' pagination>
                                    <Menu.Item as='a' icon>
                                        <Icon name='chevron left' />
                                    </Menu.Item>
                                    <Menu.Item as='a'>1</Menu.Item>
                                    <Menu.Item as='a'>2</Menu.Item>
                                    <Menu.Item as='a'>3</Menu.Item>
                                    <Menu.Item as='a'>4</Menu.Item>
                                    <Menu.Item as='a' icon>
                                        <Icon name='chevron right' />
                                    </Menu.Item>
                                </Menu>
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Footer>
                </Table>
            </div>
        </Segment>
    )
};

export default ListTable;