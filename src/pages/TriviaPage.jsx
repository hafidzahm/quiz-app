import { useEffect, useState } from "react";
import http from "../helpers/axios";
import { useNavigate } from "react-router";

export default function TriviaPage() {
  const [quiz, setQuiz] = useState({});
  const [answeredQuestion, setAnsweredQuestion] = useState([]);
  const [page, setPage] = useState(1);
  const [totalQuiz, setTotalQuiz] = useState(0);
  const navigate = useNavigate();
  const GET_USER = localStorage.getItem("LOGIN:USER");
  useEffect(() => {
    fetchQuestion();
  }, [page]);

  useEffect(() => {
    countTotalQuiz();
  }, []);

  async function countTotalQuiz() {
    try {
      const response = await http.get("/questions");
      console.log(response);
      console.log(response.data.quizzes.length);
      setTotalQuiz(response.data.quizzes.length);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchQuestion() {
    try {
      const response = await http.get(`/questions/${page}`);
      console.log(response);
      console.log(response.data.quiz);
      setQuiz(response?.data?.quiz);
    } catch (error) {
      console.log(error);
    }
  }
  async function submitQuestion(boolean) {
    try {
      const booleanAnswer = quiz?.correct_answer === boolean;
      console.log(boolean);
      setAnsweredQuestion((prev) => [
        ...prev,
        {
          question: quiz.question,
          isQuestionAnsweredTrue: booleanAnswer,
          answer: boolean,
          dateAttempt: new Intl.DateTimeFormat("en-US", {
            month: "2-digit",
            day: "2-digit",
            year: "numeric",
          }).format(new Date()),
        },
      ]);
      addPage();
      saveToLocalStorage();
    } catch (error) {
      console.log(error);
    }
  }

  function addPage() {
    if (page < totalQuiz) {
      setPage(page + 1);
    }
    console.log(answeredQuestion);
  }

  function saveToLocalStorage() {
    if (answeredQuestion.length === totalQuiz) {
      console.log(page, totalQuiz);
      console.log(answeredQuestion, "<-------- 10 === 10");
      const name = GET_USER;
      let STORAGE = {
        username: name,
        summaries: [answeredQuestion],
      };

      const GET_SUMMARY = localStorage.getItem(`summary:${name}`);
      if (GET_SUMMARY) {
        STORAGE.summaries = [
          ...JSON.parse(GET_SUMMARY).summaries,
          answeredQuestion,
        ];
      } else {
        STORAGE.summaries = [answeredQuestion];
      }
      console.log(STORAGE, "<-----localStorage");
      localStorage.setItem(`summary:${name}`, JSON.stringify(STORAGE));
      navigate("/summary", { state: answeredQuestion });
    }
  }

  return (
    <div className="w-full p-5 flex flex-col justify-start items-center">
      <CardQuestion submitQuestion={submitQuestion} quiz={quiz} />
    </div>
  );
}

function CardQuestion({ submitQuestion, quiz }) {
  return (
    <div className="block max-w-sm md:max-w-xl min-w-sm md:min-w-xl p-6 bg-white border border-gray-500 rounded-lg shadow-sm hover:bg-gray-100">
      <div className={`min-h-[60vh]`}>
        {" "}
        {quiz ? (
          <>
            <h5 className="mb-2 text-4xl font-bold tracking-tight text-gray-900">
              {quiz?.question}
            </h5>
          </>
        ) : (
          <h5 className="text-center mb-2 text-8xl font-bold tracking-tight text-gray-900">
            ...
          </h5>
        )}
      </div>
      <div className="flex flex-col">
        <>
          {" "}
          <button
            onClick={() => {
              submitQuestion(true);
            }}
            type="button"
            className="text-white font-bold bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 rounded-full text-base px-12 py-6 text-center me-2 mb-2 "
          >
            True
          </button>
          <button
            type="button"
            onClick={() => {
              submitQuestion(false);
            }}
            className="text-white font-bold bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 rounded-full text-base px-12 py-6 text-center me-2 mb-2 "
          >
            False
          </button>
        </>
      </div>
    </div>
  );
}
