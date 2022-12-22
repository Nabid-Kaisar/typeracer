import React from "react";

interface AppContainerType {
    children: JSX.Element;
}

const AppContainer: React.FC<AppContainerType> = ({children}) => {
    return (
        <div className='flex justify-center'>
            {children}
        </div>
    );
}

export default AppContainer;
