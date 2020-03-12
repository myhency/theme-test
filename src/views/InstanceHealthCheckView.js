import React, { Component } from 'react';
import { Table, Header, Card, Label } from 'semantic-ui-react';
import axios from 'axios';
import green from '../assets/images/green.svg';
import red from '../assets/images/red.svg';

const headers = ['Instance Name', 'Site Name', 'Status'];

const url = `/api/instances/health`;

const EmptyColumns = (data) => {

    console.log(data)

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

class InstanceHealthCheckView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            instanceHealthData: [{
                instanceId: 0,
                data: []
            }]
        };

        this.getInstanceHealth();
    }

    getInstanceHealth = () => {
        try {
            let instanceHealthData = [{
                instanceId: 0,
                data: []
            }];
            return axios.get(url).then(response => {
                Array.prototype.forEach.call(response.data.result, value => {
                    let data = [];
                    data.push(value.instanceName, value.siteName, value.status.toString());
                    instanceHealthData.push({
                        instanceId: value.instanceId,
                        data
                    })
                });
                this.setState({
                    instanceHealthData
                });
            });
        } catch (error) {
            console.log(error);
        }
    }

    handleClick = rowValue => {
        console.log(rowValue.instanceId)
        this.props.history.push({
            pathname: `/home/instances/instancedetails/${rowValue.instanceId}`,
            state: rowValue.instanceId
        });
    }

    componentDidMount() {
        let intervalId = setInterval(this.getCount, 3000);
        this.setState({ intervalId: intervalId });
    }

    componentWillUnmount() {
        clearInterval(this.state.intervalId);
    }

    render() {
        const { instanceHealthData } = this.state;

        instanceHealthData.splice(0, 1)
        // console.log(instanceHealthData)

        return (
            <Card style={{ width: '100%' }}>
                <Header as='h1' style={{ marginTop: '14px', marginLeft: '14px' }}>
                    Instance Health Check
                    <Label attached='top right' size='mini'>60m</Label>
                </Header>
                <Card.Content>
                    <Card.Description>
                        <Table selectable celled style={{ height: '100px', overflowY: 'scroll' }}>
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
                                {instanceHealthData.map((rowValue, rowIndex) => {
                                    return (
                                        <Table.Row
                                            key={rowIndex}
                                            onClick={() => this.handleClick(rowValue)}>
                                            {rowValue.data.map((cellValue, cellIndex) => {
                                                if (cellValue === 'true') {
                                                    return <Table.Cell
                                                        style={{ fontSize: '16px' }}
                                                        textAlign='center'
                                                        key={cellIndex}>
                                                        <img src={green} />
                                                    </Table.Cell>
                                                } else if (cellValue === 'false') {
                                                    return <Table.Cell
                                                        style={{ fontSize: '16px' }}
                                                        textAlign='center'
                                                        key={cellIndex}>
                                                        <img src={red} offset="30%"/>
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
                                {/* <EmptyColumns data={instanceHealthData} /> */}
                            </Table.Body>
                        </Table>
                    </Card.Description>
                </Card.Content>
            </Card>
        );
    }

}

export default InstanceHealthCheckView;
