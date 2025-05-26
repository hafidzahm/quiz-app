import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate("/dashboard");
  useEffect(() => {
    checkLogin();
  }, []);

  function checkLogin() {
    const GET_USER = localStorage.getItem("LOGIN:USER");
    if (GET_USER) {
      navigate("/dashboard", {
        state: [{ message: `Welcome home, ${GET_USER}!` }],
      });
    }
  }
  function inputUsername(e) {
    setUsername(e.target.value);
    // console.log(e.target.value, "<---- username");
  }
  function inputPassword(e) {
    setPassword(e.target.value);
    // console.log(e.target.value, "<---- password");
  }

  function submitInput(e) {
    try {
      e.preventDefault();
      if (!username) {
        throw { message: "Username required" };
      }
      if (!password) {
        throw { message: "Password required" };
      }

      console.log({ username, password });
      localStorage.setItem("LOGIN:USER", username);
      navigate("/dashboard");
    } catch (error) {
      alert(error.message);
    }
  }
  return (
    <div className="font-montserrat min-h-screen flex flex-col justify-center p-5">
      <LoginDialog
        username={username}
        setUsername={inputUsername}
        password={password}
        setPassword={inputPassword}
        submitData={submitInput}
      />
    </div>
  );
}

function LoginDialog({
  username,
  setUsername,
  password,
  setPassword,
  submitData,
}) {
  return (
    <section className="border border-gray-500 bg-gray-300 rounded-2xl">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a className="flex items-center mb-6 text-2xl font-semibold text-gray-900 ">
          Quizzz!
        </a>
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
              Sign in to your account
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={submitData}
              action="#"
            >
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  value={username}
                  onChange={setUsername}
                  className="bg-gray-50 border border-gray-500 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="johndoe123"
                  required=""
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={setPassword}
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-500 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  required=""
                />
              </div>

              <button
                type="submit"
                onClick={submitData}
                className="text-white bg-blue-700 cursor-pointer w-full hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
