import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Welcome from './Welcome';

const SignUp = props => {
    const abortController = new AbortController();

    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [match, setMatch] = useState(true);
    const [showError, setShowError] = useState(false)
    const [usernameError, setUsernameError] = useState(false)

    const handleSignUp = e => {
        e.preventDefault();
        if (name === '' || username === '' || password === '' || confirmPassword === ''){setShowError(true)};
        if (name !== '' && username !== '' && password !== '' && confirmPassword !== ''){ 
            if(password === confirmPassword){ addUser() }
            else { 
                setMatch(false);
                setShowError(false);
            };
        };
    }

    const cleanUp = () => abortController.abort();

    const addUser = () => {
        const img_url = 'https://s3.amazonaws.com/pure_charity/uploads/production/avatar/image/179257/large_blank-profile-picture-973460_1280.png'
        fetch('https://boiling-reaches-37131.herokuapp.com/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ name, username, password, img_url })       
        })
        .then(res => res.json())
        .then(res => {
            if (res.errors){ 
                setUsernameError(true);
                setShowError(false) 
            }
            else { props.history.push('/login') }
        });
        return cleanUp();
    }

    const newUser = () => (
        <div>
            <h5>Sign Up</h5>
            <form onSubmit={handleSignUp}>
                <small><b>Name:</b></small>
                <input className="auth-input" type="text" value={name} onChange={e => setName(e.target.value)} />
                <small><b>Username:</b></small>
                <input className="auth-input" type="text" value={username} onChange={e => setUsername(e.target.value)} />
                {usernameError && <small className="error form-text">*That username is taken.</small>}
                <small><b>Password:</b></small>
                <input className="auth-input" type="password" value={password} onChange={e => setPassword(e.target.value)} />
                <small><b>Confirm Password:</b></small>
                <input className="auth-input" type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                {showError && <small className="error form-text">*Please fill everything out.</small>}
                {!match && <small className="error form-text">*Passwords don't match.</small>}
                <div className="submit-button">
                    <button className="btn btn-outline-secondary btn-sm" type="submit">Sign Up</button>
                </div>
            </form>
            <div className="text">
                Been here before? <span>➤ </span> <Link to='/login'>Login</Link>
            </div>
        </div>
    )

    return(
        <div>
            <Welcome form={newUser()} />
        </div>
    )
}

export default SignUp