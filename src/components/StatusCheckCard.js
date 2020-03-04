import React from 'react';
import { Table, Segment, Header } from 'semantic-ui-react';

const EmptyColumns = (data) => {

    let rows = [];
    for (let i = data.data.cellData.length; i < 7; i++) {
        rows.push((
            <Table.Row key={i}>
                <Table.Cell style={{ fontSize: '16px' }} textAlign='center' key={i + 1}>&nbsp;</Table.Cell>
                <Table.Cell style={{ fontSize: '16px' }} textAlign='center' key={i + 2}>&nbsp;</Table.Cell>
                <Table.Cell style={{ fontSize: '16px' }} textAlign='center' key={i + 3}>&nbsp;</Table.Cell>
            </Table.Row>
        ))
    }
    return rows;
}

const StatusCheckCard = (props) => {
    let headers = props.headers;
    let data = props.data;

    return (
        <Segment style={{ justifyContent: 'start' }}>
            <Header as='h1'>{props.title}</Header>
            <Table celled style={{ height: '100px', overflowY: 'scroll' }}>
                <Table.Header>
                    <Table.Row>
                        {headers.map((value, index) => {
                            return <Table.HeaderCell style={{ fontSize: '18px', backgroundColor: 'Gainsboro' }} textAlign='center' key={index}>{value}</Table.HeaderCell>
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
            </Table>
        </Segment>
    )
};

export default StatusCheckCard;