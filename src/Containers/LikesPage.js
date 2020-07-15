
import React, { useContext } from 'react';
import { OutfitsContext } from '../Context/Outfits';
import OutfitCard from '../Components/OutfitCard';
import { Link } from 'react-router-dom';
import { CurrentUserContext } from '../Context/CurrentUser';
import { LikedContext } from '../Context/Liked';


const LikesPage = () => {
    const [currentUser] = useContext(CurrentUserContext);
    const [outfits] = useContext(OutfitsContext);
    const [liked] = useContext(LikedContext)
    const likeBanner = require("../Visuals/likeBanner.png");
    const likeGif = require("../Visuals/likeOutfit.gif");

    const likesList = () => {
        const list = [...liked];
        const likedList = list.filter(like => like.user_id === currentUser.id);
        let likedId = [];
        for(let i = 0; i < likedList.length; i++){
            likedId.push(likedList[i].outfit_id);
        }
        return likedId;
    }

    const filterMyOutfits = () => {
        const list = [...outfits];
        const myLikes = likesList();
        const myList = list.filter(outfit => myLikes.includes(outfit.id));
        return myList.sort((a, b) => b.id - a.id);
    }

    const renderOutfits = () => {
        const myOutfits = filterMyOutfits();
        return myOutfits.map(outfit => <OutfitCard key={outfit.id} outfit={outfit}/>);
    }

    const renderMyOutfits = () => (
        <div>
            <h3>Liked Outfits</h3>
            <div className="outfit-list">
                {renderOutfits()}
            </div>
        </div>
    )

    const renderEmptyLikes = () => (
        <div className="emptyLiked">
            <img className="banner" src={likeBanner} alt="empty"/>
            Why don't you <b><Link to='/outfits'>browse</Link></b> around and see if you like anything? <br/>
            <img className="likedGif" src={likeGif} alt="go like some outfits"/>
        </div>
    )

    return(
        <div>
            {filterMyOutfits().length > 0 ? renderMyOutfits() : renderEmptyLikes()}
            
        </div>
    )
}

export default LikesPage

// const [outfits] = useContext(OutfitsContext);
// const [myLikes] = useContext(MyLikesContext);
// const likeBanner = require("../Visuals/likeBanner.png");
// const likeGif = require("../Visuals/likeOutfit.gif");


// const likesList = () => {
//     const likedList = [...myLikes];
//     let likedId = [];
//     for(let i = 0; i < likedList.length; i++){
//         likedId.push(likedList[i].outfit_id);
//     }
//     return likedId;
// }

// const filterMyOutfits = () => {
//     const list = [...outfits];
//     const myLikes = likesList();
//     const myList = list.filter(outfit => myLikes.includes(outfit.id));
//     return myList.sort((a, b) => b.id - a.id);
// }

// const renderOutfits = () => {
//     const myOutfits = filterMyOutfits();
//     return myOutfits.map(outfit => <OutfitCard key={outfit.id} outfit={outfit}/>);
// }

// const renderMyOutfits = () => (
//     <div>
//         <h3>Liked Outfits</h3>
//         <div className="outfit-list">
//             {renderOutfits()}
//         </div>
//     </div>
// )

// const renderEmptyLikes = () => (
//     <div className="emptyLiked">
//         <img className="banner" src={likeBanner} alt="empty"/>
//         Why don't you <b><Link to='/outfits'>browse</Link></b> around and see if you like anything? <br/>
//         <img className="likedGif" src={likeGif} alt="go like some outfits"/>
//     </div>
// )

// return(
//     <div>
//         {filterMyOutfits().length > 0 ? renderMyOutfits() : renderEmptyLikes()} 
//     </div>
// )