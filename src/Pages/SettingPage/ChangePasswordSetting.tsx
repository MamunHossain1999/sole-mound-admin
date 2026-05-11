import { useState } from "react";

const TABS = ["Profile", "Change Password", "Notifications"] as const;
type Tab = typeof TABS[number];

const IcoEye = ({ show }: { show: boolean }) => show
  ? <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4"><ellipse cx="10" cy="10" rx="8" ry="5" strokeLinecap="round"/><circle cx="10" cy="10" r="2"/></svg>
  : <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4"><path d="M2 2l16 16M7.5 7.6A5 5 0 0 0 10 15a5 5 0 0 0 4.9-4M3.5 5.5C2.3 6.7 1.5 8.2 1.5 10s3.8 7 8.5 7c1.6 0 3-.4 4.2-1M8 4.2A9 9 0 0 1 10 4c4.7 0 8.5 3.1 8.5 6 0 1.1-.4 2.2-1.2 3.1" strokeLinecap="round"/></svg>;

const PasswordInput = ({ placeholder, value, onChange, show, onToggle }: {
  placeholder?: string; value: string; onChange: (v: string) => void;
  show: boolean; onToggle: () => void;
}) => (
  <div className="relative">
    <input
      type={show ? "text" : "password"}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder || "••••••••••••••••"}
      className="w-full px-3 py-2.5 pr-10 rounded-xl border border-gray-200 bg-white text-sm text-gray-500 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent transition tracking-widest"
    />
    <button
      type="button"
      onClick={onToggle}
      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-rose-400 transition"
    >
      <IcoEye show={show} />
    </button>
  </div>
);

export default function ChangePasswordSettings() {
  const [tab,      setTab]      = useState<Tab>("Change Password");
  const [oldPass,  setOldPass]  = useState("");
  const [newPass,  setNewPass]  = useState("");
  const [confPass, setConfPass] = useState("");
  const [showOld,  setShowOld]  = useState(false);
  const [showNew,  setShowNew]  = useState(false);
  const [showConf, setShowConf] = useState(false);
  const [errors,   setErrors]   = useState<string[]>([]);
  const [success,  setSuccess]  = useState(false);

  /* live rule checks */
  const ruleMin     = newPass.length >= 8;
  const ruleMixed   = /[a-z]/.test(newPass) && /[A-Z]/.test(newPass);
  const ruleSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(newPass);

  const rules = [
    { label: "Minimum 8 characters.",                              pass: ruleMin     },
    { label: "Use combination of uppercase and lowercase letters.", pass: ruleMixed   },
    { label: "Use of special characters (e.g., !, @, #, $, %).",   pass: ruleSpecial },
  ];

  const handleUpdate = () => {
    const errs: string[] = [];
    if (!oldPass)           errs.push("Old password is required.");
    if (!newPass)           errs.push("New password is required.");
    else if (!ruleMin)      errs.push("Password must be at least 8 characters.");
    if (newPass !== confPass) errs.push("Passwords do not match.");
    setErrors(errs);
    if (errs.length === 0) { setSuccess(true); setOldPass(""); setNewPass(""); setConfPass(""); }
  };

  const handleCancel = () => {
    setOldPass(""); setNewPass(""); setConfPass("");
    setErrors([]); setSuccess(false);
  };

  return (
    <div
      className="min-h-screen px-6 py-8"
      style={{ background: "linear-gradient(135deg,#fff5f7 0%,#fdf2ff 55%,#fff9f0 100%)", fontFamily: "'Lato','Segoe UI',sans-serif" }}
    >
      <div className="max-w-2xl mx-auto">

        {/* ── Header ── */}
        <div className="flex items-start justify-between mb-5">
          <div>
            <h1 className="text-2xl font-bold text-gray-800" style={{ fontFamily: "'Georgia',serif" }}>Settings</h1>
            <nav className="flex items-center gap-1 text-xs text-gray-400 mt-1">
              <span className="hover:text-rose-400 cursor-pointer transition">Dashboard</span>
              <span>›</span>
              <span className="text-gray-500 font-medium">Change Password</span>
            </nav>
          </div>
          <div className="flex gap-2">
            <button onClick={handleCancel}
              className="px-5 py-2 rounded-xl border border-gray-200 bg-white text-gray-600 text-sm font-medium hover:border-rose-300 hover:text-rose-500 transition shadow-sm">
              Cancel
            </button>
            <button onClick={handleUpdate}
              className="px-5 py-2 rounded-xl bg-rose-400 text-white text-sm font-semibold hover:bg-rose-500 transition shadow-md shadow-rose-200">
              Update Password
            </button>
          </div>
        </div>

        {/* ── Card ── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

          {/* Tabs */}
          <div className="flex border-b border-gray-100">
            {TABS.map(t => (
              <button key={t} onClick={() => setTab(t)}
                className={`flex-1 py-4 text-sm font-medium transition relative ${tab === t ? "text-rose-500" : "text-gray-400 hover:text-gray-600"}`}>
                {t}
                {tab === t && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-rose-500 rounded-full" />}
              </button>
            ))}
          </div>

          <div className="p-6 space-y-5">
            <h2 className="font-bold text-gray-800 text-base" style={{ fontFamily: "'Georgia',serif" }}>Password</h2>

            {/* Success */}
            {success && (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs rounded-xl px-4 py-3 font-medium">
                ✓ Password updated successfully!
              </div>
            )}

            {/* Errors */}
            {errors.length > 0 && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-xs rounded-xl px-4 py-3 space-y-0.5">
                {errors.map((e, i) => <p key={i}>• {e}</p>)}
              </div>
            )}

            {/* 3-column password fields */}
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-xs font-semibold text-gray-600 mb-1.5">Old Password</p>
                <PasswordInput value={oldPass} onChange={setOldPass} show={showOld} onToggle={() => setShowOld(!showOld)} />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-600 mb-1.5">New Password</p>
                <PasswordInput value={newPass} onChange={setNewPass} show={showNew} onToggle={() => setShowNew(!showNew)} />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-600 mb-1.5">ConfirmPassword</p>
                <PasswordInput value={confPass} onChange={setConfPass} show={showConf} onToggle={() => setShowConf(!showConf)} />
              </div>
            </div>

            {/* Rules checklist */}
            <div className="space-y-2 pt-1">
              {rules.map(r => (
                <label key={r.label} className="flex items-center gap-2 cursor-default select-none">
                  <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 transition ${
                    r.pass ? "bg-rose-400 border-rose-400" : "border-gray-300 bg-white"
                  }`}>
                    {r.pass && (
                      <svg viewBox="0 0 12 12" fill="none" stroke="white" strokeWidth="2" className="w-2.5 h-2.5">
                        <path d="M2 6l3 3 5-5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </div>
                  <span className={`text-xs transition ${r.pass ? "text-rose-500 font-medium" : "text-gray-500"}`}>
                    {r.label}
                  </span>
                </label>
              ))}
            </div>

            {/* Bottom action buttons */}
            <div className="flex gap-3 pt-2">
              <button onClick={handleCancel}
                className="px-5 py-2 rounded-xl border border-gray-200 bg-white text-gray-600 text-sm font-medium hover:border-rose-300 hover:text-rose-500 transition">
                Cancel
              </button>
              <button onClick={handleUpdate}
                className="px-5 py-2 rounded-xl bg-rose-400 text-white text-sm font-semibold hover:bg-rose-500 transition shadow shadow-rose-200">
                Update Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}