export default function BannerInfo({ quiz, totalQuiz, status }) {
  return (
    <div
      id="alert-additional-content-1"
      className={`p-4 w-full mb-4 ${
        status === "timeout"
          ? "text-red-800 border border-red-300 rounded-lg bg-red-50"
          : "text-blue-800 border border-blue-300 rounded-lg bg-blue-50"
      } `}
      role="alert"
    >
      <div className="flex items-center">
        <svg
          className="shrink-0 w-4 h-4 me-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
        </svg>
        <span className="sr-only">Info</span>
        <h3 className="text-lg font-medium">
          {status === "timeout" ? "Time runs out!" : "Quizzz completed!"}
        </h3>
      </div>
      <div className="mt-2 mb-4 text-sm flex flex-row gap-2 items-center">
        <h1 className="font-bold">
          Your score is{" "}
          {quiz.filter((el) => el.isQuestionAnsweredTrue === true).length} /{" "}
          {totalQuiz}{" "}
        </h1>
        <span
          className={`${
            quiz.filter((el) => el.isQuestionAnsweredTrue === true).length <= 5
              ? "bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm border border-red-400"
              : "bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm border border-green-400"
          }`}
        >
          {quiz.length > 0
            ? (
                (quiz.filter((el) => el.isQuestionAnsweredTrue === true)
                  .length /
                  totalQuiz) *
                100
              ).toFixed(2) // Format to 2 decimal places
            : "0"}
        </span>
      </div>
    </div>
  );
}
