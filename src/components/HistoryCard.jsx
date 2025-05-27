export default function HistoryCard({
  history,
  index,
  navigateSummary,
  totalQuiz,
}) {
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
          / {totalQuiz}{" "}
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
                  totalQuiz) *
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
        className="text-white cursor-pointer mt-5 w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none"
      >
        Details
      </button>
    </div>
  );
}
