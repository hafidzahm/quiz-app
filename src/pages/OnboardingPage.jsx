export default function OnboardingPage() {
  return (
    <div className="flex flex-col bg-amber-200 min-h-screen w-full items-center p-5 justify-center">
      <Card />
    </div>
  );
}

function Card() {
  return (
    <div className="flex flex-col items-center justify-center">
      <a
        href="#"
        className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      >
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Welcome to Quizzz!
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque
          architecto provident fuga numquam necessitatibus ipsum, deleniti sequi
          placeat! At architecto similique ullam veritatis! Beatae, repudiandae
          quas hic harum corporis error?
        </p>
      </a>
      <button
        type="button"
        className="text-white mt-5 w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        Let's start!
      </button>
    </div>
  );
}
