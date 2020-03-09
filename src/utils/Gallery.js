import hyundaiCardLogo from '../assets/images/01.20686250.1.jpg';
import nonghyubLogo from '../assets/images/nonghyub-logo.jpeg';
import shinhanLogo from '../assets/images/shinhan-logo.jpg';
import kmiLogo from '../assets/images/kmi-logo.jpeg';
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
                default:
            }
        },
    },
    render() {
        return;
    },
});

export default Gallery;