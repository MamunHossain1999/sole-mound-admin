import { useState } from "react";

type TStatus = "Activated" | "Approved" | "Pending";

interface Transaction {
  invoiceId: string;
  product: string;
  subProducts?: string;
  emoji: string;
  bg: string;
  status: TStatus;
  total: number;
  date: string;
}

const TRANSACTIONS: Transaction[] = [
  { invoiceId:"#VB4532", product:"Handmade Pouch",   subProducts:"+3 other products", emoji:"👜", bg:"from-amber-100 to-yellow-50",  status:"Activated", total:990,  date:"29 Dec 2022" },
  { invoiceId:"#VB4532", product:"Smartwatch E2",    subProducts:"+1 other products", emoji:"⌚", bg:"from-slate-100 to-gray-50",    status:"Activated", total:208,  date:"24 Dec 2022" },
  { invoiceId:"#VB4532", product:"Headphone G1 Pro", subProducts:"+1 other products", emoji:"🎧", bg:"from-orange-100 to-amber-50",  status:"Activated", total:693,  date:"12 Dec 2022" },
  { invoiceId:"#VB4532", product:"Smartwatch E1",                                     emoji:"⌚", bg:"from-gray-100 to-slate-50",    status:"Activated", total:826,  date:"21 Oct 2022" },
  { invoiceId:"#VB4532", product:"Smartwatch E2",    subProducts:"+1 other products", emoji:"⌚", bg:"from-sky-100 to-blue-50",      status:"Approved",  total:343,  date:"21 Oct 2022" },
];

const STATUS_STYLE: Record<TStatus, string> = {
  Activated: "bg-emerald-100 text-emerald-700 border border-emerald-200",
  Approved:  "bg-sky-100     text-sky-700     border border-sky-200",
  Pending:   "bg-amber-100   text-amber-600   border border-amber-200",
};

/* ── Icons ── */
const IcoSearch  = () => <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4"><circle cx="9" cy="9" r="6"/><path d="M15 15l-3-3" strokeLinecap="round"/></svg>;
const IcoFilter  = () => <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4"><path d="M3 5h14M6 10h8M9 15h2" strokeLinecap="round"/></svg>;
const IcoChev    = ({ d }: { d:"l"|"r"|"down" }) => <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5"><path d={d==="l"?"M13 5l-5 5 5 5":d==="r"?"M7 5l5 5-5 5":"M5 7l5 5 5-5"} strokeLinecap="round" strokeLinejoin="round"/></svg>;
const IcoSort    = () => <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-3 h-3 opacity-40"><path d="M7 8l3-3 3 3M7 12l3 3 3-3" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const IcoBalance = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-5 h-5 text-violet-500"><rect x="2" y="5" width="20" height="14" rx="3"/><path d="M2 10h20" strokeLinecap="round"/><path d="M6 15h4" strokeLinecap="round"/></svg>;
const IcoOrders  = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-5 h-5 text-rose-400"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" strokeLinecap="round" strokeLinejoin="round"/><path d="M3 6h18M16 10a4 4 0 0 1-8 0" strokeLinecap="round"/></svg>;
const IcoStar    = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-5 h-5 text-amber-400"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const IcoMail    = () => <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-3.5 h-3.5 text-gray-400"><rect x="2" y="4" width="16" height="12" rx="2"/><path d="M2 7l8 5 8-5" strokeLinecap="round"/></svg>;
const IcoPhone   = () => <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-3.5 h-3.5 text-gray-400"><path d="M3 3.5A1.5 1.5 0 0 1 4.5 2h1.6a1 1 0 0 1 .98.8l.6 3a1 1 0 0 1-.29.94L6.2 7.9A11 11 0 0 0 12.1 13.8l1.16-1.21a1 1 0 0 1 .94-.29l3 .6a1 1 0 0 1 .8.98V15.5A1.5 1.5 0 0 1 16.5 17C9.044 17 3 10.956 3 3.5z" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const IcoDot     = () => <svg viewBox="0 0 8 8" fill="#22c55e" className="w-2.5 h-2.5"><circle cx="4" cy="4" r="4"/></svg>;

const Thumb = ({ emoji, bg }: { emoji: string; bg: string }) => (
  <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${bg} flex items-center justify-center text-lg shadow-inner shrink-0`}>{emoji}</div>
);

export default function CustomerDetails() {
  const [search,   setSearch]   = useState("");
  const [filterSt, setFilterSt] = useState<"All"|TStatus>("All");
  const [showFilt, setFilt]     = useState(false);
  const [sortCol,  setSortCol]  = useState<"total"|"date"|null>(null);
  const [sortDir,  setSortDir]  = useState<"asc"|"desc">("asc");

  const handleSort = (col: "total"|"date") => {
    if (sortCol === col) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortCol(col); setSortDir("asc"); }
  };

  const filtered = TRANSACTIONS.filter(t => {
    const q = search.toLowerCase();
    const ms = t.product.toLowerCase().includes(q) || t.invoiceId.toLowerCase().includes(q);
    const mst = filterSt === "All" || t.status === filterSt;
    return ms && mst;
  });

  const sorted = sortCol ? [...filtered].sort((a, b) => {
    if (sortCol === "total") return sortDir === "asc" ? a.total - b.total : b.total - a.total;
    return sortDir === "asc"
      ? new Date(a.date).getTime() - new Date(b.date).getTime()
      : new Date(b.date).getTime() - new Date(a.date).getTime();
  }) : filtered;

  const SortIcon = ({ col }: { col: "total"|"date" }) =>
    sortCol === col ? <span className="opacity-60 text-xs">{sortDir === "asc" ? "↑" : "↓"}</span> : <IcoSort />;

  return (
    <div className="min-h-screen px-6 py-8"
      style={{ background:"linear-gradient(135deg,#fff5f7 0%,#fdf2ff 55%,#fff9f0 100%)", fontFamily:"'Lato','Segoe UI',sans-serif" }}>

      {/* ── Page Header ── */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800" style={{ fontFamily:"'Georgia',serif" }}>Customers Details</h1>
        <nav className="flex items-center gap-1 text-xs text-gray-400 mt-1">
          <span className="hover:text-rose-400 cursor-pointer transition">Dashboard</span>
          <span>›</span>
          <span className="hover:text-rose-400 cursor-pointer transition">All Customers</span>
          <span>›</span>
          <span className="text-gray-500 font-medium">Customer Details</span>
        </nav>
      </div>

      <div className="flex gap-5 items-start">

        {/* ── LEFT: Customer Profile Card ── */}
        <div className="w-52 shrink-0 space-y-4">
          <div className="bg-white rounded-2xl border border-rose-50 shadow-sm overflow-hidden">
            {/* Banner */}
            <div className="h-20 relative"
              style={{ background:"repeating-linear-gradient(45deg,#fce7f3,#fce7f3 4px,#fff5f7 4px,#fff5f7 14px)" }}>
              <div className="absolute bottom-0 left-4 translate-y-1/2">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-rose-300 to-pink-400 flex items-center justify-center text-white text-xl font-bold border-2 border-white shadow-md">
                  MA
                </div>
              </div>
            </div>

            <div className="pt-10 pb-5 px-4">
              {/* Name + status */}
              <div className="flex items-center justify-between mb-0.5">
                <div className="flex items-center gap-1.5">
                  <p className="font-bold text-gray-800 text-sm leading-tight">Michael A. Miner</p>
                  <IcoDot />
                </div>
                <button className="text-xs text-rose-500 font-semibold border border-rose-200 px-2 py-0.5 rounded-lg hover:bg-rose-50 transition">
                  Edit
                </button>
              </div>
              <p className="text-[11px] text-gray-400 mb-3">@michael_cus_2024</p>

              <div className="space-y-1.5 mb-4">
                <div className="flex items-center gap-1.5 text-[11px] text-gray-500">
                  <IcoMail /><span>michaelaminer@dayrep.com</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-gray-500">
                  <IcoPhone /><span>+28 (57) 760-010-27</span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex gap-2">
                <button className="flex-1 py-2 rounded-xl bg-rose-500 text-white text-xs font-semibold hover:bg-rose-600 transition shadow shadow-rose-200">
                  Send Message
                </button>
                <button className="flex-1 py-2 rounded-xl border border-rose-200 text-rose-500 text-xs font-semibold hover:bg-rose-50 transition">
                  Delete Customer
                </button>
              </div>
            </div>
          </div>

          {/* Customer Details */}
          <div className="bg-white rounded-2xl border border-rose-50 shadow-sm p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-gray-800 text-sm" style={{ fontFamily:"'Georgia',serif" }}>Customer Details</h3>
              <span className="text-[10px] font-bold bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-200">Active User</span>
            </div>
            {[
              { label:"Account ID",        val:"#AC-278699" },
              { label:"Invoice Email",     val:"michaelaminer@dayrep.com" },
              { label:"Delivery Address",  val:"62, rue des, Nations Unies 2200" },
              { label:"Language",          val:"English" },
              { label:"Latest Invoice Id", val:"#INV2540" },
            ].map(item => (
              <div key={item.label}>
                <p className="text-[10px] text-gray-400 leading-none">{item.label}</p>
                <p className="text-[11px] text-gray-700 font-medium leading-snug mt-0.5">{item.val}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT: Stats + Transaction History ── */}
        <div className="flex-1 space-y-4">

          {/* Stat Cards */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { icon:<IcoBalance />, label:"Total Balance",  value:"$723.00", bg:"from-violet-50 to-purple-50" },
              { icon:<IcoOrders />,  label:"Total Orders",   value:"1,29",    bg:"from-rose-50 to-pink-50"     },
              { icon:<IcoStar />,    label:"Rewards Point",  value:"1400",    bg:"from-amber-50 to-yellow-50"  },
            ].map(s => (
              <div key={s.label} className={`bg-gradient-to-br ${s.bg} rounded-2xl border border-white shadow-sm p-4 flex items-center gap-3`}>
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm shrink-0">
                  {s.icon}
                </div>
                <div>
                  <p className="text-xs text-gray-400">{s.label}</p>
                  <p className="text-lg font-bold text-gray-800">{s.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Transaction History */}
          <div className="bg-white rounded-2xl border border-rose-50 shadow-sm overflow-hidden">
            {/* Toolbar */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-rose-50 gap-3">
              <h2 className="font-bold text-gray-800 text-base" style={{ fontFamily:"'Georgia',serif" }}>
                Transaction History
              </h2>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <input value={search} onChange={e => setSearch(e.target.value)}
                    placeholder="Search product"
                    className="pl-3 pr-8 py-2 rounded-xl border border-rose-100 bg-rose-50/40 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300 placeholder-rose-300 w-44 transition"
                  />
                  <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-rose-400"><IcoSearch /></span>
                </div>
                <div className="relative">
                  <button onClick={() => setFilt(!showFilt)}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl border border-rose-100 bg-white text-gray-600 text-sm font-medium hover:border-rose-300 hover:text-rose-500 transition">
                    <IcoFilter /> Filter
                    {filterSt !== "All" && <span className="w-2 h-2 rounded-full bg-rose-500" />}
                  </button>
                  {showFilt && (
                    <div className="absolute right-0 top-11 bg-white border border-rose-100 rounded-2xl shadow-xl z-30 p-3 w-40">
                      <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-2 px-1">Status</p>
                      {(["All","Activated","Approved","Pending"] as const).map(s => (
                        <button key={s} onClick={() => { setFilterSt(s); setFilt(false); }}
                          className={`w-full text-left px-3 py-1.5 rounded-lg text-sm transition mb-0.5 ${filterSt===s?"bg-rose-500 text-white font-semibold":"text-gray-600 hover:bg-rose-50"}`}>
                          {s}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Table */}
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-xs text-gray-400 uppercase tracking-wider">
                  <th className="px-5 py-3 text-left">
                    <span className="flex items-center gap-1">Invoice ID <IcoSort /></span>
                  </th>
                  <th className="px-3 py-3 text-left">Product</th>
                  <th className="px-3 py-3 text-left">
                    <span className="flex items-center gap-1">Status <IcoSort /></span>
                  </th>
                  <th className="px-3 py-3 text-left cursor-pointer select-none" onClick={() => handleSort("total")}>
                    <span className="flex items-center gap-1">Total <SortIcon col="total" /></span>
                  </th>
                  <th className="px-3 py-3 text-left cursor-pointer select-none" onClick={() => handleSort("date")}>
                    <span className="flex items-center gap-1">Date <SortIcon col="date" /></span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {sorted.length === 0 ? (
                  <tr><td colSpan={5} className="py-10 text-center text-gray-400 text-sm">No transactions found.</td></tr>
                ) : sorted.map((t, i) => (
                  <tr key={i} className="border-b border-gray-50 hover:bg-rose-50/30 transition">
                    <td className="px-5 py-3.5">
                      <span className="text-rose-500 font-mono font-semibold hover:underline cursor-pointer text-xs">{t.invoiceId}</span>
                    </td>
                    <td className="px-3 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <Thumb emoji={t.emoji} bg={t.bg} />
                        <div>
                          <p className="font-semibold text-gray-700 leading-tight text-xs">{t.product}</p>
                          {t.subProducts && <p className="text-[10px] text-gray-400">{t.subProducts}</p>}
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-3.5">
                      <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${STATUS_STYLE[t.status]}`}>
                        {t.status}
                      </span>
                    </td>
                    <td className="px-3 py-3.5 font-bold text-gray-800">${t.total.toFixed(1)}</td>
                    <td className="px-3 py-3.5 text-gray-500 whitespace-nowrap text-xs">{t.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}