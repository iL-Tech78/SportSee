import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import Header from "../components/Header.jsx";
import Sidebar from "../components/Sidebar.jsx";
import Home from "../pages/Home.jsx";
import Profile from "../pages/Profile.jsx";

function Layout() {
  return (
    <div className="layout">
      <Header />
      <Sidebar />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}

export default function AppRouter() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Navigate to="/profile/18" replace />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  );
}
