import { CircleCheckBig, CircleX } from "lucide-react";

export default function CardSummary({ quiz }) {
  return (
    <a className="block md:w-full p-6 bg-white border border-gray-500 rounded-lg shadow-sm hover:bg-gray-100 ">
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
        {quiz?.question}
      </h5>
      <div className="flex flex-row justify-start items-center">
        <h1 className="font-normal text-gray-700 ">
          Your answer:{" "}
          {quiz?.answer === true ? (
            <span
              className={`${
                quiz?.isQuestionAnsweredTrue
                  ? "bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm border border-green-400"
                  : "bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm border border-red-400"
              }`}
            >
              True
            </span>
          ) : (
            <span
              className={`${
                quiz?.isQuestionAnsweredTrue
                  ? "bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm border border-green-400"
                  : "bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm border border-red-400"
              }`}
            >
              False
            </span>
          )}
        </h1>
        {quiz?.isQuestionAnsweredTrue ? (
          <>
            {" "}
            <CircleCheckBig size={30} color="#00db1a" />
          </>
        ) : (
          <>
            <CircleX size={30} color="#db0000" />
          </>
        )}
      </div>
    </a>
  );
}
