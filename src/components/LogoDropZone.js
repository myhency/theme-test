import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';
import { Container, Button, Image, Header, Icon, Grid } from 'semantic-ui-react';
import closeIcon from '../assets/images/icon_close.svg'

const Styles = styled.div`
    .dropzone {
        flex: 1;
        display: flex;
        flex-direction: column;
        padding: 20px;
        /* border-width: 2px; */
        border-radius: 4px;
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
        /* border-width: 2px; */
        border-radius: 4px;
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

    .thumb {
        flex: 1;
        display: flex;
        flex-direction: column;
        padding: 20px;
        border-width: 2px;
        border-radius: 4px;
        border-color: grey;
        /* border-style: dashed; */
        border: solid 1px #e4e7ef;
        background-color: #ffffff;
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

const LogoDropZone = ({
    onLoadEnd,
    imageUrl
}) => {
    const [files, setFiles] = React.useState([]);
    const [fileSelected, setFileSelected] = React.useState(imageUrl ? true : false);
    const {
        getRootProps,
        getInputProps,
        isDragActive } = useDropzone({
            accept: 'image/*',
            onDrop: acceptedFiles => {
                console.log(acceptedFiles)
                setFiles(acceptedFiles.map(file => Object.assign(file, {
                    preview: URL.createObjectURL(file)
                })));
                onLoadEnd(acceptedFiles[0]);
                setFileSelected(true);
            }
        });

    let thumbs;
    if (files.length > 0) { // 업로드 시, 파일을 onDrop했을 때
        thumbs = files.map((file, key) => (
            <Grid>
                <Grid.Row>
                    <Grid.Column>
                        <Image src={closeIcon} verticalAlign='top' floated='right' onClick={() => setFileSelected(false)} />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <Image src={file.preview} centered size='small' className='img' key={key} />
                    </Grid.Column>
                </Grid.Row>
            </Grid>

        ));
    } else if (files.length === 0 && imageUrl !== undefined) { // 파일 onDrop하지 않고, 이미 선택된 이미지 표시할 때
        thumbs = (
            <Grid>
                <Grid.Row>
                    <Grid.Column>
                        <Image src={closeIcon} verticalAlign='top' floated='right' onClick={() => setFileSelected(false)} />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <Image src={`/${imageUrl}`} centered size='small' className='img' />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    } else { // 파일 onDrop하지 않고, 이미 선택된 파일도 없을 때
        thumbs = null;
    }

    let thumbsContainer;
    if (fileSelected) {
        thumbsContainer = (
            <Container textAlign='center'>
                <div className='thumb'>
                    {thumbs}
                </div>
            </Container>

        );
    } else {
        thumbsContainer = (
            <Container textAlign='center'>
                <div {...getRootProps({ className: 'dropzone', ...(isDragActive ? { className: 'dropzone-active' } : {}) })}>
                    <input {...getInputProps()} />
                    <Container textAlign='center'>
                        <Header as='h5'>Drag 'n' drop your CI image file here</Header>
                        <Button>Choose File</Button>
                    </Container>
                </div>
            </Container>

        );
    }

    console.log(fileSelected)

    return (
        <Styles>
            {thumbsContainer}
        </Styles>
    );
}

export default LogoDropZone;