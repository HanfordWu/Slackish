import React from "react";
import { Segment, Comment } from "semantic-ui-react";
import MessageForm from "./MessageForm";
import MessagesHeader from "./MessagesHeader";
import firebase from "../../firebase";
import Message from "./Message";

class Messages extends React.Component {
    state = {
        messagesRef: firebase.database().ref("messages"),
        channel: this.props.currentChannel,
        user: this.props.currentUser,
        messagesLoading: true,
        messages: [],
        numUniqueUsers: '',
        searchTerm: '',
        searchLoading: false,
        searchResults: []
    };

    componentDidMount() {
        const { channel, user } = this.state;
        if (channel && user) {
            this.addListeners(channel.id);
        }
    }

    addListeners = channelId => {
        this.addMessageListener(channelId);
    };

    addMessageListener = channelId => {
        let loadedMessages = [];
        this.state.messagesRef.child(channelId).on("child_added", snap => {
            loadedMessages.push(snap.val());
            this.setState({ messages: loadedMessages, messagesLoading: false });
        });
        this.countUniqueUsers(loadedMessages);
    };

    countUniqueUsers = messages => {
        const uniqueUsers = messages.reduce((acc, message) => {
            if (!acc.includes(message.user.name)) {
                acc.push(message.user.name)
            }
            return acc
        }, [])
        const plural = uniqueUsers.length > 1 || uniqueUsers.length == 0
        const numUniqueUsers = `${uniqueUsers.length} user${plural ? "s" : ""}s`
        this.setState({ numUniqueUsers})
    }

    handleSearchChange = event => {
        this.setState({
            searchTerm: event.target.value,
            searchTerm: true
        }, () => this.handSearchMessages())
    }

    handSearchMessages = () => {
        const channelMessages = [...this.state.messages] /**make sure we don't mutate original message array */
        const regex = new RegExp(this.state.searchTerm, 'gi')
        const searchResults = channelMessages.reduce((acc, message) => {
            if (message.content && message.content.match(regex)) { /**we don't want search image message. if it is a image message, its content is null */
                acc.push(message)
            }
        },[])
        this.setState({ searchResults })
        setTimeout(() => this.setState({ searchLoading: false }), 1000)
    }

    displayChannelName = channel => channel ? `#${channel.name}` : ``

    displayMessages = messages =>
        messages.length > 0 && messages.map(message => <Message
            key={message.timestamp}
            message={message}
            user={this.state.user}
            />);

    render() {
        const { messagesRef, channel, user, messages, searchResults, numUniqueUsers, searchTerm, searchLoading } = this.state;
        return (
            <React.Fragment>
                <MessagesHeader
                    channelName={this.displayChannelName(channel)}
                    numUniqueUsers={numUniqueUsers}
                    handleSearchChange={this.handleSearchChange}
                    searchLoading={searchLoading}
                />
                {/* Following segment is messages areas */}
                <Segment>
                    <Comment.Group className="messages">
                        {/* messages */}
                        {searchTerm ? this.displayMessages(searchResults) :
                        this.displayMessages(messages)}
                    </Comment.Group>
                </Segment>
                <MessageForm
                    messagesRef={messagesRef}
                    currentChannel={channel}
                    currentUser={user}
                />
            </React.Fragment>
        );
    }
}

export default Messages;
