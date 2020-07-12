import React from 'react';
import '../Styling/NewHomePage.css';
import { Link } from 'react-router-dom';

const NewHomePage = () => {
    const banner = require("../Visuals/welcome-banner.png");

    return(
        <div>
            <img className="banner" src={banner} alt="welcome"/>
            <div className="welcome">
                It looks like you don't have any outfits yet! <br/>
                Feel free to <b><Link to='/outfits/new'>create</Link></b> some or <b><Link to='/outfits'>browse</Link></b> around!
            </div>
        </div>
    )
}

export default NewHomePage