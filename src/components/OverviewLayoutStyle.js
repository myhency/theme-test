import styled from 'styled-components';

const Styles = styled.div`
    height: 91vh!important;

    .grid-row-nopadding {
        padding-top: 0px!important;
    }

    .grid-style {
        width: 75%;
        margin-left: auto; 
        margin-right: auto;
    }

    .grid-row-layout {
        height: 46vh!important;
    }

    .row-layout {
        padding-top: 2.96vh;
    }

    .service-row-layout {
        padding-top: 0px!important;
    }

    .clock-icon {
        display: inline-block!important;
        position: relative;
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