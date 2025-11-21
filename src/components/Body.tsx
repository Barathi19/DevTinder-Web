import { Outlet } from "react-router-dom";
import { Footer } from "./Footer";
import { NavBar } from "./NavBar";

export const Body = () => {
  return (
    <div className="min-h-screen w-full">
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};
