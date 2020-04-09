import React, { Component } from 'react';
import { Header, Card, Label, Table, Menu, Icon } from 'semantic-ui-react';
import axios from 'axios';
import ListTableNew from '../components/ListTableNew';
import styled from 'styled-components';
import Gallery from '../utils/Gallery';

const Styles = styled.div`
    .card-style {
        width: 100%!important;
        height: 48.4vh!important;
    }

    .table-style {
        border-width: 0px!important;
    }

    .header-style {
        font-size: 13px!important;
        color: #8391a5!important;
        background-color: #f7f8fb!important;
        padding: 7px 0px 7px 16px!important;
    }

    .cell-style { 
        padding: 9px 0px 9px 16px!important;
        font-size: 16px!important;
        color: #3b4a5f!important;
    }
`

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


class InstanceHealthCheckView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            instanceHealthData: {
                cellData: [{
                    id: 0,
                    data: []
                }]
            }
        };

        this.getInstanceHealth();
    }

    getInstanceHealth = () => {
        const url = `/api/instances/health`;
        let data = {
            cellData: [{}]
        };

        try {
            axios.get(url).then(response => {
                response.data.result.map((instance) => {
                    let arr = [];
                    arr.push(instance.name, instance.siteName, instance.status.toString());
                    data.cellData.push({
                        id: instance.id,
                        data: arr
                    });
                });
                data.cellData.splice(0, 1);
                this.setState({
                    instanceHealthData: data
                })
            });
        } catch (error) {
            console.log(error);
        }
    }

    handleOnClick = id => {
        this.props.history.push({
            pathname: `/home/instances/instancedetails/${id}`,
            state: id
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
        const headers = ['Instance Name', 'Site Name', 'Status'];

        return (
            <Styles>
                <Card className='card-style'>
                    <Card.Content>
                        <Card.Description>
                            <Table selectable className='table-style'>
                                <Table.Header>
                                    <Table.Row>
                                        {headers.map((value, index) => {
                                            return <Table.HeaderCell
                                                className='header-style'
                                                key={index}>
                                                {value}
                                            </Table.HeaderCell>
                                        })}
                                    </Table.Row>
                                </Table.Header>

                                <Table.Body>
                                    {instanceHealthData.cellData.map((rowValue, rowIndex) => {
                                        return (
                                            <Table.Row
                                                key={rowIndex}
                                                onClick={() => this.handleOnClick(rowValue.id)}>
                                                {rowValue.data.map((cellValue, cellIndex) => {
                                                    if (cellValue === 'true' || cellValue === 'false') {
                                                        return <Table.Cell
                                                            key={cellIndex}>
                                                            <img src={Gallery.getLogoImage(cellValue)} alt={cellValue} />
                                                        </Table.Cell>
                                                    } else {
                                                        return <Table.Cell
                                                            className='cell-style'
                                                            key={cellIndex}>
                                                            {cellValue}
                                                        </Table.Cell>
                                                    }
                                                })}
                                            </Table.Row>
                                        );
                                    })}
                                    <EmptyColumns data={instanceHealthData} count={8} />
                                </Table.Body>
                            </Table>
                        </Card.Description>
                    </Card.Content>
                </Card>
            </Styles>
        );
    }

}

export default InstanceHealthCheckView;
