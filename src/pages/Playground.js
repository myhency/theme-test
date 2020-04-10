import React, { Component } from 'react';
import { JamesCard, JamesGrid, JamesRow, JamesColumn, JamesButton } from '../themes/jamesStyledComponents';


class Playground extends Component {
    render() {
        return (
            <JamesGrid celled>
                <JamesRow columns={2}>
                    <JamesColumn computer={8} tablet={16} mobile={16}>
                        <JamesCard>aaaa</JamesCard>
                    </JamesColumn>
                    <JamesColumn computer={8} tablet={16} mobile={16}>
                        <JamesCard>aaaa</JamesCard>
                        <JamesButton color='black' />
                    </JamesColumn>
                </JamesRow>
            </JamesGrid>
        );
    }
}

export default Playground;