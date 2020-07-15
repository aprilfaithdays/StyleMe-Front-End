import React, {useContext} from 'react';
import AccessStyleMe from './AccessStyleMe';
import Auth from './Auth';
import { CurrentUserContext } from '../Context/CurrentUser';
import { LoadingContext } from '../Context/LoadingPage';
import LoadingSpinner from '../Components/LoadingSpinner';


const StyleMe = props => {
    const [currentUser] = useContext(CurrentUserContext);
    const [loading] = useContext(LoadingContext)

    const renderPage = () => currentUser.id ? <AccessStyleMe {...props} /> : <Auth />

    return loading ? <LoadingSpinner/> : renderPage()
}

export default StyleMe