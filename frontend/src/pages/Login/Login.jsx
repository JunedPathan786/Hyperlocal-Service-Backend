import React from "react";

function Login() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-10 bg-gray-50">
      <div className="bg-white shadow-md rounded-xl p-8 w-full max-w-md border border-gray-100">
        <h1 className="text-3xl font-bold text-green-700 text-center mb-6">
          Login
        </h1>
        <form className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-green-500 hover:border-green-400 transition"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-green-500 hover:border-green-400 transition"
            />
          </div>

          <div className="text-right">
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-2 rounded-md transition"
            >
              Login
            </button>
          </div>
        </form>

        <p className="text-gray-600 text-center mt-4">
          Don't have an account?{" "}
          <a href="/register" className="text-green-600 font-medium hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
