import { useState } from "react";

type CStatus = "Activated" | "Approved" | "Pending" | "Suspended";
type CMethod = "Mastercard" | "Visa" | "Paypal";

interface Customer {
  id: number;
  name: string;
  phone: string;
  status: CStatus;
  totalBuy: number;
  method: CMethod;
  dueDate: string;
  avatarBg: string;
  initials: string;
}

const INITIAL: Customer[] = [
  { id:1,  name:"Ashley Foster",  phone:"510 488 5343", status:"Activated",  totalBuy:990,  method:"Mastercard", dueDate:"29 Dec 2022", avatarBg:"from-rose-400    to-pink-500",    initials:"AF" },
  { id:2,  name:"Ellie Parker",   phone:"681 710 8595", status:"Activated",  totalBuy:208,  method:"Visa",       dueDate:"24 Dec 2022", avatarBg:"from-violet-400  to-purple-500",  initials:"EP" },
  { id:3,  name:"Eric Lawson",    phone:"548 248 4804", status:"Activated",  totalBuy:693,  method:"Mastercard", dueDate:"12 Dec 2022", avatarBg:"from-sky-400     to-blue-500",    initials:"EL" },
  { id:4,  name:"Colin Hunt",     phone:"539 633 9910", status:"Activated",  totalBuy:826,  method:"Visa",       dueDate:"21 Oct 2022", avatarBg:"from-amber-400   to-orange-400",  initials:"CH" },
  { id:5,  name:"Georgia White",  phone:"426 257 0816", status:"Approved",   totalBuy:343,  method:"Mastercard", dueDate:"21 Oct 2022", avatarBg:"from-teal-400    to-cyan-500",    initials:"GW" },
  { id:6,  name:"Kate Richards",  phone:"058 142 4274", status:"Activated",  totalBuy:306,  method:"Mastercard", dueDate:"21 Oct 2022", avatarBg:"from-fuchsia-400 to-pink-500",    initials:"KR" },
  { id:7,  name:"Noah Ellis",     phone:"805 066 8867", status:"Activated",  totalBuy:549,  method:"Mastercard", dueDate:"19 Sep 2022", avatarBg:"from-indigo-400  to-blue-500",    initials:"NE" },
  { id:8,  name:"Jackson Brooks", phone:"606 784 2326", status:"Activated",  totalBuy:777,  method:"Mastercard", dueDate:"19 Sep 2022", avatarBg:"from-orange-400  to-red-400",     initials:"JB" },
  { id:9,  name:"Arthur Knight",  phone:"002 475 3596", status:"Activated",  totalBuy:616,  method:"Mastercard", dueDate:"19 Sep 2022", avatarBg:"from-emerald-400 to-green-500",   initials:"AK" },
  { id:10, name:"Lucas James",    phone:"280 029 7777", status:"Activated",  totalBuy:482,  method:"Mastercard", dueDate:"10 Aug 2022", avatarBg:"from-slate-400   to-gray-500",    initials:"LJ" },
  { id:11, name:"Sophia Turner",  phone:"312 456 7890", status:"Pending",    totalBuy:215,  method:"Paypal",     dueDate:"05 Aug 2022", avatarBg:"from-pink-400    to-rose-500",    initials:"ST" },
  { id:12, name:"Liam Scott",     phone:"415 234 5678", status:"Suspended",  totalBuy:130,  method:"Visa",       dueDate:"01 Aug 2022", avatarBg:"from-red-400     to-rose-500",    initials:"LS" },
  { id:13, name:"Olivia Brown",   phone:"617 890 1234", status:"Activated",  totalBuy:1102, method:"Mastercard", dueDate:"28 Jul 2022", avatarBg:"from-cyan-400    to-teal-500",    initials:"OB" },
];

const PAGE_SIZE = 10;

const STATUS_STYLE: Record<CStatus, string> = {
  Activated:  "bg-emerald-100 text-emerald-700 border border-emerald-200",
  Approved:   "bg-sky-100     text-sky-700     border border-sky-200",
  Pending:    "bg-amber-100   text-amber-600   border border-amber-200",
  Suspended:  "bg-red-100     text-red-600     border border-red-200",
};

const stats = [
  { icon:"👥", label:"All Customers",   value:"+22.63k", delta:"+34.4%",  positive:true  },
  { icon:"🛍️", label:"Orders",          value:"+4.5k",   delta:"+8.1%",  positive:false },
  { icon:"🔧", label:"Services Request",value:"+1.03k",  delta:"+12.6%", positive:true  },
  { icon:"💳", label:"Invoice & Payment",value:"$38,908.00", delta:"+45.9%", positive:true },
];

/* ── Icons ── */
const IcoSearch = () => <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4"><circle cx="9" cy="9" r="6"/><path d="M15 15l-3-3" strokeLinecap="round"/></svg>;
const IcoFilter = () => <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4"><path d="M3 5h14M6 10h8M9 15h2" strokeLinecap="round"/></svg>;
const IcoShare  = () => <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4"><circle cx="15" cy="4" r="2"/><circle cx="15" cy="16" r="2"/><circle cx="5" cy="10" r="2"/><path d="M7 9l6-4M7 11l6 4" strokeLinecap="round"/></svg>;
const IcoEdit   = () => <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4"><path d="M14.5 2.5a2.121 2.121 0 0 1 3 3L6 17l-4 1 1-4L14.5 2.5z" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const IcoTrash  = () => <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4"><path d="M6 7h8M8 7V5h4v2M9 10v4M11 10v4M5 7l1 10h8l1-10" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const IcoEye    = () => <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4"><ellipse cx="10" cy="10" rx="8" ry="5" strokeLinecap="round"/><circle cx="10" cy="10" r="2"/></svg>;
const IcoPlus   = () => <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path d="M10 4v12M4 10h12" strokeLinecap="round"/></svg>;
const IcoChev   = ({ d }: { d:"l"|"r" }) => <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path d={d==="l"?"M13 5l-5 5 5 5":"M7 5l5 5-5 5"} strokeLinecap="round" strokeLinejoin="round"/></svg>;
const IcoSort   = () => <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-3 h-3 opacity-40"><path d="M7 8l3-3 3 3M7 12l3 3 3-3" strokeLinecap="round" strokeLinejoin="round"/></svg>;

const Avatar = ({ initials, bg }: { initials: string; bg: string }) => (
  <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${bg} flex items-center justify-center text-white text-xs font-bold shadow shrink-0`}>
    {initials}
  </div>
);

export default function AllCustomers() {
  const [data,     setData]     = useState<Customer[]>(INITIAL);
  const [search,   setSearch]   = useState("");
  const [page,     setPage]     = useState(1);
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [showFilt, setFilt]     = useState(false);
  const [filterSt, setFilterSt] = useState<"All"|CStatus>("All");
  const [sortCol,  setSortCol]  = useState<"name"|"phone"|"totalBuy"|"dueDate"|null>(null);
  const [sortDir,  setSortDir]  = useState<"asc"|"desc">("asc");

  const handleSort = (col: "name"|"phone"|"totalBuy"|"dueDate") => {
    if (sortCol === col) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortCol(col); setSortDir("asc"); }
  };

  const filtered = data.filter(c => {
    const q = search.toLowerCase();
    const ms = c.name.toLowerCase().includes(q) || c.phone.includes(q) || c.method.toLowerCase().includes(q);
    const mst = filterSt === "All" || c.status === filterSt;
    return ms && mst;
  });

  const sorted = sortCol ? [...filtered].sort((a, b) => {
    if (sortCol === "totalBuy") return sortDir === "asc" ? a.totalBuy - b.totalBuy : b.totalBuy - a.totalBuy;
    if (sortCol === "dueDate")  return sortDir === "asc"
      ? new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
      : new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime();
    return sortDir === "asc"
      ? a[sortCol].localeCompare(b[sortCol])
      : b[sortCol].localeCompare(a[sortCol]);
  }) : filtered;

  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const pageData   = sorted.slice((page-1)*PAGE_SIZE, page*PAGE_SIZE);

  const toggle = (id: number) => setSelected(prev => {
    const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n;
  });
  const toggleAll = () =>
    setSelected(selected.size === pageData.length ? new Set() : new Set(pageData.map(c => c.id)));

  const deleteRow = (id: number) => {
    setData(d => d.filter(x => x.id !== id));
    setSelected(prev => { const n = new Set(prev); n.delete(id); return n; });
  };

  const SortIcon = ({ col }: { col: "name"|"phone"|"totalBuy"|"dueDate" }) =>
    sortCol === col ? <span className="opacity-60 text-xs">{sortDir === "asc" ? "↑" : "↓"}</span> : <IcoSort />;

  return (
    <div className="min-h-screen px-6 py-8"
      style={{ background:"linear-gradient(135deg,#fff5f7 0%,#fdf2ff 55%,#fff9f0 100%)", fontFamily:"'Lato','Segoe UI',sans-serif" }}>

      {/* ── Header ── */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800" style={{ fontFamily:"'Georgia',serif" }}>All Customers</h1>
          <nav className="flex items-center gap-1 text-xs text-gray-400 mt-1">
            <span className="hover:text-rose-400 cursor-pointer transition">Dashboard</span>
            <span>›</span>
            <span className="text-gray-500 font-medium">All Customers</span>
          </nav>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-500 text-white text-sm font-semibold hover:bg-rose-600 transition shadow-md shadow-rose-200">
          <IcoPlus /> Add Customer
        </button>
      </div>

      {/* ── Stat Cards ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {stats.map(s => (
          <div key={s.label} className="bg-white rounded-2xl border border-rose-50 shadow-sm p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center text-xl shrink-0">
              {s.icon}
            </div>
            <div className="min-w-0">
              <p className="text-xs text-gray-400 truncate">{s.label}</p>
              <p className="text-base font-bold text-gray-800 leading-tight">{s.value}</p>
              <p className={`text-[11px] font-semibold ${s.positive ? "text-emerald-500" : "text-red-400"}`}>
                {s.delta}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Table Card ── */}
      <div className="bg-white rounded-3xl shadow-sm border border-rose-50 overflow-hidden">

        {/* Toolbar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-rose-50 gap-4 flex-wrap">
          <h2 className="font-bold text-gray-800 text-base" style={{ fontFamily:"'Georgia',serif" }}>Customers</h2>
          <div className="flex items-center gap-3 flex-wrap">
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
                  {(["All","Activated","Approved","Pending","Suspended"] as const).map(s => (
                    <button key={s} onClick={() => { setFilterSt(s); setFilt(false); setPage(1); }}
                      className={`w-full text-left px-3 py-1.5 rounded-lg text-sm transition mb-0.5 ${filterSt===s?"bg-rose-500 text-white font-semibold":"text-gray-600 hover:bg-rose-50"}`}>
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-rose-100 bg-white text-gray-600 text-sm font-medium hover:border-rose-300 hover:text-rose-500 transition">
              <IcoShare /> Share
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-xs text-gray-400 uppercase tracking-wider">
                <th className="px-6 py-3 w-10">
                  <input type="checkbox"
                    checked={selected.size === pageData.length && pageData.length > 0}
                    onChange={toggleAll}
                    className="accent-rose-500 w-4 h-4 rounded"
                  />
                </th>
                <th className="px-3 py-3 text-left">Image</th>
                <th className="px-3 py-3 text-left cursor-pointer select-none" onClick={() => handleSort("name")}>
                  <span className="flex items-center gap-1">Name <SortIcon col="name"/></span>
                </th>
                <th className="px-3 py-3 text-left cursor-pointer select-none" onClick={() => handleSort("phone")}>
                  <span className="flex items-center gap-1">Phone <SortIcon col="phone"/></span>
                </th>
                <th className="px-3 py-3 text-left">Status</th>
                <th className="px-3 py-3 text-left cursor-pointer select-none" onClick={() => handleSort("totalBuy")}>
                  <span className="flex items-center gap-1">Total Buy <SortIcon col="totalBuy"/></span>
                </th>
                <th className="px-3 py-3 text-left">Method</th>
                <th className="px-3 py-3 text-left cursor-pointer select-none" onClick={() => handleSort("dueDate")}>
                  <span className="flex items-center gap-1">Due Date <SortIcon col="dueDate"/></span>
                </th>
                <th className="px-3 py-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {pageData.length === 0 ? (
                <tr><td colSpan={9} className="py-16 text-center text-gray-400 text-sm">No customers found.</td></tr>
              ) : pageData.map(c => (
                <tr key={c.id}
                  className={`border-b border-gray-50 transition ${selected.has(c.id)?"bg-rose-50/50":"hover:bg-gray-50/40"}`}>
                  <td className="px-6 py-3.5">
                    <input type="checkbox" checked={selected.has(c.id)} onChange={() => toggle(c.id)}
                      className="accent-rose-500 w-4 h-4 rounded" />
                  </td>
                  <td className="px-3 py-3.5">
                    <Avatar initials={c.initials} bg={c.avatarBg} />
                  </td>
                  <td className="px-3 py-3.5">
                    <span className="text-rose-400 font-semibold hover:underline cursor-pointer whitespace-nowrap">{c.name}</span>
                  </td>
                  <td className="px-3 py-3.5 text-gray-600 whitespace-nowrap">{c.phone}</td>
                  <td className="px-3 py-3.5">
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold whitespace-nowrap ${STATUS_STYLE[c.status]}`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="px-3 py-3.5 font-bold text-gray-800">
                    {c.totalBuy ? `$${c.totalBuy.toLocaleString()}` : c.totalBuy}
                  </td>
                  <td className="px-3 py-3.5 text-gray-600">{c.method}</td>
                  <td className="px-3 py-3.5 text-gray-500 whitespace-nowrap">{c.dueDate}</td>
                  <td className="px-3 py-3.5">
                    <div className="flex items-center gap-1">
                      <button className="p-1.5 rounded-lg text-gray-400 hover:text-rose-500 hover:bg-rose-50 transition"><IcoEdit /></button>
                      <button onClick={() => deleteRow(c.id)}
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