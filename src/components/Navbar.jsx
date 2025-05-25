import { useNavigate } from "react-router";

export default function Navbar() {
  const navigate = useNavigate();

  function navigateLogout() {
    localStorage.removeItem("LOGIN:USER");
    navigate("/login");
  }
  return (
    <nav className="border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Quizzz!
          </span>
        </a>

        <a
          onClick={navigateLogout}
          className="block py-2 px-3 text-white bg-blue-700 rounded-sm dark:bg-blue-600"
          aria-current="page"
        >
          Logout
        </a>
      </div>
    </nav>
  );
}
