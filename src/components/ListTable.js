import React from 'react';
import { Table, Menu, Icon, Input, Select } from 'semantic-ui-react';
import { useTable, usePagination, useSortBy } from 'react-table';
import styled from 'styled-components';

const Styles = styled.div`
    .tableheader {
        font-size: 16px!important;
        background-color: aliceblue!important;
    }

    .tablefootermenuitem {
        padding-top: 0.3em!important;
        padding-bottom: 0.3em!important;
    }

    .clickablecell:hover {
        cursor: pointer;
        text-decoration: underline;
        color: dodgerblue;
    }
`

const EmptyColumns = (props) => {
    let rows = [];
    let columnLength = props.data.length > 0 ? props.data.length : 3;

    if (props.data.length === 0) return <></>;

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
    let cellDataLength = props.data[0].cells.length;

    for (let i = 0; i < cellDataLength; i++) {
        cells.push((
            <Table.Cell
                style={{ fontSize: '16px' }}
                textAlign='center'
                key={i}
            >
                &nbsp;
            </Table.Cell>
        ))
    }
    return cells;
    // return <></>
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
    // const [controlledPageIndex, setControlledPage] = React.useState(0);
    const onFetchData = props.onFetchData;

    let data = [];
    
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
        state: { pageIndex, pageSize, sortBy },
        // state: { ...props }
    } = useTable(
        {
            columns: props.columns,
            data: data,
            initialState: { pageIndex: 0 },
            // useControlledState: state => {
            //     return React.useMemo(
            //         () => ({
            //             ...state,
            //             pageIndex: controlledPageIndex,
            //         }),
            //         [state, controlledPageIndex]
            //     )
            // }
        },
        useSortBy,
        usePagination
    );

    React.useEffect(() => {
        data = onFetchData({ pageIndex, pageSize, sortBy })
      }, [onFetchData, pageIndex, pageSize, sortBy])

    const showPageOptions = [
        { key: '20', value: '20', text: 'Show 20 Rows' },
        { key: '50', value: '50', text: 'Show 50 Rows' },
        { key: '100', value: '100', text: 'Show 100 Rows' }
    ]

    const numberOfRows = props.count;

    return (
        <Styles>
            <Table celled {...getTableProps()}>
                <Table.Header>
                    {headerGroups.map(headerGroup => {
                        return <Table.Row >
                            {headerGroup.headers.map((column, index) => {
                                if (column.show === false)
                                    return (
                                        <Table.HeaderCell className='tableheader'
                                            {...column.getHeaderProps()}
                                            {...column.toggleHidden()}
                                            textAlign='left'
                                            key={index}
                                        >
                                            {column.render('Header')}
                                        </Table.HeaderCell>
                                    )
                                return (
                                    <Table.HeaderCell className='tableheader'
                                        {...column.getHeaderProps(column.getSortByToggleProps())}
                                        textAlign='left'
                                        key={index}
                                    >
                                        {column.render('Header')}
                                        <span>
                                            {column.isSorted
                                                ? column.isSortedDesc
                                                    ? <Icon name='caret down' />
                                                    : <Icon name='caret up' />
                                                : ''}
                                        </span>
                                    </Table.HeaderCell>
                                )
                            })}
                        </Table.Row>
                    })}

                </Table.Header>

                <Table.Body {...getTableBodyProps()}>
                    {page.map((rowValue, rowIndex) => {
                        prepareRow(rowValue)
                        return (
                            <Table.Row
                                {...rowValue.getRowProps()}
                                key={rowIndex}
                            >
                                {rowValue.cells.map((cellValue, cellIndex) => {
                                    if (cellIndex === props.link)
                                        return (
                                            <Table.Cell className='clickablecell'
                                                onClick={() => props.onClick(cellValue)}
                                                {...cellValue.getCellProps()}
                                            >
                                                {cellValue.render('Cell')}
                                            </Table.Cell>
                                        )
                                    return (
                                        <Table.Cell
                                            {...cellValue.getCellProps()}
                                        >
                                            {cellValue.render('Cell')}
                                        </Table.Cell>
                                    )
                                })}
                            </Table.Row>
                        );
                    })}
                    <EmptyColumns data={page} count={numberOfRows} />
                </Table.Body>
                {/* <TableFoots foots={foots} length={headers.length} /> */}
                <Table.Footer>
                    <Table.Row>
                        <Table.HeaderCell colSpan={props.columns.length}>
                            <Menu floated='right' pagination>
                                <Menu.Item className='tablefootermenuitem'
                                    as='a'
                                    icon
                                    onClick={() => gotoPage(0)}
                                    disabled={!canPreviousPage}
                                >
                                    <Icon name='angle double left' />
                                </Menu.Item>
                                <Menu.Item className='tablefootermenuitem'
                                    as='a'
                                    icon
                                    onClick={() => previousPage()} disabled={!canPreviousPage}
                                >
                                    <Icon name='angle left' />
                                </Menu.Item>
                                <Menu.Item className='tablefootermenuitem'
                                    as='a'
                                    icon
                                    onClick={() => nextPage()} disabled={!canNextPage}
                                >
                                    <Icon name='angle right' />
                                </Menu.Item>
                                <Menu.Item className='tablefootermenuitem'
                                    as='a'
                                    icon
                                    onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}
                                >
                                    <Icon name='angle double right' />
                                </Menu.Item>
                                <Menu.Item className='tablefootermenuitem'>
                                    Page {pageIndex + 1} of {pageOptions.length}
                                </Menu.Item>
                                <Menu.Item className='tablefootermenuitem'>
                                    Go to page
                                </Menu.Item>
                                <Menu.Item className='tablefootermenuitem'>
                                    <Input
                                        placeholder='Go to page'
                                        type='number'
                                        defaultValue={pageIndex + 1}
                                        onChange={(e, v) => {
                                            const page = v.value ? Number(v.value) - 1 : 0
                                            gotoPage(page)
                                        }} />
                                </Menu.Item>
                                <Menu.Item className='tablefootermenuitem'>
                                    <Select
                                        placeholder='Select Rows to Show'
                                        options={showPageOptions}
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