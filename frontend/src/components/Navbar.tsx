import { CiLight } from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";
import { useTheme } from "../context/ThemContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { isDark, setIsDark } = useTheme();

  const toogleThemChange = () => {
    setIsDark((prev) => !prev);
  };

  return (
    <nav className="flex items-center justify-between w-full">
      <Link to="/" className="text-2xl md:text-3xl font-bold text-white">
        Devjobs
      </Link>

      <div className="flex items-center gap-2">
        <button onClick={() => setIsDark(false)}>
          <CiLight className="text-white font-bold w-7 h-7" />
        </button>

        <div
          onClick={toogleThemChange}
          className="bg-white rounded-full w-[40px] h-5  flex items-center px-1"
        >
          {!isDark ? (
            <div className="bg-violet-500 w-4 h-4 rounded-full animate-slideInRightAnimation" />
          ) : (
            <div className="bg-violet-500 w-4 h-4 rounded-full animate-slideInLeftAnimation ml-4" />
          )}
        </div>
        <button onClick={() => setIsDark(true)}>
          <MdDarkMode className="fill-white w-5 h-5" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
