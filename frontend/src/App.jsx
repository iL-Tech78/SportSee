import { Link, Outlet } from 'react-router-dom';

function App() {
  return (
    <div>
      <header>
        <h1>SportSee</h1>
        <nav>
          <Link to="/">Accueil</Link> | <Link to="/profile">Profil</Link>
        </nav>
      </header>

      {/* Contenu de la page (Home ou Profile) */}
      <Outlet />
    </div>
  );
}

export default App;
