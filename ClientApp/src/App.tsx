import * as React from 'react';
import { Route, Redirect } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import Signup from './components/Signup';
import FetchData from './components/FetchData';
import Login from './components/Login';
import './custom.css'

export default () => {
    return (
        <Layout>
            <Route exact path={["/", "/home", "index.html"]} component={Home} />
            <Route exact path='/login' component={Login} />
            <Route path='/signup' component={Signup} />
            <Route path='/fetch-data/:startDateIndex?' component={FetchData} />
        </Layout>
    );
};
