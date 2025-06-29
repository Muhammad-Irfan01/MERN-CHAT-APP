import { Eye, EyeClosed, Lock, Mail, MessageSquare } from "lucide-react";
import React, { useState } from "react";
import { useAuthStore } from "../Store/useAuthStore";
import { Link } from "react-router-dom";
import AuthImagePattern from "../Component/AuthImagePattern";

const LogIn = () => {

  const [formField, setFormField] = useState({
      email: "",
      password: "",
    });
    const [showPassword, setShowPassword] = useState(false);

  const {login, isLoggingIn} = useAuthStore();

  const handleLogIn = (e) => {
    e.preventDefault();

     login(formField);
  };
  return (
    <div className="min-h-screen flex flex-wrap">
      <div className="w-full max-w-md flex flex-col justify-center items-center space-y-2 m-auto">
        <div className="text-center">
          <div className="flex justify-center">
            <MessageSquare className="text-2xl text-primary" />
          </div>
          <h2 className="text-xl font-semibold py-2">Log In</h2>
          <p className="text-xs text-gray-500 font-semibold">
            Sign In to Your Account
          </p>
        </div>
        <form
          method="post"
          onSubmit={handleLogIn}
          className="w-full flex flex-col space-y-4"
        >
          <div className="space-y-1">
            <div>
              <label className="text-sm p-2 font-semibold">Email</label>
            </div>

            <div className="flex border border-base-content/10 p-2 rounded-lg">
              <input
                type="text"
                name="email"
                placeholder="Enter Your Email"
                value={formField.value}
                onChange={(e) =>
                  setFormField({ ...formField, email: e.target.value })
                }
                className="relative ml-10 border-none outline-none text-sm text-white/70 py-1"
              />
              <Mail className="absolute text-base-content/50" />
            </div>
          </div>

          <div className="space-y-1">
            <div>
              <label className="text-sm p-2 font-semibold">Password</label>
            </div>

            <div className="flex border border-base-content/10 p-2 rounded-lg">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="********"
                value={formField.value}
                onChange={(e) =>
                  setFormField({ ...formField, password: e.target.value })
                }
                className="relative w-full ml-10 border-none outline-none text-sm text-white/70 py-1"
              />
              <Lock className="absolute text-base-content/50" />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setShowPassword(!showPassword);
                }}
              >
                {showPassword ? (
                  <Eye className="text-base-content/50" />
                ) : (
                  <EyeClosed className="text-base-content/50" />
                )}
              </button>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="btn w-full btn-primary"
              disabled={isLoggingIn}
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Log In"
              )}
            </button>
          </div>

          <div className="flex space-x-1 text-sm justify-center">
            <p>Don't Have an Account ? </p>
            <Link to={"/signup"} className="link link-primary">
              SignUp
            </Link>
          </div>
        </form>
      </div>

      <div>
        <AuthImagePattern
           title={"Welcome back!"}
        subtitle={"Sign in to continue your conversations and catch up with your messages."}
        />
      </div>
    </div>
  );
};

export default LogIn;
