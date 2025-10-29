import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <div className="layout">
      <Header />
      <Sidebar />
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
