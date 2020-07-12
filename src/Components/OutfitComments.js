import React from 'react';
import Moment from 'react-moment';
import '../Styling/OutfitPage.css'
import { useContext } from 'react';
import { CurrentUserContext } from '../Context/CurrentUser';

const OutfitComments = props => {
    const abortController = new AbortController();

    const [currentUser] = useContext(CurrentUserContext);
    
    const renderComments = () => {
        const list = props.comments;
        list.sort((a,b) => b.id - a.id);
        return list.map(comment => renderComment(comment));
    }

    const cleanUp = () => abortController.abort();

    const deleteComment = id => {
        fetch(`https://boiling-reaches-37131.herokuapp.com/comments/${id}`, {
            method: 'DELETE'
        })
        props.removeComment(id);
        return cleanUp();
    }

    const renderComment = comment =>{
        return (
            <div key={comment.id} className="cmt-section">
                <div className="cmt-img">
                    <img className="comment-img" src={comment.user.img_url} alt={comment.user.name}/>
                </div>
                <div className="cmt-info">
                    <div>
                        <b>
                            {comment.user.name}
                        </b>
                        <em className="cmt-created">
                            <Moment fromNow>{comment.created_at}</Moment>
                        </em>
                        {comment.user_id === currentUser.id && <span 
                            className="del-btn"
                            onClick={() => deleteComment(comment.id)}
                        ><em>-delete-</em></span>}
                    </div>
                    <div>
                        {comment.text}
                    </div>
                </div>

            </div>
        )
    }

    const firstComment = () => (
        <div>
            <em>
               <small>(Be the first to comment!)</small>
            </em> 
        </div>
    )

    return(
        <div>
            <b>Comments</b>
            {props.comments.length > 0 ? renderComments() : firstComment()}
        </div>
    )
}

export default OutfitComments