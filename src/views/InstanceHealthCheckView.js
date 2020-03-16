import React, { Component } from 'react';
import { Header, Card, Label } from 'semantic-ui-react';
import axios from 'axios';
import ListTableNew from '../components/ListTableNew';


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
            <Card style={{ width: '100%' }}>
                <Header as='h1' style={{ marginTop: '14px', marginLeft: '14px' }}>
                    Instance Health Check
                    <Label attached='top right' size='mini'>60m</Label>
                </Header>
                <Card.Content>
                    <Card.Description>
                        <ListTableNew
                            headers={headers}
                            count={8}
                            data={instanceHealthData}
                            handleOnClick={(id) => this.handleOnClick(id)}
                        />
                    </Card.Description>
                </Card.Content>
            </Card>
        );
    }

}

export default InstanceHealthCheckView;
