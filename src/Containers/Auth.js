import React from 'react';
import {Route, Switch} from 'react-router-dom';
import '../Styling/AuthPage.css'
import Login from '../Components/Login';
import SignUp from '../Components/SignUp';

const Auth = () => {
    return(
        <div>
            <Switch>
                <Route path="/signup" component={SignUp} />
                <Route path="/" component={Login} />
            </Switch>
        </div>
    )
}

export default Auth