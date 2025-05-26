import { useNavigate } from "react-router";

export default function OnboardingPage() {
  const navigate = useNavigate();
  function navigateLogin() {
    navigate("/login");
  }
  return (
    <div className="font-montserrat min-h-screen flex flex-col justify-center p-5">
      <section className=" border border-gray-500 bg-gray-300 rounded-2xl">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a className="flex items-center mb-6 text-2xl font-semibold text-gray-900 ">
            Quizzz!
          </a>
          <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <p className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                Welcome to Quizzz — your go-to app for fun, fast, and smart
                quizzes! Challenge yourself, learn new things, or just enjoy a
                quick brain break. From general knowledge to science and pop
                culture, there’s always something new to try.
              </p>
            </div>
          </div>
          <button
            type="submit"
            onClick={navigateLogin}
            class="text-white cursor-pointer bg-blue-700 max-w-sm mt-5 w-full hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 "
          >
            Lesgow!
          </button>
        </div>
      </section>
    </div>
  );
}
