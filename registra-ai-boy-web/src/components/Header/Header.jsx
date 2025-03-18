import React from "react";
import "./Header.css";
import logo from '../../assets/logo-02.png';
import userIcon from '../../assets/icon-user.png';

const Header = ({ headerTitle, userName }) => {
    return (
        <header className="header">
            <div className="header-left">
                <img src={logo} alt="Logo" className="logo" />
            </div>
            <div className="header-center">
                <h1 className="title">{headerTitle}</h1>
            </div>
            <div className="header-right">
                <div className="header-right-user">

                    <img src={userIcon} alt="Usuário" className="user-icon" />
                    <span className="user-name">{userName}</span>
                </div>
            </div>
        </header>
    );
};

export default Header;