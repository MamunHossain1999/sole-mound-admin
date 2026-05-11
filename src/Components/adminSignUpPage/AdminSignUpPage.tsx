/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSignupUserMutation } from "../../Redux/api/authApi";

// Eye icon
const IcoEye = ({ show }: { show: boolean }) =>
  show ? (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4">
      <ellipse cx="10" cy="10" rx="8" ry="5" />
      <circle cx="10" cy="10" r="2" />
    </svg>
  ) : (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4">
      <path d="M2 2l16 16M3.5 5.5C2.3 6.7 1.5 8.2 1.5 10s3.8 7 8.5 7c1.6 0 3-.4 4.2-1" strokeLinecap="round" />
    </svg>
  );

// Countries
const COUNTRIES = [
  { code: "GB", flag: "🇬🇧", name: "United Kingdom" },
  { code: "BD", flag: "🇧🇩", name: "Bangladesh" },
  { code: "US", flag: "🇺🇸", name: "United States" },
];

// Input component
const Input = ({ placeholder, value, onChange, type = "text", right }: any) => (
  <div className="relative w-full">
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border border-gray-200 text-xs sm:text-sm focus:ring-2 focus:ring-rose-300 pr-10 transition"
    />
    {right && <span className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer">{right}</span>}
  </div>
);

// Vector Illustration Component
const SignUpIllustration = () => (
  <div className="hidden lg:flex items-center justify-center w-1/2">
    <div className="w-full max-w-md">
      <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="200" cy="200" r="200" fill="#FDE2F3" />
        <path d="M100 300C150 250 250 250 300 300" stroke="#FF6B81" strokeWidth="6" strokeLinecap="round" />
        <circle cx="200" cy="180" r="40" fill="#FFB6C1" />
        <rect x="170" y="220" width="60" height="60" rx="12" fill="#FF6B81" />
      </svg>
    </div>
  </div>
);

export default function AdminSignUpPage() {
  const navigate = useNavigate();
  const [role, setRole] = useState<"Buyer" | "Seller" | "Both">("Buyer");
  const [country, setCountry] = useState("BD");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [company, setCompany] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showConf, setShowConf] = useState(false);
  const [errors, setErrors] = useState<any>({});

  const [signupUser, { isLoading }] = useSignupUserMutation();

  const validate = () => {
    const e: any = {};
    if (!email.trim()) e.email = "Email required";
    if (!password) e.password = "Password required";
    else if (password.length < 8) e.password = "Min 8 characters";
    if (password !== confirm) e.confirm = "Passwords do not match";
    if (!fullName.trim()) e.fullName = "Required";
    if ((role === "Seller" || role === "Both") && !phone.trim()) e.phone = "Required";
    if ((role === "Seller" || role === "Both") && !company.trim()) e.company = "Required";
    if (!agreed) e.agreed = "Agree first";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      await signupUser({
        name: fullName,
        email,
        password,
        role: role === "Buyer" ? "customer" : role === "Seller" ? "seller" : "both",
        phone: phone || undefined,
        company: company || undefined,
      }).unwrap();

      navigate("/auth/login"); // Success -> navigate login
    } catch (err: any) {
      setErrors({ api: err.data?.message || "Something went wrong" });
    }
  };

  return (
    <div className="w-full flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-100 to-purple-200 px-3 sm:px-6 py-6 sm:py-10">
      <div className="bg-white flex flex-col lg:flex-row w-full max-w-5xl rounded-2xl shadow-xl p-5 sm:p-8 md:p-10">
        {/* Illustration */}
        <SignUpIllustration />

        {/* Form */}
        <div className="w-full lg:w-1/2 mt-5 lg:mt-0 lg:pl-10">
          {/* Role */}
          <div className="mb-4">
            <p className="text-xs sm:text-sm font-semibold mb-2">Select Role</p>
            <div className="flex flex-wrap gap-4">
              {["Buyer", "Seller", "Both"].map((r) => (
                <label key={r} className="flex items-center gap-2 cursor-pointer text-sm sm:text-base">
                  <input type="radio" checked={role === r} onChange={() => setRole(r as "Buyer" | "Seller" | "Both")} />
                  {r}
                </label>
              ))}
            </div>
          </div>

          {/* Country */}
          <div className="mb-4">
            <p className="text-xs sm:text-sm mb-1">Country</p>
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full pl-3 sm:pl-10 pr-3 sm:pr-8 py-2.5 rounded-xl border border-gray-200 text-sm sm:text-base focus:ring-2 focus:ring-rose-300 transition"
            >
              {COUNTRIES.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Grid Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <p className="text-xs sm:text-sm mb-1">Email</p>
              <Input value={email} onChange={setEmail} placeholder="Enter your email" />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            {(role === "Seller" || role === "Both") && (
              <div>
                <p className="text-xs sm:text-sm mb-1">Phone</p>
                <Input value={phone} onChange={setPhone} placeholder="Enter phone number" />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>
            )}

            <div>
              <p className="text-xs sm:text-sm mb-1">Password</p>
              <Input
                type={showPass ? "text" : "password"}
                value={password}
                onChange={setPassword}
                placeholder="Set password"
                right={<button onClick={() => setShowPass(!showPass)}><IcoEye show={showPass} /></button>}
              />
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>

            <div>
              <p className="text-xs sm:text-sm mb-1">Confirm Password</p>
              <Input
                type={showConf ? "text" : "password"}
                value={confirm}
                onChange={setConfirm}
                placeholder="Confirm password"
                right={<button onClick={() => setShowConf(!showConf)}><IcoEye show={showConf} /></button>}
              />
              {errors.confirm && <p className="text-red-500 text-xs mt-1">{errors.confirm}</p>}
            </div>

            {(role === "Seller" || role === "Both") && (
              <div>
                <p className="text-xs sm:text-sm mb-1">Company</p>
                <Input value={company} onChange={setCompany} placeholder="Enter company name" />
                {errors.company && <p className="text-red-500 text-xs mt-1">{errors.company}</p>}
              </div>
            )}

            <div>
              <p className="text-xs sm:text-sm mb-1">Full Name</p>
              <Input value={fullName} onChange={setFullName} placeholder="Enter full name" />
              {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
            </div>
          </div>

          {/* Terms */}
          <div className="mt-4 flex gap-2 items-start">
            <input type="checkbox" checked={agreed} onChange={() => setAgreed(!agreed)} />
            <p className="text-[11px] sm:text-xs">
              I agree to the <span className="text-rose-500 font-medium">Terms & Conditions</span>
            </p>
          </div>
          {errors.agreed && <p className="text-red-500 text-xs mt-1">{errors.agreed}</p>}
          {errors.api && <p className="text-red-500 text-xs mt-1">{errors.api}</p>}

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full mt-5 py-3.5 rounded-xl bg-rose-500 text-white text-sm sm:text-base font-semibold hover:bg-rose-600 transition shadow disabled:opacity-50"
          >
            {isLoading ? "Creating..." : "Create Account"}
          </button>

          <p className="text-center text-xs sm:text-sm mt-3">
            Already have an account? <Link to="/auth/login" className="text-rose-500 font-medium">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}