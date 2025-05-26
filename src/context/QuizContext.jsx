import { createContext, useEffect, useState } from "react";
import http from "../helpers/axios";

const QuizContext = createContext({
  quiz: [],
  isLoading: true,
});

export function QuizProvider({ children }) {
  const [quiz, setQuiz] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchQuiz();
  }, []);

  async function fetchQuiz() {
    try {
      setIsLoading(true);
      const response = await http.get("/questions");
      console.log(response.data.quizzes);
      setQuiz(response.data.quizzes);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  const value = {
    quiz,
    isLoading,
    setIsLoading,
  };

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
}

export { QuizContext };
