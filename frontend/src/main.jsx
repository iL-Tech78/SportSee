import { StrictMode } from "react"; // pour especter les bonnes pratiques.
import { createRoot } from "react-dom/client"; // méthode pour démarrer mon application React dans la div root définie dans le fichier index.html.
import { BrowserRouter } from "react-router-dom"; // pour naviguer entre les différentes pages sans rechargement.
import App from "./App.jsx"; // composant principal 
import "./styles/global.css"; // styles globa

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
