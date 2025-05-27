import HistoryCard from "./HistoryCard";

export default function AttemptHistoryCard({
  history,
  navigateSummary,
  totalQuiz,
}) {
  return (
    <div className="flex flex-col w-full lg:max-w-5xl items-start justify-center p-5 md:p-10 bg-white border border-gray-500 rounded-lg shadow-sm hover:bg-gray-100 ">
      <h5 className=" text-5xl font-bold tracking-tight text-gray-900 mb-5 ">
        Attempt History
      </h5>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 w-full">
        {history?.length > 0 ? (
          <>
            {history.map((el, index) => {
              return (
                <HistoryCard
                  key={index}
                  navigateSummary={navigateSummary}
                  history={history}
                  index={index}
                  totalQuiz={totalQuiz}
                />
              );
            })}
          </>
        ) : (
          <>
            <h1>History attempt is empty</h1>
          </>
        )}
      </div>
    </div>
  );
}
