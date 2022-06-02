import { Link } from "react-router-dom";
import { useContext } from "react";
import * as S from "./styles";

import Logo from "../../assets/icons/logo.svg";

import { Context } from "../../context/UserContext";

function Navbar() {
  const { authenticated, logout } = useContext(Context);

  return (
    <S.Navbar>
      <S.LogoContainer>
        <S.LogoImg src={Logo} alt="Logo Alpha Pets" />
        <h2>Alpha Pets</h2>
      </S.LogoContainer>
      <S.Navigation>
        <li>
          <Link to="/">Adotar</Link>
        </li>
        {authenticated ? (
          <>
            <li>
              <Link to="/pets/mypets">Meus Pets</Link>
            </li>
            <li>
              <Link to="/pets/myadoptions">Minhas adoções</Link>
            </li>
            <li>
              <Link to="/user/profile">Perfil</Link>
            </li>
            <li className="logout" onClick={logout}>Sair</li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Cadastrar</Link>
            </li>
          </>
        )}
      </S.Navigation>
    </S.Navbar>
  );
}

export default Navbar;
