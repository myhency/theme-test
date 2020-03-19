import React, { Component } from 'react';
import {
    Segment,
    Header,
    Image,
    Grid,
    Divider,
    Breadcrumb,
    Button
} from 'semantic-ui-react';
import Gallery from '../utils/Gallery';


class DetailPageTop extends Component {
    constructor(props) {
        super(props);

        // this.state = {
        //     // headerList: ['siteName', 'serviceName', 'instanceName']
        //     // detailList: [{
        //     //     title: 'Site Name',
        //     //     description: 'xxxx'
        //     // }]
        //     ...props
        // }
    }

    render() {
        const { headerList, detailList } = this.props;

        return (
            <Segment style={{ marginLeft: '2em', marginRight: '2em' }}>
                <Grid>
                    <Grid.Row>
                        <Grid.Column verticalAlign='middle' width={2}>
                            <Image src={Gallery.getLogoImage(headerList[0].name)} size={'small'} />
                        </Grid.Column>
                        <Grid.Column floated='left' verticalAlign='middle' width={14}>
                            <Breadcrumb size='massive'>
                                {headerList.map((header, index) => {
                                    let breadcrumb = [];
                                    if (headerList.length == 1) {// 하나밖에 없을 때
                                        breadcrumb.push(<Breadcrumb.Section key={index}>{header.name}</Breadcrumb.Section>)
                                        return breadcrumb
                                    }
                                    else if (index == headerList.length - 1) { // 마지막
                                        breadcrumb.push(<Breadcrumb.Section key={index}>{header.name}</Breadcrumb.Section>)
                                        return breadcrumb
                                    }
                                    else // 중간
                                        breadcrumb.push(<Breadcrumb.Section link onClick={() => header.onClick(header.id)} key={index}>{header.name}</Breadcrumb.Section>)
                                    breadcrumb.push(<Breadcrumb.Divider icon='right angle' key={(index+Math.random())}/>)

                                    return breadcrumb
                                })}
                            </Breadcrumb>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <Divider />
                <Header as='h3'>Detail</Header>
                <Grid celled='internally'>
                    {detailList.map((detail, index) => {
                        if (detail.description === 'View Logs') {
                            return <Grid.Row key={index}>
                                <Grid.Column verticalAlign='middle' width={2}>
                                    {detail.title}
                                </Grid.Column>
                                <Grid.Column floated='left' verticalAlign='middle' width={8}>
                                    <Button>{detail.description}</Button>
                                </Grid.Column>
                            </Grid.Row>
                        }
                        if (detail.description === 'true' || detail.description === 'false') {
                            return <Grid.Row key={index}>
                                <Grid.Column verticalAlign='middle' width={2}>
                                    {detail.title}
                                </Grid.Column>
                                <Grid.Column floated='left' verticalAlign='middle' width={8}>
                                    <img src={Gallery.getLogoImage(detail.description)} />
                                </Grid.Column>
                            </Grid.Row>
                        }
                        return <Grid.Row key={index}>
                            <Grid.Column verticalAlign='middle' width={2}>
                                {detail.title}
                            </Grid.Column>
                            <Grid.Column floated='left' verticalAlign='middle' width={8}>
                                {detail.description}
                            </Grid.Column>
                        </Grid.Row>
                    })}
                </Grid>
                {/* <Divider /> */}
            </Segment>
        );
    }
}

export default DetailPageTop;