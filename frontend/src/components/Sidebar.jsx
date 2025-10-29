import "../styles/Sidebar.css";
import yogaIcon from "../assets/icon-yoga.png";
import swimIcon from "../assets/icon-swim.png";
import bikeIcon from "../assets/icon-bike.png";
import weightIcon from "../assets/icon-weight.png";

function Sidebar() {
  return (
    <aside className="sidebar">
      <nav className="sidebar__icons">
        <img src={yogaIcon} alt="Yoga" />
        <img src={swimIcon} alt="Natation" />
        <img src={bikeIcon} alt="Vélo" />
        <img src={weightIcon} alt="Musculation" />
      </nav>
      <p className="sidebar__copyright">Copiryght, SportSee 2020</p>
    </aside>
  );
}

export default Sidebar;
