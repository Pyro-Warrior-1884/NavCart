import { useState, type ChangeEvent } from "react";
import { useNavigate } from "@tanstack/react-router";

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("http://localhost:3000/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Signup failed");

      localStorage.setItem("user", JSON.stringify(data));
      setMessage("Signup successful!");

      setTimeout(() => {
        navigate({ to: "/login" });
      }, 1200);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setMessage(err.message);
      } else {
        setMessage("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Create Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
  <label className="block text-sm text-gray-600 mb-1">Username</label>
  <input
    name="username"
    type="text"
    placeholder="John Doe"
    value={form.username}
    onChange={handleChange}
    required
    className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none"
  />
</div>


          <div>
            <label className="block text-sm text-gray-600 mb-1">Password</label>
            <input
              name="password"
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-xl transition"
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        {message && (
          <div
            className={`mt-4 text-center text-sm ${
              message.includes("success") ? "text-green-600" : "text-red-500"
            }`}
          >
            {message}
          </div>
        )}

        <div className="text-center text-sm mt-6 text-gray-600">
          Already have an account?{" "}
          <button
            onClick={() => navigate({ to: "/login" })}
            className="text-blue-600 font-medium underline hover:text-blue-800"
          >
            Log in
          </button>
        </div>
      </div>
    </div>
  );
}
