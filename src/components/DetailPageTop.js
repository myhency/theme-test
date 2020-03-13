import React, { Component } from 'react';
import {
    Segment,
    Header,
    Image,
    Grid,
    Divider,
    Breadcrumb
} from 'semantic-ui-react';
import Gallery from '../utils/Gallery';

class DetailPageTop extends Component {
    constructor(props) {
        super(props);

        console.log(props)
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
                            <Image src={Gallery.getLogoImage(headerList[0])} size={'small'} />
                        </Grid.Column>
                        <Grid.Column floated='left' verticalAlign='middle' width={14}>
                            <Breadcrumb size='massive'>
                                {headerList.map((header, index) => {
                                    console.log(headerList.length);
                                    console.log(index)
                                    let breadcrumb = [];
                                    if (headerList.length == 1) {// 하나밖에 없을 때
                                        breadcrumb.push(<Breadcrumb.Section>{header}</Breadcrumb.Section>)
                                        return breadcrumb
                                    }
                                    else if (index == headerList.length - 1) { // 마지막
                                        breadcrumb.push(<Breadcrumb.Section>{header}</Breadcrumb.Section>)
                                        return breadcrumb
                                    }
                                    else // 중간
                                        breadcrumb.push(<Breadcrumb.Section link>{header}</Breadcrumb.Section>)
                                        breadcrumb.push(<Breadcrumb.Divider icon='right angle' />)

                                    return breadcrumb
                                })}
                            </Breadcrumb>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <Divider />
                <Header as='h3'>Detail</Header>
                <Grid celled='internally'>
                    {detailList.map((detail) => {
                        console.log(detail)
                        return <Grid.Row>
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