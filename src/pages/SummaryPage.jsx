import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import CardSummary from "../components/CardSummary";
import BannerInfo from "../components/BannerInfo";

export default function SummaryPage() {
  const [answer, setAnswer] = useState([]);
  const [totalQuiz, setTotalQuiz] = useState(0);
  const [status, setStatus] = useState("");
  const { state } = useLocation();

  useEffect(() => {
    fetchSummary();
  }, []);

  const navigate = useNavigate();

  function fetchSummary() {
    if (!state) {
      navigateDashboard();
    } else {
      setAnswer(state[0].attemptData);
      setTotalQuiz(state[0].totalQuiz);
      setStatus(state[0].status);
    }
  }

  function navigateDashboard() {
    navigate("/dashboard");
  }
  return (
    <div className=" min-h-screen flex flex-col items-center gap-2 w-full lg:max-w-5xl lg:m-auto p-5 md:p-10">
      <div className="flex flex-col md:justify-start w-full mb-5">
        <h1 className="text-6xl">Summary Section</h1>
      </div>
      <BannerInfo quiz={answer} totalQuiz={totalQuiz} status={status} />
      <div className="flex flex-col gap-2 w-full min-h-[40vh]">
        {answer.map((el, index) => {
          return <CardSummary key={index} quiz={el} />;
        })}
      </div>
      <button
        type="button"
        onClick={navigateDashboard}
        className="focus:outline-none cursor-pointer w-full lg:max-w-2xl text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
      >
        OK
      </button>
    </div>
  );
}
