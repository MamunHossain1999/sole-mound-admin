import { useState } from "react";

type WStatus = "Completed" | "Pending" | "Processing";

interface Withdrawal {
  id: number;
  vendor: string;
  amount: number;
  fee: number;
  due: number;
  status: WStatus;
  added: string;
}

const INITIAL: Withdrawal[] = [
  { id:1,  vendor:"Ashley Foster",  amount:6934, fee:0, due:0, status:"Completed",  added:"29 Dec 2022" },
  { id:2,  vendor:"Ellie Parker",   amount:1885, fee:0, due:0, status:"Pending",     added:"24 Dec 2022" },
  { id:3,  vendor:"Eric Lawson",    amount:8519, fee:0, due:0, status:"Completed",  added:"12 Dec 2022" },
  { id:4,  vendor:"Colin Hunt",     amount:948,  fee:0, due:0, status:"Processing", added:"21 Oct 2022" },
  { id:5,  vendor:"Georgia White",  amount:8090, fee:0, due:0, status:"Completed",  added:"21 Oct 2022" },
  { id:6,  vendor:"Kate Richards",  amount:4102, fee:0, due:0, status:"Completed",  added:"21 Oct 2022" },
  { id:7,  vendor:"Noah Ellis",     amount:6578, fee:0, due:0, status:"Pending",     added:"19 Sep 2022" },
  { id:8,  vendor:"Jackson Brooks", amount:8462, fee:0, due:0, status:"Completed",  added:"19 Sep 2022" },
  { id:9,  vendor:"Arthur Knight",  amount:9050, fee:0, due:0, status:"Completed",  added:"19 Sep 2022" },
  { id:10, vendor:"Lucas James",    amount:298,  fee:0, due:0, status:"Completed",  added:"10 Aug 2022" },
  { id:11, vendor:"Sophia Turner",  amount:5120, fee:0, due:0, status:"Pending",     added:"05 Aug 2022" },
  { id:12, vendor:"Liam Scott",     amount:3300, fee:0, due:0, status:"Completed",  added:"01 Aug 2022" },
  { id:13, vendor:"Olivia Brown",   amount:7800, fee:0, due:0, status:"Processing", added:"28 Jul 2022" },
];

const PAGE_SIZE = 10;

const STATUS_STYLE: Record<WStatus, string> = {
  Completed:  "bg-emerald-100 text-emerald-700 border border-emerald-200",
  Pending:    "bg-amber-100  text-amber-600  border border-amber-200",
  Processing: "bg-violet-100 text-violet-600 border border-violet-200",
};

/* ── Icons ── */
const IcoSearch = () => <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4"><circle cx="9" cy="9" r="6"/><path d="M15 15l-3-3" strokeLinecap="round"/></svg>;
const IcoFilter = () => <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4"><path d="M3 5h14M6 10h8M9 15h2" strokeLinecap="round"/></svg>;
const IcoEdit   = () => <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4"><path d="M14.5 2.5a2.121 2.121 0 0 1 3 3L6 17l-4 1 1-4L14.5 2.5z" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const IcoTrash  = () => <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4"><path d="M6 7h8M8 7V5h4v2M9 10v4M11 10v4M5 7l1 10h8l1-10" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const IcoExport = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4"><path d="M12 3v9M8 8l4-5 4 5" strokeLinecap="round" strokeLinejoin="round"/><path d="M3 14v2a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-2" strokeLinecap="round"/></svg>;
const IcoChev   = ({ d }: { d:"l"|"r" }) => <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path d={d==="l"?"M13 5l-5 5 5 5":"M7 5l5 5-5 5"} strokeLinecap="round" strokeLinejoin="round"/></svg>;
const IcoSort   = () => <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-3 h-3 opacity-40"><path d="M7 8l3-3 3 3M7 12l3 3 3-3" strokeLinecap="round" strokeLinejoin="round"/></svg>;

export default function WithdrawalPage() {
  const [data,     setData]     = useState<Withdrawal[]>(INITIAL);
  const [search,   setSearch]   = useState("");
  const [page,     setPage]     = useState(1);
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [showFilt, setFilt]     = useState(false);
  const [filterSt, setFilterSt] = useState<"All"|WStatus>("All");
  const [sortCol,  setSortCol]  = useState<"amount"|"added"|"vendor"|null>(null);
  const [sortDir,  setSortDir]  = useState<"asc"|"desc">("asc");

  const handleSort = (col: "amount"|"added"|"vendor") => {
    if (sortCol === col) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortCol(col); setSortDir("asc"); }
  };

  const filtered = data.filter(w => {
    const q = search.toLowerCase();
    const ms = w.vendor.toLowerCase().includes(q);
    const mst = filterSt === "All" || w.status === filterSt;
    return ms && mst;
  });

  const sorted = sortCol ? [...filtered].sort((a, b) => {
    if (sortCol === "amount") return sortDir === "asc" ? a.amount - b.amount : b.amount - a.amount;
    if (sortCol === "added")  return sortDir === "asc"
      ? new Date(a.added).getTime() - new Date(b.added).getTime()
      : new Date(b.added).getTime() - new Date(a.added).getTime();
    if (sortCol === "vendor") return sortDir === "asc"
      ? a.vendor.localeCompare(b.vendor) : b.vendor.localeCompare(a.vendor);
    return 0;
  }) : filtered;

  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const pageData   = sorted.slice((page-1)*PAGE_SIZE, page*PAGE_SIZE);

  const toggle = (id: number) => setSelected(prev => {
    const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n;
  });
  const toggleAll = () =>
    setSelected(selected.size === pageData.length ? new Set() : new Set(pageData.map(w => w.id)));

  const deleteRow = (id: number) => {
    setData(d => d.filter(x => x.id !== id));
    setSelected(prev => { const n = new Set(prev); n.delete(id); return n; });
  };

  const fmt = (v: number) => v === 0 ? <span className="text-rose-400 font-medium">$0.00</span> : `$${v.toLocaleString()}`;

  return (
    <div className="min-h-screen px-6 py-8"
      style={{ background:"linear-gradient(135deg,#fff5f7 0%,#fdf2ff 55%,#fff9f0 100%)", fontFamily:"'Lato','Segoe UI',sans-serif" }}>

      {/* ── Header ── */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800" style={{ fontFamily:"'Georgia',serif" }}>Withdrawal</h1>
          <nav className="flex items-center gap-1 text-xs text-gray-400 mt-1">
            <span className="hover:text-rose-400 cursor-pointer transition">Dashboard</span>
            <span>›</span>
            <span className="hover:text-rose-400 cursor-pointer transition">Sellers</span>
            <span>›</span>
            <span className="text-gray-500 font-medium">Stores</span>
          </nav>
        </div>
        <button className="flex items-center gap-2 px-5 py-2 rounded-xl border border-gray-200 bg-white text-gray-700 text-sm font-medium hover:border-rose-300 hover:text-rose-500 transition shadow-sm">
          <IcoExport /> Export
        </button>
      </div>

      {/* ── Card ── */}
      <div className="bg-white rounded-3xl shadow-sm border border-rose-50 overflow-hidden">

        {/* Toolbar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-rose-50 gap-4">
          <h2 className="font-bold text-gray-800 text-base" style={{ fontFamily:"'Georgia',serif" }}>
            Withdrawal Details
          </h2>
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
                  {(["All","Completed","Pending","Processing"] as const).map(s => (
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
                <th className="px-3 py-3 text-left">ID</th>
                <th className="px-3 py-3 text-left cursor-pointer select-none" onClick={() => handleSort("vendor")}>
                  <span className="flex items-center gap-1">Vendor {sortCol==="vendor"?(sortDir==="asc"?"↑":"↓"):<IcoSort/>}</span>
                </th>
                <th className="px-3 py-3 text-left cursor-pointer select-none" onClick={() => handleSort("amount")}>
                  <span className="flex items-center gap-1">Amount {sortCol==="amount"?(sortDir==="asc"?"↑":"↓"):<IcoSort/>}</span>
                </th>
                <th className="px-3 py-3 text-left">Fee</th>
                <th className="px-3 py-3 text-left">Due</th>
                <th className="px-3 py-3 text-left cursor-pointer select-none">
                  <span className="flex items-center gap-1">Status <IcoSort/></span>
                </th>
                <th className="px-3 py-3 text-left cursor-pointer select-none" onClick={() => handleSort("added")}>
                  <span className="flex items-center gap-1">Added {sortCol==="added"?(sortDir==="asc"?"↑":"↓"):<IcoSort/>}</span>
                </th>
                <th className="px-3 py-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {pageData.length === 0 ? (
                <tr><td colSpan={9} className="py-16 text-center text-gray-400 text-sm">No withdrawals found.</td></tr>
              ) : pageData.map(w => (
                <tr key={w.id}
                  className={`border-b border-gray-50 transition ${selected.has(w.id)?"bg-rose-50/50":"hover:bg-gray-50/40"}`}>
                  <td className="px-6 py-4">
                    <input type="checkbox" checked={selected.has(w.id)} onChange={() => toggle(w.id)}
                      className="accent-rose-500 w-4 h-4 rounded" />
                  </td>
                  <td className="px-3 py-4 text-gray-500 font-medium text-xs">{w.id}</td>
                  <td className="px-3 py-4">
                    <span className="text-rose-400 font-semibold hover:underline cursor-pointer">{w.vendor}</span>
                  </td>
                  <td className="px-3 py-4 font-bold text-gray-800">${w.amount.toLocaleString()}</td>
                  <td className="px-3 py-4">{fmt(w.fee)}</td>
                  <td className="px-3 py-4">{fmt(w.due)}</td>
                  <td className="px-3 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold whitespace-nowrap ${STATUS_STYLE[w.status]}`}>
                      {w.status}
                    </span>
                  </td>
                  <td className="px-3 py-4 text-gray-500 whitespace-nowrap">{w.added}</td>
                  <td className="px-3 py-4">
                    <div className="flex items-center gap-1">
                      <button className="p-1.5 rounded-lg text-gray-400 hover:text-rose-500 hover:bg-rose-50 transition"><IcoEdit /></button>
                      <button onClick={() => deleteRow(w.id)}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition"><IcoTrash /></button>
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