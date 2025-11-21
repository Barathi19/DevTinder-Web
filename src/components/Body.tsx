import { Outlet } from "react-router-dom";
import { Footer } from "./Footer";
import { NavBar } from "./NavBar";

export const Body = () => {
  return (
    <div className="min-h-screen w-full flex flex-col">
      <NavBar />
      <div className="flex flex-1 w-full">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};
