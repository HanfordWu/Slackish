import React from "react";
import { Link } from "react-router-dom";
import firebase from '../../firebase';
import md5 from 'md5';

import {
    Grid,
    Form,
    Segment,
    Button,
    Header,
    Message,
    Icon,
} from "semantic-ui-react";

class Login extends React.Component {
    state = {
        username: "",
        email: "",
        password: "",
        error: "",
        loading: false,
    };

    handleChange = event => {
        this.setState({  
            [event.target.name]: event.target.value
         })
    }


    handleSubmit = event => {
        event.preventDefault();

        this.setState({loading: true })
        
 
    }



    handleInputError = (error, inputName) => {
        return error.toLowerCase().includes(inputName)? "error":""
    }
    


    

    render() {
        const {username, email, password, error, loading} = this.state
        return (
            <Grid textAlign="center" verticalAlign="middle" className="app">
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as="h2" icon color="violet" textAlign="center">
                        <Icon name="puzzle piece" color="violet" />
                        Login into Slackish
                    </Header>
                    <Form onSubmit={this.handleSubmit} size="large">
                        <Segment stacked>
                            
                            <Form.Input
                                fluid
                                name="email"
                                icon="mail"
                                iconPosition="left"
                                placeholder="email"
                                onChange={this.handleChange}
                                value={email}
                                className={this.handleInputError(error, "email")}
                                type="email"
                            />
                            <Form.Input
                                fluid
                                name="password"
                                icon="lock"
                                iconPosition="left"
                                placeholder="password"
                                onChange={this.handleChange}
                                value={password}
                                className={this.handleInputError(error,"password")}
                                type="password"
                            />

                            
                            <Button disabled={loading} className={loading? 'loading':''} color="violet" fluid size="large">Submit</Button>
                        </Segment>
                        
                    </Form>
                       {error.length>0 && (
                           <Message error>
                               <h3>Error</h3>
                               <p>{error}</p>
                           </Message>
                       ) }
                    <Message>Don't have an account? <Link to="/register">Login</Link></Message>
                </Grid.Column>
            </Grid>
        );
    }
}

export default Login;
