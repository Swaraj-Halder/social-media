import React, { useState } from "react";
import { useSignup } from "../../hooks/useSignup";
import { IoEye, IoEyeOffSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { signup, isloading, error } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(username, email, password);
    await signup(username, email, password);
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="container mx-auto p-4 w-[90%] max-w-[600px] m-6">
      <h2 className="text-3xl font-semibold mb-10">Sign Up</h2>
      <form
        onSubmit={handleSubmit}
        className="px-4 py-8 bg-slate-200 rounded-lg"
      >
        <div className="mb-4">
          <label className="block text-gray-700 mb-3">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="john"
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-3">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@gmail.com"
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-3">Password</label>
          <div className="flex items-center ">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-2 border flex-grow border-gray-300 rounded-md"
              required
            ></input>
            <span onClick={handleShowPassword} className="p-2 text-xl">
              {showPassword ? <IoEye /> : <IoEyeOffSharp />}
            </span>
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-5 w-full select-none"
          disabled={isloading}
        >
          Sign Up
        </button>
        <div className="mt-4 text-sm select-none">
          <span>Already a user?</span>
          <Link to="/login" className="text-blue-700 ml-2 hover:underline">
            Login
          </Link>
        </div>
        {isloading && <div className="mt-4 text-slate-500" >Signing you up...</div>}
        {error && <div className="mt-4 text-red-500">{error}</div>}
      </form>
    </div>
  );
};

export default Signup;
