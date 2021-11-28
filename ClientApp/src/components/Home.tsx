import * as React from 'react';
import { connect } from 'react-redux';
import { HashRouter as Router, Route, Link, Switch, useHistory } from 'react-router-dom';
import useToken from '../helper/token-helper';
import { ApplicationState } from '../store';
import * as LoginStore from '../store/Login';
import { RouteComponentProps, Redirect } from 'react-router';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import './NavMenu.css';
import FetchData from './FetchData';

type LoginProps =
    LoginStore.LoginState &
    typeof LoginStore.actionCreators &
    RouteComponentProps<{}>;

const Home = (props: LoginProps) => {
    //let history = useHistory();
    const { token, setToken } = useToken();

    return (
        !token ? <Redirect to="login" /> :
        <div>
            {/*<h1>Hello, world!</h1>*/}
            <FetchData />
            <header>
                <Navbar className="navbar-expand-sm navbar-toggleable-sm border-bottom box-shadow mb-3" light>
                    <Container>
                        <NavbarToggler className="mr-2" />
                        <Collapse className="d-sm-inline-flex flex-sm-row-reverse" navbar>
                            <ul className="navbar-nav flex-grow">
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/login" onClick={() => {
                                        setToken(null);
                                        //history.push("/login");
                                        props.reset();
                                    }}>Log out</NavLink>
                                </NavItem>
                            </ul>
                        </Collapse>
                    </Container>
                </Navbar>
            </header>
            {/*<Link className="header-btn" to={"/login"} onClick={() => {*/}
            {/*    setToken(null);*/}
            {/*    //history.push("/login");*/}
            {/*    props.reset();*/}
            {/*}}>*/}
            {/*    {'Log Out'}*/}
            {/*</Link>*/}
        </div>
    );
};

export default connect(
    (state: ApplicationState) => state.login,
    LoginStore.actionCreators
)(Home);
