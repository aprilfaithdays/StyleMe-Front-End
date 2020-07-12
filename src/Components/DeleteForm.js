import React from 'react';
import '../Styling/OutfitPage.css'

const DeleteForm = props => {
    const buttonStyle = "btn btn-outline-secondary btn-sm"
    const buttonWarning = "btn btn-outline-danger btn-sm "

    return(
        <div>
            <button type="button" className={buttonWarning} data-toggle="modal" data-target="#deleteWarning">
                Delete Outfit
            </button>
            <div className="modal fade" id="deleteWarning" tabIndex="-1" role="dialog" aria-labelledby="deleteWarningTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">Are you sure?</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            You can't undo this
                        </div>
                        <div className="modal-footer">
                            <button type="button" className={buttonStyle} data-dismiss="modal">Nevermind</button>
                            <button type="button" className={buttonWarning} data-dismiss="modal" onClick={props.handleDelete}>Yes, delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeleteForm