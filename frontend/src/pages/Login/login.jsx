import { useState, useContext } from "react";
import API from "../../api";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Attempting login...');
      const res = await API.post("/auth/login", formData);
      console.log('Login response:', res.data);
      
      if (!res.data?.data?.token) {
        throw new Error('No token received from server');
      }
      
      // Get token from response and login
      const { token } = res.data.data;
      login(token);
      
      console.log('Login successful');
      // Redirect to profile page instead of home
      navigate("/profile");
    } catch (err) {
      console.error("Login error", err);
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col justify-center py-6 sm:py-12">
      <div className="relative py-3 sm:max-w-md sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-6 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-25">
          <div className="max-w-md mx-auto">
            <h1 className="text-2xl font-semibold text-gray-800 mb-6">Login to Your Account</h1>
            <form onSubmit={handleSubmit} className="space-y-10">
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-blue-500"
                  autoComplete="off"
                />
                <label
                  htmlFor="email"
                  className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                >
                  Email Address
                </label>
              </div>

              <div className="relative">
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-blue-500"
                  autoComplete="off"
                />
                <label
                  htmlFor="password"
                  className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                >
                  Password
                </label>
              </div>

              <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
