import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import clsx from "clsx";

const AppLayout = () => {
  return (
    <>
      <header className="bg-violet-600 w-full h-[12rem] md:rounded-es-[7rem] flex items-center md:px-32 px-5">
        <Navbar />
      </header>
      <main className={clsx("mx-5 md:mx-32")}>
        <Outlet />
      </main>
    </>
  );
};

export default AppLayout;
