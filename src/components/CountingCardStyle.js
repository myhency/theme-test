import styled from 'styled-components';

const Styles = styled.div`
    .counting-card {
        background-color: white;
        border-radius: 16px;
        box-shadow: 0 10px 15px 0 rgba(131, 145, 165, 0.1);
    }

    .counting-card-content-box {
        width: 100%!important;
        margin: 0px!important;
    }

    .counting-card-title {
        width: 44px;
        height: 24px;
        font-size: 16px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.5;
        letter-spacing: -0.16px;
        text-align: left;
        color: ${props => props.color};
    }

    .counting-card-content {
        width: 14px;
        height: 36px;
        font-size: 24px;
        font-weight: bold;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.5;
        letter-spacing: normal;
        text-align: left;
        color: ${props => props.color};
    }

    .title-icon {
        width: 24px!important;
        height: 24px!important;
        object-fit: contain;
        float: right;
        vertical-align: middle;

    }

    .grid-row-header {
        padding-left: 1.14vw!important;
        padding-right: 1.14vw!important;
        padding-top: 2vh!important;
        padding-bottom: 0px!important;
    }

    .grid-row-content {
        padding-left: 1.14vw!important;
        padding-right: 1.14vw!important;
        padding-top: 0px!important;
        padding-bottom: 2vh!important;
    }
`

export { Styles };