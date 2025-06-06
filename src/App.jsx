import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import LoginPage from "./pages/LoginPage";
import AuthLayout from "./layouts/AuthLayout";
import DashboardPage from "./pages/DashboardPage";
import TriviaPage from "./pages/TriviaPage";
import SummaryPage from "./pages/SummaryPage";
import OnboardingPage from "./pages/OnboardingPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<OnboardingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route element={<AuthLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/trivia" element={<TriviaPage />} />
          <Route path="/summary" element={<SummaryPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
