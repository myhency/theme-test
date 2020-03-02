import React, { Component } from 'react';
import { Button, Form, Segment, Select, Menu, Modal, Grid, Header, Icon } from 'semantic-ui-react';
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';
import ListTable from '../components/ListTable';
import issuerIcon from '../assets/images/right-arrow.png';
import verifierIcon from '../assets/images/left-arrow.png';
import verissuerIcon from '../assets/images/up-arrow.png';

const headers = ['Service Name', 'Role', 'Company', 'Open Date'];

const data = {
    cellData: [
        ['재직증명서발급', 'Issuer', '현대카드', '2020-06-30'],
        ['갑근세영수증발급', 'Verissuer', '현대카드', '2020-06-30'],
        ['모바일전자사원증발급', 'Verifier', '현대카드', '2020-06-30'],
        ['법인카드발급증명서발급', 'Verissuer', '현대카드', '2020-07-30'],
    ]
}

const roleOptions = [
    {
        key: 'Issuer',
        text: 'Issuer',
        value: 'Issuer',
        image: { avatar: true, src: issuerIcon }
    },
    {
        key: 'Verifier',
        text: 'Verifier',
        value: 'Verifier',
        image: { avatar: true, src: verifierIcon }
    },
    {
        key: 'Verissuer',
        text: 'Verissuer',
        value: 'Verissuer',
        image: { avatar: true, src: verissuerIcon }
    },
]

class ServiceList extends Component {
    state = {
        currentDate: null,
        open: false
    };

    onChange = (event, data) => this.setState({ currentDate: data.value });

    closeConfigShow = (closeOnEscape, closeOnDimmerClick) => () => {
        this.setState({ closeOnEscape, closeOnDimmerClick, open: true })
    }

    close = () => this.setState({ open: false });

    handleClick = rowValue => {
        this.props.history.push({
            pathname: '/home/services/servicedetails/',
            state: rowValue
        });
    }

    render() {
        const { open, closeOnEscape, closeOnDimmerClick } = this.state;

        return (
            <div style={{ marginTop: '4em', width: '80%', marginLeft: 'auto', marginRight: 'auto' }}>
                <Segment style={{ marginLeft: '2em', marginRight: '2em' }}>
                    <Form>
                        <Form.Group widths='equal'>
                            <Form.Input fluid label='Site name' placeholder='Site name' />
                        </Form.Group>
                        <Form.Group widths='equal'>
                            <SemanticDatepicker
                                label='Open date'
                                datePickerOnly={true}
                                onChange={this.onChange} />
                        </Form.Group>
                        <Form.Group widths='equal'>
                            <Form.Field
                                control={Select}
                                label='Role'
                                options={roleOptions}
                                placeholder='Role'
                            />
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
                        <Modal.Header>Add a Service</Modal.Header>
                        <Modal.Content>
                            <Form>
                                <Form.Group widths='equal'>
                                    <Form.Input fluid label='Site name' placeholder='Site name' />
                                </Form.Group>
                                <Form.Group widths='equal'>
                                    <Form.Input fluid label='Service name' placeholder='Service name' />
                                </Form.Group>
                                <Form.Group widths='equal'>
                                    <Form.Field
                                        control={Select}
                                        label='Role'
                                        options={roleOptions}
                                        placeholder='Role'
                                    />
                                </Form.Group>
                                <Form.Group widths='equal'>
                                    <SemanticDatepicker label='Open date' datePickerOnly={true} onChange={this.onChange} />
                                </Form.Group>
                                <Form.Group widths='equal'>
                                    <Form.Input fluid label='Endpoint' placeholder='https://example.com/' />
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
                                <Header as='h1'>Service List</Header>
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
                        handleClick={(rowValue) => this.handleClick(rowValue)}
                        headers={headers}
                        data={data} />
                </Segment>
            </div>
        );
    }
};

export default ServiceList;