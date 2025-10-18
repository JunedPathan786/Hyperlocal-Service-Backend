import React from "react";

function Register() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-10 bg-gray-50">
      <div className="bg-white shadow-md rounded-xl p-8 w-full max-w-md border border-gray-100">
        <h1 className="text-3xl font-bold text-green-700 text-center mb-6">
          Register
        </h1>
        <form className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">Name</label>
            <input
              type="text"
              placeholder="Your Name"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-green-500 hover:border-green-400 transition"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-green-500 hover:border-green-400 transition"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Phone Number</label>
            <input
              type="tel"
              placeholder="+92 300 1234567"
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
              Register
            </button>
          </div>
        </form>

        <p className="text-gray-600 text-center mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-green-600 font-medium hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}

export default Register;
