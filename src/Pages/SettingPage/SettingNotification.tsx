import { useState } from "react";

const TABS = ["Profile", "Change Password", "Notifications"] as const;
type Tab = typeof TABS[number];

/* ── Reusable Radio Group ── */
const RadioGroup = ({ value, onChange, name }: {
  value: "yes" | "no"; onChange: (v: "yes" | "no") => void; name: string;
}) => (
  <div className="flex items-center gap-4 mt-1">
    {(["yes", "no"] as const).map(opt => (
      <label key={opt} className="flex items-center gap-1.5 cursor-pointer select-none">
        <div
          onClick={() => onChange(opt)}
          className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition ${
            value === opt ? "border-rose-400 bg-white" : "border-gray-300 bg-white"
          }`}
        >
          {value === opt && <span className="w-2 h-2 rounded-full bg-rose-400 block" />}
        </div>
        <span className="text-sm text-gray-600">{opt === "yes" ? "Yes" : "No"}</span>
      </label>
    ))}
  </div>
);

/* ── Section Card ── */
const Card = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
    <h2 className="font-bold text-gray-800 text-sm" style={{ fontFamily: "'Georgia',serif" }}>{title}</h2>
    {children}
  </div>
);

/* ── Label ── */
const Label = ({ children }: { children: React.ReactNode }) => (
  <p className="text-xs font-semibold text-gray-600 mb-1">{children}</p>
);

/* ── Input ── */
const Input = ({ placeholder, value, onChange }: {
  placeholder?: string; value: string; onChange: (v: string) => void;
}) => (
  <input
    value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-500 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent transition"
  />
);

export default function NotificationSettings() {
  const [tab, setTab] = useState<Tab>("Notifications");

  /* Categories */
  const [catProductCount, setCatProductCount] = useState<"yes"|"no">("yes");
  const [defaultItems,    setDefaultItems]    = useState("000000");

  /* Reviews */
  const [allowReviews,      setAllowReviews]      = useState<"yes"|"no">("yes");
  const [allowGuestReviews, setAllowGuestReviews] = useState<"yes"|"no">("no");

  /* Vouchers */
  const [minVouchers, setMinVouchers] = useState("1");
  const [maxVouchers, setMaxVouchers] = useState("12");

  /* Tax */
  const [pricesWithTax, setPricesWithTax] = useState<"yes"|"no">("yes");
  const [defaultTaxRate, setDefaultTaxRate] = useState("12%");

  /* Customers */
  const [custOnline,     setCustOnline]     = useState<"yes"|"no">("yes");
  const [custSearches,   setCustSearches]   = useState<"yes"|"no">("yes");
  const [guestCheckout,  setGuestCheckout]  = useState<"yes"|"no">("no");
  const [loginDispPrice, setLoginDispPrice] = useState<"yes"|"no">("no");
  const [maxLogin,       setMaxLogin]       = useState("1 Hour");

  const [saved, setSaved] = useState(false);

  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2500); };
  const handleCancel = () => {
    setCatProductCount("yes"); setDefaultItems("000000");
    setAllowReviews("yes"); setAllowGuestReviews("no");
    setMinVouchers("1"); setMaxVouchers("12");
    setPricesWithTax("yes"); setDefaultTaxRate("12%");
    setCustOnline("yes"); setCustSearches("yes");
    setGuestCheckout("no"); setLoginDispPrice("no");
    setMaxLogin("1 Hour");
  };

  return (
    <div className="min-h-screen px-6 py-8"
      style={{ background: "linear-gradient(135deg,#fff5f7 0%,#fdf2ff 55%,#fff9f0 100%)", fontFamily: "'Lato','Segoe UI',sans-serif" }}>
      <div className="max-w-3xl mx-auto">

        {/* ── Header ── */}
        <div className="flex items-start justify-between mb-5">
          <div>
            <h1 className="text-2xl font-bold text-gray-800" style={{ fontFamily: "'Georgia',serif" }}>Settings</h1>
            <nav className="flex items-center gap-1 text-xs text-gray-400 mt-1">
              <span className="hover:text-rose-400 cursor-pointer transition">Dashboard</span>
              <span>›</span>
              <span className="text-gray-500 font-medium">Notification</span>
            </nav>
          </div>
          <div className="flex gap-2">
            <button onClick={handleCancel}
              className="px-5 py-2 rounded-xl border border-gray-200 bg-white text-gray-600 text-sm font-medium hover:border-rose-300 hover:text-rose-500 transition shadow-sm">
              Cancel
            </button>
            <button onClick={handleSave}
              className="px-5 py-2 rounded-xl bg-rose-400 text-white text-sm font-semibold hover:bg-rose-500 transition shadow-md shadow-rose-200">
              Save Change
            </button>
          </div>
        </div>

        {/* ── Outer Card with Tabs ── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-5">
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

          <div className="p-5 space-y-4">
            {saved && (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs rounded-xl px-4 py-3 font-medium">
                ✓ Settings saved successfully!
              </div>
            )}

            {/* ── Row 1: Categories + Reviews ── */}
            <div className="grid grid-cols-2 gap-4">
              <Card title="Categories Settings">
                <div>
                  <Label>Category Product Count</Label>
                  <RadioGroup value={catProductCount} onChange={setCatProductCount} name="catCount" />
                </div>
                <div>
                  <Label>Default Items Per Page</Label>
                  <Input placeholder="000000" value={defaultItems} onChange={setDefaultItems} />
                </div>
              </Card>

              <Card title="Reviews Settings">
                <div>
                  <Label>Allow Reviews</Label>
                  <RadioGroup value={allowReviews} onChange={setAllowReviews} name="reviews" />
                </div>
                <div>
                  <Label>Allow Guest Reviews</Label>
                  <RadioGroup value={allowGuestReviews} onChange={setAllowGuestReviews} name="guestReviews" />
                </div>
              </Card>
            </div>

            {/* ── Row 2: Vouchers + Tax ── */}
            <div className="grid grid-cols-2 gap-4">
              <Card title="Vouchers Settings">
                <div>
                  <Label>Minimum Vouchers</Label>
                  <Input placeholder="1" value={minVouchers} onChange={setMinVouchers} />
                </div>
                <div>
                  <Label>Maximum Vouchers</Label>
                  <Input placeholder="12" value={maxVouchers} onChange={setMaxVouchers} />
                </div>
              </Card>

              <Card title="Tax Settings">
                <div>
                  <Label>Prices with Tax</Label>
                  <RadioGroup value={pricesWithTax} onChange={setPricesWithTax} name="tax" />
                </div>
                <div>
                  <Label>Default Tax Rate</Label>
                  <Input placeholder="12%" value={defaultTaxRate} onChange={setDefaultTaxRate} />
                </div>
              </Card>
            </div>

            {/* ── Row 3: Customers (full width) ── */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <h2 className="font-bold text-gray-800 text-sm mb-4" style={{ fontFamily: "'Georgia',serif" }}>
                Customers Settings
              </h2>
              <div className="grid grid-cols-4 gap-4 mb-4">
                <div>
                  <Label>Customers Online</Label>
                  <RadioGroup value={custOnline} onChange={setCustOnline} name="custOnline" />
                </div>
                <div>
                  <Label>Customer Searches</Label>
                  <RadioGroup value={custSearches} onChange={setCustSearches} name="custSearch" />
                </div>
                <div>
                  <Label>Allow Guest Checkout</Label>
                  <RadioGroup value={guestCheckout} onChange={setGuestCheckout} name="guestChk" />
                </div>
                <div>
                  <Label>Login Display Price</Label>
                  <RadioGroup value={loginDispPrice} onChange={setLoginDispPrice} name="loginPrice" />
                </div>
              </div>
              <div className="max-w-xs">
                <Label>Max Login Attempts</Label>
                <Input placeholder="1 Hour" value={maxLogin} onChange={setMaxLogin} />
              </div>
            </div>

            {/* ── Bottom Actions ── */}
            <div className="flex justify-end gap-3 pt-3 border-t border-gray-50">
              <button onClick={handleCancel}
                className="px-5 py-2.5 rounded-xl border border-gray-200 bg-white text-gray-600 text-sm font-medium hover:border-rose-300 hover:text-rose-500 transition shadow-sm">
                Cancel
              </button>
              <button onClick={handleSave}
                className="px-6 py-2.5 rounded-xl bg-rose-400 text-white text-sm font-semibold hover:bg-rose-500 transition shadow-md shadow-rose-200">
                Save Change
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}