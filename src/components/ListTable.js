import React from 'react';
import { Table, Menu, Icon, Label, Input, Select } from 'semantic-ui-react';
import { useTable, usePagination } from 'react-table';
import styled from 'styled-components';

const Styles = styled.div`
    .tablefootermenuitem {
        padding-top: 0.2em!important;
        padding-bottom: 0.2em!important;
    }
`

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
    const {
        getTableProps,
        getTableBodyProps,
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
            initialState: { pageIndex: 0 },
        },
        usePagination
    )

    const showPageOptions = [
        { key: '2', value: '2', text: 'Show 2 Rows' },
        { key: '4', value: '4', text: 'Show 4 Rows' },
        { key: '8', value: '8', text: 'Show 8 Rows' }
    ]

    return (
        <Styles>
            <Table celled {...getTableProps()}>
                <Table.Header>
                    <Table.Row>
                        {columns.map((value, index) => {
                            return <Table.HeaderCell
                                style={{
                                    fontSize: '18px',
                                    backgroundColor: 'Gainsboro'
                                }}
                                textAlign='left'
                                key={index}>
                                {value.Header}
                            </Table.HeaderCell>
                        })}
                    </Table.Row>
                </Table.Header>

                <Table.Body {...getTableBodyProps()}>
                    {page.map((rowValue, rowIndex) => {
                        prepareRow(rowValue)
                        return (
                            <Table.Row
                                {...rowValue.getRowProps()}
                                key={rowIndex}
                                onClick={() => props.handleOnClick(rowValue.id)}
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
                <Table.Footer>
                    <Table.Row>
                        <Table.HeaderCell colSpan={columns.length}>
                            <Menu floated='right' pagination>
                                <Menu.Item
                                    as='a'
                                    icon
                                    onClick={() => gotoPage(0)} disabled={!canPreviousPage}
                                    // style={{ paddingTop: '0.2em', paddingBottom: '0.2em' }}
                                    className='tablefootermenuitem'
                                >
                                    <Icon name='angle double left' />
                                </Menu.Item>
                                <Menu.Item
                                    as='a'
                                    icon
                                    onClick={() => previousPage()} disabled={!canPreviousPage}
                                    // style={{ paddingTop: '0.2em', paddingBottom: '0.2em' }}
                                    className='tablefootermenuitem'
                                >
                                    <Icon name='angle left' />
                                </Menu.Item>
                                <Menu.Item
                                    as='a'
                                    icon
                                    onClick={() => nextPage()} disabled={!canNextPage}
                                    // style={{ paddingTop: '0.2em', paddingBottom: '0.2em' }}
                                    className='tablefootermenuitem'
                                >
                                    <Icon name='angle right' />
                                </Menu.Item>
                                <Menu.Item
                                    as='a'
                                    icon
                                    onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}
                                    // style={{ paddingTop: '0.2em', paddingBottom: '0.2em' }}
                                    className='tablefootermenuitem'
                                >
                                    <Icon name='angle double right' />
                                </Menu.Item>
                                <Menu.Item
                                    // style={{ paddingTop: '0.2em', paddingBottom: '0.2em' }}
                                    className='tablefootermenuitem'
                                >
                                    Page {pageIndex + 1} of {pageOptions.length}
                                </Menu.Item>
                                <Menu.Item
                                    // style={{ paddingTop: '0.2em', paddingBottom: '0.2em' }}
                                    className='tablefootermenuitem'
                                >
                                    Go to page
                                </Menu.Item>
                                <Menu.Item
                                    // style={{ paddingTop: '0.2em', paddingBottom: '0.2em' }}
                                    className='tablefootermenuitem'
                                >
                                    <Input
                                        placeholder='Go to page'
                                        type='number'
                                        defaultValue={pageIndex + 1}
                                        onChange={(e, v) => {
                                            const page = v.value ? Number(v.value) - 1 : 0
                                            gotoPage(page)
                                        }} />
                                </Menu.Item>
                                <Menu.Item
                                    // style={{ paddingTop: '0.2em', paddingBottom: '0.2em' }}
                                    className='tablefootermenuitem'
                                >
                                    <Select placeholder='Select Rows to Show' options={showPageOptions}
                                        onChange={(e, v) => {
                                            setPageSize(Number(v.value))
                                        }} />
                                </Menu.Item>
                            </Menu>
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>
            </Table>
        </Styles>
    )
};

export default ListTable;