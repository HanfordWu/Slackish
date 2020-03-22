import React from "react";
import "./App.css";
import { Grid } from "semantic-ui-react";
import ColorPanel from "./ColorPanel/ColorPanel";
import SidePanel from "./SidePanel/SidePanel";
import Messages from "./Messages/Messages";
import MetaPanel from "./MetaPanel/MetaPanel";
import { connect } from "react-redux";

const App = ({ currentUser, currentChannel, isPrivateChannel }) => {
    return (
        <Grid columns="equal" className="app" style={{ background: "#eee" }}>
            <ColorPanel />
            {/* When passing multiple props to children (here are SidePanel and Messages component), we should give them an unique key */}
            <SidePanel
                currentUser={currentUser}
                key={currentUser && currentUser.id}
            />
            <Grid.Column style={{ marginLeft: 320 }}>
                <Messages
                    key={currentChannel && currentChannel.id}
                    currentChannel={currentChannel}
                    currentUser={currentUser}
                    isPrivateChannel = {isPrivateChannel}
                />
            </Grid.Column>
            <Grid.Column width={4}>
                <MetaPanel />
            </Grid.Column>
        </Grid>
    );
};
//pass global state to App's props
const mapStateToProps = state => ({
    currentUser: state.user.currentUser,
    currentChannel: state.channel.currentChannel,
    isPrivateChannel: state.channel.isPrivateChannel
});

export default connect(mapStateToProps)(App);
