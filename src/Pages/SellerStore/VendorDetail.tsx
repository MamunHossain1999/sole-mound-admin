import { useState, useRef } from "react";

/* ── Icons ── */
const IcoPin    = () => <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-3.5 h-3.5"><path d="M10 2a6 6 0 0 1 6 6c0 4-6 10-6 10S4 12 4 8a6 6 0 0 1 6-6z" strokeLinecap="round"/><circle cx="10" cy="8" r="2"/></svg>;
const IcoMail   = () => <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-3.5 h-3.5"><rect x="2" y="4" width="16" height="12" rx="2"/><path d="M2 7l8 5 8-5" strokeLinecap="round"/></svg>;
const IcoPhone  = () => <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-3.5 h-3.5"><path d="M3 3.5A1.5 1.5 0 0 1 4.5 2h1.6a1 1 0 0 1 .98.8l.6 3a1 1 0 0 1-.29.94L6.2 7.9A11 11 0 0 0 12.1 13.8l1.16-1.21a1 1 0 0 1 .94-.29l3 .6a1 1 0 0 1 .8.98V15.5A1.5 1.5 0 0 1 16.5 17C9.044 17 3 10.956 3 3.5z" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const IcoId     = () => <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-3.5 h-3.5"><rect x="2" y="5" width="16" height="10" rx="2"/><path d="M6 9h4M6 12h2" strokeLinecap="round"/></svg>;
const IcoTx     = () => <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-3.5 h-3.5"><path d="M4 10h12M4 6h8M4 14h6" strokeLinecap="round"/></svg>;
const IcoCalc   = () => <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-3.5 h-3.5"><rect x="3" y="2" width="14" height="16" rx="2"/><path d="M7 7h6M7 11h6M7 15h3" strokeLinecap="round"/></svg>;
const IcoCloud  = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="w-8 h-8 text-violet-400"><path d="M7 16a4 4 0 0 1-.88-7.903A5 5 0 1 1 15.9 6L16 6a5 5 0 0 1 1 9.9M15 13l-3-3m0 0l-3 3m3-3v12" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const IcoDots   = () => <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-gray-400"><circle cx="10" cy="4" r="1.5"/><circle cx="10" cy="10" r="1.5"/><circle cx="10" cy="16" r="1.5"/></svg>;

/* ── Input Field ── */
const Field = ({ label, value, onChange, placeholder, type = "text", full = false }: {
  label?: string; value: string; onChange: (v: string) => void;
  placeholder?: string; type?: string; full?: boolean;
}) => (
  <div className={full ? "col-span-2" : ""}>
    {label && <p className="text-xs text-gray-500 mb-1.5 font-medium">{label}</p>}
    <input type={type} value={value} onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-gray-50/60 text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-300 focus:border-transparent transition"
    />
  </div>
);

/* ── Section Card ── */
const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
    <h2 className="font-bold text-gray-800 text-base" style={{ fontFamily:"'Georgia',serif" }}>{title}</h2>
    {children}
  </div>
);

export default function VendorDetail() {
  const fileRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);

  /* Shop Info */
  const [shopTitle,   setShopTitle]   = useState("TechEdge");
  const [product,     setProduct]     = useState("Fashion");
  const [shopLink,    setShopLink]    = useState("34526");
  const [location,    setLocation]    = useState("");
  const [email,       setEmail]       = useState("Fashion Men , Women & Kid's");
  const [phone,       setPhone]       = useState("Seller");
  const [revenue,     setRevenue]     = useState("$0");
  const [revenue2,    setRevenue2]    = useState("$500");

  /* Product Info */
  const [itemStock,   setItemStock]   = useState("$0");
  const [prodSells,   setProdSells]   = useState("$0");
  const [happyClient, setHappyClient] = useState("$0");

  /* Seller Info */
  const [sellerName,  setSellerName]  = useState("Linda Blair");
  const [sellerEmail, setSellerEmail] = useState("Fashion Men , Women & Kid's");
  const [sellerPhone, setSellerPhone] = useState("Fashion Men , Women & Kid's");
  const [txId,        setTxId]        = useState("Fashion Men , Women & Kid's");

  /* Account Info */
  const [cardName,    setCardName]    = useState("Linda Blair");
  const [cardNumber,  setCardNumber]  = useState("7896543235");
  const [expDate,     setExpDate]     = useState("12/05/2025");
  const [cvc,         setCvc]         = useState("897");

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault(); setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) setUploadedFile(file.name);
  };

  return (
    <div className="min-h-screen"
      style={{ background:"linear-gradient(135deg,#fff5f7 0%,#fdf2ff 60%,#f5f0ff 100%)", fontFamily:"'Lato','Segoe UI',sans-serif" }}>
      <div className="flex gap-0 max-w-5xl mx-auto">

        {/* ── LEFT SIDEBAR ── */}
        <div className="w-52 shrink-0 p-5 space-y-5">

          {/* Store Card */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 relative">
            <button className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition"><IcoDots /></button>
            {/* Logo */}
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-400 to-purple-600 flex items-center justify-center mb-3 shadow">
              <span className="text-white text-3xl font-black" style={{ fontFamily:"'Georgia',serif" }}>✦</span>
            </div>
            <p className="font-bold text-gray-800 text-sm">TechEdge</p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-[10px] bg-violet-100 text-violet-600 px-1.5 py-0.5 rounded-full font-semibold">Fashion</span>
              <span className="text-amber-400 text-xs">⭐</span>
              <span className="text-xs text-gray-500 font-medium">4.5</span>
              <span className="text-xs text-gray-400">3.5k</span>
            </div>
            <p className="text-[11px] text-violet-400 mt-1 hover:underline cursor-pointer">www.techedge.co</p>

            {/* Info */}
            <div className="mt-3 space-y-1.5">
              {[
                { icon: <IcoPin />,  text: "4604, Phill Lane Kiowa IN 47404" },
                { icon: <IcoMail />, text: "zarafashionworld@dayrep.com" },
                { icon: <IcoPhone />,text: "+243 812-801-9335" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-1.5 text-[10px] text-gray-500">
                  <span className="text-violet-400 mt-0.5 shrink-0">{item.icon}</span>
                  <span className="leading-snug">{item.text}</span>
                </div>
              ))}
            </div>

            {/* Revenue bar */}
            <div className="mt-3">
              <div className="flex justify-between text-[10px] text-gray-500 mb-1">
                <span>Fashion</span><span className="font-bold text-gray-700">$200k ↑</span>
              </div>
              <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-violet-400 to-purple-500 rounded-full w-3/4" />
              </div>
            </div>

            {/* Stats */}
            <div className="mt-3 flex justify-between text-center">
              {[
                { label:"Item Stock", value:"865" },
                { label:"Sells",      value:"+4.5k" },
                { label:"Happy Client", value:"+2k" },
              ].map(s => (
                <div key={s.label}>
                  <p className="text-xs font-bold text-gray-800">{s.value}</p>
                  <p className="text-[9px] text-gray-400 leading-tight">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Seller Profile Card */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            {/* Banner */}
            <div className="h-16 bg-gradient-to-br from-gray-100 to-gray-200 relative">
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-slate-400 to-gray-600 flex items-center justify-center text-white text-lg font-bold border-2 border-white shadow">
                  LB
                </div>
              </div>
            </div>
            <div className="pt-9 pb-4 px-4 text-center">
              <p className="font-bold text-gray-800 text-sm">Linda Blair</p>
              <p className="text-[11px] text-gray-400">@linda_blair321</p>

              <div className="mt-4 space-y-2 text-left">
                {[
                  { icon: <IcoId />,   label: "Seller ID",          val: "ID-011221" },
                  { icon: <IcoMail />, label: "Email",              val: "lindablair@mail.com" },
                  { icon: <IcoPhone />,label: "Phone Number",       val: "050 414 8778" },
                  { icon: <IcoTx />,   label: "Transaction ID",     val: "98764536" },
                  { icon: <IcoCalc />, label: "Latest Transaction", val: "12 December 2022" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="text-violet-400 mt-0.5 shrink-0">{item.icon}</span>
                    <div>
                      <p className="text-[9px] text-gray-400 leading-none">{item.label}</p>
                      <p className="text-[11px] text-gray-700 font-medium leading-snug">{item.val}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── RIGHT CONTENT ── */}
        <div className="flex-1 p-5 space-y-4">

          {/* Thumbnail Upload */}
          <Section title="Add Thumbnail Photo">
            <div
              onDragOver={e => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl py-8 flex flex-col items-center gap-2 cursor-pointer transition
                ${dragging ? "border-violet-400 bg-violet-50" : "border-violet-200 bg-violet-50/20 hover:bg-violet-50 hover:border-violet-300"}`}
            >
              <IcoCloud />
              <p className="text-sm text-gray-500 text-center">
                Drop your images here, or{" "}
                <span className="text-violet-500 font-semibold hover:underline">click to browse</span>
              </p>
              <p className="text-[11px] text-gray-400">1600 × 1200 (4:3) recommended. PNG, JPG and GIF files are allowed</p>
              <input ref={fileRef} type="file" accept="image/*" className="hidden"
                onChange={e => e.target.files?.[0] && setUploadedFile(e.target.files[0].name)} />
            </div>
            {uploadedFile && (
              <p className="text-xs text-violet-500 font-medium">✓ {uploadedFile}</p>
            )}
          </Section>

          {/* Shop Information */}
          <Section title="Shop Information">
            <div className="grid grid-cols-2 gap-4">
              <Field label="Shop Title"    value={shopTitle}  onChange={setShopTitle}  placeholder="Shop title" />
              <Field label="Product"       value={product}    onChange={setProduct}    placeholder="Product type" />
              <Field label="Shop link"     value={shopLink}   onChange={setShopLink}   placeholder="Shop link" />
              <Field label="Location"      value={location}   onChange={setLocation}   placeholder="Location" />
              <Field label="Email"         value={email}      onChange={setEmail}      placeholder="Email" />
              <Field label="Phone Number"  value={phone}      onChange={setPhone}      placeholder="Phone number" />
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1.5 font-medium">Yearly Revenue</p>
              <div className="grid grid-cols-2 gap-4">
                <Field value={revenue}  onChange={setRevenue}  placeholder="$0" />
                <Field value={revenue2} onChange={setRevenue2} placeholder="$500" />
              </div>
            </div>
          </Section>

          {/* Seller Product Information */}
          <Section title="Seller Product Information">
            <div className="grid grid-cols-3 gap-4">
              <Field label="Items Stock"    value={itemStock}   onChange={setItemStock}   placeholder="$0" />
              <Field label="Product Sells"  value={prodSells}   onChange={setProdSells}   placeholder="$0" />
              <Field label="Happy Client"   value={happyClient} onChange={setHappyClient} placeholder="$0" />
            </div>
          </Section>

          {/* Seller Information */}
          <Section title="Seller Information">
            <div className="grid grid-cols-2 gap-4">
              <Field label="Seller Name"   value={sellerName}  onChange={setSellerName}  placeholder="Seller name" />
              <Field label="Email"         value={sellerEmail} onChange={setSellerEmail} placeholder="Email" />
              <Field label="Phone Number"  value={sellerPhone} onChange={setSellerPhone} placeholder="Phone number" />
              <Field label="Transaction ID"value={txId}        onChange={setTxId}        placeholder="Transaction ID" />
            </div>
          </Section>

          {/* Account Information */}
          <Section title="Account Information">
            <div className="grid grid-cols-2 gap-4">
              <Field label="Name on Card"  value={cardName}   onChange={setCardName}   placeholder="Name on card" />
              <Field label="Card Number"   value={cardNumber} onChange={setCardNumber} placeholder="Card number" />
              <Field label="Expire Date"   value={expDate}    onChange={setExpDate}    placeholder="MM/YY" />
              <Field label="CVC"           value={cvc}        onChange={setCvc}        placeholder="CVC" />
            </div>
          </Section>

          {/* Actions */}
          <div className="flex justify-end gap-3 pb-4">
            <button className="px-6 py-2.5 rounded-xl border border-gray-200 bg-white text-gray-600 text-sm font-medium hover:border-violet-300 hover:text-violet-500 transition shadow-sm">
              Cancel
            </button>
            <button className="px-8 py-2.5 rounded-xl bg-violet-500 text-white text-sm font-semibold hover:bg-violet-600 transition shadow-md shadow-violet-200">
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}