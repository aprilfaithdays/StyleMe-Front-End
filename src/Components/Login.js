import React, { useState, useEffect, useContext } from 'react';
import { Link} from 'react-router-dom'
import { CurrentUserContext } from '../Context/CurrentUser';
import Welcome from './Welcome';

const Login = props => {
    const abortController = new AbortController();
    const [, setCurrentUser] = useContext(CurrentUserContext);
    const [users, setUsers] = useState([]);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const cleanUp = () => abortController.abort();

    useEffect(()=> {
        getUsers();
        return cleanUp();
        // eslint-disable-next-line
    },[])

    const getUsers = () => {
        fetch('https://boiling-reaches-37131.herokuapp.com/users')
        .then(res => res.json())
        .then(res => setUsers(res));
        return cleanUp();
    }

    const handleSubmit = e => {
        e.preventDefault();
        const user = users.find(user => user.username === username);
        if (user) {
            if(user.password === password){
                localStorage.id = user.id;
                setCurrentUser(user)
                props.history.push('/')
            } else {
                alert("Can't find username/password combo");
            }
        } else {
            alert("Can't find username/password combo");
        }
    }

    const returningUser = () => {
        return(
            <div className="auth-form">
                <h5>Login</h5>
                <form onSubmit={handleSubmit}>
                    <small><b>Username:</b></small><br/>
                    <input className="auth-input" type="text" onChange={e => setUsername(e.target.value)} value={username}/><br/>
                    <small><b>Password:</b></small><br/>
                    <input className="auth-input" type="password" onChange={e => setPassword(e.target.value)} value={password}/>
                <div className="submit-button">
                    <button className="btn btn-outline-secondary btn-sm">Login</button>
                </div>
                </form>
                <div className="text">
                    New to this? <span>➤ </span><Link to='/signup'>Sign Up</Link>
                </div>
            </div>
        )
    }

    return(
        <div>
            <Welcome form={returningUser()} />
        </div>
    )
}

export default Login