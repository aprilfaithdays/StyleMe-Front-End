import React, {useContext} from 'react';
import AccessStyleMe from './AccessStyleMe';
import Auth from './Auth';
import { CurrentUserContext } from '../Context/CurrentUser';


const StyleMe = props => {
    const [currentUser] = useContext(CurrentUserContext);

    return(
        <div>
            {currentUser.id ? <AccessStyleMe {...props} /> : <Auth />}
        </div>
    )
}

export default StyleMe