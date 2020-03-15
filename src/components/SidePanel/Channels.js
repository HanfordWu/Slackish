import React from "react";
import { Menu, Icon, Modal, Form, Input, Button } from "semantic-ui-react";
import firebase from "../../firebase";
import { connect } from "react-redux";
import { setCurrentChannel, setPrivateChannel } from "../../actions";

class Channels extends React.Component {
    state = {
        channels: [],
        modal: false,
        channelName: "",
        channelDetails: "",
        channelRef: firebase.database().ref("channels"),
        user: this.props.currentUser,
        firstLoad: true, //only at the beginning of the first load, we set the first channel
        activeChannel: ""
    };

    componentDidMount() {
        this.addListeners();
    }

    componentWillUnmount() {
        this.removeListeners();
    }

    removeListeners = () => {
        this.state.channelRef.off();
    };

    addListeners = () => {
        let loadedChannels = [];
        this.state.channelRef.on("child_added", snap => {
            // keep extract all the channels in database
            loadedChannels.push(snap.val());
            this.setState({ channels: loadedChannels }, () =>
                this.setFirstChannel()
            ); //after we get channels from database, we set the first channel to be global current channel
        });
    };

    setFirstChannel = () => {
        const firstChannel = this.state.channels[0];
        if (this.state.firstLoad && firstChannel !== null) {
            this.props.setCurrentChannel(firstChannel);
            this.setActiveChannel(firstChannel);
        }
        this.setState({ firstLoad: false });
    };

    closeModal = () => {
        this.setState({ modal: false });
    };

    openModal = () => {
        this.setState({ modal: true });
    };

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleSubmit = event => {
        event.preventDefault();
        if (this.isFormValid(this.state)) {
            this.addChannel();
        }
    };

    addChannel = () => {
        const { channelRef, user, channelDetails, channelName } = this.state;
        const key = channelRef.push().key; //to get a unique key for our new channel, then use update method
        const newChannel = {
            id: key,
            name: channelName,
            details: channelDetails,
            createdBy: {
                name: user.displayName,
                avatar: user.photoURL
            }
        };
        channelRef
            .child(key)
            .update(newChannel)
            .then(() => {
                this.setState({ channelName: "", channelDetails: "" });
                this.closeModal();
                console.log("channel added");
            })
            .catch(err => {
                console.error(err);
            });
    };

    changeChannel = channel => {
        this.setActiveChannel(channel);
        this.props.setCurrentChannel(channel);
        this.props.setPrivateChannel(false);
    };

    setActiveChannel = channel => {
        this.setState({ activeChannel: channel.id });
    };

    isFormValid = ({ channelName, channelDetails }) =>
        channelName && channelDetails;

    displayChannels = channels =>
        channels.length > 0 &&
        channels.map(channel => (
            <Menu.Item
                key={channel.id}
                onClick={() => this.changeChannel(channel)}
                name={channel.name}
                style={{ opacity: 0.7 }}
                active={channel.id === this.state.activeChannel}
            >
                # {channel.name}
            </Menu.Item>
        ));

    render() {
        const { channels, modal } = this.state;
        return (
            // Because the modal is opened by click Button, so here there are two components, so we use React.fragment to combine them together
            <React.Fragment>
                <Menu.Menu className="menu">
                    <Menu.Item>
                        <span>
                            <Icon name="exchange" /> CHANNELS
                        </span>{" "}
                        ({channels.length}){" "}
                        <Icon name="add" onClick={this.openModal} />
                    </Menu.Item>
                    {/* iterate channels to display channel list */}
                    {this.displayChannels(channels)}
                </Menu.Menu>
                <Modal basic open={modal} onClose={this.closeModal}>
                    <Modal.Header>Add a Channel</Modal.Header>
                    <Modal.Content>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Field>
                                <Input
                                    fluid
                                    label="Name of the Channel"
                                    name="channelName"
                                    onChange={this.handleChange}
                                />
                            </Form.Field>
                            <Form.Field>
                                <Input
                                    fluid
                                    label="About the Channel"
                                    name="channelDetails"
                                    onChange={this.handleChange}
                                />
                            </Form.Field>
                        </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button
                            color="green"
                            inverted
                            onClick={this.handleSubmit}
                        >
                            <Icon name="checkmark" />
                            Add
                        </Button>
                        <Button color="red" inverted onClick={this.closeModal}>
                            Cancel
                            <Icon name="remove" />
                        </Button>
                    </Modal.Actions>
                </Modal>
            </React.Fragment>
        );
    }
}

export default connect(null, { setCurrentChannel, setPrivateChannel })(
    Channels
);
