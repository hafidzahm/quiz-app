import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import Banner from "../components/Banner";

export default function DashboardPage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [history, setHistory] = useState([]);
  const [banner, setBanner] = useState("");
  const GET_USER = localStorage.getItem("LOGIN:USER");
  const totalQuiz = 10;

  useEffect(() => {
    fetchHistory();
  }, []);
  function navigateTriviaPages() {
    navigate("/trivia");
  }

  function navigateSummary(index) {
    const attemptData = history[index];

    navigate("/summary", { state: [{ attemptData, totalQuiz }] });
  }

  function fetchHistory() {
    const GET_SUMMARY = localStorage.getItem(`summary:${GET_USER}`);
    state && setBanner(state[0].message);

    let response = JSON.parse(GET_SUMMARY);
    if (!response || !response.summaries) {
      setHistory([]); // Ensure history is always an array
      return;
    }

    console.log(response);
    setHistory(response.summaries);
  }
  return (
    <div className="font-montserrat gap-2 flex flex-col min-h-screen w-full items-center p-5 justify-start">
      {banner && (
        <Banner
          color={
            "flex items-center p-4 mb-4 text-sm text-blue-800 border border-blue-300 rounded-lg bg-blue-50 w-full max-w-5xl"
          }
          bannerMessage={banner}
        />
      )}
      <Card navigateTriviaPages={navigateTriviaPages} username={GET_USER} />
      <AttemptHistoryCard
        history={history}
        navigateSummary={navigateSummary}
        totalQuiz={totalQuiz}
      />
    </div>
  );
}

function Card({ navigateTriviaPages, username }) {
  return (
    <div className="flex flex-col lg:max-w-5xl items-start justify-center p-5 md:p-10 bg-white border border-gray-500 rounded-lg shadow-sm hover:bg-gray-100 ">
      <h5 className="mb-2 text-5xl font-bold tracking-tight text-gray-900 ">
        Welcome to Quizzz, {username}!
      </h5>
      <p className="font-normal text-gray-700 ">
        the ultimate destination for fun, fast, and brain-boosting quizzes!
        Whether you're here to challenge yourself, learn something new, or
        simply have a good time, you've come to the right place. With a wide
        variety of topics — from general knowledge and pop culture to science
        and history — there's always something fresh and exciting to explore.
      </p>

      <button
        type="button"
        onClick={navigateTriviaPages}
        className="text-white cursor-pointer mt-5 w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none"
      >
        Let's start!
      </button>
    </div>
  );
}
function AttemptHistoryCard({ history, navigateSummary, totalQuiz }) {
  return (
    <div className="flex flex-col w-full lg:max-w-5xl items-start justify-center p-5 md:p-10 bg-white border border-gray-500 rounded-lg shadow-sm hover:bg-gray-100 ">
      <h5 className="mb-2 text-5xl font-bold tracking-tight text-gray-900 mb-5 ">
        Attempt History
      </h5>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 w-full">
        {history?.length > 0 ? (
          <>
            {history.map((el, index) => {
              return (
                <HistoryCard
                  key={index}
                  navigateSummary={navigateSummary}
                  history={history}
                  index={index}
                  totalQuiz={totalQuiz}
                />
              );
            })}
          </>
        ) : (
          <>
            <h1>History attempt is empty</h1>
          </>
        )}
      </div>
    </div>
  );
}
function HistoryCard({ history, index, navigateSummary, totalQuiz }) {
  return (
    <div className="flex w-full flex-col items-start justify-center max-w-sm p-6 bg-white border border-gray-500 rounded-lg shadow-sm hover:bg-gray-100 ">
      <h5 className="mb-2 text-5xl font-bold tracking-tight text-gray-900 ">
        {index + 1}
      </h5>
      <div className="mt-2 mb-4 text-sm flex flex-row gap-2 items-center">
        <h1>
          Your score is{" "}
          {
            history[index].filter((el) => el.isQuestionAnsweredTrue === true)
              .length
          }{" "}
          / {totalQuiz}{" "}
        </h1>
        <span
          className={`${
            history[index].filter((el) => el.isQuestionAnsweredTrue === true)
              .length <= 5
              ? "bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm border border-red-400"
              : "bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm border border-green-400"
          }`}
        >
          {history.length > 0
            ? (
                (history[index].filter(
                  (el) => el.isQuestionAnsweredTrue === true
                ).length /
                  totalQuiz) *
                100
              ).toFixed(2) // Format to 2 decimal places
            : "0"}
        </span>
      </div>

      <button
        type="button"
        onClick={() => {
          navigateSummary(index);
        }}
        className="text-white cursor-pointer mt-5 w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none"
      >
        Details
      </button>
    </div>
  );
}
