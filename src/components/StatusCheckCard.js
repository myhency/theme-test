import React from 'react';
import { Table, Segment, Header } from 'semantic-ui-react';

const StatusCheckCard = (props) => {
    let headers = props.headers;
    let data = props.data;

    console.log(props);

    return (
        <Segment placeholder style={{ marginLeft: '2em', justifyContent: 'start' }}>
            <Header as='h1'>{props.title}</Header>
            <div style={{ height: '14vh', overflowY: 'scroll' }}>
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            {headers.map((value, index) => {
                                return <Table.HeaderCell key={index}>{value}</Table.HeaderCell>
                            })}
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {data.cellData.map((rowValue, rowIndex) => {
                            return (
                                <Table.Row key={rowIndex}>
                                    {rowValue.map((cellValue, cellIndex) => {
                                        return <Table.Cell key={cellIndex}>{cellValue}</Table.Cell>
                                    })}
                                </Table.Row>
                            );
                        })}
                    </Table.Body>
                </Table>
            </div>
        </Segment>
    )
};

export default StatusCheckCard;