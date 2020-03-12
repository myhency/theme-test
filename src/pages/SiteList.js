import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import {
    Button,
    Form,
    Header,
    Modal,
    Grid,
    Menu,
    Icon,
    Search,
    Card,
    Image,
    Dropdown,
    Label,
    Divider
} from 'semantic-ui-react';
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';
// import siteData from '../assets/data/SiteData.json';
import Gallery from '../utils/Gallery';
import axios from 'axios';

const fileSelector = document.createElement('input');

class SiteList extends Component {

    constructor(props) {
        super(props);

        console.log(props)

        this.state = {
            currentDate: null,
            open: false,
            addSiteModalOpen: false,
            modifySiteModalOpen: false,
            totalCount: 0,
            modifiedCard: {
                name: '',
                openDate: ''
            },
            siteList: [{}]
        };

        fileSelector.setAttribute('type', 'file');
        fileSelector.setAttribute('multiple', 'multiple');
    }

    componentDidMount() {
        const url = '/api/sites';

        try {
            return axios.get(url).then(response => {
                console.log(response);
                this.setState({
                    siteList: response.data.result,
                    totalCount: response.data.result.length
                })
            });
        } catch (error) {
            console.log(error);
        }
    }

    handleFileSelect = (e) => {
        e.preventDefault();
        fileSelector.click();
    }

    onChange = (event, data) => this.setState({ currentDate: data.value });

    closeConfigShow = (closeOnEscape, closeOnDimmerClick) => () => {
        this.setState({ closeOnEscape, closeOnDimmerClick, open: true })
    }

    addSiteModalClose = () => this.setState({ addSiteModalOpen: false });

    modifySiteModalClose = () => this.setState({ modifySiteModalOpen: false });

    handleAddSiteButton = (v, e) => {
        if (e) this.setState({ addSiteModalOpen: true });
    }

    handleModifySiteMenuItem = (v, e) => {
        console.log(v);
        if (e) this.setState({ modifySiteModalOpen: true, modifiedCard: { ...v } });
    }

    alarm = () => {
        alert('aaa')
    }

    render() {
        const { siteList, totalCount, addSiteModalOpen, modifySiteModalOpen, closeOnEscape, closeOnDimmerClick, modifiedCard } = this.state;

        return (
            <div style={{ marginTop: '4em', width: '70%', marginLeft: 'auto', marginRight: 'auto' }}>
                <Grid>
                    <Grid.Row>
                        <Grid.Column>
                            <Grid columns={2}>
                                <Grid.Row>
                                    <Grid.Column floated='left' verticalAlign='middle' width={5}>
                                        <Header as='h1'><Icon name='building outline' />Sites</Header>
                                        <p style={{ fontSize: '12px', color: 'grey' }}>Autoever DID hub 에 등록된 모든 Site들을 보여줍니다.</p>
                                    </Grid.Column>
                                    <Grid.Column verticalAlign='top' width={5}>
                                        <Search placeholder='Search' style={{ float: 'right' }} />
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Grid.Column>
                    </Grid.Row>
                    <Divider />
                    <Grid.Row>
                        <Grid.Column floated='left' verticalAlign='bottom' width={5}>
                            <Label color='grey' size='large'>
                                <Icon name='building outline' />Total
                                <Label.Detail>{totalCount}</Label.Detail>
                            </Label>
                        </Grid.Column>
                        <Grid.Column floated='right' verticalAlign='bottom' width={5}>
                            <Button color='blue' icon='plus' content='Add site' floated='right' onClick={(v, e) => this.handleAddSiteButton(v, e)} />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <Card.Group itemsPerRow='4'>
                                {/* Card #2 */}
                                {siteList.map((site, index) => {
                                    return (
                                        <Card style={{ width: '300px', height: '20vh', marginLeft: 'auto', marginRight: 'auto' }} key={index}>
                                            <Grid
                                                columns={2}
                                                style={{
                                                    paddingTop: '5px',
                                                    paddingBottom: '5px',
                                                    paddingLeft: '5px',
                                                    paddingRight: '5px'
                                                }}>
                                                <Grid.Column floated='left' verticalAlign='middle'>
                                                    <Image
                                                        floated='left'
                                                        size='small'
                                                        src={Gallery.getLogoImage(site.name)}
                                                        as={Link}
                                                        to={{
                                                            pathname: `/home/sites/sitedetails/${site.id}`,
                                                            state: site.id
                                                        }}
                                                    />
                                                </Grid.Column>
                                                <Grid.Column floated='right' verticalAlign='middle'>
                                                    <Menu secondary style={{ float: 'right' }}>
                                                        <Dropdown item icon='ellipsis vertical' simple>
                                                            <Dropdown.Menu>
                                                                <Dropdown.Item>Modify</Dropdown.Item>
                                                                <Dropdown.Item>Delete</Dropdown.Item>
                                                            </Dropdown.Menu>
                                                        </Dropdown>
                                                    </Menu>
                                                </Grid.Column>
                                            </Grid>
                                            <Card.Content>
                                                <Card.Header
                                                    as={Link}
                                                    to={{
                                                        pathname: "/home/sites/sitedetails",
                                                        state: [
                                                            site.name,
                                                            site.openDate,
                                                            site.countOfServices
                                                        ]
                                                    }}>{site.name}</Card.Header>
                                                <Card.Meta>{site.openDate}</Card.Meta>
                                            </Card.Content>
                                            <Card.Content extra>
                                                <Grid columns={2}>
                                                    <Grid.Row>
                                                        <Grid.Column floated='left' verticalAlign='middle' width={1} style={{ marginRight: '0em' }}>
                                                            <Icon fitted name='setting' size='large' />
                                                        </Grid.Column>
                                                        <Grid.Column floated='left' verticalAlign='middle'>
                                                            {site.countOfServices} Services
                                                        </Grid.Column>
                                                    </Grid.Row>
                                                </Grid>
                                            </Card.Content>
                                        </Card>
                                    );
                                })}
                            </Card.Group>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <Modal
                    open={addSiteModalOpen}
                    onClose={this.addSiteModalClose}
                    closeOnEscape={closeOnEscape}
                    closeOnDimmerClick={closeOnDimmerClick}>
                    <Modal.Header>Add Site</Modal.Header>
                    <Modal.Content>
                        <Form>
                            <Form.Group widths='equal'>
                                <Form.Input fluid label='Site name' placeholder='Site name' />
                            </Form.Group>
                            <Form.Group widths='equal'>
                                <SemanticDatepicker label='Open date' datePickerOnly={true} onChange={this.onChange} />
                            </Form.Group>
                            <Form.Group widths='equal'>
                                <Form.Input
                                    ref={(ref) => this.upload = ref}
                                    action={{
                                        icon: 'file image',
                                        onClick: this.handleFileSelect
                                    }}
                                    label='Site Logo Image'
                                    placeholder='Logo file...' />
                            </Form.Group>
                        </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button onClick={this.addSiteModalClose} negative>No</Button>
                        <Button
                            onClick={this.addSiteModalClose}
                            positive
                            labelPosition='right'
                            icon='checkmark'
                            content='Yes'
                        />
                    </Modal.Actions>
                </Modal>
                <Modal
                    open={modifySiteModalOpen}
                    onClose={this.modifySiteModalClose}
                    closeOnEscape={closeOnEscape}
                    closeOnDimmerClick={closeOnDimmerClick}>
                    <Modal.Header>Modify Site</Modal.Header>
                    <Modal.Content>
                        <Form>
                            <Form.Group widths='equal'>
                                <Form.Input fluid label='Site name' value={modifiedCard.name} />
                            </Form.Group>
                            <Form.Group widths='equal'>
                                <SemanticDatepicker label='Open date' datePickerOnly={true} onChange={this.onChange} value={modifiedCard.openDate} />
                            </Form.Group>
                            <Form.Group widths='equal'>
                                <Form.Input
                                    ref={(ref) => this.upload = ref}
                                    action={{
                                        icon: 'file image',
                                        onClick: this.handleFileSelect
                                    }}
                                    label='Site Logo Image'
                                    placeholder='Logo file...' />
                            </Form.Group>
                        </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button onClick={this.addSiteModalClose} negative>No</Button>
                        <Button
                            onClick={this.addSiteModalClose}
                            positive
                            labelPosition='right'
                            icon='checkmark'
                            content='Yes'
                        />
                    </Modal.Actions>
                </Modal>
            </div>
        )
    }
};

export default (withRouter(SiteList));