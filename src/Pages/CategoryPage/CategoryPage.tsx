import { useState } from "react";

/* ─── Types ─── */
interface Category {
  id: string;
  name: string;
  emoji: string;
  bg: string;
  sales: number;
  stock: number;
  added: string;
  active: boolean;
}

/* ─── Mock Data ─── */
const INITIAL: Category[] = [
  { id:"1",  name:"Watch",       emoji:"⌚", bg:"from-violet-200 to-purple-100", sales:4901,  stock:234,   added:"24 Dec 2022", active:true  },
  { id:"2",  name:"PC Desktop",  emoji:"🖥️", bg:"from-blue-200   to-sky-100",    sales:11902, stock:451,   added:"12 Dec 2022", active:false },
  { id:"3",  name:"Audio",       emoji:"🎧", bg:"from-amber-200  to-yellow-100", sales:900,   stock:132,   added:"21 Oct 2022", active:true  },
  { id:"4",  name:"Smartphone",  emoji:"📱", bg:"from-gray-200   to-slate-100",  sales:15020, stock:901,   added:"29 Dec 2022", active:true  },
  { id:"5",  name:"Camera",      emoji:"📷", bg:"from-rose-200   to-pink-100",   sales:3245,  stock:1201,  added:"21 Oct 2022", active:false },
  { id:"6",  name:"Shoes",       emoji:"👟", bg:"from-red-200    to-rose-100",   sales:10405, stock:2403,  added:"19 Sep 2022", active:true  },
  { id:"7",  name:"Toys",        emoji:"🧸", bg:"from-orange-200 to-amber-100",  sales:1100,  stock:400,   added:"19 Sep 2022", active:true  },
  { id:"8",  name:"Bag & Pouch", emoji:"👜", bg:"from-stone-200  to-zinc-100",   sales:1200,  stock:98,    added:"19 Sep 2022", active:true  },
  { id:"9",  name:"Hat",         emoji:"🧢", bg:"from-teal-200   to-cyan-100",   sales:720,   stock:720,   added:"10 Aug 2022", active:true  },
  { id:"10", name:"Beauty",      emoji:"💄", bg:"from-pink-200   to-fuchsia-100",sales:329,   stock:199,   added:"21 Oct 2022", active:false },
  { id:"11", name:"Sports",      emoji:"⚽", bg:"from-green-200  to-emerald-100",sales:5430,  stock:678,   added:"15 Jul 2022", active:true  },
  { id:"12", name:"Books",       emoji:"📚", bg:"from-indigo-200 to-blue-100",   sales:2100,  stock:340,   added:"10 Jul 2022", active:true  },
  { id:"13", name:"Furniture",   emoji:"🛋️", bg:"from-lime-200   to-green-100",  sales:890,   stock:55,    added:"05 Jul 2022", active:false },
];

const PAGE_SIZE = 10;

/* ─── Icons ─── */
const IcoSearch  = () => <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4"><circle cx="9" cy="9" r="6"/><path d="M15 15l-3-3" strokeLinecap="round"/></svg>;
const IcoFilter  = () => <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4"><path d="M3 5h14M6 10h8M9 15h2" strokeLinecap="round"/></svg>;
const IcoEdit    = () => <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4"><path d="M14.5 2.5a2.121 2.121 0 0 1 3 3L6 17l-4 1 1-4L14.5 2.5z" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const IcoTrash   = () => <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4"><path d="M6 7h8M8 7V5h4v2M9 10v4M11 10v4M5 7l1 10h8l1-10" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const IcoEye     = () => <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4"><ellipse cx="10" cy="10" rx="8" ry="5" strokeLinecap="round"/><circle cx="10" cy="10" r="2"/></svg>;
const IcoExport  = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4"><path d="M12 3v9M8 8l4-5 4 5" strokeLinecap="round" strokeLinejoin="round"/><path d="M3 14v2a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-2" strokeLinecap="round"/></svg>;
const IcoImport  = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4"><path d="M12 15V6M8 12l4 4 4-4" strokeLinecap="round" strokeLinejoin="round"/><path d="M3 14v2a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-2" strokeLinecap="round"/></svg>;
const IcoPlus    = () => <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path d="M10 4v12M4 10h12" strokeLinecap="round"/></svg>;
const IcoChev    = ({ d }: { d: "l"|"r" }) => <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path d={d==="l"?"M13 5l-5 5 5 5":"M7 5l5 5-5 5"} strokeLinecap="round" strokeLinejoin="round"/></svg>;
const IcoSort    = () => <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-3 h-3 opacity-40"><path d="M7 8l3-3 3 3M7 12l3 3 3-3" strokeLinecap="round" strokeLinejoin="round"/></svg>;

/* ─── Toggle Switch ─── */
const Toggle = ({ on, onChange }: { on: boolean; onChange: () => void }) => (
  <button onClick={onChange}
    className={`w-10 h-5 rounded-full transition-colors relative focus:outline-none ${on ? "bg-violet-400" : "bg-gray-200"}`}>
    <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all ${on ? "left-5" : "left-0.5"}`} />
  </button>
);

/* ─── Category Thumbnail ─── */
const Thumb = ({ emoji, bg }: { emoji: string; bg: string }) => (
  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${bg} flex items-center justify-center text-xl shadow-inner shrink-0`}>
    {emoji}
  </div>
);

export default function CategoryPage() {
  const [data,     setData]     = useState<Category[]>(INITIAL);
  const [search,   setSearch]   = useState("");
  const [page,     setPage]     = useState(1);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [showFilt, setFilt]     = useState(false);
  const [filterSt, setFilterSt] = useState<"All"|"Active"|"Inactive">("All");
  const [sortCol,  setSortCol]  = useState<"sales"|"stock"|"added"|null>(null);
  const [sortDir,  setSortDir]  = useState<"asc"|"desc">("asc");

  /* toggle active */
  const toggleActive = (id: string) =>
    setData(d => d.map(c => c.id === id ? { ...c, active: !c.active } : c));

  /* sort */
  const handleSort = (col: "sales"|"stock"|"added") => {
    if (sortCol === col) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortCol(col); setSortDir("asc"); }
  };

  /* filter + search */
  const filtered = data.filter(c => {
    const q = search.toLowerCase();
    const ms = c.name.toLowerCase().includes(q);
    const mst = filterSt === "All" || (filterSt === "Active" ? c.active : !c.active);
    return ms && mst;
  });

  const sorted = sortCol ? [...filtered].sort((a, b) => {
    const va = sortCol === "added" ? new Date(a.added).getTime() : a[sortCol];
    const vb = sortCol === "added" ? new Date(b.added).getTime() : b[sortCol];
    return sortDir === "asc" ? (va as number) - (vb as number) : (vb as number) - (va as number);
  }) : filtered;

  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const pageData   = sorted.slice((page-1)*PAGE_SIZE, page*PAGE_SIZE);

  /* selection */
  const toggle = (id: string) => setSelected(prev => {
    const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n;
  });
  const toggleAll = () =>
    setSelected(selected.size === pageData.length ? new Set() : new Set(pageData.map(c => c.id)));

  return (
    <div className="min-h-screen px-6 py-8"
      style={{ background:"linear-gradient(135deg,#fff5f7 0%,#fdf2ff 55%,#fff9f0 100%)", fontFamily:"'Lato','Segoe UI',sans-serif" }}>

      {/* ── Header ── */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800" style={{ fontFamily:"'Georgia',serif" }}>Category</h1>
          <nav className="flex items-center gap-1 text-xs text-gray-400 mt-1">
            <span className="hover:text-rose-400 cursor-pointer transition">Dashboard</span>
            <span>›</span>
            <span className="text-gray-500 font-medium">Category list</span>
          </nav>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 bg-white text-gray-700 text-sm font-medium hover:border-rose-300 hover:text-rose-500 transition shadow-sm">
            Processing <IcoPlus />
          </button>
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

        {/* Search + Filter */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-rose-50 gap-4">
          <div className="relative w-64">
            <input value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }}
              placeholder="Search product"
              className="w-full pl-4 pr-9 py-2.5 rounded-xl border border-rose-100 bg-rose-50/40 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300 placeholder-rose-300 transition"
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
                {(["All","Active","Inactive"] as const).map(s => (
                  <button key={s} onClick={() => { setFilterSt(s); setFilt(false); setPage(1); }}
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-sm transition mb-0.5 ${filterSt===s?"bg-rose-500 text-white font-semibold":"text-gray-600 hover:bg-rose-50"}`}>
                    {s}
                  </button>
                ))}
              </div>
            )}
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
                <th className="px-3 py-3 text-left">
                  <span className="flex items-center gap-1">Category <IcoSort /></span>
                </th>
                <th className="px-3 py-3 text-left cursor-pointer select-none" onClick={() => handleSort("sales")}>
                  <span className="flex items-center gap-1">
                    Sales {sortCol==="sales" ? (sortDir==="asc"?"↑":"↓") : <IcoSort />}
                  </span>
                </th>
                <th className="px-3 py-3 text-left cursor-pointer select-none" onClick={() => handleSort("stock")}>
                  <span className="flex items-center gap-1">
                    Stock {sortCol==="stock" ? (sortDir==="asc"?"↑":"↓") : <IcoSort />}
                  </span>
                </th>
                <th className="px-3 py-3 text-left cursor-pointer select-none" onClick={() => handleSort("added")}>
                  <span className="flex items-center gap-1">
                    Added {sortCol==="added" ? (sortDir==="asc"?"↑":"↓") : <IcoSort />}
                  </span>
                </th>
                <th className="px-3 py-3 text-left">Status</th>
                <th className="px-3 py-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {pageData.length === 0 ? (
                <tr><td colSpan={7} className="py-16 text-center text-gray-400 text-sm">No categories found.</td></tr>
              ) : pageData.map(c => (
                <tr key={c.id}
                  className={`border-b border-gray-50 transition ${selected.has(c.id)?"bg-rose-50/50":"hover:bg-gray-50/40"}`}>
                  {/* Checkbox */}
                  <td className="px-6 py-4">
                    <input type="checkbox" checked={selected.has(c.id)} onChange={() => toggle(c.id)}
                      className="accent-rose-500 w-4 h-4 rounded" />
                  </td>
                  {/* Category */}
                  <td className="px-3 py-4">
                    <div className="flex items-center gap-3">
                      <Thumb emoji={c.emoji} bg={c.bg} />
                      <span className="font-semibold text-gray-800">{c.name}</span>
                    </div>
                  </td>
                  {/* Sales */}
                  <td className="px-3 py-4 text-gray-600 font-medium">{c.sales.toLocaleString()}</td>
                  {/* Stock */}
                  <td className="px-3 py-4">
                    <span className={`font-semibold ${c.stock < 100 ? "text-red-500" : c.stock < 300 ? "text-amber-500" : "text-gray-700"}`}>
                      {c.stock.toLocaleString()}
                    </span>
                  </td>
                  {/* Added */}
                  <td className="px-3 py-4 text-gray-500 whitespace-nowrap">{c.added}</td>
                  {/* Status toggle */}
                  <td className="px-3 py-4">
                    <Toggle on={c.active} onChange={() => toggleActive(c.id)} />
                  </td>
                  {/* Actions */}
                  <td className="px-3 py-4">
                    <div className="flex items-center gap-1">
                      <button className="p-1.5 rounded-lg text-gray-400 hover:text-rose-500 hover:bg-rose-50 transition"><IcoEdit /></button>
                      <button className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition"><IcoTrash /></button>
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
              {Array.from({length: totalPages}, (_,i) => (
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