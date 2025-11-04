import { Routes, Route, Outlet } from "react-router-dom";

import Header from "@/components/Header.jsx";
import Sidebar from "@/components/Sidebar.jsx";

import Home from "@/pages/Home.jsx";
import Profile from "@/pages/Profile.jsx";

function Layout() {
  return (
    <div className="layout">
      <Header />
      <Sidebar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default function AppRouter() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  );
}
