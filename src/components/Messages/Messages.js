import React from 'react';
import { Segment, Comment } from 'semantic-ui-react';
import MessageForm from './MessageForm';
import MessagesHeader from './MessagesHeader';

class Messages extends React.Component {
    state = {  }
    render() { 
        return ( 
            <React.Fragment>
                <MessagesHeader />
                {/* Following segment is messages areas */}
                <Segment>
                    <Comment.Group className="messages">
                        {/* messages */}
                    </Comment.Group>
                </Segment>
                <MessageForm />
            </React.Fragment>
         );
    }
}
 
export default Messages;