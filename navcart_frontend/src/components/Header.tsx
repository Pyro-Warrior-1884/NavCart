// src/components/Header.jsx
const Header = () => {
  return (
    <header className="flex justify-between items-center p-4 bg-white shadow-md">
      <h1 className="text-xl font-bold text-gray-800">NavCart</h1>
      <div className="space-x-4">
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Login</button>
        <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Signup</button>
      </div>
    </header>
  );
};

export default Header;
