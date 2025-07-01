import { Link } from '@tanstack/react-router';

export default function Header() {
  return (
    <header className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
      <h1 className="text-xl font-bold text-gray-800">NavCart</h1>
      <div className="flex gap-4">
        <Link
          to="/signup"
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded"
        >
          Signup
        </Link>
        <Link
          to="/login"
          className="border border-blue-500 text-blue-500 hover:bg-blue-100 font-medium py-2 px-4 rounded"
        >
          Login
        </Link>
      </div>
    </header>
  );
}
