import { useEffect, useState } from "react";
import http from "../helpers/axios";
import { useParams } from "react-router";

export default function TriviaPage() {
  const [quiz, setQuiz] = useState({});
  useEffect(() => {
    fetchQuestion();
  }, []);

  const { triviaId } = useParams();

  async function fetchQuestion() {
    try {
      const response = await http.get(`/questions/${triviaId}`);
      console.log(response);
      console.log(response.data.quiz);
      setQuiz(response.data.quiz);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="w-full min-h-screen bg-amber-200 p-5 flex flex-col justify-center items-center">
      <CardQuestion question={quiz?.question} />
    </div>
  );
}

function CardQuestion({ question }) {
  return (
    <div className="block max-w-sm min-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <div className={`min-h-[200px]`}>
        {" "}
        {question ? (
          <>
            <h5 className="mb-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              {question}
            </h5>
          </>
        ) : (
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            loading...
          </h5>
        )}
      </div>

      <button
        type="button"
        className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-base px-10 py-5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
      >
        True
      </button>
      <button
        type="button"
        className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-base px-10 py-5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
      >
        False
      </button>
    </div>
  );
}
