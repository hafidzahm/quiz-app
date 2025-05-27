import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import Banner from "../components/Banner";
import { QuizContext } from "../context/QuizContext";
import CardOnboarding from "../components/CardOnboarding";
import CardTrivia from "../components/CardTrivia";
import AttemptHistoryCard from "../components/AttemptHistoryCard";

export default function DashboardPage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [history, setHistory] = useState([]);
  const [banner, setBanner] = useState("");
  const GET_USER = localStorage.getItem("LOGIN:USER");
  const { quiz } = useContext(QuizContext);
  const totalQuiz = quiz?.length;

  useEffect(() => {
    fetchHistory();
    checkLogin();
  }, []);

  function checkLogin() {
    const GET_USER = localStorage.getItem("LOGIN:USER");
    if (!GET_USER) {
      navigate("/login", {
        state: [{ message: `Please login first.` }],
      });
    }
  }
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
      <CardOnboarding username={GET_USER} />
      <CardTrivia
        navigateTriviaPages={navigateTriviaPages}
        totalQuiz={totalQuiz}
      />
      <AttemptHistoryCard
        history={history}
        navigateSummary={navigateSummary}
        totalQuiz={totalQuiz}
      />
    </div>
  );
}
