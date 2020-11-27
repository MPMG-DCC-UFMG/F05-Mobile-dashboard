import React from "react";
import {NavLink} from "react-router-dom";
import {ReactComponent as Logo} from "../../images/logo.svg";
import {useStores} from "../../core/contexts/UseStores";

export const NavigationMenu: React.FC<any> = () => {

    const {userStore} = useStores()

    const logout = () => {
        userStore.logout()
    }

    return (
        <aside className="menu">
            <figure className="image">
                <Logo/>
            </figure>
            <br/>
            <p className="menu-label">
                Geral
            </p>
            <ul className="menu-list is-active">
                <NavLink activeClassName="is-active" to="/" exact={true}>Home</NavLink>
                <NavLink activeClassName="is-active" to="/typeOfWork">Tipos de Obra</NavLink>
                <NavLink activeClassName="is-active" to="/typePhoto">Tipos de Fotos</NavLink>
                <NavLink activeClassName="is-active" to="/publicWork">Obras Públicas</NavLink>
                <NavLink activeClassName="is-active" to="/workStatus">Estados das Obras</NavLink>
            </ul>
            <p className="menu-label">
                Usuário
            </p>
            <ul className="menu-list is-active">
                <NavLink activeClassName="is-active" to="/users">Usuários</NavLink>
                <NavLink onClick={logout} to="/logout">Sair</NavLink>
            </ul>
        </aside>
    )
}