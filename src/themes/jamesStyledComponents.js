import React from 'react';
import { Container, Grid, Button } from 'semantic-ui-react';
import styled from 'styled-components';

export const JamesCard = styled(Container)({
    backgroundColor: 'white',
    borderRadius: '16px',
    boxShadow: '0 10px 14px 0 rgba(131, 145, 165, 0.1)',
    padding: '14px'
});

export const JamesGrid = styled(Grid)({
    color: props => props.color
});

export const JamesRow = styled(Grid.Row)({
    padding: '0px!important'
});

export const JamesColumn = styled(Grid.Column)({
    padding: '14px!important'
});

export const JamesButton = styled(Button)({
    backgroundColor: props => props.color
});
