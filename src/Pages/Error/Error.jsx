
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">
        Oops!
      </h1>
      <p className="text-xl text-gray-600 mb-8">
        It seems something went wrong.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-[#F85606] text-white rounded-md hover:bg-blue-600 transition-colors"
      >
        Go back to Home
      </Link>
    </div>
  );
};

export default ErrorPage;