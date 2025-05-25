import { CircleCheckBig, CircleX } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";

export default function SummaryPage() {
  useEffect(() => {
    fetchSummary();
  }, []);
  const [answer, setAnswer] = useState([]);
  const { state } = useLocation();
  const navigate = useNavigate();

  function fetchSummary() {
    console.log(state);
    setAnswer(state);
  }

  function navigateDashboard() {
    navigate("/dashboard");
  }
  return (
    <div className=" min-h-screen flex flex-col items-center gap-2 w-full lg:max-w-5xl lg:m-auto p-5 md:p-10">
      <div className="flex flex-col md:justify-start w-full mb-5">
        <h1 className="text-6xl">Summary Section</h1>
      </div>
      <BannerInfo quiz={answer} />
      <div className="flex flex-col gap-2">
        {answer.map((el, index) => {
          return <CardSummary key={index} quiz={el} />;
        })}
      </div>
      <button
        type="button"
        onClick={navigateDashboard}
        className="focus:outline-none w-full text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
      >
        OK
      </button>
    </div>
  );
}

function CardSummary({ quiz }) {
  return (
    <a
      href="#"
      className="block  md:w-full p-6 bg-white border border-gray-500 rounded-lg shadow-sm hover:bg-gray-100 "
    >
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
        {quiz?.question}
      </h5>
      <div className="flex flex-row justify-start items-center">
        <h1 className="font-normal text-gray-700 ">
          Your answer:{" "}
          {quiz?.answer === true ? (
            <span
              className={`${
                quiz?.isQuestionAnsweredTrue
                  ? "bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm border border-green-400"
                  : "bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm border border-red-400"
              }`}
            >
              True
            </span>
          ) : (
            <span
              className={`${
                quiz?.isQuestionAnsweredTrue
                  ? "bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm border border-green-400"
                  : "bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm border border-red-400"
              }`}
            >
              False
            </span>
          )}
        </h1>
        {quiz?.isQuestionAnsweredTrue ? (
          <>
            {" "}
            <CircleCheckBig size={30} color="#00db1a" />
          </>
        ) : (
          <>
            <CircleX size={30} color="#db0000" />
          </>
        )}
      </div>
    </a>
  );
}

function BannerInfo({ quiz }) {
  return (
    <div
      id="alert-additional-content-1"
      className="p-4 w-full mb-4 text-blue-800 border border-blue-300 rounded-lg bg-blue-50"
      role="alert"
    >
      <div className="flex items-center">
        <svg
          className="shrink-0 w-4 h-4 me-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
        </svg>
        <span className="sr-only">Info</span>
        <h3 className="text-lg font-medium">Score info</h3>
      </div>
      <div className="mt-2 mb-4 text-sm flex flex-row gap-2 items-center">
        <h1 className="font-bold">
          Your score is{" "}
          {quiz.filter((el) => el.isQuestionAnsweredTrue === true).length} /{" "}
          {quiz.length}{" "}
        </h1>
        <span
          className={`${
            quiz.filter((el) => el.isQuestionAnsweredTrue === true).length <= 5
              ? "bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm border border-red-400"
              : "bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm border border-green-400"
          }`}
        >
          {quiz.length > 0
            ? (
                (quiz.filter((el) => el.isQuestionAnsweredTrue === true)
                  .length /
                  quiz.length) *
                100
              ).toFixed(2) // Format to 2 decimal places
            : "0"}
        </span>
      </div>
    </div>
  );
}
