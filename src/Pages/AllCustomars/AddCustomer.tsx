 import { useState } from "react";

const IcoChev = () => <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path d="M5 7l5 5 5-5" strokeLinecap="round" strokeLinejoin="round"/></svg>;

const Label = ({ children, required }: { children: React.ReactNode; required?: boolean }) => (
  <p className="text-xs font-semibold text-gray-600 mb-1.5">
    {children}{required && <span className="text-rose-400 ml-0.5">*</span>}
  </p>
);

const Input = ({ placeholder, value, onChange, type = "text" }: {
  placeholder?: string; value: string; onChange: (v: string) => void; type?: string;
}) => (
  <input type={type} value={value} onChange={e => onChange(e.target.value)}
    placeholder={placeholder}
    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent transition"
  />
);

const Section = ({ title, sub, children }: { title: string; sub?: string; children: React.ReactNode }) => (
  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
    <div>
      <h2 className="font-bold text-gray-800 text-base" style={{ fontFamily:"'Georgia',serif" }}>{title}</h2>
      {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
    </div>
    {children}
  </div>
);

export default function AddCustomer() {
  const [firstName, setFirstName] = useState("");
  const [lastName,  setLastName]  = useState("");
  const [email,     setEmail]     = useState("");
  const [phone,     setPhone]     = useState("");
  const [address,   setAddress]   = useState("");
  const [invEmail,  setInvEmail]  = useState("");
  const [accountId, setAccountId] = useState("");
  const [language,  setLanguage]  = useState("");
  const [invoiceId, setInvoiceId] = useState("");
  const [note,      setNote]      = useState("");
  const [errors,    setErrors]    = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!firstName.trim()) e.firstName = "Required";
    if (!lastName.trim())  e.lastName  = "Required";
    if (!email.trim())     e.email     = "Required";
    else if (!/\S+@\S+\.\S+/.test(email)) e.email = "Invalid email";
    if (!phone.trim())     e.phone     = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = () => {
    if (validate()) alert("Customer saved successfully!");
  };

  const handleCancel = () => {
    setFirstName(""); setLastName(""); setEmail(""); setPhone("");
    setAddress(""); setInvEmail(""); setAccountId(""); setLanguage("");
    setInvoiceId(""); setNote(""); setErrors({});
  };

  const FieldWrap = ({ err, children }: { err?: string; children: React.ReactNode }) => (
    <div>
      {children}
      {err && <p className="text-[11px] text-rose-500 mt-1">{err}</p>}
    </div>
  );

  return (
    <div className="min-h-screen px-6 py-8"
      style={{ background:"linear-gradient(135deg,#fff5f7 0%,#fdf2ff 55%,#fff9f0 100%)", fontFamily:"'Lato','Segoe UI',sans-serif" }}>

      <div className="max-w-3xl mx-auto">
        {/* ── Header ── */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800" style={{ fontFamily:"'Georgia',serif" }}>Add Customer</h1>
            <nav className="flex items-center gap-1 text-xs text-gray-400 mt-1">
              <span className="hover:text-rose-400 cursor-pointer transition">Dashboard</span>
              <span>›</span>
              <span className="hover:text-rose-400 cursor-pointer transition">Customers</span>
              <span>›</span>
              <span className="text-gray-500 font-medium">Add Customer</span>
            </nav>
          </div>
          <div className="flex gap-2">
            <button onClick={handleCancel}
              className="px-5 py-2 rounded-xl border border-gray-200 bg-white text-gray-600 text-sm font-medium hover:border-rose-300 hover:text-rose-500 transition shadow-sm">
              Cancel
            </button>
            <button onClick={handleSave}
              className="px-6 py-2 rounded-xl bg-rose-500 text-white text-sm font-semibold hover:bg-rose-600 transition shadow-md shadow-rose-200">
              Save
            </button>
          </div>
        </div>

        <div className="space-y-5">
          {/* ── Customer Information ── */}
          <Section title="Customer Information" sub="Most important information about the customer">
            <div className="grid grid-cols-2 gap-4">
              <FieldWrap err={errors.firstName}>
                <Label required>First Name</Label>
                <Input placeholder="Placeholder" value={firstName} onChange={v => { setFirstName(v); setErrors(e => ({ ...e, firstName:"" })); }} />
              </FieldWrap>
              <FieldWrap err={errors.lastName}>
                <Label required>Last Name</Label>
                <Input placeholder="Placeholder" value={lastName} onChange={v => { setLastName(v); setErrors(e => ({ ...e, lastName:"" })); }} />
              </FieldWrap>
              <FieldWrap err={errors.email}>
                <Label required>Email</Label>
                <Input placeholder="Placeholder" value={email} type="email" onChange={v => { setEmail(v); setErrors(e => ({ ...e, email:"" })); }} />
              </FieldWrap>
              <FieldWrap err={errors.phone}>
                <Label required>Phone Number</Label>
                <Input placeholder="Placeholder" value={phone} onChange={v => { setPhone(v); setErrors(e => ({ ...e, phone:"" })); }} />
              </FieldWrap>
            </div>
          </Section>

          {/* ── Customer Details ── */}
          <Section title="Customer Details" sub="Shipping address information">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Address</Label>
                <Input placeholder="Placeholder" value={address} onChange={setAddress} />
              </div>
              <div>
                <Label>Invoice Email</Label>
                <Input placeholder="Placeholder" value={invEmail} type="email" onChange={setInvEmail} />
              </div>
              <div>
                <Label>Account ID</Label>
                <Input placeholder="Placeholder" value={accountId} onChange={setAccountId} />
              </div>
              <div>
                <Label>Language</Label>
                <div className="relative">
                  <select value={language} onChange={e => setLanguage(e.target.value)}
                    className="w-full appearance-none px-3 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-300 transition pr-8">
                    <option value="">Choose...</option>
                    <option value="en">English</option>
                    <option value="bn">Bengali</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                    <option value="es">Spanish</option>
                    <option value="ar">Arabic</option>
                  </select>
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"><IcoChev /></span>
                </div>
              </div>
            </div>
            <div className="max-w-xs">
              <Label>Latest Invoice Id :</Label>
              <Input placeholder="Placeholder" value={invoiceId} onChange={setInvoiceId} />
            </div>
          </Section>

          {/* ── Customer Notes ── */}
          <Section title="Customer Notes" sub="Add notes about customer">
            <div>
              <Label>Note</Label>
              <textarea value={note} onChange={e => setNote(e.target.value)}
                placeholder="Add notes about customer"
                rows={4}
                className="w-full max-w-xs px-3 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-rose-300 resize-none transition"
              />
            </div>
          </Section>

          {/* ── Bottom Actions ── */}
          <div className="flex justify-end gap-3 pb-2">
            <button onClick={handleCancel}
              className="px-6 py-2.5 rounded-xl border border-gray-200 bg-white text-gray-600 text-sm font-medium hover:border-rose-300 hover:text-rose-500 transition shadow-sm">
              Cancel
            </button>
            <button onClick={handleSave}
              className="px-8 py-2.5 rounded-xl bg-rose-500 text-white text-sm font-semibold hover:bg-rose-600 transition shadow-md shadow-rose-200">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}