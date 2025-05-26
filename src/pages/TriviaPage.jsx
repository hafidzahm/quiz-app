import { useContext, useEffect, useState } from "react";
import http from "../helpers/axios";
import { useNavigate } from "react-router";
import { QuizContext } from "../context/QuizContext";

export default function TriviaPage() {
  const [quiz, setQuiz] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [answeredQuestion, setAnsweredQuestion] = useState([]);
  const [page, setPage] = useState(1);
  const [timeOut, setTimeOut] = useState(false);
  const [timer, setTimer] = useState(15);
  const navigate = useNavigate();
  const quizContext = useContext(QuizContext);

  useEffect(() => {
    fetchQuestion();
  }, [page]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimer((prevTimer) => {
        // setter timer
        if (prevTimer <= 0) {
          //kalo <= 0 setTimeout true dan hapus interval
          clearInterval(intervalId);
          setTimeOut(true);

          return 0;
        }
        // kalo bukan kurangi 1
        return prevTimer - 1;
      });
    }, 1000);
    // unmount component
    return () => clearInterval(intervalId);
  }, []);
  useEffect(() => {
    if (timeOut === true) {
      console.log(answeredQuestion, "<-------- Timeout triggered");
      saveToLocalStorage(answeredQuestion); // Save the current answers
      navigate("/summary", {
        state: [
          { attemptData: answeredQuestion, totalQuiz, status: "timeout" },
        ],
      });
    }
  }, [timeOut]); //useEffect based timeOut

  const totalQuiz = quizContext?.quiz?.length;
  const GET_USER = localStorage.getItem("LOGIN:USER");

  function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? "0" + minutes : minutes}:${
      seconds < 10 ? "0" + seconds : seconds
    }`;
  }

  async function fetchQuestion() {
    try {
      console.log(quizContext, "from context");
      setIsLoading(true);
      const response = await http.get(`/questions/${page}`);
      console.log(response);
      console.log(response.data.quiz);
      setQuiz(response?.data?.quiz);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }
  async function submitQuestion(boolean) {
    try {
      const booleanAnswer = quiz?.correct_answer === boolean;
      console.log(boolean);
      setAnsweredQuestion((prev) => {
        const newAnswer = {
          question: quiz.question,
          isQuestionAnsweredTrue: booleanAnswer,
          answer: boolean,
          status: timeOut ? "timeout" : "completed",
          dateAttempt: new Intl.DateTimeFormat("en-US", {
            month: "2-digit",
            day: "2-digit",
            year: "numeric",
          }).format(new Date()),
        };
        const updatedAnswers = [...prev, newAnswer];
        console.log(updatedAnswers, "<--- setter");

        // Check if all questions are answered
        if (updatedAnswers.length === totalQuiz) {
          console.log(updatedAnswers, totalQuiz, "<-------ctotalllll");
          saveToLocalStorage(updatedAnswers); // Pass the updated answers
          console.log(updatedAnswers, "<-------- jeroan setter");
          navigate("/summary", {
            state: [{ attemptData: updatedAnswers, totalQuiz }],
          });
        }
        console.log(updatedAnswers, "<----return");

        return updatedAnswers; // Update the state
      });
      console.log(page, totalQuiz);
      if (page < totalQuiz) {
        setPage(page + 1); // Move to the next question
      }
    } catch (error) {
      console.log(error);
    }
  }

  function saveToLocalStorage(answeredQuestion) {
    console.log(page, totalQuiz);
    console.log(answeredQuestion.length, totalQuiz, "<----- answered/total");

    console.log(page, totalQuiz);
    console.log(answeredQuestion, "<-------- 10 === 10");

    const name = GET_USER;
    let STORAGE = {
      username: name,
      summaries: [answeredQuestion],
      totalQuiz: totalQuiz,
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

    console.log("saved", totalQuiz);
    localStorage.setItem(`summary:${name}`, JSON.stringify(STORAGE));
  }

  return (
    <div className="w-full lg:max-w-5xl p-5 md:p-10 flex flex-col lg:m-auto justify-start items-end">
      <div className="flex  w-full justify-between items-center">
        <QuestionInfo page={page} totalQuiz={totalQuiz} isLoading={isLoading} />
        <Timer time={formatTime(timer)} timeout={timeOut} page={page} />
      </div>

      <CardQuestion
        submitQuestion={submitQuestion}
        quiz={quiz}
        loading={isLoading}
        page={page}
      />
    </div>
  );
}

function QuestionInfo({ page, totalQuiz, isLoading }) {
  return (
    <div className="mb-5 flex flex-row justify-center items-center bg-blue-100 text-blue-800 text-xs font-medium me-2 min-w-[90px] min-h-[45px] px-2.5 rounded-sm ">
      {isLoading ? (
        <h1>loading...</h1>
      ) : (
        <h1>{`${page} of ${totalQuiz} quizzes.`}</h1>
      )}
    </div>
  );
}

function CardQuestion({ submitQuestion, quiz, loading, page }) {
  return (
    <div className="block p-6 bg-white min-w-full max-w-full border border-gray-500 rounded-lg shadow-sm hover:bg-gray-100">
      <div className={`min-h-[50vh]`}>
        {" "}
        <>
          <h5 className="mb-2 text-4xl font-bold tracking-tight text-gray-900">
            {loading === true ? "loading..." : `${page}. ${quiz?.question}`}
          </h5>
        </>
      </div>
      <div className="flex flex-col lg:flex-row">
        <>
          {" "}
          <button
            onClick={() => {
              submitQuestion(true);
            }}
            type="button"
            disabled={loading && true}
            className={`text-white  lg:w-full font-bold ${
              loading === true ? "bg-green-500" : "bg-green-700 cursor-pointer"
            } ${
              loading === true ? "hover:bg-green-600" : "hover:bg-green-800 "
            }  focus:outline-none focus:ring-4 focus:ring-red-300 rounded-full text-base px-12 py-6 text-center me-2 mb-2 `}
          >
            {!loading ? "True" : "..."}
          </button>
          <button
            type="button"
            onClick={() => {
              submitQuestion(false);
            }}
            disabled={loading && true}
            className={`text-white lg:w-full font-bold ${
              loading === true ? "bg-red-500" : "bg-red-700 cursor-pointer"
            } ${
              loading === true ? "hover:bg-red-600" : "hover:bg-red-800"
            }  focus:outline-none focus:ring-4 focus:ring-red-300 rounded-full text-base px-12 py-6 text-center me-2 mb-2 `}
          >
            {!loading ? "False" : "..."}
          </button>
        </>
      </div>
    </div>
  );
}

export function Timer({ time, timeout }) {
  return (
    <div className="mb-5">
      {!timeout ? (
        <div class="flex flex-row justify-center items-center bg-red-100 text-red-800 text-xs font-medium me-2 min-w-[90px] min-h-[45px] px-2.5 rounded-sm ">
          <h1>{time}</h1>
        </div>
      ) : (
        <div class="flex flex-row justify-center items-center bg-red-100 text-red-800 text-xs font-medium me-2 min-w-[90px] min-h-[45px] p-5 rounded-sm dark:bg-red-900 dark:text-red-300">
          <h1> TIME RUNS OUT</h1>
        </div>
      )}
    </div>
  );
}
