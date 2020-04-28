import React, { Component } from 'react';
import {
    JamesCard,
    JamesGrid,
    JamesRow,
    JamesColumn,
    JamesButton,
    JamesHeader,
    JamesTable,
    JamesTableHeader,
    JamesTableRow,
    JamesTableBody,
    JamesTableHeaderCell,
    JamesTableCell,
    JamesLineGraph,
    JamesBarGraph,
    JamesInput,
    JamesDropdown,
    JamesEmptyCard,
    JamesModal,
    JamesForm,
    JamesDatePicker,
    JamesDateInput,
    DatePickerWrapper

} from '../themes/jamesStyledComponents';
import moreIcon from '../assets/images/btn_more.png';
import calendarIcon from '../assets/images/icon_calendar.png';


class Playground extends Component {
    constructor(props) {
        super(props);

        this.state = {
            error: true
        }
    }

    setStartDate = (date) => {
        this.setState({
            startDate: date
        })
    }

    onChange = (event) => {
        console.log(event);
    }

    render() {
        return (
            <JamesGrid celled>
                <JamesRow columns={2}>
                    <JamesColumn computer={8} tablet={16} mobile={16}>
                        JamesHeader Sample
                    </JamesColumn>
                    <JamesColumn computer={8} tablet={16} mobile={16}>
                        <JamesHeader>JamesHeader Sample</JamesHeader>
                    </JamesColumn>
                </JamesRow>
                <JamesRow columns={2}>
                    <JamesColumn computer={8} tablet={16} mobile={16}>
                        JamesCard Sample
                    </JamesColumn>
                    <JamesColumn computer={8} tablet={16} mobile={16}>
                        <JamesCard>JamesCard Sample</JamesCard>
                    </JamesColumn>
                </JamesRow>
                <JamesRow columns={2}>
                    <JamesColumn computer={8} tablet={16} mobile={16}>
                        JamesTable Sample
                    </JamesColumn>
                    <JamesColumn computer={8} tablet={16} mobile={16}>
                        <JamesTable>
                            <JamesTableHeader>
                                <JamesTableRow>
                                    <JamesTableHeaderCell>
                                        Column1
                                    </JamesTableHeaderCell>
                                    <JamesTableHeaderCell>
                                        Column2
                                    </JamesTableHeaderCell>
                                    <JamesTableHeaderCell>
                                        Column3
                                    </JamesTableHeaderCell>
                                </JamesTableRow>
                            </JamesTableHeader>
                            <JamesTableBody>
                                <JamesTableRow>
                                    <JamesTableCell>
                                        1
                                    </JamesTableCell>
                                    <JamesTableCell>
                                        2
                                    </JamesTableCell>
                                    <JamesTableCell>
                                        3
                                    </JamesTableCell>
                                </JamesTableRow>
                                <JamesTableRow>
                                    <JamesTableCell>
                                        4
                                    </JamesTableCell>
                                    <JamesTableCell>
                                        5
                                    </JamesTableCell>
                                    <JamesTableCell>
                                        6
                                    </JamesTableCell>
                                </JamesTableRow>
                            </JamesTableBody>
                        </JamesTable>
                    </JamesColumn>
                </JamesRow>
                <JamesRow columns={2}>
                    <JamesColumn computer={8} tablet={16} mobile={16}>
                        JamesLineGraph Sample
                    </JamesColumn>
                    <JamesColumn computer={8} tablet={16} mobile={16}>
                        <JamesCard>
                            <JamesLineGraph data={{
                                labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
                                values: [10, 20, 30, 100, 15, 10, 20, 30, 10, 150]
                            }} />
                        </JamesCard>
                    </JamesColumn>
                </JamesRow>
                <JamesRow columns={2}>
                    <JamesColumn computer={8} tablet={16} mobile={16}>
                        JamesBarGraph Sample
                    </JamesColumn>
                    <JamesColumn computer={8} tablet={16} mobile={16}>
                        <JamesCard>
                            <JamesBarGraph data={{
                                labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
                                values: [10, 20, 30, 100, 15, 10, 20, 30, 10, 150]
                            }} />
                        </JamesCard>
                    </JamesColumn>
                </JamesRow>
                <JamesRow columns={2}>
                    <JamesColumn computer={8} tablet={16} mobile={16}>
                        JamesInput Sample
                    </JamesColumn>
                    <JamesColumn computer={8} tablet={16} mobile={16}>
                        <JamesInput
                            placeholder='Site name'
                            icon='search'
                            iconPosition='left'
                            onChange={this.onChange}
                        />
                    </JamesColumn>
                </JamesRow>
                <JamesRow columns={2}>
                    <JamesColumn computer={8} tablet={16} mobile={16}>
                        JamesButton Sample
                    </JamesColumn>
                    <JamesColumn computer={8} tablet={16} mobile={16}>
                        <JamesButton>SAMPLE BUTTON</JamesButton>
                    </JamesColumn>
                </JamesRow>
                <JamesRow columns={2}>
                    <JamesColumn computer={8} tablet={16} mobile={16}>
                        JamesDropdown Sample
                    </JamesColumn>
                    <JamesColumn computer={8} tablet={16} mobile={16}>
                        <JamesCard>
                            <JamesDropdown
                                customIcon={moreIcon}
                                style={{ width: '32px', height: '32px' }}>
                                <JamesDropdown.Menu direction='left'>
                                    <JamesDropdown.Item>
                                        MENU#1
                                    </JamesDropdown.Item>
                                    <JamesDropdown.Item>
                                        MENU#2
                                    </JamesDropdown.Item>
                                </JamesDropdown.Menu>
                            </JamesDropdown>
                        </JamesCard>
                    </JamesColumn>
                </JamesRow>
                <JamesRow columns={2}>
                    <JamesColumn computer={8} tablet={16} mobile={16}>
                        JamesEmptyCard Sample
                    </JamesColumn>
                    <JamesColumn computer={8} tablet={16} mobile={16}>
                        <JamesEmptyCard />
                    </JamesColumn>
                </JamesRow>
                <JamesRow columns={2}>
                    <JamesColumn computer={8} tablet={16} mobile={16}>
                        JamesModal Sample
                    </JamesColumn>
                    <JamesColumn computer={8} tablet={16} mobile={16}>
                        <JamesModal trigger={<JamesButton>Show Modal</JamesButton>}>
                            <JamesModal.Header>
                                <JamesHeader>Select a Photo</JamesHeader>
                            </JamesModal.Header>
                            <JamesModal.Content image>
                                <JamesModal.Description>
                                    <p>
                                        We've found the following gravatar image associated with your e-mail
                                        address.
                                    </p>
                                    <p>Is it okay to use this photo?</p>
                                </JamesModal.Description>
                            </JamesModal.Content>
                        </JamesModal>
                    </JamesColumn>
                </JamesRow>
                <JamesRow columns={2}>
                    <JamesColumn computer={8} tablet={16} mobile={16}>
                        JamesForm Sample
                    </JamesColumn>
                    <JamesColumn computer={8} tablet={16} mobile={16}>
                        <JamesForm>
                            {/* <JamesForm.Group> */}
                            <JamesForm.Input
                                fluid
                                label='SITE'
                                placeholder='Site name'
                            />
                            {/* </JamesForm.Group> */}
                            <JamesForm.Field required>
                                <label>LAST NAME</label>
                                <JamesForm.Input
                                    fluid
                                    placeholder='Last name'
                                />
                            </JamesForm.Field>
                            <JamesForm.Field required>
                                <label>LAST NAME</label>
                                <JamesForm.Input
                                    error={this.state.error ? 'error' : null}
                                    fluid
                                    placeholder='Last name'
                                />
                            </JamesForm.Field>
                        </JamesForm>
                    </JamesColumn>
                </JamesRow>
                <JamesRow columns={2}>
                    <JamesColumn computer={8} tablet={16} mobile={16}>
                        JamesDatePicker Sample
                    </JamesColumn>
                    <JamesColumn computer={8} tablet={16} mobile={16}>
                        <DatePickerWrapper
                            isClearable
                            dateFormat="yyyy-MM-dd"
                            placeholderText='From'
                            selected={this.state.startDate}
                            onChange={date => this.setStartDate(date)}
                            formatWeekDay={nameOfDay => nameOfDay.substr(0, 1)}
                        // customInput={<JamesDateInput
                        //     icon='calendar outline'
                        // />}
                        />
                    </JamesColumn>
                </JamesRow>
            </JamesGrid>
        );
    }
}

export default Playground;