import React, { Component } from 'react';
import { Button, Form, Segment, Header, Image, Modal, Grid, Menu, Icon } from 'semantic-ui-react';
import ListTable from '../components/ListTable';
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';

const headers = ['Site Name', 'Number of Services', 'Open Date'];

const data = {
    cellData: [
        ['현대카드', '4', '2020-06-30'],
        ['현대카드', '4', '2020-06-30'],
        ['현대카드', '4', '2020-06-30'],
        ['현대카드', '4', '2020-06-30'],
        ['현대카드', '4', '2020-06-30'],
        ['현대카드', '4', '2020-06-30'],
    ]
}

class SiteList extends Component {

    state = {
        currentDate: null,
        open: false
    };

    onChange = (event, data) => this.setState({ currentDate: data.value });

    closeConfigShow = (closeOnEscape, closeOnDimmerClick) => () => {
        this.setState({ closeOnEscape, closeOnDimmerClick, open: true })
    }

    close = () => this.setState({ open: false });

    render() {
        const { open, closeOnEscape, closeOnDimmerClick } = this.state;

        return (
            <div style={{ marginTop: '4em' }}>
                <Segment style={{ marginLeft: '2em', marginRight: '2em' }}>
                    <Form>
                        <Form.Group widths='equal'>
                            <Form.Input fluid label='Site name' placeholder='Site name' />
                        </Form.Group>
                        <Form.Group widths='equal'>
                            <SemanticDatepicker label='Open date' datePickerOnly={true} onChange={this.onChange} />
                        </Form.Group>
                        <Button type='submit'>Search</Button>
                    </Form>
                </Segment>
                <Segment placeholder style={{ justifyContent: 'start', marginLeft: '2em', marginRight: '2em' }}>
                    <Modal
                        open={open}
                        onClose={this.close}
                        closeOnEscape={closeOnEscape}
                        closeOnDimmerClick={closeOnDimmerClick}>
                        <Modal.Header>Add a Site</Modal.Header>
                        <Modal.Content>
                            <Form>
                                <Form.Group widths='equal'>
                                    <Form.Input fluid label='Site name' placeholder='Site name' />
                                </Form.Group>
                                <Form.Group widths='equal'>
                                    <SemanticDatepicker label='Open date' datePickerOnly={true} onChange={this.onChange} />
                                </Form.Group>
                            </Form>
                        </Modal.Content>
                        <Modal.Actions>
                            <Button onClick={this.close} negative>No</Button>
                            <Button
                                onClick={this.close}
                                positive
                                labelPosition='right'
                                icon='checkmark'
                                content='Yes'
                            />
                        </Modal.Actions>
                    </Modal>
                    <Grid columns={2} style={{ marginBottom: '0em' }}>
                        <Grid.Row>
                            <Grid.Column floated='left'>
                                <Header as='h1'>Site List</Header>
                            </Grid.Column>
                            <Grid.Column floated='right' textAlign='right'>
                                <Menu.Menu position='right'>
                                    <Menu.Item>
                                        <Button icon floated='right' onClick={this.closeConfigShow(true, false)}>
                                        <Icon name='plus square outline' size='large' />
                                        </Button>
                                    </Menu.Item>
                                </Menu.Menu>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    <ListTable
                        headers={headers}
                        data={data} />
                </Segment>
            </div>
        )
    }
};

export default SiteList;