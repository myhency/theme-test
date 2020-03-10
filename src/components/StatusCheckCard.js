import React, { Component } from 'react';
import { Table, Header, Card, Label } from 'semantic-ui-react';

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

class StatusCheckCard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Card style={{ width: '100%'}}>
                <Header as='h1' style={{ marginTop: '14px', marginLeft: '14px' }}>
                    {this.props.title}
                    <Label attached='top right' size='mini'>60m</Label>
                </Header>
                <Card.Content>
                    <Card.Description>
                        <Table celled style={{ height: '100px', overflowY: 'scroll' }}>
                            <Table.Header>
                                <Table.Row>
                                    {this.props.headers.map((value, index) => {
                                        return <Table.HeaderCell style={{ fontSize: '18px', backgroundColor: 'Gainsboro' }} textAlign='center' key={index}>{value}</Table.HeaderCell>
                                    })}
                                </Table.Row>
                            </Table.Header>
    
                            <Table.Body>
                                {this.props.data.cellData.map((rowValue, rowIndex) => {
                                    return (
                                        <Table.Row 
                                            key={rowIndex}
                                            onClick={() => this.props.handleClick(rowValue)}>
                                            {rowValue.map((cellValue, cellIndex) => {
                                                return <Table.Cell style={{ fontSize: '16px' }} textAlign='center' key={cellIndex}>{cellValue}</Table.Cell>
                                            })}
                                        </Table.Row>
                                    );
                                })}
                                <EmptyColumns data={this.props.data} />
                            </Table.Body>
                        </Table>
                    </Card.Description>
                </Card.Content>
            </Card>
        )
    }
}


export default StatusCheckCard;
