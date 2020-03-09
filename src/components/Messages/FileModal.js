import React from "react";
import { Modal, Input, Button, Icon } from "semantic-ui-react";
import mime from 'mime-types';
import uuidv4 from 'uuid/v4';
import firebase from "../../firebase";

class FileModal extends React.Component {
    state = {
        file: null,
        authorized: ['image/jpeg', 'image/png'],
        uploadState: '',
        uploadTask: null,
        storageRef: firebase.storage().ref(),
        percentUpload: 0
    };
    addFile = event => {
        const file = event.target.files[0];
        if (file) {
            this.setState({ file })
        }
    }

    sendFile = () => {
        const { file } = this.state;
        const { uploadFile, closeModal } = this.props;

        if (file !== null) {
            if (this.isAuthorized(file.name)) {
                const metadata = { contentType: mime.lookup(file.name)}
                this.uploadFile(file, metadata)
                closeModal();
                this.clearFile();
            }
        }

    }

    clearFile = () => this.setState({ file: null})




    isAuthorized = filename => this.state.authorized.includes(mime.lookup(filename))

    uploadFile = (file, metadata) => {
        const pathToUpload = this.state.channel.id;
        const ref = this.props.messageRef;
        const filePath = `chat/public/${uuidv4()}.jpg`
        this.setState({
            uploadState: 'uploading',
            uploadTask: this.state.storageRef.child(filePath).put(file, metadata)
        },
            () => {
                this.state.uploadTask.on('state_changed', snap => {
                    const percentUpload = Math.round((snap.bytesTransferred / snap.totalBytes) *100);
                    this.setState({ percentUpload })
                },
                err => {
                    console.error(err);
                    this.setState({
                        errors: this.setState.errors.concat(err),
                        uploadState: 'error',
                        uploadTask: null
                    })
                },
                () => {
                    this.state.uploadTask.snapshot.ref.getDownloadURL().then(downloadUrl => {
                        this.sendFileMessage(downloadUrl, ref, pathToUpload)
                    })
                    .catch(err => {
                        console.error(err);
                        this.setState({
                            errors: this.setState.errors.concat(err),
                            uploadState: 'error',
                            uploadTask: null
                        })
                    })
                }
                )
            }
        
        )
    }



    render() {
        const { modal, closeModal } = this.props;
        return (
            <Modal basic open={modal} onClose={closeModal}>
                <Modal.Header>Select an Image File</Modal.Header>
                <Modal.Content>
                    <Input onChange={this.addFile} fluid label="File" name="file" type="file" />
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={this.sendFile} color="green" inverted>
                        <Icon name="checkmark" />
                        Send
                    </Button>
                    <Button color="red" inverted onClick={closeModal}>
                        <Icon name="remove" />
                        Cancel
                    </Button>
                </Modal.Actions>
            </Modal>
        );
    }
}

export default FileModal;
