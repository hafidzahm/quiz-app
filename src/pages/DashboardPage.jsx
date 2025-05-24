import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export default function DashboardPage() {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  useEffect(() => {
    fetchHistory();
  }, []);
  function navigateTriviaPages() {
    navigate("/trivia");
  }

  function fetchHistory() {
    // const GET_USER = localStorage.getItem
    const GET_SUMMARY = localStorage.getItem("summary:itsme");
    const response = JSON.parse(GET_SUMMARY);
    setHistory(response.summaries);
  }
  return (
    <div className="font-montserrat gap-2 flex flex-col bg-amber-200 min-h-screen w-full items-center p-5 justify-start">
      <Card navigateTriviaPages={navigateTriviaPages} />
      <AttemptHistoryCard />
    </div>
  );
}

function Card({ navigateTriviaPages }) {
  return (
    <div className="flex flex-col items-center justify-center max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <h5 className="mb-2 text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
        Welcome to Quizzz!
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque
        architecto provident fuga numquam necessitatibus ipsum, deleniti sequi
        placeat! At architecto similique ullam veritatis! Beatae, repudiandae
        quas hic harum corporis error?
      </p>

      <button
        type="button"
        onClick={navigateTriviaPages}
        className="text-white mt-5 w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        Let's start!
      </button>
    </div>
  );
}
function AttemptHistoryCard() {
  return (
    <div className="flex flex-col items-center justify-center max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <h5 className="mb-2 text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
        Attempt History
      </h5>
      <div>
        <HistoryCard />
      </div>
    </div>
  );
}
function HistoryCard() {
  return (
    <div className="flex flex-col items-center justify-center max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <h5 className="mb-2 text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
        Attempt History
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque
        architecto provident fuga numquam necessitatibus ipsum, deleniti sequi
        placeat! At architecto similique ullam veritatis! Beatae, repudiandae
        quas hic harum corporis error?
      </p>

      <button
        type="button"
        className="text-white mt-5 w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        Let's start!
      </button>
    </div>
  );
}
