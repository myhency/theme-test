import styled from 'styled-components';

const Styles = styled.div`
    .row-layout {
        margin-top: 2.96vh;
    }

    .clock-icon {
        width: 16px!important;
        height: 16px!important;
        object-fit: contain;
        /* float: right; */
        vertical-align: middle;
        margin-right: 4px!important;
        margin-left: !important;
    }

    .period-text {
        width: 39px;
        height: 19px;
        font-size: 13px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.46;
        letter-spacing: -0.13px;
        text-align: right;
        color: #8391a5;
    }

    .card-title {
        width: 83px;
        height: 27px;
        font-size: 18px;
        font-weight: bold;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.5;
        letter-spacing: -0.18px;
        text-align: left;
        color: #3b4a5f;
    }
`

export { Styles };