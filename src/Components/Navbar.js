import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CurrentUserContext } from '../Context/CurrentUser';
import { useState } from 'react';

const Navbar = props => {
    const abortController = new AbortController();
    const [currentUser, setCurrentUser] = useContext(CurrentUserContext);
    const [newIcon, setNewIcon] = useState('');
    const buttonStyle = "btn btn-outline-secondary btn-sm";
    const logo = require("../Visuals/StyleMe-Logo.png");
    const heart = require("../Visuals/sm-logo.png");


    const logOut = () => {
        props.history.push('/');
        localStorage.removeItem('id');
    }

    const cleanUp = () => abortController.abort();

    const handleUpdate = e => {
        e.preventDefault()
        const id = currentUser.id
        fetch(`https://obscure-wave-67967.herokuapp.com/users/${id}`, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ img_url: newIcon })
        })
        .then(res => res.json())
        .then(res => {
            setCurrentUser(res);
            setNewIcon('');
        })
        return cleanUp();
    }

    return(
        <div className="header">
            <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light nav-style">
                <Link to ='/home' className="navbar-brand"><img className="logo" src={logo} alt="StyleMe"/></Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                    <li className="nav-item dropdown active">
                        <a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Browse
                        </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <Link to='/tops' className="dropdown-item">Tops</Link> 
                            <Link to='/bottoms' className="dropdown-item">Bottoms</Link> 
                            <Link to='/shoes' className="dropdown-item">Shoes</Link> 
                            <div className="dropdown-divider"></div>
                            <Link to='/outfits' className="dropdown-item">Outfits</Link> 
                            <Link to='/likes' className="dropdown-item">Liked <span role="img" aria-label="heart">♥️</span></Link> 
                        </div>
                    </li>
                    <li className="nav-item">
                        <Link to='/outfits/new' className="nav-link">Create Outfit</Link>
                    </li>
                    </ul>
                    <form className="form-inline my-2 my-lg-0">
                        <span data-toggle="modal" data-target="#updateProfilePhoto">
                            <img src={currentUser.img_url} width="30" height="30" className="d-inline-block align-top nav-img" alt={currentUser.name}/>
                        </span>
                        <span className="navbar-text"> Hi {currentUser.name} <img src={heart} width="20" height="20" className="d-inline-block align-top nav-img" alt="♡"/> </span>
                        <div className="log-out-btn">
                            <button className="btn btn-outline-secondary btn-sm" onClick={logOut}>Log Out</button>
                        </div>
                    </form>
                </div>
            </nav>
            <div className="modal fade" id="updateProfilePhoto" tabIndex="-1" role="dialog" aria-labelledby="updateProfilePhotoTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">Update Your Profile Photo</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            Please enter an image address:<br/>
                            <input type="text" className="updateIcon-input" value={newIcon} onChange={e => setNewIcon(e.target.value)}/>
                            <small>
                                <em><strong>Note: </strong> The image must be a square!</em>
                            </small> 
                        </div>
                        <div className="modal-footer">
                            <button type="button" className={buttonStyle} data-dismiss="modal" onClick={handleUpdate}>Update</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar