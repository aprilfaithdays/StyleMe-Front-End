import React, { useState } from 'react';

export const LoadingContext = React.createContext([]);

const LoadingPage = ({children}) => {
    const [loading, setLoading] = useState(true);

    return (
        <div>
            <LoadingContext.Provider value={[loading, setLoading]}>
                {children}
            </LoadingContext.Provider>
        </div>
    )
}

export default LoadingPage