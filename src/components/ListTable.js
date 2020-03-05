import React from 'react';
import { Table, Menu, Icon } from 'semantic-ui-react';

const EmptyColumns = (data) => {
    let rows = [];
    let columnLength = data.data.cellData.length > 0 ? data.data.cellData.length : 3;

    for (let i = columnLength; i < 9; i++) {
        rows.push((
            <Table.Row key={i}>
                <EmptyCells data={data} />
            </Table.Row>
        ))
    }
    return rows;
}

const EmptyCells = (data) => {
    let cells = [];
    let cellDataLength = data.data.data.cellData[0].length;

    for (let i = 0; i < cellDataLength; i++) {
        cells.push((
            <Table.Cell style={{ fontSize: '16px' }} textAlign='center' key={i}>&nbsp;</Table.Cell>
        ))
    }
    return cells;
}

const ListTable = (props) => {
    let headers = props.headers;
    let data = props.data;

    return (
        <div>
            <Table celled selectable>

                <Table.Header>
                    <Table.Row>
                        {headers.map((value, index) => {
                            return <Table.HeaderCell
                                style={{
                                    fontSize: '20px',
                                    backgroundColor: 'Gainsboro'
                                }}
                                textAlign='center'
                                key={index}>{value}
                            </Table.HeaderCell>
                        })}
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {data.cellData.map((rowValue, rowIndex) => {
                        return (
                            <Table.Row
                                key={rowIndex}
                                onClick={() => props.handleClick(rowValue)}>
                                {rowValue.map((cellValue, cellIndex) => {
                                    return (
                                        <Table.Cell
                                            style={{ fontSize: '16px' }}
                                            textAlign='center'
                                            key={cellIndex}>{cellValue}
                                        </Table.Cell>)
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
    )
};

export default ListTable;