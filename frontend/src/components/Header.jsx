import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import "../styles/Header.css";

function Header() {
  return (
    <header className="header">
      <div className="header__logo">
        <img src={logo} alt="SportSee Logo" />
      </div>
      <nav className="header__nav">
        <Link to="/">Accueil</Link>
        <Link to="/profile">Profil</Link>
        <Link to="#">Réglage</Link>
        <Link to="#">Communauté</Link>
      </nav>
    </header>
  );
}

export default Header;
