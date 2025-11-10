import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api";


export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ fullname: '', email: '', password: '', phone: '' })
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    console.log("Register submit", formData);
    try {
      const res = await API.post('/auth/register', formData);
      console.log('Register response', res);
      // Redirect to OTP verification, passing email in state
      navigate("/verify-otp", { state: { email: formData.email } });
    } catch (error) {
      setError(error.response?.data?.message || 'Registration failed');
      console.error('Register error', error);
      setLoading(false);
    }
  }


  return (
    <div className="min-h-screen bg-blue-50 flex flex-col justify-center py-8 sm:py-16">
      <div className="relative py-3 sm:max-w-2xl sm:mx-auto">
        {/* Background gradient skew */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-700 shadow-xl transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>

        {/* Form container */}
        <div className="relative px-16 py-16 bg-white shadow-xl sm:rounded-3xl sm:p-25">
          <div className="max-w-lg mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Create Your Account</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div className="relative">
                <input
                  type="text"
                  id="fullname"
                  name="fullname"
                  value={formData.fullname}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="peer placeholder-transparent h-12 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-blue-500 text-lg"
                  autoComplete="off"
                />
                <label
                  htmlFor="fullname"
                  className="absolute left-0 -top-3.5 text-gray-600 text-base transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-lg peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-base"
                >
                  Full Name
                </label>
              </div>

              {/* Email */}
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  className="peer placeholder-transparent h-12 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-blue-500 text-lg"
                  autoComplete="off"
                />
                <label
                  htmlFor="email"
                  className="absolute left-0 -top-3.5 text-gray-600 text-base transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-lg peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-base"
                >
                  Email Address
                </label>
              </div>

              {/* Contact Number */}
              <div className="relative">
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Contact Number"
                  className="peer placeholder-transparent h-12 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-blue-500 text-lg"
                  autoComplete="off"
                />
                <label
                  htmlFor="phone"
                  className="absolute left-0 -top-3.5 text-gray-600 text-base transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-lg peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-base"
                >
                  Contact Number
                </label>
              </div>

              {/* Password */}
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="peer placeholder-transparent h-12 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-blue-500 text-lg"
                  autoComplete="off"
                />
                <label
                  htmlFor="password"
                  className="absolute left-0 -top-3.5 text-gray-600 text-base transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-lg peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-base"
                >
                  Password
                </label>
              </div>
              {error && (
                <p className="text-red-600 text-sm" role="alert">
                  {error}
                </p>
              )}
              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg text-lg transition disabled:bg-blue-400"
              >
                {loading ? "Registering..." : "Register"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
