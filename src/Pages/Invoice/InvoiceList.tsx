import { useState } from "react";

type IStatus = "Completed" | "Pending" | "Cancelled";
type IMethod = "Mastercard" | "Visa" | "PayPal" | "Credit Card";

interface Invoice {
  id: number;
  invoiceId: string;
  name: string;
  avatarBg: string;
  initials: string;
  dueDate: string;
  totalBuy: number | string;
  method: IMethod;
  status: IStatus;
}

const INITIAL: Invoice[] = [
  { id:1,  invoiceId:"#VB4532", name:"Ashley Foster",  avatarBg:"from-rose-400    to-pink-500",    initials:"AF", dueDate:"29 Dec 2022", totalBuy:990,  method:"Mastercard",  status:"Completed" },
  { id:2,  invoiceId:"#VB4532", name:"Ellie Parker",   avatarBg:"from-violet-400  to-purple-500",  initials:"EP", dueDate:"24 Dec 2022", totalBuy:208,  method:"Visa",        status:"Pending"   },
  { id:3,  invoiceId:"#VB4532", name:"Eric Lawson",    avatarBg:"from-sky-400     to-blue-500",    initials:"EL", dueDate:"12 Dec 2022", totalBuy:693,  method:"Mastercard",  status:"Completed" },
  { id:4,  invoiceId:"#VB4532", name:"Colin Hunt",     avatarBg:"from-amber-400   to-orange-400",  initials:"CH", dueDate:"21 Oct 2022", totalBuy:826,  method:"PayPal",      status:"Cancelled" },
  { id:5,  invoiceId:"#VB4532", name:"Georgia White",  avatarBg:"from-teal-400    to-cyan-500",    initials:"GW", dueDate:"21 Oct 2022", totalBuy:343,  method:"Mastercard",  status:"Completed" },
  { id:6,  invoiceId:"#VB4532", name:"Kate Richards",  avatarBg:"from-fuchsia-400 to-pink-500",    initials:"KR", dueDate:"21 Oct 2022", totalBuy:306,  method:"PayPal",      status:"Completed" },
  { id:7,  invoiceId:"#VB4532", name:"Noah Ellis",     avatarBg:"from-indigo-400  to-blue-500",    initials:"NE", dueDate:"19 Sep 2022", totalBuy:549,  method:"Mastercard",  status:"Completed" },
  { id:8,  invoiceId:"#VB4532", name:"Jackson Brooks", avatarBg:"from-orange-400  to-red-400",     initials:"JB", dueDate:"19 Sep 2022", totalBuy:777,  method:"Mastercard",  status:"Pending"   },
  { id:9,  invoiceId:"#VB4532", name:"Arthur Knight",  avatarBg:"from-emerald-400 to-green-500",   initials:"AK", dueDate:"19 Sep 2022", totalBuy:616,  method:"Credit Card", status:"Completed" },
  { id:10, invoiceId:"#VB4532", name:"Lucas James",    avatarBg:"from-slate-400   to-gray-500",    initials:"LJ", dueDate:"10 Aug 2022", totalBuy:482,  method:"Mastercard",  status:"Cancelled" },
  { id:11, invoiceId:"#VB4532", name:"Sophia Turner",  avatarBg:"from-pink-400    to-rose-500",    initials:"ST", dueDate:"05 Aug 2022", totalBuy:310,  method:"Visa",        status:"Pending"   },
  { id:12, invoiceId:"#VB4532", name:"Liam Scott",     avatarBg:"from-red-400     to-rose-500",    initials:"LS", dueDate:"01 Aug 2022", totalBuy:890,  method:"Mastercard",  status:"Completed" },
  { id:13, invoiceId:"#VB4532", name:"Olivia Brown",   avatarBg:"from-cyan-400    to-teal-500",    initials:"OB", dueDate:"28 Jul 2022", totalBuy:1240, method:"Credit Card", status:"Completed" },
];

const PAGE_SIZE = 10;

const STATUS_STYLE: Record<IStatus, string> = {
  Completed: "bg-emerald-100 text-emerald-700 border border-emerald-200",
  Pending:   "bg-amber-100   text-amber-600   border border-amber-200",
  Cancelled: "bg-red-100     text-red-600     border border-red-200",
};

const statCards = [
  { label:"Total Invoice",    value:"2310", icon:"💳", bg:"from-violet-100 to-purple-50" },
  { label:"Pending Invoice",  value:"1000", icon:"⏳", bg:"from-rose-100   to-pink-50"   },
  { label:"Paid Invoice",     value:"1310", icon:"✅", bg:"from-emerald-100 to-green-50" },
  { label:"Inactive Invoice", value:"1243", icon:"🔕", bg:"from-gray-100   to-slate-50"  },
];

/* ── Icons ── */
const IcoSearch = () => <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4"><circle cx="9" cy="9" r="6"/><path d="M15 15l-3-3" strokeLinecap="round"/></svg>;
const IcoFilter = () => <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4"><path d="M3 5h14M6 10h8M9 15h2" strokeLinecap="round"/></svg>;
const IcoEdit   = () => <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4"><path d="M14.5 2.5a2.121 2.121 0 0 1 3 3L6 17l-4 1 1-4L14.5 2.5z" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const IcoTrash  = () => <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4"><path d="M6 7h8M8 7V5h4v2M9 10v4M11 10v4M5 7l1 10h8l1-10" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const IcoEye    = () => <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4"><ellipse cx="10" cy="10" rx="8" ry="5" strokeLinecap="round"/><circle cx="10" cy="10" r="2"/></svg>;
const IcoExport = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4"><path d="M12 3v9M8 8l4-5 4 5" strokeLinecap="round" strokeLinejoin="round"/><path d="M3 14v2a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-2" strokeLinecap="round"/></svg>;
const IcoImport = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4"><path d="M12 15V6M8 12l4 4 4-4" strokeLinecap="round" strokeLinejoin="round"/><path d="M3 14v2a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-2" strokeLinecap="round"/></svg>;
const IcoChev   = ({ d }: { d:"l"|"r" }) => <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path d={d==="l"?"M13 5l-5 5 5 5":"M7 5l5 5-5 5"} strokeLinecap="round" strokeLinejoin="round"/></svg>;
const IcoSort   = () => <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-3 h-3 opacity-40"><path d="M7 8l3-3 3 3M7 12l3 3 3-3" strokeLinecap="round" strokeLinejoin="round"/></svg>;

const Avatar = ({ initials, bg }: { initials: string; bg: string }) => (
  <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${bg} flex items-center justify-center text-white text-xs font-bold shadow shrink-0`}>
    {initials}
  </div>
);

export default function InvoicePage() {
  const [data,     setData]     = useState<Invoice[]>(INITIAL);
  const [search,   setSearch]   = useState("");
  const [page,     setPage]     = useState(1);
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [showFilt, setFilt]     = useState(false);
  const [filterSt, setFilterSt] = useState<"All"|IStatus>("All");
  const [sortCol,  setSortCol]  = useState<"name"|"dueDate"|"totalBuy"|null>(null);
  const [sortDir,  setSortDir]  = useState<"asc"|"desc">("asc");

  const handleSort = (col: "name"|"dueDate"|"totalBuy") => {
    if (sortCol === col) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortCol(col); setSortDir("asc"); }
  };

  const filtered = data.filter(i => {
    const q = search.toLowerCase();
    const ms = i.name.toLowerCase().includes(q) || i.invoiceId.toLowerCase().includes(q) || i.method.toLowerCase().includes(q);
    const mst = filterSt === "All" || i.status === filterSt;
    return ms && mst;
  });

  const sorted = sortCol ? [...filtered].sort((a, b) => {
    if (sortCol === "totalBuy") return sortDir === "asc"
      ? Number(a.totalBuy) - Number(b.totalBuy)
      : Number(b.totalBuy) - Number(a.totalBuy);
    if (sortCol === "dueDate") return sortDir === "asc"
      ? new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
      : new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime();
    return sortDir === "asc"
      ? a.name.localeCompare(b.name)
      : b.name.localeCompare(a.name);
  }) : filtered;

  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const pageData   = sorted.slice((page-1)*PAGE_SIZE, page*PAGE_SIZE);

  const toggle = (id: number) => setSelected(prev => {
    const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n;
  });
  const toggleAll = () =>
    setSelected(selected.size === pageData.length ? new Set() : new Set(pageData.map(i => i.id)));

  const deleteRow = (id: number) => {
    setData(d => d.filter(x => x.id !== id));
    setSelected(prev => { const n = new Set(prev); n.delete(id); return n; });
  };

  const SortIcon = ({ col }: { col: "name"|"dueDate"|"totalBuy" }) =>
    sortCol === col ? <span className="opacity-60 text-xs">{sortDir === "asc" ? "↑" : "↓"}</span> : <IcoSort />;

  return (
    <div className="min-h-screen px-6 py-8"
      style={{ background:"linear-gradient(135deg,#fff5f7 0%,#fdf2ff 55%,#fff9f0 100%)", fontFamily:"'Lato','Segoe UI',sans-serif" }}>

      {/* ── Header ── */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800" style={{ fontFamily:"'Georgia',serif" }}>Invoice</h1>
          <nav className="flex items-center gap-1 text-xs text-gray-400 mt-1">
            <span className="hover:text-rose-400 cursor-pointer transition">Dashboard</span>
            <span>›</span>
            <span className="hover:text-rose-400 cursor-pointer transition">Invoice</span>
            <span>›</span>
            <span className="text-gray-500 font-medium">List</span>
          </nav>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 bg-white text-gray-700 text-sm font-medium hover:border-rose-300 hover:text-rose-500 transition shadow-sm">
            <IcoExport /> Export
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 bg-white text-gray-700 text-sm font-medium hover:border-rose-300 hover:text-rose-500 transition shadow-sm">
            <IcoImport /> Export
          </button>
        </div>
      </div>

      {/* ── Stat Cards ── */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {statCards.map(s => (
          <div key={s.label} className={`bg-gradient-to-br ${s.bg} rounded-2xl border border-white shadow-sm p-4 flex items-center justify-between`}>
            <div>
              <p className="text-xs text-gray-500 mb-1">{s.label}</p>
              <p className="text-2xl font-bold text-gray-800">{s.value}</p>
            </div>
            <div className="w-10 h-10 bg-white/70 rounded-xl flex items-center justify-center text-xl shadow-sm">
              {s.icon}
            </div>
          </div>
        ))}
      </div>

      {/* ── Table Card ── */}
      <div className="bg-white rounded-3xl shadow-sm border border-rose-50 overflow-hidden">

        {/* Toolbar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-rose-50 gap-4 flex-wrap">
          <h2 className="font-bold text-gray-800 text-base" style={{ fontFamily:"'Georgia',serif" }}>All Invoices List</h2>
          <div className="flex items-center gap-3">
            <div className="relative">
              <input value={search} onChange={e => { setSearch(e.target.value); setPage(1); }}
                placeholder="Search product"
                className="pl-4 pr-9 py-2.5 rounded-xl border border-rose-100 bg-rose-50/40 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300 placeholder-rose-300 w-52 transition"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-rose-400"><IcoSearch /></span>
            </div>
            <div className="relative">
              <button onClick={() => setFilt(!showFilt)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-rose-100 bg-white text-gray-600 text-sm font-medium hover:border-rose-300 hover:text-rose-500 transition">
                <IcoFilter /> Filter
                {filterSt !== "All" && <span className="w-2 h-2 rounded-full bg-rose-500" />}
              </button>
              {showFilt && (
                <div className="absolute right-0 top-12 bg-white border border-rose-100 rounded-2xl shadow-xl z-30 p-3 w-44">
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-2 px-1">Status</p>
                  {(["All","Completed","Pending","Cancelled"] as const).map(s => (
                    <button key={s} onClick={() => { setFilterSt(s); setFilt(false); setPage(1); }}
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
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-xs text-gray-400 uppercase tracking-wider">
                <th className="px-6 py-3 text-left w-10">
                  <input type="checkbox"
                    checked={selected.size === pageData.length && pageData.length > 0}
                    onChange={toggleAll}
                    className="accent-rose-500 w-4 h-4 rounded"
                  />
                </th>
                <th className="px-3 py-3 text-left cursor-pointer select-none" onClick={() => handleSort("name")}>
                  <span className="flex items-center gap-1">Invoice ID <SortIcon col="name"/></span>
                </th>
                <th className="px-3 py-3 text-left cursor-pointer select-none" onClick={() => handleSort("name")}>
                  <span className="flex items-center gap-1">Name <SortIcon col="name"/></span>
                </th>
                <th className="px-3 py-3 text-left cursor-pointer select-none" onClick={() => handleSort("dueDate")}>
                  <span className="flex items-center gap-1">Due Date <SortIcon col="dueDate"/></span>
                </th>
                <th className="px-3 py-3 text-left cursor-pointer select-none" onClick={() => handleSort("totalBuy")}>
                  <span className="flex items-center gap-1">Total Buy <SortIcon col="totalBuy"/></span>
                </th>
                <th className="px-3 py-3 text-left">Method</th>
                <th className="px-3 py-3 text-left">
                  <span className="flex items-center gap-1">Status <IcoSort /></span>
                </th>
                <th className="px-3 py-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {pageData.length === 0 ? (
                <tr><td colSpan={8} className="py-16 text-center text-gray-400 text-sm">No invoices found.</td></tr>
              ) : pageData.map(inv => (
                <tr key={inv.id}
                  className={`border-b border-gray-50 transition ${selected.has(inv.id)?"bg-rose-50/50":"hover:bg-gray-50/40"}`}>
                  <td className="px-6 py-3.5">
                    <input type="checkbox" checked={selected.has(inv.id)} onChange={() => toggle(inv.id)}
                      className="accent-rose-500 w-4 h-4 rounded" />
                  </td>
                  <td className="px-3 py-3.5">
                    <span className="text-rose-500 font-mono font-semibold text-xs hover:underline cursor-pointer">{inv.invoiceId}</span>
                  </td>
                  <td className="px-3 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <Avatar initials={inv.initials} bg={inv.avatarBg} />
                      <span className="text-rose-400 font-semibold hover:underline cursor-pointer whitespace-nowrap">{inv.name}</span>
                    </div>
                  </td>
                  <td className="px-3 py-3.5 text-gray-600 whitespace-nowrap">{inv.dueDate}</td>
                  <td className="px-3 py-3.5 font-bold text-gray-800">
                    {typeof inv.totalBuy === "number" ? `$${inv.totalBuy.toLocaleString()}` : inv.totalBuy}
                  </td>
                  <td className="px-3 py-3.5 text-gray-600">{inv.method}</td>
                  <td className="px-3 py-3.5">
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold whitespace-nowrap ${STATUS_STYLE[inv.status]}`}>
                      {inv.status}
                    </span>
                  </td>
                  <td className="px-3 py-3.5">
                    <div className="flex items-center gap-1">
                      <button className="p-1.5 rounded-lg text-gray-400 hover:text-rose-500 hover:bg-rose-50 transition"><IcoEdit /></button>
                      <button onClick={() => deleteRow(inv.id)}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition"><IcoTrash /></button>
                      <button className="p-1.5 rounded-lg text-gray-400 hover:text-rose-500 hover:bg-rose-50 transition"><IcoEye /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-rose-50">
          <p className="text-xs text-gray-400">
            {sorted.length === 0 ? "0" : `${(page-1)*PAGE_SIZE+1} – ${Math.min(page*PAGE_SIZE, sorted.length)}`} of {sorted.length} &nbsp;·&nbsp; {totalPages} Pages
          </p>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400">The page on</span>
            <select value={page} onChange={e => setPage(Number(e.target.value))}
              className="text-xs border border-rose-100 rounded-lg px-2 py-1 bg-white focus:outline-none focus:ring-2 focus:ring-rose-300">
              {Array.from({ length: totalPages }, (_, i) => (
                <option key={i+1} value={i+1}>{i+1}</option>
              ))}
            </select>
            <button onClick={() => setPage(p => Math.max(1, p-1))} disabled={page===1}
              className="p-1.5 rounded-lg border border-rose-100 text-gray-500 hover:bg-rose-50 disabled:opacity-30 transition">
              <IcoChev d="l" />
            </button>
            <button onClick={() => setPage(p => Math.min(totalPages, p+1))} disabled={page===totalPages}
              className="p-1.5 rounded-lg border border-rose-100 text-gray-500 hover:bg-rose-50 disabled:opacity-30 transition">
              <IcoChev d="r" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}