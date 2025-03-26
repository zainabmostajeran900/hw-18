import React from "react";
import { Navbar } from "../components/navbar";
import { Outlet } from "react-router-dom";

export const MainLayout: React.FC = () => {
  return (
    <>
      <Navbar />
      <main className="container mx-auto mt-8">
        <Outlet />
      </main>
    </>
  );
};
