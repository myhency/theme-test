import hyundaiCardLogo from '../assets/images/01.20686250.1.jpg';
import nonghyubLogo from '../assets/images/nonghyub-logo.jpeg';
import shinhanLogo from '../assets/images/shinhan-logo.jpg';
import kmiLogo from '../assets/images/kmi-logo.jpeg';
import green from '../assets/images/green.svg';
import red from '../assets/images/red.svg';
// import error from '../assets/images/tag_error.png';
// import ok from '../assets/images/tag_ok.png';
import error from '../assets/images/tag_error.svg';
import ok from '../assets/images/tag_ok.svg';
import createReactClass from 'create-react-class';


const Gallery = createReactClass({
    statics: {
        /**
         * get company logo image by company name
         * @param {string} company name
         */
        getLogoImage: function (name) {
            switch (name) {
                case '현대카드':
                    return hyundaiCardLogo;
                case '농협':
                    return nonghyubLogo;
                case '신한은행':
                    return shinhanLogo;
                case 'KMI':
                    return kmiLogo;
                case 'true':
                    return ok;
                case 'false':
                    return error;
                default:
            }
        },
    },
    render() {
        return;
    },
});

export default Gallery;