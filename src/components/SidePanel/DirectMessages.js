import React from 'react';
import { Menu, Icon } from "semantic-ui-react";
import { useStore } from 'react-redux';

class DirectMessages extends React.Component {
    state = {
        users: []
    }


    render() {
        const {users} = this.state;
        return(
            <Menu.Menu className="menu">
                <Menu.Item>
                    <span>
                        <Icon name="mail" /> DIRECT MESSAGES
                    </span>{' '}
                    ({ users.length })
                </Menu.Item>
                {/* users to send direct message */}
            </Menu.Menu>

        )
    }
}

export default DirectMessages