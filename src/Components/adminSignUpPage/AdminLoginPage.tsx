/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import type {ChangeEvent, FormEvent} from "react"
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Eye, EyeOff, Mail } from "lucide-react";
import apple from "../../assets/loginImg/apple.png";
import google from "../../assets/loginImg/google.png";
import facebook from "../../assets/loginImg/facebook.png";
import bgOne from "../../assets/userlogin.png";
import { useLoginUserMutation, useForgotPasswordMutation } from "../../Redux/api/authApi";

const AdminLoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [forgotEmail, setForgotEmail] = useState<string>("");
  const [showForgot, setShowForgot] = useState<boolean>(false);

  const navigate = useNavigate();

  // RTK Query hooks
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const [forgotPassword, { isLoading: isForgotLoading }] = useForgotPasswordMutation();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      toast.error("Please enter both email and password.");
      return;
    }

    if (!rememberMe) {
      toast.error("Please check 'Remember Me' to continue.");
      return;
    }

    try {
      const res = await loginUser({ email, password }).unwrap();
      console.log("Login response:", res);

      toast.success("Login successful!");
      navigate("/");
    } catch (error: any) {
      console.error("Login failed:", error);
      toast.error(error?.data?.message || "Login failed");
    }
  };

  const handleForgotPassword = async () => {
    if (!forgotEmail.trim()) {
      toast.error("Enter your email first");
      return;
    }

    try {
      await forgotPassword({ email: forgotEmail }).unwrap();
      toast.success("Password reset link sent to your email");
      setShowForgot(false);
      setForgotEmail("");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to send reset link");
    }
  };

  const handleSocialLogin = (platform: string) => {
    toast.info(`${platform} login coming soon`);
  };

  return (
    <div className="w-full relative bg-gradient-to from-[#FAE6F0] to-[#FDF6FA] overflow-hidden">
      <img
        src={bgOne}
        alt="bg"
        className="absolute w-full lg:h-auto object-cover md:hidden lg:block"
      />

      <div className="w-full flex items-center justify-center mt-12 md:mt-0 md:min-h-screen px-4 relative">
        <div className="flex flex-col md:flex-row max-w-7xl w-full space-x-28">
          {/* LEFT */}
          <div className="hidden lg:flex md:w-1/2 p-10 flex-col justify-center">
            <h1 className="text-4xl font-bold text-[#EC75AD] mb-4">Welcome!</h1>
            <p className="text-2xl text-[#EC75AD]">
              Unlock exclusive perks when you log in
            </p>
          </div>

          {/* RIGHT */}
          <div className="w-full lg:w-1/2 p-4 mx-auto bg-white rounded-lg shadow-lg z-20 relative">
            {!showForgot ? (
              <form className="space-y-6 md:mt-12" onSubmit={handleSubmit}>
                {/* Email */}
                <div>
                  <label className="block font-semibold mb-1">Email</label>
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setEmail(e.target.value)
                      }
                      placeholder="Enter your email"
                      className="w-full px-3 py-3 border rounded-md"
                      disabled={isLoading}
                    />
                    <div className="absolute right-3 top-4 text-gray-400">
                      <Mail size={18} />
                    </div>
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block font-semibold mb-1">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setPassword(e.target.value)
                      }
                      placeholder="Enter your password"
                      className="w-full px-3 py-3 border rounded-md"
                      disabled={isLoading}
                    />
                    <div
                      className="absolute right-3 top-4 cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </div>
                  </div>
                </div>

                {/* Remember */}
                <div className="flex justify-between">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setRememberMe(e.target.checked)
                      }
                      disabled={isLoading}
                    />
                    <span className="ml-2">Remember me</span>
                  </div>

                  <button
                    type="button"
                    className="text-blue-500"
                    onClick={() => setShowForgot(true)}
                  >
                    Forgot Password?
                  </button>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 bg-[#C8A8E9] rounded-md font-semibold disabled:opacity-50"
                >
                  {isLoading ? "Logging in..." : "Log In"}
                </button>
              </form>
            ) : (
              // Forgot password form
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-center">Reset Password</h2>
                <input
                  type="email"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-3 py-3 border rounded-md"
                  disabled={isForgotLoading}
                />
                <button
                  onClick={handleForgotPassword}
                  disabled={isForgotLoading}
                  className="w-full py-3 bg-[#C8A8E9] rounded-md font-semibold disabled:opacity-50"
                >
                  {isForgotLoading ? "Sending..." : "Send Reset Link"}
                </button>
                <button
                  onClick={() => setShowForgot(false)}
                  className="w-full py-2 mt-2 text-sm text-gray-500 hover:underline"
                >
                  Back to Login
                </button>
              </div>
            )}

            {/* Social */}
            <div className="mt-6 text-center">OR</div>
            <div className="flex justify-center gap-6 mt-4">
              <img src={apple} onClick={() => handleSocialLogin("Apple")} className="w-6 cursor-pointer" />
              <img src={google} onClick={() => handleSocialLogin("Google")} className="w-6 cursor-pointer" />
              <img src={facebook} onClick={() => handleSocialLogin("Facebook")} className="w-6 cursor-pointer" />
            </div>

            {/* Register */}
            <div className="mt-6 text-center">
              <p>
                Don't have an account?{" "}
                <Link to="/auth/signup" className="text-blue-500">
                  Create Account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;