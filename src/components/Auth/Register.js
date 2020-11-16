import React from "react";
import { Link } from "react-router-dom";
import firebase from '../../firebase';

import {
    Grid,
    Form,
    Segment,
    Button,
    Header,
    Message,
    Icon,
} from "semantic-ui-react";

class Register extends React.Component {
    state = {
        username: "",
        email: "",
        password: "",
        passwordConfirmation: "",
        error: ""
    };

    handleChange = event => {
        this.setState({  
            [event.target.name]: event.target.value
         })
    }

    isFormValid = () => {
        
        if (this.isFormEmpty()) {
            alert("Form cannot be empty!");
            return false
        }

        if (!this.isPasswordValid()) {
            alert("Passwords are not consistent!");
            return false
        }

        return true


    }

    isFormEmpty = () => {
        return !(this.state.username.length && this.state.email.length && this.state.passwordConfirmation.length && this.state.password.length)
    }
    isPasswordValid = () => {
        return this.state.password === this.state.passwordConfirmation
    }

    handleSubmit = event => {
        if (!this.isFormValid()) {
            return;
        }
        event.preventDefault();
        firebase
            .auth()
            .createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(createdUser => {
                console.log(createdUser);
            })
            .catch(err => {
                console.log(err);
                this.setState({
                    error: err.message
                })
            })
 
    }

    


    

    render() {
        const { username, email, password, passwordConfirmation, error} = this.state
        return (
            <Grid textAlign="center" verticalAlign="middle" className="app">
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as="h2" icon color="orange" textAlign="center">
                        <Icon name="puzzle piece" color="orange" />
                        Register for Slackish
                    </Header>
                    <Form onSubmit={this.handleSubmit} size="large">
                        <Segment stacked>
                            <Form.Input
                                fluid
                                name="username"
                                icon="user"
                                iconPosition="left"
                                placeholder="Username"
                                onChange={this.handleChange}
                                value={username}
                                type="text"
                            />
                            <Form.Input
                                fluid
                                name="email"
                                icon="mail"
                                iconPosition="left"
                                placeholder="email"
                                onChange={this.handleChange}
                                value={email}
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
                                type="password"
                            />

                            <Form.Input
                                fluid
                                name="passwordConfirmation"
                                icon="repeat"
                                iconPosition="left"
                                placeholder="password confirmation"
                                onChange={this.handleChange}
                                value={passwordConfirmation}
                                type="password"
                            />
                            <Button color="orange" fluid size="large">Submit</Button>
                        </Segment>
                        
                    </Form>
                       {error.length>0 && (
                           <Message error>
                               <h3>Error</h3>
                               <p>{error}</p>
                           </Message>
                       ) }
                    <Message>Already a user? <Link to="/login">Login</Link></Message>
                </Grid.Column>
            </Grid>
        );
    }
}

export default Register;
