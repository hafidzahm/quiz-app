export default function QuestionInfo({ page, totalQuiz, isLoading }) {
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
