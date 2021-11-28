import React, { useReducer, useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import { handleLogin } from '../helper/api-helper';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../store';
import * as LoginStore from '../store/Login';
import { login } from "../helper/constants";
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
        loginBtn: {
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

type LoginProps =
    LoginStore.LoginState &
    typeof LoginStore.actionCreators &
    RouteComponentProps<{}>;

const Login = (props: LoginProps) => {
    const classes = useStyles();
    const { token, setToken } = useToken();
    let history = useHistory();

    useEffect(() => {
        props.reset();
    }, []);

    useEffect(() => {
        if (props.username.trim() && props.password.trim()) {
            props.setIsButtonDisabled(false);
        } else {
            props.setIsButtonDisabled(true);
        }
    }, [props.username, props.password]);

    const onLogin = () => {
        handleLogin(props.username, props.password, (token: any) => {
            props.loginSuccess(login.SUCCESS);
            setToken(token);
            history.push("/home");
        }, () => {
            props.loginFailed(login.FAILED);
            setToken(null);
        });
    };

    const handleKeyPress = (event: React.KeyboardEvent) => {
        if (event.keyCode === 13 || event.which === 13) {
            props.isButtonDisabled || onLogin();
        }
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
                <CardHeader className={classes.header} title="Login App" />
                <CardContent>
                    <div>
                        <TextField
                            error={props.isError}
                            fullWidth
                            id="username"
                            type="email"
                            label="Username"
                            placeholder="Username"
                            margin="normal"
                            onChange={handleUsernameChange}
                            onKeyPress={handleKeyPress}
                        />
                        <TextField
                            error={props.isError}
                            fullWidth
                            id="password"
                            type="password"
                            label="Password"
                            placeholder="Password"
                            margin="normal"
                            helperText={props.helperText}
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
                        className={classes.loginBtn}
                        onClick={onLogin}
                        disabled={props.isButtonDisabled}>
                        Login
                    </Button>
                </CardActions>
            </Card>
        </form>
    );
};

export default connect(
    (state: ApplicationState) => state.login,
    LoginStore.actionCreators
)(Login);