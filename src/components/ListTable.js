import React from 'react';
import { Table, Menu, Icon } from 'semantic-ui-react';
import Gallery from '../utils/Gallery';
import { useTable, usePagination } from 'react-table';

const data = [{
    firstName: 'information',
    lastName: 'recess',
    age: 0,
    visits: 89,
    progress: 0,
    status: 'complicated',
    subRows: undefined
}, {
    firstName: 'information',
    lastName: 'recess',
    age: 0,
    visits: 89,
    progress: 0,
    status: 'complicated',
    subRows: undefined
}, {
    firstName: 'information',
    lastName: 'recess',
    age: 0,
    visits: 89,
    progress: 0,
    status: 'complicated',
    subRows: undefined
}, {
    firstName: 'information',
    lastName: 'recess',
    age: 0,
    visits: 89,
    progress: 0,
    status: 'complicated',
    subRows: undefined
}, {
    firstName: 'information',
    lastName: 'recess',
    age: 0,
    visits: 89,
    progress: 0,
    status: 'complicated',
    subRows: undefined
},{
    firstName: 'information',
    lastName: 'recess',
    age: 0,
    visits: 89,
    progress: 0,
    status: 'complicated',
    subRows: undefined
}, {
    firstName: 'information',
    lastName: 'recess',
    age: 0,
    visits: 89,
    progress: 0,
    status: 'complicated',
    subRows: undefined
}, {
    firstName: 'information',
    lastName: 'recess',
    age: 0,
    visits: 89,
    progress: 0,
    status: 'complicated',
    subRows: undefined
}, {
    firstName: 'information',
    lastName: 'recess',
    age: 0,
    visits: 89,
    progress: 0,
    status: 'complicated',
    subRows: undefined
}, {
    firstName: 'information',
    lastName: 'recess',
    age: 0,
    visits: 89,
    progress: 0,
    status: 'complicated',
    subRows: undefined
},
{
    firstName: 'information',
    lastName: 'recess',
    age: 0,
    visits: 89,
    progress: 0,
    status: 'complicated',
    subRows: undefined
}, {
    firstName: 'information',
    lastName: 'recess',
    age: 0,
    visits: 89,
    progress: 0,
    status: 'complicated',
    subRows: undefined
}, {
    firstName: 'information',
    lastName: 'recess',
    age: 0,
    visits: 89,
    progress: 0,
    status: 'complicated',
    subRows: undefined
}, {
    firstName: 'information',
    lastName: 'recess',
    age: 0,
    visits: 89,
    progress: 0,
    status: 'complicated',
    subRows: undefined
}, {
    firstName: 'information',
    lastName: 'recess',
    age: 0,
    visits: 89,
    progress: 0,
    status: 'complicated',
    subRows: undefined
}]

const columns = [
    {
        Header: 'firstName',
        accessor: 'firstName'
    },
    {
        Header: 'lastName',
        accessor: 'lastName'
    },
    {
        Header: 'age',
        accessor: 'age'
    },
    {
        Header: 'visits',
        accessor: 'visits'
    },
    {
        Header: 'progress',
        accessor: 'progress'
    },
    {
        Header: 'status',
        accessor: 'status'
    }

]

const EmptyColumns = (props) => {
    let rows = [];
    let columnLength = props.data.cellData.length > 0 ? props.data.cellData.length : 3;

    if (props.data.cellData.length === 0) return <></>;

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

const ListTable = (props) => {
    let headers = props.headers;
    // let data = props.data;
    let numberOfRows = props.count;
    let foots = props.foots;
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page, // Instead of using 'rows', we'll use page,
        // which has only the rows for the active page

        // The rest of these things are super handy, too ;)
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize },
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 2 },
        },
        usePagination
    )

    console.log(data)

    return (
        <div>
            <Table celled {...getTableProps()}>
                <Table.Header>
                    <Table.Row>
                        {columns.map((value, index) => {
                            return <Table.HeaderCell
                                // {...value.getHeaderProps()}
                                style={{
                                    fontSize: '18px',
                                    backgroundColor: 'Gainsboro'
                                }}
                                textAlign='center'
                                key={index}>
                                {value.Header}
                            </Table.HeaderCell>
                        })}
                    </Table.Row>
                </Table.Header>

                <Table.Body {...getTableBodyProps()}>
                    {page.map((rowValue, rowIndex) => {
                        prepareRow(rowValue)
                        console.log(prepareRow(rowValue))
                        return (
                            <Table.Row
                                {...rowValue.getRowProps()}
                                // key={rowIndex}
                                // onClick={() => props.handleOnClick(rowValue.id)}
                            >
                                {rowValue.cells.map((cellValue, cellIndex) => {
                                    return (
                                        <Table.Cell {...cellValue.getCellProps()}>
                                            {cellValue.render('Cell')}
                                        </Table.Cell>
                                    )
                                })}
                            </Table.Row>
                        );
                    })}
                    {/* <EmptyColumns data={data} count={numberOfRows} /> */}
                </Table.Body>
                {/* <TableFoots foots={foots} length={headers.length} /> */}
            </Table>
        </div>
    )
};

export default ListTable;