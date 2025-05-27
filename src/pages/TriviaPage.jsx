import { useContext, useEffect, useState } from "react";
import http from "../helpers/axios";
import { useNavigate } from "react-router";
import { QuizContext } from "../context/QuizContext";
import QuestionInfo from "../components/QuestionInfo";
import CardQuestion from "../components/CardQuestion";
import Timer from "../components/Timer";

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
