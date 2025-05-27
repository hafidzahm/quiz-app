export default function CardQuestion({ submitQuestion, quiz, loading, page }) {
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
