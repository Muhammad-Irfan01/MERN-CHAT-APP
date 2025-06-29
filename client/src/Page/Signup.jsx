import {
  Eye,
  EyeClosed,
  Loader2,
  Lock,
  Mail,
  MessageSquare,
  User,
} from "lucide-react";
import React, { useState } from "react";
import { useAuthStore } from "../Store/useAuthStore";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import AuthImagePattern from "../Component/AuthImagePattern";

const Signup = () => {
  const [formField, setFormField] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const { signup, isSigningUp } = useAuthStore();

  const ValidateForm = () => {
    if (!formField.name.trim()) return toast.error("Name is required");
    if (!formField.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formField.email))
      return toast.error("Invalid email format");
    if (!formField.password) return toast.error("Password is required");
    if (formField.password.length < 6)
      return toast.error("Password must be at least 6 characters");

    return true;
  };

  const handleSignUp = (e) => {
    e.preventDefault();

    const success = ValidateForm();
    if (success) return signup(formField);
  };

  return (
    <div className="min-h-screen flex flex-wrap">
      <div className="w-full max-w-md flex flex-col justify-center items-center space-y-2 m-auto">
        <div className="text-center">
          <div className="flex justify-center">
            <MessageSquare className="text-2xl text-primary" />
          </div>
          <h2 className="text-xl font-semibold py-2">Create Account</h2>
          <p className="text-xs text-gray-500 font-semibold">
            Get Started With Your Free Account
          </p>
        </div>
        <form
          method="post"
          onSubmit={handleSignUp}
          className="w-full flex flex-col space-y-4"
        >
          <div className="space-y-1">
            <div>
              <label className="text-sm p-2 font-semibold">Name</label>
            </div>

            <div className="flex border border-base-content/10 p-2 rounded-lg">
              <input
                type="text"
                name="name"
                placeholder="Enter Your Name"
                value={formField.value}
                onChange={(e) =>
                  setFormField({ ...formField, name: e.target.value })
                }
                className="relative w-full ml-10 border-none outline-none text-sm text-white/70 py-1"
              />
              <User className="absolute text-base-content/50" />
            </div>
          </div>

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
              disabled={isSigningUp}
              // onClick={handleSignUp}
            >
              {isSigningUp ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </div>

          <div className="flex space-x-1 text-sm justify-center">
            <p>Already Have an Account ? </p>
            <Link to={'/login'} className="link link-primary">Login</Link>
          </div>
        </form>
      </div>

      <div>
        <AuthImagePattern
        title="Join Our Community"
        subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
        />
      </div>
    </div>
  );
};

export default Signup;
