import React from 'react';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';
import { Container, Button, Image, Header } from 'semantic-ui-react';

const Styles = styled.div`
    .dropzone {
        flex: 1;
        display: flex;
        flex-direction: column;
        padding: 20px;
        border-width: 2px;
        border-radius: 2px;
        border-color: grey;
        border-style: dashed;
        background-color: #fafafa;
        color: grey;
        font-size: 1rem;
        outline: none;
        transition: border .24s ease-in-out;
        cursor: pointer;
        min-height: 100px;
        
        &:hover {
            border-color: deeppink;
            background-color: hotpink;
        }
    }

    .dropzone-active {
        flex: 1;
        display: flex;
        flex-direction: column;

        padding: 20px;
        border-width: 2px;
        border-radius: 2px;
        border-color: deeppink;
        border-style: dashed;
        background-color: hotpink;
        color: grey;
        font-size: 1rem;
        outline: none;
        transition: border .24s ease-in-out;
        cursor: pointer;
        min-height: 100px;
    }

    .thumbInner {
        min-width: 0;
        min-height: 10em;
        overflow: hidden;
        border-radius: 2;
        border: 2px solid grey;
        box-sizing: border-box;
    };

    .img {
        display: block;
        width: auto;
        height: 100%;
    };
`

const LogoDropZone = ({ onLoadEnd, onOpen, getLogo }) => {
    const [files, setFiles] = React.useState([]);
    const [thumbs, setThumbs] = React.useState('');
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: 'image/*',
        onDrop: acceptedFiles => {
            var reader = new FileReader();
            var url = reader.readAsDataURL(acceptedFiles[0]);
            reader.onloadend = (e) => {
                setFiles([reader.result]);
                onLoadEnd(acceptedFiles[0]);
            }
        }
    });

    React.useEffect(() => {
        console.log(files.length)
        if (files.length > 0) {
            console.log('aaaa')
            return setThumbs(<Image src={files[0]} centered size='small' className='img' />);
        }
        if (onOpen) {
            console.log('bbbb')
            return getLogo((logofile) => {
                setThumbs(<Image src={'/' + logofile} centered size='small' className='img' />);
            });
        }
    }, [onOpen, files]);

    React.useEffect(() => () => {
        // Make sure to revoke the data uris to avoid memory leaks
        files.forEach(file => URL.revokeObjectURL(file));
    }, [files]);

    return (
        <Styles>
            <Container textAlign='center'>
                <div {...getRootProps({ className: 'dropzone', ...(isDragActive ? { className: 'dropzone-active' } : {}) })}>
                    <input {...getInputProps()} />
                    <Container textAlign='center'>
                        <Header as='h5'>Drag 'n' drop your CI image file here</Header>
                        <Button>Choose File</Button>
                    </Container>
                </div>
            </Container>
            <Container textAlign='center' style={{ marginTop: '10px' }}>
                <div className='thumbInner'>
                    {thumbs}
                </div>
            </Container>
        </Styles>
    );
}

export default LogoDropZone;