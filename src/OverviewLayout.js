import React from 'react';
import { Button, Container, Divider, Grid, Header, Image, Menu, Segment, Icon, Table, Label } from 'semantic-ui-react';
import logo from './hyundai-autoever-ci.png';

const OverviewLayout = () => (
    <div>
        <Menu fixed='top' inverted>
            <Menu.Item>
                <Image src={logo} size='tiny' fluid />
            </Menu.Item>
            <Menu.Item>
                <h4>Overview</h4>
            </Menu.Item>
            <Menu.Item>
                <h4>Sites</h4>
            </Menu.Item>
            <Menu.Item>
                <h4>Services</h4>
            </Menu.Item>
            <Menu.Item position='right'>
                <h4>Avatar</h4>
            </Menu.Item>
        </Menu>
        <Grid style={{ marginTop: '3em' }}>
            <Grid.Row columns={2}>
                <Grid.Column width={5}>
                    <Segment placeholder style={{ marginLeft: '2em' }}>
                        <Header icon>
                            <Icon name='pdf file outline' />
                            No documents are listed for this customer.
                        </Header>
                        <Button primary>Add Document</Button>
                    </Segment>
                </Grid.Column>

                <Grid.Column>
                    <Table celled>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Header</Table.HeaderCell>
                                <Table.HeaderCell>Header</Table.HeaderCell>
                                <Table.HeaderCell>Header</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            <Table.Row>
                                <Table.Cell>
                                    <Label ribbon>First</Label>
                                </Table.Cell>
                                <Table.Cell>Cell</Table.Cell>
                                <Table.Cell>Cell</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>Cell</Table.Cell>
                                <Table.Cell>Cell</Table.Cell>
                                <Table.Cell>Cell</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>Cell</Table.Cell>
                                <Table.Cell>Cell</Table.Cell>
                                <Table.Cell>Cell</Table.Cell>
                            </Table.Row>
                        </Table.Body>

                        <Table.Footer>
                            <Table.Row>
                                <Table.HeaderCell colSpan='3'>
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
                    </Table>
                </Grid.Column>
            </Grid.Row>

            <Grid.Row>
                <Grid.Column>

                </Grid.Column>
            </Grid.Row>
        </Grid>



    </div>
);

export default OverviewLayout;
