// src/components/Header.tsx
import { Link } from '@tanstack/react-router';

const Header = () => {
  return (
    <header className="flex justify-between items-center p-4 bg-white shadow-md">
      <h1 className="text-xl font-bold text-gray-800">NavCart</h1>
      <div className="space-x-4">
        <Link to="/login">
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Login
          </button>
        </Link>
        <Link to="/signup">
          <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
            Signup
          </button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
