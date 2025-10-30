import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { message as antdMessage, Spin } from "antd";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import logo from "../components/assets/Company_logo.png";
import x_logo from "../components/assets/Dark Logo.png";
import { userService } from "../ims/services/Userservice";

const Register = () => {
  const navigate = useNavigate();

  // Form states
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "user", // Default role as per backend
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔹 Register handler
  const handleRegister = async (e) => {
    e.preventDefault();

    const { name, email, password, phone, role } = formData;

    if (!name || !email || !password || !role || !phone) {
      antdMessage.error("Please fill all fields");
      return;
    }

    if (password.length < 6) {
      antdMessage.error("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    try {
      console.log("📦 Payload sent to API:", formData);

      const res = await userService.register(formData);

      antdMessage.success(res.data.message || "Registration successful!");
      console.log("✅ Registered user:", res.data.user);

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }

      navigate("/dashboard");
    } catch (err) {
      console.error("❌ Register API Error:", err.response?.data || err);
      antdMessage.error(err.response?.data?.message || "Registration failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Left Section */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-gray-800 to-gray-600 text-white flex-col justify-center items-center">
        <h3 className="text-2xl font-semibold mb-2 flex items-center gap-2">
          Welcome to <img src={x_logo} alt="XTOWN" className="w-28 inline" /> town..!
        </h3>
        <p className="text-gray-300">We’re here to turn your ideas into reality.</p>
      </div>

      {/* Right Section */}
      <div className="flex w-full md:w-1/2 flex-col justify-center items-center p-8">
        <img src={logo} alt="Company Logo" className="w-28 mb-4" />

        <form
          onSubmit={handleRegister}
          className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md"
        >
          <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">
            CREATE AN ACCOUNT
          </h3>

          {/* Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
              placeholder="Enter your name"
              required
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Phone */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
              placeholder="Enter your phone number"
              required
            />
          </div>

          {/* Role */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Role
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
              required
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
              <option value="superadmin">SuperAdmin</option>
            </select>
          </div>

          {/* Password */}
          <div className="mb-6 relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 pr-10 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
              placeholder="Enter password"
              required
            />
            {showPassword ? (
              <FaEyeSlash
                className="absolute right-3 top-9 text-gray-500 cursor-pointer"
                onClick={() => setShowPassword(false)}
              />
            ) : (
              <FaEye
                className="absolute right-3 top-9 text-gray-500 cursor-pointer"
                onClick={() => setShowPassword(true)}
              />
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gray-800 hover:bg-gray-700 text-white font-semibold py-2 rounded-lg transition duration-200"
          >
            {loading ? <Spin /> : "REGISTER"}
          </button>

          {/* Login redirect */}
          <p className="text-center mt-4 text-sm text-gray-600">
            Already have an account?
            <span
              className="text-gray-800 font-semibold ml-1 cursor-pointer hover:underline"
              onClick={() => navigate("/")}
            >
              Login here
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
