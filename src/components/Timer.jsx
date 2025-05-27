export default function Timer({ time, timeout }) {
  return (
    <div className="mb-5">
      {!timeout ? (
        <div className="flex flex-row justify-center items-center bg-red-100 text-red-800 text-xs font-medium me-2 min-w-[90px] min-h-[45px] px-2.5 rounded-sm ">
          <h1>{time}</h1>
        </div>
      ) : (
        <div className="flex flex-row justify-center items-center bg-red-100 text-red-800 text-xs font-medium me-2 min-w-[90px] min-h-[45px] p-5 rounded-sm dark:bg-red-900 dark:text-red-300">
          <h1> TIME RUNS OUT</h1>
        </div>
      )}
    </div>
  );
}
