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

class Register extends React.Component {
    state = {
        username: "",
        email: "",
        password: "",
        passwordConfirmation: "",
        error: "",
        loading: false,
        userRef: firebase.database().ref('users')//user table reference
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
        event.preventDefault();


        if (!this.isFormValid()) {
            return;
        }
        this.setState({loading: true })
        firebase
            .auth()
            .createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(createdUser => {
                console.log(createdUser);

                createdUser.user.updateProfile({
                    displayName: this.state.username,
                    photoURL: `http://gravatar.com/avatar/${md5(createdUser.user.email)}?d=identicon`
                })
                .then(()=>{
                    this.setState({ loading: false})
                    this.saveUser(createdUser).then(() => {
                        console.log("user saved");
                    })
                    .catch(err =>{
                        console.error(err);
                    })
                })
                .catch(err => {
                    console.error(err);
                    this.setState({ loading: false})

                })

            })
            .catch(err => {
                console.log(err);
                this.setState({
                    error: err.message,
                    loading: false
                })
            })
 
    }

    saveUser = createdUser => {
        return this.state.userRef.child(createdUser.user.uid).set({
            name: createdUser.user.displayName,
            avatar: createdUser.user.photoURL
        })
    }


    handleInputError = (error, inputName) => {
        return error.toLowerCase().includes(inputName)? "error":""
    }
    


    

    render() {
        const { username, email, password, passwordConfirmation, error, loading} = this.state
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
                                className={this.handleInputError(error,"username")}
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
                            <Button disabled={loading} className={loading? 'loading':''} color="orange" fluid size="large">Submit</Button>
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
