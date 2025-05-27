export default function CardTrivia({ navigateTriviaPages, totalQuiz }) {
  return (
    <div className="flex flex-col lg:max-w-5xl items-start justify-center p-5 md:p-10 bg-white border border-gray-500 rounded-lg shadow-sm hover:bg-gray-100 ">
      <h5 className="mb-2 text-5xl font-bold tracking-tight text-gray-900 ">
        Trivia Quiz #1
      </h5>
      <p className="font-normal text-gray-700 ">
        the ultimate destination for fun, fast, and brain-boosting quizzes!
        Whether you're here to challenge yourself, learn something new, or
        simply have a good time, you've come to the right place. With a wide
        variety of topics — from general knowledge and pop culture to science
        and history — there's always something fresh and exciting to explore.
      </p>
      <h1 className="font-bold">Total quiz: {totalQuiz} quizzes</h1>

      <button
        type="button"
        onClick={navigateTriviaPages}
        className="text-white cursor-pointer mt-5 w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none"
      >
        Let's start!
      </button>
    </div>
  );
}
