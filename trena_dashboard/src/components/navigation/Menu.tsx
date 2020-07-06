import React from "react";
import {NavLink} from "react-router-dom";

export const Menu: React.FC<any> = () => {
    return (
        <aside className="menu">
            <p className="menu-label">
                Geral
            </p>
            <ul className="menu-list is-active">
                <NavLink activeClassName="is-active" to="/" exact={true}>Home</NavLink>
                <NavLink activeClassName="is-active" to="/typeOfWork">Tipos de Obra</NavLink>
                <NavLink activeClassName="is-active" to="/publicWork">Obras Públicas</NavLink>
            </ul>
        </aside>
    )
}