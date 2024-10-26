import React from 'react';
import Footer from '../footer/Footer';
import UserNav from '../userNav/UserNav';
import './mainLayout.css';
const MainLayout = ({ children }) => {
    return (
        <div className='main-layout'>
            <UserNav />
            <div className="main-content">
            {children}
            </div>
            <Footer />
        </div>

    )
}


export default MainLayout