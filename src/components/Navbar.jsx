import { useNavigate } from "react-router";

export default function Navbar() {
  const navigate = useNavigate();

  function navigateLogout() {
    localStorage.removeItem("LOGIN:USER");
    navigate("/login");
  }
  return (
    <nav className="border-gray-200 bg-gray-50 ">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center text-2xl font-semibold whitespace-nowrap">
            Quizzz!
          </span>
        </a>

        <a
          onClick={navigateLogout}
          className="block py-2 cursor-pointer px-3 text-white bg-blue-700 rounded-sm "
          aria-current="page"
        >
          Logout
        </a>
      </div>
    </nav>
  );
}
