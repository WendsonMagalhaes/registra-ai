import React from "react";
import { Link, useLocation } from "react-router-dom";
import './Menu.css';

const Menu = () => {
    const location = useLocation(); // Obtém a rota atual

    return (
        <nav className="menu-container">
            <ul className="menu-list">
                <li>
                    <Link
                        to="/dashboard"
                        className={`menu-item ${location.pathname.startsWith("/dashboard") ? "active" : ""}`}
                    >
                        Home
                    </Link>
                </li>
                <li>
                    <Link
                        to="/registrar"
                        className={`menu-item ${location.pathname.startsWith("/registrar") ? "active" : ""}`}
                    >
                        Registrar
                    </Link>
                </li>
                <li>
                    <Link
                        to="/registrados"
                        className={`menu-item ${location.pathname.startsWith("/registrados") ? "active" : ""}`}
                    >
                        Registrados
                    </Link>
                </li>
                <li>
                    <Link
                        to="/painel"
                        className={`menu-item ${location.pathname.startsWith("/painel") ? "active" : ""}`}
                    >
                        Painel
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Menu;
