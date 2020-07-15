import React from 'react';
import '../Styling/OutfitPage.css'
import { useContext, useEffect } from 'react';
import { CurrentUserContext } from '../Context/CurrentUser';
import { useState } from 'react';
import { LikedContext } from '../Context/Liked';

const CommentForm = props => {
    const abortController = new AbortController();

    const outfit_id = props.id;
    const [currentUser] = useContext(CurrentUserContext);
    const [liked, setLiked] = useContext(LikedContext);

    const [text, setText] = useState('');
    const [addCmt, setAddCmt] = useState(false);
    const [thisLike, setThisLike] = useState('');
    const [num, setNum] = useState('');
    
    const buttonStyle = "btn btn-outline-secondary btn-sm";
    const likeUrl = 'https://boiling-reaches-37131.herokuapp.com/likes';
    const emptyHeart = require("../Visuals/empty-heart.png");
    const likedHeart = require("../Visuals/liked.png");
    const exit = require("../Visuals/x.png");

    const cleanUp = () => abortController.abort();

    useEffect(() => {
        findLikes();
        // eslint-disable-next-line 
    }, [liked]);

    useEffect(()=> {
        return cleanUp();
        // eslint-disable-next-line
    },[])
    
    const filterLikes = list => list.filter(liked => liked.outfit_id === outfit_id);

    const filterLike = list => list.filter(liked => liked.user_id === currentUser.id);

    const findLikes = () => {
        const list = [...liked];
        const outfitLikes = filterLikes(list);
        setNum(outfitLikes.length);
        const userLikes = filterLike(outfitLikes);
        setThisLike(userLikes[0]);
    }

    const addComment = e => {
        e.preventDefault();
        const user_id = parseInt(currentUser.id, 0);
        fetch('https://boiling-reaches-37131.herokuapp.com/comments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ outfit_id, user_id, text })
        })
        .then(res => res.json())
        .then(res => {
            props.postComment(res);
            setText('');
            setAddCmt(false)
        });
        return cleanUp();
    }

    const removeLike = () => {
        fetch(`${likeUrl}/${thisLike.id}`, {
            method: 'DELETE'
        })
        .then(deleteLike(thisLike.id));
    }

    const deleteLike = id => {
        const list = [...liked];
        const updated = list.filter(like => like.id !== id);
        setLiked(updated);
    }

    const addLike = () => {
        fetch(likeUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ 
                user_id: currentUser.id,
                outfit_id
            })
        })
        .then(res => res.json())
        .then(res => setLiked([...liked, res]));
    }

    const likeButton = () => thisLike ? removeLike() : addLike()
    
    const renderLikes = () => {
        return (
            <div className="likes">
                <img className="heart" src={thisLike ? likedHeart : emptyHeart} alt="heart" onClick={likeButton}/>
                {num} {num === 1 ? "like" : "likes"}
            </div>
        )
    }

    const comment = () => (
        <div>
            <img className="exit" src={exit} alt="x" onClick={() => setAddCmt(false)}/>
            <form onSubmit={e => addComment(e)}>
                <textarea className="cmt-input" type="text" value={text} onChange={e => setText(e.target.value)}/>
                <div className="post-btn">
                    <button className={buttonStyle} type="submit">Post</button>
                </div>
            </form>
        </div>
    )

    const cmtBtn = () => (
        <div className="add-comment">
            {renderLikes()}
            <button className={buttonStyle} onClick={() => setAddCmt(true)}>Add Comment</button>
        </div>
    )

    return addCmt ? comment() : cmtBtn()
}

export default CommentForm
