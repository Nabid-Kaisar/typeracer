import React from "react";

interface AppContainerType {
    children: Array<JSX.Element> | JSX.Element;
}

const AppContainer: React.FC<AppContainerType> = ({children}) => {
    return (
        <div className='flex justify-center'>
            {Array.isArray(children) ? children.map(child => child) : children}
        </div>
    );
}

export default AppContainer;
