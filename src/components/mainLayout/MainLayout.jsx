import React from 'react';
import Footer from '../footer/Footer';
import UserNav from '../userNav/UserNav';

const MainLayout = ({ children }) => {
    return (
        <>
            <UserNav/>
            {children}
            <Footer/>
        </>
    )
}

export default MainLayout