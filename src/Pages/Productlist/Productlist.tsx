import { useState } from "react";

/* ─── Types ─── */
type Status = "Published" | "Low Stock" | "Out of Stock" | "Draft";

interface Product {
  id: string;
  name: string;
  variants: number;
  status: Status;
  category: string;
  sku: string;
  stock: number;
  price: number;
  added: string;
  emoji: string;
  bg: string;
}

/* ─── Mock Data ─── */
const ALL_PRODUCTS: Product[] = [
  { id:"1", name:"Handmade Pouch",   variants:3, status:"Low Stock",    category:"Bag & Pouch", sku:"302011", stock:10,  price:121,  added:"29 Dec 2022", emoji:"👜", bg:"from-amber-100 to-yellow-50" },
  { id:"2", name:"Smartwatch E2",    variants:2, status:"Published",    category:"Watch",       sku:"302011", stock:204, price:590,  added:"24 Dec 2022", emoji:"⌚", bg:"from-slate-100 to-gray-50"   },
  { id:"3", name:"Smartwatch E1",    variants:3, status:"Draft",        category:"Watch",       sku:"302002", stock:48,  price:125,  added:"12 Dec 2022", emoji:"⌚", bg:"from-pink-100 to-rose-50"     },
  { id:"4", name:"Headphone G1 Pro", variants:1, status:"Published",    category:"Audio",       sku:"301901", stock:401, price:348,  added:"21 Oct 2022", emoji:"🎧", bg:"from-orange-100 to-amber-50"  },
  { id:"5", name:"Iphone X",         variants:4, status:"Published",    category:"Smartphone",  sku:"301900", stock:120, price:607,  added:"21 Oct 2022", emoji:"📱", bg:"from-gray-100 to-slate-50"    },
  { id:"6", name:"Puma Shoes",       variants:3, status:"Published",    category:"Shoes",       sku:"301881", stock:432, price:234,  added:"21 Oct 2022", emoji:"👟", bg:"from-zinc-100 to-gray-50"     },
  { id:"7", name:"Imac 2021",        variants:1, status:"Out of Stock", category:"PC Desktop",  sku:"301643", stock:0,   price:760,  added:"19 Sep 2022", emoji:"🖥️", bg:"from-sky-100 to-blue-50"      },
  { id:"8", name:"Nike Shoes",       variants:3, status:"Out of Stock", category:"Shoes",       sku:"301600", stock:347, price:400,  added:"19 Sep 2022", emoji:"👠", bg:"from-red-100 to-rose-50"      },
  { id:"9", name:"Lego Car",         variants:2, status:"Draft",        category:"Toys",        sku:"301555", stock:299, price:812,  added:"19 Sep 2022", emoji:"🚗", bg:"from-red-200 to-orange-50"    },
  { id:"10",name:"Skincare Alia 1",  variants:3, status:"Low Stock",    category:"Beauty",      sku:"301002", stock:38,  price:123,  added:"10 Aug 2022", emoji:"🧴", bg:"from-rose-100 to-pink-50"     },
  { id:"11",name:"Wireless Earbuds", variants:2, status:"Published",    category:"Audio",       sku:"300999", stock:512, price:89,   added:"05 Aug 2022", emoji:"🎵", bg:"from-purple-100 to-violet-50" },
  { id:"12",name:"Gaming Chair",     variants:1, status:"Published",    category:"Furniture",   sku:"300888", stock:67,  price:450,  added:"01 Aug 2022", emoji:"🪑", bg:"from-green-100 to-emerald-50" },
  { id:"13",name:"Mechanical Keyboard",variants:4,status:"Low Stock",   category:"Electronics", sku:"300777", stock:22,  price:175,  added:"28 Jul 2022", emoji:"⌨️", bg:"from-blue-100 to-sky-50"      },
];

const PAGE_SIZE = 10;

const STATUS_STYLE: Record<Status, string> = {
  Published:     "bg-emerald-100 text-emerald-700 border border-emerald-200",
  "Low Stock":   "bg-rose-100   text-rose-600   border border-rose-200",
  "Out of Stock":"bg-red-100    text-red-600    border border-red-200",
  Draft:         "bg-gray-100   text-gray-500   border border-gray-200",
};

/* ─── SVG Icons ─── */
const IcoSearch  = () => <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4"><circle cx="9" cy="9" r="6"/><path d="M15 15l-3-3" strokeLinecap="round"/></svg>;
const IcoFilter  = () => <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4"><path d="M3 5h14M6 10h8M9 15h2" strokeLinecap="round"/></svg>;
const IcoEdit    = () => <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4"><path d="M14.5 2.5a2.121 2.121 0 0 1 3 3L6 17l-4 1 1-4L14.5 2.5z" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const IcoTrash   = () => <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4"><path d="M6 7h8M8 7V5h4v2M9 10v4M11 10v4M5 7l1 10h8l1-10" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const IcoEye     = () => <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4"><ellipse cx="10" cy="10" rx="8" ry="5" strokeLinecap="round"/><circle cx="10" cy="10" r="2"/></svg>;
const IcoExport  = () => <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4"><path d="M10 3v9M6 8l4-5 4 5" strokeLinecap="round" strokeLinejoin="round"/><path d="M3 14v2a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2" strokeLinecap="round"/></svg>;
const IcoPlus    = () => <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2"   className="w-4 h-4"><path d="M10 4v12M4 10h12" strokeLinecap="round"/></svg>;
const IcoChev    = ({ d }: { d: "l"|"r" }) => <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path d={d==="l"?"M13 5l-5 5 5 5":"M7 5l5 5-5 5"} strokeLinecap="round" strokeLinejoin="round"/></svg>;
const IcoSort    = () => <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-3 h-3 opacity-40"><path d="M7 8l3-3 3 3M7 12l3 3 3-3" strokeLinecap="round" strokeLinejoin="round"/></svg>;

/* ─── Thumb ─── */
const Thumb = ({ emoji, bg }: { emoji: string; bg: string }) => (
  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${bg} flex items-center justify-center text-xl shadow-inner shrink-0`}>
    {emoji}
  </div>
);

export default function ProductList() {
  const [search,   setSearch]   = useState("");
  const [status,   setStatus]   = useState("All");
  const [page,     setPage]     = useState(1);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [showFilt, setFilt]     = useState(false);
  const [sortCol,  setSortCol]  = useState<"stock"|"price"|"added"|null>(null);
  const [sortDir,  setSortDir]  = useState<"asc"|"desc">("asc");

  const handleSort = (col: "stock"|"price"|"added") => {
    if (sortCol === col) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortCol(col); setSortDir("asc"); }
  };

  const filtered = ALL_PRODUCTS.filter(p => {
    const q = search.toLowerCase();
    const ms = p.name.toLowerCase().includes(q) || p.sku.includes(q) || p.category.toLowerCase().includes(q);
    const mst = status === "All" || p.status === status;
    return ms && mst;
  });

  const sorted = sortCol ? [...filtered].sort((a, b) => {
    let va: number|string = sortCol === "added" ? new Date(a.added).getTime() : a[sortCol];
    let vb: number|string = sortCol === "added" ? new Date(b.added).getTime() : b[sortCol];
    return sortDir === "asc" ? (va as number) - (vb as number) : (vb as number) - (va as number);
  }) : filtered;

  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const pageData   = sorted.slice((page-1)*PAGE_SIZE, page*PAGE_SIZE);

  const toggle = (id: string) => setSelected(prev => {
    const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n;
  });
  const toggleAll = () =>
    setSelected(selected.size === pageData.length ? new Set() : new Set(pageData.map(p=>p.id)));

  const SortBtn = ({ col }: { col: "stock"|"price"|"added" }) => (
    <button onClick={() => handleSort(col)} className="ml-1 inline-flex opacity-60 hover:opacity-100 transition">
      <IcoSort />
    </button>
  );

  return (
    <div className="min-h-screen px-6 py-8"
      style={{ background:"linear-gradient(135deg,#fff5f7 0%,#fdf2ff 55%,#fff9f0 100%)", fontFamily:"'Lato','Segoe UI',sans-serif" }}>

      {/* ── Header ── */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800" style={{ fontFamily:"'Georgia',serif" }}>Products</h1>
          <nav className="flex items-center gap-1 text-xs text-gray-400 mt-1">
            <span className="hover:text-rose-400 cursor-pointer transition">Dashboard</span>
            <span>›</span>
            <span className="text-gray-500 font-medium">Product list</span>
          </nav>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 bg-white text-gray-700 text-sm font-medium hover:border-rose-300 hover:text-rose-500 transition shadow-sm">
            <IcoExport /> Export
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-500 text-white text-sm font-semibold hover:bg-rose-600 transition shadow-md shadow-rose-200">
            <IcoPlus /> Add Product
          </button>
        </div>
      </div>

      {/* ── Card ── */}
      <div className="bg-white rounded-3xl shadow-sm border border-rose-50 overflow-hidden">

        {/* Search + Filter bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-rose-50 gap-4">
          <div className="relative flex-1 max-w-xs">
            <input
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }}
              placeholder="Search product"
              className="w-full pl-4 pr-9 py-2.5 rounded-xl border border-rose-100 bg-rose-50/40 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300 placeholder-rose-300 transition"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-rose-400"><IcoSearch /></span>
          </div>

          <div className="relative">
            <button
              onClick={() => setFilt(!showFilt)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-rose-100 bg-white text-gray-600 text-sm font-medium hover:border-rose-300 hover:text-rose-500 transition"
            >
              <IcoFilter /> Filter
              {status !== "All" && (
                <span className="ml-1 w-2 h-2 rounded-full bg-rose-500 inline-block" />
              )}
            </button>
            {showFilt && (
              <div className="absolute right-0 top-12 bg-white border border-rose-100 rounded-2xl shadow-xl z-30 p-3 w-48">
                <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-2 px-1">Status</p>
                {["All","Published","Low Stock","Out of Stock","Draft"].map(s => (
                  <button key={s} onClick={() => { setStatus(s); setFilt(false); setPage(1); }}
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-sm transition mb-0.5 ${status===s?"bg-rose-500 text-white font-semibold":"text-gray-600 hover:bg-rose-50"}`}>
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
                    checked={selected.size===pageData.length && pageData.length>0}
                    onChange={toggleAll}
                    className="accent-rose-500 w-4 h-4 rounded" />
                </th>
                <th className="px-3 py-3 text-left">
                  <span className="flex items-center gap-1">Product <IcoSort /></span>
                </th>
                <th className="px-3 py-3 text-left">
                  <span className="flex items-center gap-1">Status <IcoSort /></span>
                </th>
                <th className="px-3 py-3 text-left">Category</th>
                <th className="px-3 py-3 text-left">SKU</th>
                <th className="px-3 py-3 text-left cursor-pointer select-none" onClick={() => handleSort("stock")}>
                  <span className="flex items-center gap-1">
                    Stock {sortCol==="stock" ? (sortDir==="asc"?"↑":"↓") : <IcoSort />}
                  </span>
                </th>
                <th className="px-3 py-3 text-left cursor-pointer select-none" onClick={() => handleSort("price")}>
                  <span className="flex items-center gap-1">
                    Price {sortCol==="price" ? (sortDir==="asc"?"↑":"↓") : <IcoSort />}
                  </span>
                </th>
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
                <tr><td colSpan={9} className="py-16 text-center text-gray-400 text-sm">No products found.</td></tr>
              ) : pageData.map(p => (
                <tr key={p.id}
                  className={`border-b border-gray-50 transition ${selected.has(p.id)?"bg-rose-50/50":"hover:bg-gray-50/50"}`}>
                  {/* Check */}
                  <td className="px-6 py-4">
                    <input type="checkbox" checked={selected.has(p.id)} onChange={() => toggle(p.id)}
                      className="accent-rose-500 w-4 h-4 rounded" />
                  </td>
                  {/* Product */}
                  <td className="px-3 py-4">
                    <div className="flex items-center gap-3">
                      <Thumb emoji={p.emoji} bg={p.bg} />
                      <div>
                        <p className="font-semibold text-gray-800 leading-tight">{p.name}</p>
                        <p className="text-[11px] text-gray-400">{p.variants} Variants</p>
                      </div>
                    </div>
                  </td>
                  {/* Status */}
                  <td className="px-3 py-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold whitespace-nowrap ${STATUS_STYLE[p.status]}`}>
                      {p.status}
                    </span>
                  </td>
                  {/* Category */}
                  <td className="px-3 py-4 text-gray-600">{p.category}</td>
                  {/* SKU */}
                  <td className="px-3 py-4">
                    <span className="text-rose-500 font-mono font-medium hover:underline cursor-pointer">{p.sku}</span>
                  </td>
                  {/* Stock */}
                  <td className="px-3 py-4">
                    <span className={`font-semibold ${p.stock === 0 ? "text-red-500" : p.stock < 50 ? "text-amber-500" : "text-gray-700"}`}>
                      {p.stock}
                    </span>
                  </td>
                  {/* Price */}
                  <td className="px-3 py-4 font-bold text-gray-800">${p.price.toFixed(2)}</td>
                  {/* Added */}
                  <td className="px-3 py-4 text-gray-500 whitespace-nowrap">{p.added}</td>
                  {/* Action */}
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
            {sorted.length === 0 ? "0" : `${(page-1)*PAGE_SIZE+1} – ${Math.min(page*PAGE_SIZE, sorted.length)}`} of {sorted.length} products &nbsp;·&nbsp; {totalPages} Pages
          </p>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400">The page on</span>
            <select value={page} onChange={e => setPage(Number(e.target.value))}
              className="text-xs border border-rose-100 rounded-lg px-2 py-1 bg-white focus:outline-none focus:ring-2 focus:ring-rose-300">
              {Array.from({length: totalPages}, (_,i) => (
                <option key={i+1} value={i+1}>{i+1}</option>
              ))}
            </select>
            <button onClick={() => setPage(p => Math.max(1,p-1))} disabled={page===1}
              className="p-1.5 rounded-lg border border-rose-100 text-gray-500 hover:bg-rose-50 disabled:opacity-30 transition">
              <IcoChev d="l" />
            </button>
            <button onClick={() => setPage(p => Math.min(totalPages,p+1))} disabled={page===totalPages}
              className="p-1.5 rounded-lg border border-rose-100 text-gray-500 hover:bg-rose-50 disabled:opacity-30 transition">
              <IcoChev d="r" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}