import React, { useReducer, useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import { handleSignup } from '../helper/api-helper';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../store';
import * as SignupStore from '../store/Signup';
import * as LoginStore from '../store/Login';
import { signup } from "../helper/constants";
import { useHistory } from "react-router-dom";
import useToken from '../helper/token-helper';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            display: 'flex',
            flexWrap: 'wrap',
            width: 400,
            margin: `${theme.spacing(0)} auto`
        },
        signupBtn: {
            marginTop: theme.spacing(2),
            flexGrow: 1
        },
        header: {
            textAlign: 'center',
            background: '#212121',
            color: '#fff'
        },
        card: {
            marginTop: theme.spacing(10)
        }
    })
);

type SignupProps =
    //LoginStore.LoginState &
    //typeof LoginStore.actionCreators &
    SignupStore.SignupState &
    typeof SignupStore.actionCreators &
    RouteComponentProps<{}>;

const Signup = (props: SignupProps) => {
    const classes = useStyles();
    const { token, setToken } = useToken();
    let history = useHistory();

    useEffect(() => {
        props.reset();
    }, []);

    useEffect(() => {
        if (props.firstname.trim() && props.lastname.trim() && props.username.trim() && props.password.trim()) {
            props.setIsButtonDisabled(false);
        } else {
            props.setIsButtonDisabled(true);
        }
    }, [props.firstname, props.lastname, props.username, props.password]);

    const onSignup = () => {
        handleSignup(props.firstname, props.lastname, props.username, props.password, (token: any) => {
            props.signupSuccess(signup.SUCCESS);
            //setToken(token);
            history.push("/login");
            props.reset();
        }, (err: any) => {
            // TODO: better
            props.signupFailed((err.status === 409 ? signup.FAILED_USER : signup.FAILED_PW) + err.message);
            //setToken(null);
        });
    };

    const handleKeyPress = (event: React.KeyboardEvent) => {
        if (event.keyCode === 13 || event.which === 13) {
            props.isButtonDisabled || onSignup();
        }
    };

    const handleFirstnameChange: React.ChangeEventHandler<HTMLInputElement> =
        (event) => {
            props.setFirstname(event.target.value);
        };

    const handleLastnameChange: React.ChangeEventHandler<HTMLInputElement> =
        (event) => {
            props.setLastname(event.target.value);
        };

    const handleUsernameChange: React.ChangeEventHandler<HTMLInputElement> =
        (event) => {
            props.setUsername(event.target.value);
        };

    const handlePasswordChange: React.ChangeEventHandler<HTMLInputElement> =
        (event) => {
            props.setPassword(event.target.value);
        };

    return (
        <form className={classes.container} noValidate autoComplete="off">
            <Card className={classes.card}>
                <CardHeader className={classes.header} title="Sign Up" />
                <CardContent>
                    <div>
                        <TextField
                            //error={props.isError}
                            fullWidth
                            id="firstname"
                            type="text"
                            label="First Name"
                            placeholder="First Name"
                            margin="normal"
                            onChange={handleFirstnameChange}
                            onKeyPress={handleKeyPress}
                        />
                        <TextField
                            //error={props.isError}
                            fullWidth
                            id="lastname"
                            type="text"
                            label="Last Name"
                            placeholder="Last Name"
                            margin="normal"
                            onChange={handleLastnameChange}
                            onKeyPress={handleKeyPress}
                        />
                        <TextField
                            error={props.isError && props.helperText.includes(signup.FAILED_USER)}
                            fullWidth
                            id="username"
                            type="email"
                            label="Username"
                            placeholder="Username"
                            margin="normal"
                            helperText={props.helperText.includes(signup.FAILED_USER) && props.helperText}
                            onChange={handleUsernameChange}
                            onKeyPress={handleKeyPress}
                        />
                        <TextField
                            error={props.isError && props.helperText.includes(signup.FAILED_PW)}
                            fullWidth
                            id="password"
                            type="password"
                            label="Password"
                            placeholder="Password"
                            margin="normal"
                            helperText={props.helperText.includes(signup.FAILED_PW) && props.helperText}
                            onChange={handlePasswordChange}
                            onKeyPress={handleKeyPress}
                        />
                    </div>
                </CardContent>
                <CardActions>
                    <Button
                        variant="contained"
                        size="large"
                        color="secondary"
                        className={classes.signupBtn}
                        onClick={onSignup}
                        disabled={props.isButtonDisabled}>
                        Sign Up
                    </Button>
                </CardActions>
            </Card>
        </form>
    );
};

export default connect(
    (state: ApplicationState) => state.signup,
    SignupStore.actionCreators
)(Signup);