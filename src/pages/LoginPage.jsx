import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import Banner from "../components/Banner";
import LoginDialog from "../components/LoginDialog";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [banner, setBanner] = useState("");
  const { state } = useLocation();
  const navigate = useNavigate("/dashboard");
  useEffect(() => {
    checkLogin();
    messageBanner();
  }, []);

  function messageBanner() {
    state && setBanner(state[0].message);
  }
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
        banner={banner}
      />
    </div>
  );
}
