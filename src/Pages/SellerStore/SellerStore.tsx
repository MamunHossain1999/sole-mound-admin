import { useState } from "react";

/* ─── Types ─── */
type StoreStatus = "Approved" | "Pending" | "Suspended";

interface Store {
  id: number;
  name: string;
  logoEmoji: string;
  logoBg: string;
  earnings: number;
  productCount: string;
  vendor: string;
  status: StoreStatus;
  added: string;
}

/* ─── Mock Data ─── */
const INITIAL_STORES: Store[] = [
  { id:1,  name:"TechEdge",       logoEmoji:"✳️",  logoBg:"from-violet-400 to-purple-500", earnings:6934,  productCount:"302011", vendor:"Ashley Foster",  status:"Approved", added:"29 Dec 2022" },
  { id:2,  name:"SkyTech Labs",   logoEmoji:"♾️",  logoBg:"from-rose-400   to-pink-500",   earnings:1885,  productCount:"302011", vendor:"Ellie Parker",   status:"Approved", added:"24 Dec 2022" },
  { id:3,  name:"SmartSync",      logoEmoji:"🦊",  logoBg:"from-orange-400 to-red-400",    earnings:8519,  productCount:"302002", vendor:"Eric Lawson",    status:"Approved", added:"12 Dec 2022" },
  { id:4,  name:"CodeTrack",      logoEmoji:"📺",  logoBg:"from-purple-400 to-violet-500", earnings:948,   productCount:"301901", vendor:"Colin Hunt",     status:"Approved", added:"21 Oct 2022" },
  { id:5,  name:"TechRise",       logoEmoji:"🔶",  logoBg:"from-amber-400  to-yellow-500", earnings:8090,  productCount:"301900", vendor:"Georgia White",  status:"Approved", added:"21 Oct 2022" },
  { id:6,  name:"SmartSync",      logoEmoji:"⚙️",  logoBg:"from-gray-500   to-slate-600",  earnings:4102,  productCount:"301881", vendor:"Kate Richards",  status:"Approved", added:"21 Oct 2022" },
  { id:7,  name:"TechBloom",      logoEmoji:"🌸",  logoBg:"from-pink-400   to-rose-500",   earnings:6578,  productCount:"301643", vendor:"Noah Ellis",     status:"Approved", added:"19 Sep 2022" },
  { id:8,  name:"TechMinds",      logoEmoji:"⭐",  logoBg:"from-amber-500  to-orange-400", earnings:8462,  productCount:"301600", vendor:"Jackson Brooks", status:"Approved", added:"19 Sep 2022" },
  { id:9,  name:"InnovaSystems",  logoEmoji:"📊",  logoBg:"from-yellow-500 to-amber-400",  earnings:9050,  productCount:"301555", vendor:"Arthur Knight",  status:"Approved", added:"19 Sep 2022" },
  { id:10, name:"ByteFlow",       logoEmoji:"🔵",  logoBg:"from-sky-400    to-blue-500",   earnings:298,   productCount:"301002", vendor:"Lucas James",    status:"Approved", added:"10 Aug 2022" },
  { id:11, name:"NovaTech",       logoEmoji:"🚀",  logoBg:"from-indigo-400 to-blue-500",   earnings:5100,  productCount:"300901", vendor:"Sophia Turner",  status:"Pending",  added:"05 Aug 2022" },
  { id:12, name:"PixelCore",      logoEmoji:"🎨",  logoBg:"from-fuchsia-400 to-pink-500",  earnings:3200,  productCount:"300800", vendor:"Liam Scott",     status:"Suspended",added:"01 Aug 2022" },
  { id:13, name:"DataNest",       logoEmoji:"💾",  logoBg:"from-teal-400   to-cyan-500",   earnings:7890,  productCount:"300700", vendor:"Olivia Brown",   status:"Approved", added:"28 Jul 2022" },
];

const PAGE_SIZE = 10;

const STATUS_STYLE: Record<StoreStatus, string> = {
  Approved:  "bg-emerald-100 text-emerald-700 border border-emerald-200",
  Pending:   "bg-amber-100  text-amber-600  border border-amber-200",
  Suspended: "bg-red-100    text-red-600    border border-red-200",
};

/* ─── Icons ─── */
const IcoSearch = () => <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4"><circle cx="9" cy="9" r="6"/><path d="M15 15l-3-3" strokeLinecap="round"/></svg>;
const IcoFilter = () => <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4"><path d="M3 5h14M6 10h8M9 15h2" strokeLinecap="round"/></svg>;
const IcoEdit   = () => <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4"><path d="M14.5 2.5a2.121 2.121 0 0 1 3 3L6 17l-4 1 1-4L14.5 2.5z" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const IcoTrash  = () => <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4"><path d="M6 7h8M8 7V5h4v2M9 10v4M11 10v4M5 7l1 10h8l1-10" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const IcoEye    = () => <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4"><ellipse cx="10" cy="10" rx="8" ry="5" strokeLinecap="round"/><circle cx="10" cy="10" r="2"/></svg>;
const IcoExport = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4"><path d="M12 3v9M8 8l4-5 4 5" strokeLinecap="round" strokeLinejoin="round"/><path d="M3 14v2a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-2" strokeLinecap="round"/></svg>;
const IcoImport = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4"><path d="M12 15V6M8 12l4 4 4-4" strokeLinecap="round" strokeLinejoin="round"/><path d="M3 14v2a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-2" strokeLinecap="round"/></svg>;
const IcoChev   = ({ d }: { d: "l"|"r" }) => <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path d={d==="l"?"M13 5l-5 5 5 5":"M7 5l5 5-5 5"} strokeLinecap="round" strokeLinejoin="round"/></svg>;
const IcoSort   = () => <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-3 h-3 opacity-40"><path d="M7 8l3-3 3 3M7 12l3 3 3-3" strokeLinecap="round" strokeLinejoin="round"/></svg>;

/* ─── Logo Avatar ─── */
const StoreLogo = ({ emoji, bg }: { emoji: string; bg: string }) => (
  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${bg} flex items-center justify-center text-xl shadow shrink-0`}>
    {emoji}
  </div>
);

export default function SellerStores() {
  const [stores,   setStores]   = useState<Store[]>(INITIAL_STORES);
  const [search,   setSearch]   = useState("");
  const [page,     setPage]     = useState(1);
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [showFilt, setFilt]     = useState(false);
  const [filterSt, setFilterSt] = useState<"All"|StoreStatus>("All");
  const [sortCol,  setSortCol]  = useState<"earnings"|"added"|"vendor"|null>(null);
  const [sortDir,  setSortDir]  = useState<"asc"|"desc">("asc");

  const handleSort = (col: "earnings"|"added"|"vendor") => {
    if (sortCol === col) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortCol(col); setSortDir("asc"); }
  };

  const filtered = stores.filter(s => {
    const q = search.toLowerCase();
    const ms = s.name.toLowerCase().includes(q) || s.vendor.toLowerCase().includes(q) || s.productCount.includes(q);
    const mst = filterSt === "All" || s.status === filterSt;
    return ms && mst;
  });

  const sorted = sortCol ? [...filtered].sort((a, b) => {
    if (sortCol === "earnings") return sortDir === "asc" ? a.earnings - b.earnings : b.earnings - a.earnings;
    if (sortCol === "added") return sortDir === "asc"
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
    setSelected(selected.size === pageData.length ? new Set() : new Set(pageData.map(s => s.id)));

  const deleteStore = (id: number) => {
    setStores(s => s.filter(x => x.id !== id));
    setSelected(prev => { const n = new Set(prev); n.delete(id); return n; });
  };

  return (
    <div className="min-h-screen px-6 py-8"
      style={{ background:"linear-gradient(135deg,#fff5f7 0%,#fdf2ff 55%,#fff9f0 100%)", fontFamily:"'Lato','Segoe UI',sans-serif" }}>

      {/* ── Header ── */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800" style={{ fontFamily:"'Georgia',serif" }}>Stores</h1>
          <nav className="flex items-center gap-1 text-xs text-gray-400 mt-1">
            <span className="hover:text-rose-400 cursor-pointer transition">Dashboard</span>
            <span>›</span>
            <span className="hover:text-rose-400 cursor-pointer transition">Sellers</span>
            <span>›</span>
            <span className="text-gray-500 font-medium">Stores</span>
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

      {/* ── Card ── */}
      <div className="bg-white rounded-3xl shadow-sm border border-rose-50 overflow-hidden">

        {/* Toolbar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-rose-50 gap-4">
          <h2 className="font-bold text-gray-800 text-base" style={{ fontFamily:"'Georgia',serif" }}>
            Stores Details
          </h2>
          <div className="flex items-center gap-3">
            <div className="relative">
              <input value={search}
                onChange={e => { setSearch(e.target.value); setPage(1); }}
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
                  {(["All","Approved","Pending","Suspended"] as const).map(s => (
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
                <th className="px-3 py-3 text-left text-xs">ID</th>
                <th className="px-3 py-3 text-left">
                  <span className="flex items-center gap-1">Logo <IcoSort /></span>
                </th>
                <th className="px-3 py-3 text-left">Shop Name</th>
                <th className="px-3 py-3 text-left cursor-pointer select-none" onClick={() => handleSort("earnings")}>
                  <span className="flex items-center gap-1">
                    Earnings {sortCol==="earnings" ? (sortDir==="asc"?"↑":"↓") : <IcoSort />}
                  </span>
                </th>
                <th className="px-3 py-3 text-left">Products Count</th>
                <th className="px-3 py-3 text-left cursor-pointer select-none" onClick={() => handleSort("vendor")}>
                  <span className="flex items-center gap-1">
                    Vendor {sortCol==="vendor" ? (sortDir==="asc"?"↑":"↓") : <IcoSort />}
                  </span>
                </th>
                <th className="px-3 py-3 text-left">Status</th>
                <th className="px-3 py-3 text-left cursor-pointer select-none" onClick={() => handleSort("added")}>
                  <span className="flex items-center gap-1">
                    Added {sortCol==="added" ? (sortDir==="asc"?"↑":"↓") : <IcoSort />}
                  </span>
                </th>
                <th className="px-3 py-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {pageData.length === 0 ? (
                <tr><td colSpan={10} className="py-16 text-center text-gray-400 text-sm">No stores found.</td></tr>
              ) : pageData.map(s => (
                <tr key={s.id}
                  className={`border-b border-gray-50 transition ${selected.has(s.id) ? "bg-rose-50/50" : "hover:bg-gray-50/40"}`}>
                  {/* Checkbox */}
                  <td className="px-6 py-4">
                    <input type="checkbox" checked={selected.has(s.id)} onChange={() => toggle(s.id)}
                      className="accent-rose-500 w-4 h-4 rounded" />
                  </td>
                  {/* ID */}
                  <td className="px-3 py-4 text-gray-500 font-medium text-xs">{s.id}</td>
                  {/* Logo */}
                  <td className="px-3 py-4">
                    <StoreLogo emoji={s.logoEmoji} bg={s.logoBg} />
                  </td>
                  {/* Shop Name */}
                  <td className="px-3 py-4">
                    <span className="text-rose-500 font-semibold hover:underline cursor-pointer">{s.name}</span>
                  </td>
                  {/* Earnings */}
                  <td className="px-3 py-4 font-bold text-gray-800">${s.earnings.toLocaleString()}</td>
                  {/* Products Count */}
                  <td className="px-3 py-4">
                    <span className="text-rose-500 font-mono font-medium hover:underline cursor-pointer">{s.productCount}</span>
                  </td>
                  {/* Vendor */}
                  <td className="px-3 py-4">
                    <span className="text-rose-400 font-medium hover:underline cursor-pointer">{s.vendor}</span>
                  </td>
                  {/* Status */}
                  <td className="px-3 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold whitespace-nowrap ${STATUS_STYLE[s.status]}`}>
                      {s.status}
                    </span>
                  </td>
                  {/* Added */}
                  <td className="px-3 py-4 text-gray-500 whitespace-nowrap">{s.added}</td>
                  {/* Actions */}
                  <td className="px-3 py-4">
                    <div className="flex items-center gap-1">
                      <button className="p-1.5 rounded-lg text-gray-400 hover:text-rose-500 hover:bg-rose-50 transition"><IcoEdit /></button>
                      <button onClick={() => deleteStore(s.id)}
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