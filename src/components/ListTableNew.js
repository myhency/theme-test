import React from 'react';
import { Table, Menu, Icon } from 'semantic-ui-react';
import Gallery from '../utils/Gallery';

const EmptyColumns = (props) => {
    let rows = [];
    let columnLength = props.data.cellData.length > 0 ? props.data.cellData.length : 3;

    if(props.data.cellData.length === 0) return <></>;

    for (let i = columnLength; i < props.count; i++) {
        rows.push((
            <Table.Row key={i}>
                <EmptyCells data={props.data} />
            </Table.Row>
        ))
    }
    return rows;
}

const EmptyCells = (props) => {
    let cells = [];
    let cellDataLength = props.data.cellData[0].data.length;

    for (let i = 0; i < cellDataLength; i++) {
        cells.push((
            <Table.Cell style={{ fontSize: '16px' }} textAlign='center' key={i}>&nbsp;</Table.Cell>
        ))
    }
    return cells;
}

const TableFoots = (props) => {
    if (props.foots)
        return <Table.Footer>
            <Table.Row>
                <Table.HeaderCell colSpan={props.length}>
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
    
    return <></>
}

const ListTableNew = (props) => {
    let headers = props.headers;
    let data = props.data;
    let numberOfRows = props.count;
    let foots = props.foots;

    console.log(data)

    return (
        <div>
            <Table celled selectable>
                <Table.Header>
                    <Table.Row>
                        {headers.map((value, index) => {
                            return <Table.HeaderCell
                                style={{
                                    fontSize: '18px',
                                    backgroundColor: 'Gainsboro'
                                }}
                                textAlign='center'
                                key={index}>
                                {value}
                            </Table.HeaderCell>
                        })}
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {data.cellData.map((rowValue, rowIndex) => {
                        return (
                            <Table.Row
                                key={rowIndex}
                                onClick={() => props.handleOnClick(rowValue.id)}>
                                {rowValue.data.map((cellValue, cellIndex) => {
                                    if (cellValue === 'true' || cellValue === 'false') {
                                        return <Table.Cell
                                            style={{ fontSize: '16px' }}
                                            textAlign='center'
                                            key={cellIndex}>
                                            <img src={Gallery.getLogoImage(cellValue)} />
                                        </Table.Cell>
                                    } else {
                                        return <Table.Cell
                                            style={{ fontSize: '16px' }}
                                            textAlign='center'
                                            key={cellIndex}>
                                            {cellValue}
                                        </Table.Cell>
                                    }
                                })}
                            </Table.Row>
                        );
                    })}
                    <EmptyColumns data={data} count={numberOfRows} />
                </Table.Body>
                <TableFoots foots={foots} length={headers.length} />
            </Table>
        </div>
    )
};

export default ListTableNew;