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
    Card,
    Image,
    Dropdown,
    Label,
    Divider,
    Input,
    Segment
} from 'semantic-ui-react';
import LogoDropZone from '../components/LogoDropZone';
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';
import axios from 'axios';
import constants from '../utils/constants';
import { format } from 'date-fns';

const fileSelector = document.createElement('input');

class SiteList extends Component {

    constructor(props) {
        super(props);

        this.inputRef = React.createRef();

        this.onDrop = (files) => {
            this.setState({ files })
        };

        this.state = {
            currentDate: null,
            open: false,
            addSiteModalOpen: false,
            modifySiteModalOpen: false,
            totalCount: 0,
            modifiedCard: {},
            siteList: [{}],
            isSearchLoading: false,
            searchValue: '',
            searchResult: [],
            //Add site modal
            siteName: '',
            openDate: '',
            logo: '',
            files: [],
            modalLogoFileName: '',
            modifiedCard: {
                siteName: '',
                openDate: '',
                logoFileName: ''
            }
        };
    }

    componentDidMount() {
        this.getSites('/api/sites');
    }

    getSites = (url) => {
        try {
            return axios.get(url).then(response => {
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

    handleAddSiteModalSiteNameOnChange = (event, data) => this.setState({ siteName: data.value });

    handleAddSiteModalOpenDateOnChange = (event, data) => this.setState({ openDate: data.value });

    closeConfigShow = (closeOnEscape, closeOnDimmerClick) => () => {
        this.setState({ closeOnEscape, closeOnDimmerClick, open: true })
    }

    handleOnClickAddSiteCloseButton = () => {
        this.setState({
            siteName: '',
            openDate: '',
            logo: '',
            addSiteModalOpen: false
        })
    };

    handleOnClickModifySiteModalCloseButton = () => {
        this.setState({
            siteName: '',
            openDate: '',
            logo: '',
            modifySiteModalOpen: false
        })
    }

    handleOnClickAddSiteModalAddButton = () => {
        let frm = new FormData();
        const { siteName, openDate, logo } = this.state;
        console.log(siteName, format(openDate, constants.DATE_FORMAT), logo);
        frm.append('logoFile', logo);
        frm.append('name', siteName);
        frm.append('openDate', format(openDate, constants.DATE_FORMAT));
        axios.post('/api/sites', frm, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
            this.setState({ addSiteModalOpen: false, siteName: '', openDate: '', logo: '' });
            this.getSites('/api/sites');
        });
    }

    handleOnClickModifySiteModalModifyButton = () => {

    }

    handleOnClickModifySiteModalOpen = (currentModifingCard, event) => {
        console.log(event)
        if (event) this.setState({ modifySiteModalOpen: true, modifiedCard: { ...currentModifingCard } });
    }

    modifySiteModalClose = () => this.setState({ modifySiteModalOpen: false });

    handleAddSiteButton = (v, e) => {
        if (e) this.setState({ addSiteModalOpen: true });
    }

    handleSearchOnChange = (event) => {
        // this.setState({
        //     searchValue: event.target.value
        // })
        this.getSites(`/api/sites?name=${event.target.value}`)
    }

    handleOnClickSearch = () => {
        this.getSites(`/api/sites?name=${this.state.searchValue}`)
    }

    handleOnLoadEndLogoDropZone = (value) => {
        this.setState({
            logo: value
        })
    }

    getLogoFileName = (callback) => {
        const { modifiedCard } = this.state;
        callback(modifiedCard);
        this.setState({
            modifiedCard: {}
        })
    }

    render() {
        const { siteName, openDate, logo, siteList, totalCount, addSiteModalOpen, modifySiteModalOpen, closeOnEscape, closeOnDimmerClick, modifiedCard, searchValue } = this.state;

        console.log(modifiedCard);

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
                                        <Input
                                            style={{ float: 'right' }}
                                            icon={<Icon name='search' link onClick={this.handleOnClickSearch} />}
                                            placeholder='Search by site name...'
                                            onChange={this.handleSearchOnChange}
                                            onKeyDown={(event) => { if (event.key === 'Enter') this.handleOnClickSearch(); }}
                                        />
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
                        {siteList.map((site, index) => {
                            return (
                                <Grid.Column mobile={16} tablet={8} computer={4} style={{ marginBottom: '1em' }} key={index}>
                                    <Card style={{ height: '20vh' }} key={index} fluid>
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
                                                    src={'/' + site.logoFileName}
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
                                                            <Dropdown.Item onClick={(currentModifingCard, event) => this.handleOnClickModifySiteModalOpen({
                                                                name: site.name,
                                                                openDate: site.openDate,
                                                                logFileName: site.logoFileName
                                                            }, event)}>
                                                                Modify
                                                            </Dropdown.Item>
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
                                                    pathname: `/home/sites/sitedetails/${site.id}`,
                                                    state: site.id
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
                                                        {site.numberOfServices} Services
                                                        </Grid.Column>
                                                </Grid.Row>
                                            </Grid>
                                        </Card.Content>
                                    </Card>
                                </Grid.Column>
                            )
                        })}
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
                                <Form.Input fluid label='Site name' placeholder='Site name' onChange={this.handleAddSiteModalSiteNameOnChange} />
                            </Form.Group>
                            <Form.Group widths='equal'>
                                <SemanticDatepicker label='Open date' datePickerOnly={true} onChange={this.handleAddSiteModalOpenDateOnChange} />
                            </Form.Group>
                            <LogoDropZone onLoadEnd={this.handleOnLoadEndLogoDropZone} />
                        </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button
                            onClick={this.handleOnClickAddSiteCloseButton}
                            negative
                            content='Close'
                        />
                        <Button
                            onClick={this.handleOnClickAddSiteModalAddButton}
                            positive
                            labelPosition='right'
                            icon='checkmark'
                            content='Add'
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
                                <SemanticDatepicker label='Open date' datePickerOnly={true} onChange={this.handleSemanticDatepickerOnChange} value={modifiedCard.openDate} />
                            </Form.Group>
                            <LogoDropZone
                                onLoadEnd={this.handleOnLoadEndLogoDropZone}
                                onOpen={modifySiteModalOpen}
                                getLogo={(callback) => this.getLogoFileName(callback)}
                            />
                        </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button
                            onClick={this.addSiteModalClose}
                            negative
                            content='Close'
                            onClick={this.handleOnClickModifySiteModalCloseButton}
                        />
                        <Button
                            onClick={this.addSiteModalClose}
                            positive
                            labelPosition='right'
                            icon='checkmark'
                            content='Modify'
                            onClick={this.handleOnClickModifySiteModalModifyButton}
                        />
                    </Modal.Actions>
                </Modal>
            </div>
        )
    }
};

export default (withRouter(SiteList));