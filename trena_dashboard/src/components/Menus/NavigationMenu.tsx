import React from "react";
import { NavLink } from "react-router-dom";
import { useStores } from "../../core/contexts/UseStores";
import { ReactComponent as Logo } from "../../images/logo.svg";

export const NavigationMenu: React.FC<any> = () => {
  const { userStore } = useStores();

  const logout = () => {
    userStore.logout();
  };

  return (
    <aside className="menu">
      <figure className="image">
        <Logo />
      </figure>
      <br />
      <ul className="menu-list is-active">
        <NavLink to="/">Home</NavLink>
      </ul>
      <p className="menu-label">Gerenciamento</p>
      <ul className="menu-list is-active">
        <NavLink to="/typeOfWork">Tipos de Obra</NavLink>
        <NavLink to="/typePhoto">Tipos de Fotos</NavLink>
        <NavLink to="/workStatus">Estados das Obras</NavLink>
      </ul>
      <p className="menu-label">Dados</p>
      <ul className="menu-list is-active">
        <NavLink to="/queue">Fila de Envios</NavLink>
        <NavLink to="/publicWork">Obras Públicas</NavLink>
        <NavLink to="/collect">Coletas</NavLink>
      </ul>
      <p className="menu-label title">Usuário</p>
      <ul className="menu-list is-active">
        <NavLink to="/users">Usuários</NavLink>
        <NavLink onClick={logout} to="/logout">
          Sair
        </NavLink>
      </ul>
    </aside>
  );
};
