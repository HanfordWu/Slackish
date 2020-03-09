import React from "react";
import firebase from "../../firebase";
import { Segment, Input, Button } from "semantic-ui-react";
import FileModal from "./FileModal";

class MessageForm extends React.Component {
    state = {
        message: "",
        loading: false,
        channel: this.props.currentChannel,
        user: this.props.currentUser,
        errors: [],
        modal: false
    };

    openModal = () => this.setState({ modal: true });
    closeModal = () => this.setState({ modal: false });

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    createMessage = (fileUrl = null) => {
        const message = {
            timestamp: firebase.database.ServerValue.TIMESTAMP,
            user: {
                id: this.state.user.uid,
                name: this.state.user.displayName,
                avatar: this.state.user.photoURL
            },
        };
        if (fileUrl !== null) {
            message['image'] = fileUrl;
        } else {
            message['content'] = this.state.message;
        }
        return message;
    };

    sendMessage = () => {
        const { message, channel } = this.state;
        const { messagesRef } = this.props;
        if (message) {
            messagesRef
                .child(channel.id)
                .push()
                .set(this.createMessage())
                .then(() => {
                    this.setState({ loading: false, message: "", errors: [] });
                })
                .catch(err => {
                    console.error(err);
                    this.setState({
                        loading: false,
                        errors: this.state.errors.concat(err)
                    });
                });
        } else {
            this.setState({
                errors: this.state.errors.concat({ message: "Add a message" })
            });
        }
    };

    sendFileMessage = (fileUrl, ref, pathToUpload) => {
        ref.child(pathToUpload)
            .push()
            .set(this.createMessage(fileUrl))
            .then(() => {
                this.setState({ uploadState: 'done'})
            })
            .catch(err => {
                console.error(err);
                this.setState({
                    errors: this.state.errors.concat(err)
                })
            })
    }


    render() {
        const { errors, loading, modal } = this.state;
        return (
            <Segment className="message__form">
                <Input
                    fluid
                    name="message"
                    onChange={this.handleChange}
                    style={{ marginBottom: "0.7em" }}
                    label={<Button icon={"add"} />}
                    labelPosition="left"
                    placeholder="Write your message"
                    value={this.state.message}
                    className={
                        errors.some(error => error.message.includes("message"))
                            ? "error"
                            : ""
                    }
                />
                <Button.Group icon widths="2">
                    <Button
                        color="orange"
                        content="Add Reply"
                        labelPosition="left"
                        icon="edit"
                        onClick={this.sendMessage}
                        disabled={loading}
                    />
                    <Button
                        color="teal"
                        content="Upload Media"
                        labelPosition="right"
                        icon="cloud upload"
                        onClick={this.openModal}
                    />
                </Button.Group>
                <FileModal
                    modal={modal}
                    closeModal={this.closeModal}
                    uploadFile={this.uploadFile}
                />
            </Segment>
        );
    }
}

export default MessageForm;
