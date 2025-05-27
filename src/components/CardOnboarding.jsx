export default function CardOnboarding({ username }) {
  return (
    <div className="flex flex-col lg:max-w-5xl items-start justify-center p-5 md:p-10 bg-white  rounded-lg shadow-sm hover:bg-gray-100 ">
      <h5 className="mb-2 text-5xl font-bold tracking-tight text-gray-900 ">
        Welcome to Quizzz, {username}!
      </h5>
      <p className="font-normal text-gray-700 ">
        the ultimate destination for fun, fast, and brain-boosting quizzes!
        Whether you're here to challenge yourself, learn something new, or
        simply have a good time, you've come to the right place. With a wide
        variety of topics — from general knowledge and pop culture to science
        and history — there's always something fresh and exciting to explore.
      </p>
    </div>
  );
}
