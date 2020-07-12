import React from 'react';
import Navbar from '../Components/Navbar';
import { Route, Switch } from 'react-router-dom';
import HomePage from './HomePage';
import TopsContainer from './TopsContainer';
import TopContainer from './TopContainer';
import BottomsContainer from './BottomsContainer';
import BottomContainer from './BottomContainer';
import ShoesContainer from './ShoesContainer';
import ShoeContainer from './ShoeContainer';
import OutfitsContainer from './OutfitsContainer';
import OutfitPage from './OutfitPage';
import CreateOutfitContainer from './CreateOutfitContainer';
import Footer from '../Components/Footer';
import LikesPage from './LikesPage';


const AccessStyleMe = props => {
    return(
        <div>
            <div className="header">
                <Navbar {...props}/>
            </div>
            <div className="content style-me">
                <Switch>
                    <Route exact path='/' component={HomePage} />
                    <Route exact path='/tops' component={TopsContainer} />
                    <Route exact path='/bottoms' component={BottomsContainer} />
                    <Route exact path='/shoes' component={ShoesContainer} />
                    <Route exact path='/outfits' component={OutfitsContainer} />
                    <Route path='/tops/:id' component={TopContainer} />
                    <Route path='/bottoms/:id' component={BottomContainer} />
                    <Route path='/shoes/:id' component={ShoeContainer} />
                    <Route path='/outfits/new' component={CreateOutfitContainer} />
                    <Route path='/outfits/:id' component={OutfitPage} />
                    <Route path='/likes' component={LikesPage} />
                </Switch>
            </div>
            <div className="footer">
                <Footer />
            </div>
        </div>
    )
}

export default AccessStyleMe