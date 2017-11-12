import React from 'react';
import styles from './css/header.css';

const logo = require('../../../assets/images/Logo_Delaware_1C.png');

const Header = () => {
    return (
        <div className="header">
            <div className="logo">
                <img src={logo} />
            </div>
            <div className="title">
                <strong>Field</strong>Anywhere
            </div>
            <div className="logout">
                <strong>Username</strong>
            </div>
        </div>
    );
}

export default Header;
