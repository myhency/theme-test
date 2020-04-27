import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import {
    Button,
    Form,
    Header,
    Modal,
    Grid,
    Icon,
    Card,
    Image,
    Dropdown,
    Label,
    Divider,
    Input
} from 'semantic-ui-react';
import LogoDropZone from '../components/LogoDropZone';
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';
import axios from 'axios';
import constants from '../utils/constants';
import { format, parse } from 'date-fns';
import styled from 'styled-components';
import {
    JamesInput,
    JamesButton,
    JamesCard,
    JamesDropdown,
    JamesBodyText,
    JamesRow,
    JamesColumn,
    JamesEmptyCard
} from '../themes/jamesStyledComponents';


const Styles = styled.div`
    img {
        max-height: 36px;
    }

    .siteList {
        margin-top: '4em';
        width: '70%';
        margin-left: 'auto';
        margin-right: 'auto';
    }

    .grid-style {
        width: 75%;
        margin-left: auto; 
        margin-right: auto;
    }

    .list-title {
        width: 65px;
        height: 41px;
        /* font-family: SpoqaHanSans; */
        font-size: 28px;
        font-weight: bold;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.46;
        letter-spacing: -0.56px;
        text-align: left;
        color: #3b4a5f;
    }
`

class SiteList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            //Site list
            totalCount: 0,
            siteList: [{}],
            //Search
            searchValue: '',
            searchResult: [],
            //Add site modal
            addSiteModalOpen: false,
            siteNameAdded: '',
            openDateAdded: '',
            logoFileNameAdded: '',
            //Modify site modal
            modifySiteModalOpen: false,
            siteIdModified: 0,
            siteNameModified: '',
            openDateModified: '',
            logoFileNameModified: '',
        };
    }

    componentDidMount() {
        this.getSites('/api/sites');
    }

    /**
     * 
     */
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

    //Add Site Event
    handleOnChangeSiteNameAddSiteModal = (event, data) => {
        this.setState({ siteNameAdded: data.value });
    }

    //Add Site Event
    handleOnChangeOpenDateAddSiteModal = (event, data) => {
        this.setState({ openDateAdded: data.value });
    }

    //Add Site Event
    handleOnLoadEndAddSiteModalLogoDropZone = (value) => {
        this.setState({ logoFileNameAdded: value });
    }

    //Add Site Event
    handleOnClickAddSiteModalAddButton = () => {
        let frm = new FormData();
        const { siteNameAdded, openDateAdded, logoFileNameAdded } = this.state;
        console.log({ siteNameAdded, openDateAdded, logoFileNameAdded })

        console.log(siteNameAdded, format(openDateAdded, constants.DATE_FORMAT), logoFileNameAdded);
        frm.append('logoFile', logoFileNameAdded);
        frm.append('name', siteNameAdded);
        frm.append('openDate', format(openDateAdded, constants.DATE_FORMAT));
        axios.post('/api/sites', frm, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(() => {
            this.setState({ addSiteModalOpen: false, siteNameAdded: '', openDateAdded: '', logoFileNameAdded: '' });
            this.getSites('/api/sites');
        });
    }

    //Add Site Event
    handleOnClickAddSiteCloseButton = () => {
        this.setState({
            siteNameAdded: '',
            openDateAdded: '',
            logoFileNameAdded: ''
        });
    };

    //Add Site Event
    handleOnClickAddSiteButton = (v, e) => {
        if (e) this.setState({ addSiteModalOpen: true });
    }

    //Modify Site Event
    handleOnChangeSiteNameModifySiteModal = (event, data) => this.setState({ siteNameModified: data.value });

    //Modify Site Event
    handleOnChangeOpenDateModifySiteModal = (event, data) => {
        this.setState({ openDateModified: data.value });
    }

    //Modify Site Event
    handleOnLoadEndModifiedSiteModalLogoDropZone = (value) => {
        this.setState({ logoFileNameModified: value });
    }

    //Modify Site Event
    handleOnClickCloseButtonModifySiteModal = () => {
        this.setState({
            modifySiteModalOpen: false,
            modifySiteModal: {
                siteName: '',
                openDate: '',
                logoFileName: '',
            }
        })
    }

    //Modify Site Event
    handleOnClickModifyButtonModifySiteModal = () => {
        let frm = new FormData();
        const { siteIdModified, siteNameModified, openDateModified, logoFileNameModified } = this.state;
        console.log(openDateModified)
        frm.append('logoFile', logoFileNameModified);
        frm.append('name', siteNameModified);
        frm.append('openDate', format(openDateModified, constants.DATE_FORMAT));
        axios.put(`/api/sites/${siteIdModified}`, frm, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(() => {
            this.setState({
                modifySiteModalOpen: false,
                siteIdModified: 0,
                siteNameModified: '',
                openDateModified: '',
                logoFileNameModified: ''
            });
            this.getSites('/api/sites');
        });
    }

    //Modify Site Event
    handleOnClickModifySiteModalOpen = (currentModifyingCard, event) => {
        if (event) this.setState({ modifySiteModalOpen: true, ...currentModifyingCard });
    }

    //Modify Site Event
    handleOnCloseModifySiteModal = () => this.setState({ modifySiteModalOpen: false });

    //Modify Site Event
    getLogoFileName = (callback) => {
        const { logoFileNameModified } = this.state;
        callback(logoFileNameModified);
        this.setState({
            logoFileNameModified: ''
        })
    }

    //Delete Site Event
    handleOnClickDeleteSite = (id) => {
        axios.delete(`/api/sites/${id}`)
            .then(() => {
                this.getSites('/api/sites');
            })
    }

    //Search Event
    handleOnChangeSearchInput = (event, value) => {
        // this.setState({
        //     searchValue: event.target.value
        // })
        if (event.target.value === '') return this.getSites('/api/sites');
        this.getSites(`/api/sites?name=${event.target.value}`);
    }

    //Search Event
    // handleOnClickSearchInput = (event) => {
    //     if (event === undefined) {
    //         this.getSites(`/api/sites?name=${this.state.searchValue}`);
    //         return;
    //     }
    //     console.log(event)
    //     this.getSites('/api/sites');
    // }

    render() {
        const {
            siteList,
            totalCount,
            addSiteModalOpen,
            modifySiteModalOpen,
            closeOnEscape,
            closeOnDimmerClick,
            siteNameModified,
            openDateModified,
        } = this.state;

        return (
            <Styles>
                <Grid className='grid-style'>
                    <Grid.Row columns={3}>
                        <Grid.Column width={1} verticalAlign='middle' textAlign='left'>
                            <span className='list-title'>Sites</span>
                        </Grid.Column>
                        <Grid.Column width={3} verticalAlign='middle' textAlign='left'>
                            <JamesInput
                                icon='search'
                                iconPosition='left'
                                placeholder='Site name'
                                onChange={this.handleOnChangeSearchInput}
                                onKeyDown={(event) => { if (event.key === 'Enter') this.handleOnClickSearchInput(); }}
                            // value={searchValue}
                            />
                        </Grid.Column>
                        <Grid.Column width={12} verticalAlign='middle'>
                            <JamesButton
                                floated='right'
                                onClick={(v, e) => this.handleOnClickAddSiteButton(v, e)}
                            >ADD SITE</JamesButton>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        {siteList.map((site, index) => {
                            return (
                                <Grid.Column mobile={16} tablet={8} computer={4} style={{ marginBottom: '24px' }} key={index}>
                                    <JamesCard>
                                        <Grid style={{ margin: '0' }}>
                                            <JamesRow columns={2}>
                                                <JamesColumn>
                                                    <Image
                                                        // style={{ maxHeight: '60px' }}
                                                        // floated='left'
                                                        size='small'
                                                        src={'/' + site.logoFileName}
                                                        as={Link}
                                                        to={{
                                                            pathname: `/home/sites/sitedetails/${site.id}`,
                                                            state: site.id
                                                        }}
                                                    />
                                                </JamesColumn>
                                                <JamesColumn>
                                                    <JamesDropdown icon='ellipsis vertical' style={{ float: 'right' }}>
                                                        <Dropdown.Menu>
                                                            <Dropdown.Item
                                                                onClick={(currentModifyingCard, event) => this.handleOnClickModifySiteModalOpen({
                                                                    siteIdModified: site.id,
                                                                    siteNameModified: site.name,
                                                                    openDateModified: parse(site.openDate, constants.DATE_FORMAT, new Date()),
                                                                    logoFileNameModified: site.logoFileName
                                                                }, event)}
                                                            >
                                                                Modify
                                                            </Dropdown.Item>
                                                            <Dropdown.Item
                                                                onClick={(id, event) => this.handleOnClickDeleteSite(site.id, event)}
                                                            >
                                                                Delete
                                                        </Dropdown.Item>
                                                        </Dropdown.Menu>
                                                    </JamesDropdown>
                                                </JamesColumn>
                                            </JamesRow>
                                            <JamesRow style={{ marginTop: '40px' }}>
                                                <JamesColumn>
                                                    <Link
                                                        to={{
                                                            pathname: `/home/sites/sitedetails/${site.id}`,
                                                            state: site.id
                                                        }}>
                                                        <JamesBodyText size={1}>{site.name}</JamesBodyText>
                                                    </Link>
                                                </JamesColumn>
                                            </JamesRow>
                                            <JamesRow>
                                                <JamesColumn>
                                                    <JamesBodyText size={3} color='#8391a5'>{site.openDate}</JamesBodyText>
                                                </JamesColumn>
                                            </JamesRow>
                                        </Grid>
                                    </JamesCard>
                                </Grid.Column>
                            )
                        })}
                        {[...Array(16 - siteList.length).keys()].map((n, index) => {
                            return (
                                <Grid.Column mobile={16} tablet={8} computer={4} style={{ marginBottom: '24px' }}>
                                    <JamesEmptyCard />
                                </Grid.Column>
                            )
                        })}
                    </Grid.Row>
                </Grid>

                <Modal
                    open={addSiteModalOpen}
                    onClose={this.handleOnClickAddSiteCloseButton}
                    closeOnEscape={closeOnEscape}
                    closeOnDimmerClick={closeOnDimmerClick}>
                    <Modal.Header>Add Site</Modal.Header>
                    <Modal.Content>
                        <Form>
                            <Form.Group widths='equal'>
                                <Form.Input
                                    fluid
                                    label='Site name'
                                    placeholder='Site name'
                                    onChange={this.handleOnChangeSiteNameAddSiteModal}
                                />
                            </Form.Group>
                            <Form.Group widths='equal'>
                                <SemanticDatepicker
                                    label='Open date'
                                    datePickerOnly={true}
                                    onChange={this.handleOnChangeOpenDateAddSiteModal} />
                            </Form.Group>
                            <LogoDropZone onLoadEnd={this.handleOnLoadEndAddSiteModalLogoDropZone} />
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
                    onClose={this.handleOnCloseModifySiteModal}
                    closeOnEscape={closeOnEscape}
                    closeOnDimmerClick={closeOnDimmerClick}>
                    <Modal.Header>Modify Site</Modal.Header>
                    <Modal.Content>
                        <Form>
                            <Form.Group widths='equal'>
                                <Form.Input
                                    fluid
                                    label='Site name'
                                    value={siteNameModified}
                                    onChange={this.handleOnChangeSiteNameModifySiteModal}
                                />
                            </Form.Group>
                            <Form.Group widths='equal'>
                                <SemanticDatepicker
                                    label='Open date'
                                    datePickerOnly={true}
                                    onChange={this.handleOnChangeOpenDateModifySiteModal}
                                    value={openDateModified}
                                />
                            </Form.Group>
                            <LogoDropZone
                                onLoadEnd={this.handleOnLoadEndModifiedSiteModalLogoDropZone}
                                onOpen={modifySiteModalOpen}
                                getLogo={(callback) => this.getLogoFileName(callback)}
                            />
                        </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button
                            negative
                            content='Close'
                            onClick={this.handleOnClickCloseButtonModifySiteModal}
                        />
                        <Button
                            positive
                            labelPosition='right'
                            icon='checkmark'
                            content='Modify'
                            onClick={this.handleOnClickModifyButtonModifySiteModal}
                        />
                    </Modal.Actions>
                </Modal>
            </Styles>
        )
    }
};

export default (withRouter(SiteList));