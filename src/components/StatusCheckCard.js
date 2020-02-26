import React from 'react';
import { Table, Segment, Header } from 'semantic-ui-react';

const StatusCheckCard = (props) => {
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
                    </Table.Body>
                </Table>
            </div>
        </Segment>
    )
};

export default StatusCheckCard;