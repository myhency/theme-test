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
    JamesInput

} from '../themes/jamesStyledComponents';


class Playground extends Component {
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
                        <JamesInput />
                    </JamesColumn>
                </JamesRow>
            </JamesGrid>
        );
    }
}

export default Playground;