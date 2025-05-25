import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export default function DashboardPage() {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const GET_USER = localStorage.getItem("LOGIN:USER");

  useEffect(() => {
    fetchHistory();
  }, []);
  function navigateTriviaPages() {
    navigate("/trivia");
  }

  function navigateSummary(index) {
    navigate("/summary", { state: history[index] });
  }

  function fetchHistory() {
    const GET_SUMMARY = localStorage.getItem(`summary:${GET_USER}`);
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
      <Card navigateTriviaPages={navigateTriviaPages} username={GET_USER} />
      <AttemptHistoryCard history={history} navigateSummary={navigateSummary} />
    </div>
  );
}

function Card({ navigateTriviaPages, username }) {
  return (
    <div className="flex flex-col items-center justify-center max-w-sm p-6 bg-white border border-gray-500 rounded-lg shadow-sm hover:bg-gray-100 ">
      <h5 className="mb-2 text-5xl font-bold tracking-tight text-gray-900 ">
        Welcome to Quizzz, {username}!
      </h5>
      <p className="font-normal text-gray-700 ">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque
        architecto provident fuga numquam necessitatibus ipsum, deleniti sequi
        placeat! At architecto similique ullam veritatis! Beatae, repudiandae
        quas hic harum corporis error?
      </p>

      <button
        type="button"
        onClick={navigateTriviaPages}
        className="text-white mt-5 w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none"
      >
        Let's start!
      </button>
    </div>
  );
}
function AttemptHistoryCard({ history, navigateSummary }) {
  return (
    <div className="flex flex-col items-center justify-center max-w-sm p-6 bg-white border border-gray-500 rounded-lg shadow-sm hover:bg-gray-100 ">
      <h5 className="mb-2 text-5xl font-bold tracking-tight text-gray-900 ">
        Attempt History
      </h5>
      <div className="flex flex-col gap-2 w-full">
        {history?.length > 0 ? (
          <>
            {history.map((el, index) => {
              return (
                <HistoryCard
                  key={index}
                  navigateSummary={navigateSummary}
                  history={history}
                  index={index}
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
function HistoryCard({ history, index, navigateSummary }) {
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
          / {history[index].length}{" "}
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
                  history[index].length) *
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
        className="text-white mt-5 w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none"
      >
        Details
      </button>
    </div>
  );
}
