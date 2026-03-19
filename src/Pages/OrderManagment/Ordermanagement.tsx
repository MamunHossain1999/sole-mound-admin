import { useState } from "react";

/* ─── Types ─── */
interface Order {
  id: string;
  product: string;
  subProducts?: string;
  date: string;
  customer: string;
  amount: number;
  status: "Paid" | "Pending" | "Cancelled";
  method: "Mastercard" | "Visacard" | "Paypal";
}

/* ─── Mock Data ─── */
const ALL_ORDERS: Order[] = [
  { id: "9348fjr73", product: "Handmade Pouch",    subProducts: "+3 other products", date: "29 Dec 2022", customer: "Ashley Foster",   amount: 6934, status: "Paid",      method: "Mastercard" },
  { id: "9348fjr73", product: "Smartwatch E2",     subProducts: "+1 other products", date: "24 Dec 2022", customer: "Ellie Parker",    amount: 1885, status: "Paid",      method: "Visacard"   },
  { id: "9348fjr73", product: "Smartwatch E1",                                        date: "12 Dec 2022", customer: "Eric Lawson",     amount: 8519, status: "Paid",      method: "Mastercard" },
  { id: "9348fjr73", product: "Headphone G1 Pro",  subProducts: "+1 other products", date: "21 Oct 2022", customer: "Colin Hunt",      amount:  948, status: "Pending",   method: "Visacard"   },
  { id: "9348fjr73", product: "Iphone X",                                             date: "21 Oct 2022", customer: "Georgia White",   amount: 8090, status: "Pending",   method: "Mastercard" },
  { id: "9348fjr73", product: "Puma Shoes",        subProducts: "+1 other products", date: "21 Oct 2022", customer: "Kate Richards",   amount: 4102, status: "Paid",      method: "Mastercard" },
  { id: "9348fjr73", product: "Imac 2021",                                            date: "19 Sep 2022", customer: "Noah Ellis",      amount: 6578, status: "Paid",      method: "Mastercard" },
  { id: "9348fjr73", product: "Nike Shoes",        subProducts: "+1 other products", date: "19 Sep 2022", customer: "Jackson Brooks",  amount: 8462, status: "Pending",   method: "Mastercard" },
  { id: "9348fjr73", product: "Lego Car",          subProducts: "+4 other products", date: "19 Sep 2022", customer: "Arthur Knight",   amount: 9050, status: "Pending",   method: "Mastercard" },
  { id: "9348fjr73", product: "Skincare Alia 1",   subProducts: "+1 other products", date: "10 Aug 2022", customer: "Lucas James",     amount:  298, status: "Paid",      method: "Mastercard" },
  { id: "9348fjr73", product: "Wireless Earbuds",  subProducts: "+2 other products", date: "05 Aug 2022", customer: "Sophia Turner",   amount: 3210, status: "Cancelled", method: "Paypal"     },
  { id: "9348fjr73", product: "Gaming Chair",                                         date: "01 Aug 2022", customer: "Liam Scott",      amount: 7800, status: "Paid",      method: "Visacard"   },
  { id: "9348fjr73", product: "Mechanical Keyboard",                                  date: "28 Jul 2022", customer: "Olivia Brown",    amount: 1450, status: "Pending",   method: "Mastercard" },
];

const PAGE_SIZE = 10;

const STATUS_STYLES: Record<Order["status"], string> = {
  Paid:      "bg-emerald-100 text-emerald-700 border border-emerald-200",
  Pending:   "bg-amber-100  text-amber-700  border border-amber-200",
  Cancelled: "bg-red-100    text-red-600    border border-red-200",
};

const METHOD_ICON: Record<Order["method"], string> = {
  Mastercard: "💳",
  Visacard:   "💳",
  Paypal:     "🅿️",
};

/* ─── Tiny SVG Icons ─── */
const IconEdit = () => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4">
    <path d="M14.5 2.5a2.121 2.121 0 0 1 3 3L6 17l-4 1 1-4L14.5 2.5z" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const IconEye = () => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4">
    <ellipse cx="10" cy="10" rx="8" ry="5" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="10" cy="10" r="2" strokeLinecap="round"/>
  </svg>
);
const IconSearch = () => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4">
    <circle cx="9" cy="9" r="6"/><path d="M15 15l-3-3" strokeLinecap="round"/>
  </svg>
);
const IconFilter = () => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4">
    <path d="M3 5h14M6 10h8M9 15h2" strokeLinecap="round"/>
  </svg>
);
const IconShare = () => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4">
    <circle cx="15" cy="4" r="2"/><circle cx="15" cy="16" r="2"/><circle cx="5" cy="10" r="2"/>
    <path d="M7 9l6-4M7 11l6 4" strokeLinecap="round"/>
  </svg>
);
const IconExport = () => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4">
    <path d="M10 3v9M6 8l4-5 4 5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M3 14v2a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2" strokeLinecap="round"/>
  </svg>
);
const IconPlus = () => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
    <path d="M10 4v12M4 10h12" strokeLinecap="round"/>
  </svg>
);
const IconChevron = ({ dir }: { dir: "left" | "right" }) => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
    <path d={dir === "left" ? "M13 5l-5 5 5 5" : "M7 5l5 5-5 5"} strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

/* ─── Product Thumbnail placeholder ─── */
const ProductThumb = () => (
  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-100 to-pink-200 flex items-center justify-center shadow-inner shrink-0">
    <span className="text-lg">📦</span>
  </div>
);

/* ─── Main Component ─── */
export default function OrderManagement() {
  const [search, setSearch]       = useState("");
  const [statusFilter, setStatus] = useState<string>("All");
  const [page, setPage]           = useState(1);
  const [selected, setSelected]   = useState<Set<number>>(new Set());
  const [showFilter, setFilter]   = useState(false);
  const [sortAmt, setSortAmt]     = useState<"asc" | "desc" | null>(null);

  /* filter + search */
  const filtered = ALL_ORDERS.filter((o) => {
    const q = search.toLowerCase();
    const matchSearch =
      o.product.toLowerCase().includes(q) ||
      o.customer.toLowerCase().includes(q) ||
      o.id.toLowerCase().includes(q);
    const matchStatus = statusFilter === "All" || o.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const sorted = sortAmt
    ? [...filtered].sort((a, b) => sortAmt === "asc" ? a.amount - b.amount : b.amount - a.amount)
    : filtered;

  const totalPages = Math.ceil(sorted.length / PAGE_SIZE);
  const pageData   = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const toggleRow = (i: number) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  };

  const toggleAll = () => {
    if (selected.size === pageData.length) setSelected(new Set());
    else setSelected(new Set(pageData.map((_, i) => i)));
  };

  return (
    <div
      className="min-h-screen px-6 py-8"
      style={{
        background: "linear-gradient(135deg,#fff5f7 0%,#fdf2ff 55%,#fff9f0 100%)",
        fontFamily: "'Lato', 'Segoe UI', sans-serif",
      }}
    >
      {/* ── Page Header ── */}
      <div className="flex items-start justify-between mb-1">
        <div>
          <h1 className="text-2xl font-bold text-gray-800" style={{ fontFamily: "'Georgia',serif" }}>
            Order Details
          </h1>
          <nav className="flex items-center gap-1 text-xs text-gray-400 mt-1">
            <span className="hover:text-rose-400 cursor-pointer transition">Dashboard</span>
            <span>›</span>
            <span className="hover:text-rose-400 cursor-pointer transition">Order Management</span>
            <span>›</span>
            <span className="text-gray-500 font-medium">Pending</span>
          </nav>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-rose-200 bg-white text-gray-700 text-sm font-medium hover:border-rose-400 hover:text-rose-500 transition shadow-sm">
            <IconPlus /> Create Order
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-500 text-white text-sm font-semibold hover:bg-rose-600 transition shadow-md shadow-rose-200">
            <IconExport /> Export
          </button>
        </div>
      </div>

      {/* ── Card ── */}
      <div className="mt-6 bg-white rounded-3xl shadow-sm border border-rose-50 overflow-hidden">

        {/* Card Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-rose-50">
          <h2 className="font-semibold text-gray-800 text-base" style={{ fontFamily: "'Georgia',serif" }}>
            Customer Orders
          </h2>
          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative">
              <input
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                placeholder="Search product"
                className="pl-3 pr-9 py-2 rounded-xl border border-rose-100 bg-rose-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300 placeholder-rose-300 w-44 transition"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-rose-400">
                <IconSearch />
              </span>
            </div>

            {/* Filter dropdown */}
            <div className="relative">
              <button
                onClick={() => setFilter(!showFilter)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl border border-rose-200 bg-white text-rose-500 text-sm font-medium hover:bg-rose-50 transition"
              >
                <IconFilter /> Filter
              </button>
              {showFilter && (
                <div className="absolute right-0 top-11 bg-white border border-rose-100 rounded-2xl shadow-xl z-30 p-3 w-44">
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-2 px-1">Status</p>
                  {["All", "Paid", "Pending", "Cancelled"].map((s) => (
                    <button
                      key={s}
                      onClick={() => { setStatus(s); setFilter(false); setPage(1); }}
                      className={`w-full text-left px-3 py-1.5 rounded-lg text-sm transition mb-0.5 ${
                        statusFilter === s ? "bg-rose-500 text-white font-semibold" : "text-gray-600 hover:bg-rose-50"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                  <hr className="my-2 border-rose-50" />
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-2 px-1">Amount</p>
                  {[
                    { label: "Low → High", val: "asc" as const },
                    { label: "High → Low", val: "desc" as const },
                    { label: "Default",    val: null },
                  ].map(({ label, val }) => (
                    <button
                      key={label}
                      onClick={() => { setSortAmt(val); setFilter(false); setPage(1); }}
                      className={`w-full text-left px-3 py-1.5 rounded-lg text-sm transition mb-0.5 ${
                        sortAmt === val ? "bg-rose-500 text-white font-semibold" : "text-gray-600 hover:bg-rose-50"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-rose-200 bg-white text-rose-500 text-sm font-medium hover:bg-rose-50 transition">
              <IconShare /> Share
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-rose-50/60 border-b border-rose-100 text-xs text-gray-400 uppercase tracking-widest">
                <th className="px-6 py-3 text-left w-10">
                  <input
                    type="checkbox"
                    checked={selected.size === pageData.length && pageData.length > 0}
                    onChange={toggleAll}
                    className="accent-rose-500 w-4 h-4 rounded"
                  />
                </th>
                <th className="px-3 py-3 text-left">Order ID</th>
                <th className="px-3 py-3 text-left">Product</th>
                <th className="px-3 py-3 text-left">Date</th>
                <th className="px-3 py-3 text-left">Customer</th>
                <th className="px-3 py-3 text-left">Amount</th>
                <th className="px-3 py-3 text-left">Status</th>
                <th className="px-3 py-3 text-left">Method</th>
                <th className="px-3 py-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {pageData.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-16 text-center text-gray-400">
                    No orders found.
                  </td>
                </tr>
              ) : (
                pageData.map((order, i) => (
                  <tr
                    key={i}
                    className={`border-b border-gray-50 transition group ${
                      selected.has(i) ? "bg-rose-50/50" : "hover:bg-gray-50/60"
                    }`}
                  >
                    {/* Checkbox */}
                    <td className="px-6 py-3.5">
                      <input
                        type="checkbox"
                        checked={selected.has(i)}
                        onChange={() => toggleRow(i)}
                        className="accent-rose-500 w-4 h-4 rounded"
                      />
                    </td>
                    {/* Order ID */}
                    <td className="px-3 py-3.5 font-mono text-xs text-gray-400 whitespace-nowrap">
                      {order.id}
                    </td>
                    {/* Product */}
                    <td className="px-3 py-3.5">
                      <div className="flex items-center gap-3">
                        <ProductThumb />
                        <div>
                          <p className="font-semibold text-gray-700 leading-tight">{order.product}</p>
                          {order.subProducts && (
                            <p className="text-[11px] text-gray-400 leading-tight">{order.subProducts}</p>
                          )}
                        </div>
                      </div>
                    </td>
                    {/* Date */}
                    <td className="px-3 py-3.5 text-gray-500 whitespace-nowrap">{order.date}</td>
                    {/* Customer */}
                    <td className="px-3 py-3.5">
                      <span className="text-rose-500 font-medium hover:underline cursor-pointer">
                        {order.customer}
                      </span>
                    </td>
                    {/* Amount */}
                    <td className="px-3 py-3.5 font-bold text-gray-800">
                      ${order.amount.toLocaleString()}
                    </td>
                    {/* Status */}
                    <td className="px-3 py-3.5">
                      <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${STATUS_STYLES[order.status]}`}>
                        {order.status}
                      </span>
                    </td>
                    {/* Method */}
                    <td className="px-3 py-3.5 text-gray-500 whitespace-nowrap">
                      <span className="flex items-center gap-1.5">
                        <span>{METHOD_ICON[order.method]}</span>
                        {order.method}
                      </span>
                    </td>
                    {/* Action */}
                    <td className="px-3 py-3.5">
                      <div className="flex items-center gap-2">
                        <button className="p-1.5 rounded-lg text-gray-400 hover:text-rose-500 hover:bg-rose-50 transition">
                          <IconEdit />
                        </button>
                        <button className="p-1.5 rounded-lg text-gray-400 hover:text-rose-500 hover:bg-rose-50 transition">
                          <IconEye />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-rose-50">
          <p className="text-xs text-gray-400">
            {Math.min((page - 1) * PAGE_SIZE + 1, sorted.length)}–{Math.min(page * PAGE_SIZE, sorted.length)} of{" "}
            {sorted.length} orders &nbsp;·&nbsp; {totalPages} Pages
          </p>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400">The page on</span>
            <select
              value={page}
              onChange={(e) => setPage(Number(e.target.value))}
              className="text-xs border border-rose-100 rounded-lg px-2 py-1 bg-white focus:outline-none focus:ring-2 focus:ring-rose-300"
            >
              {Array.from({ length: totalPages }, (_, i) => (
                <option key={i + 1} value={i + 1}>{i + 1}</option>
              ))}
            </select>
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="p-1.5 rounded-lg border border-rose-100 text-gray-500 hover:bg-rose-50 disabled:opacity-30 transition"
            >
              <IconChevron dir="left" />
            </button>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="p-1.5 rounded-lg border border-rose-100 text-gray-500 hover:bg-rose-50 disabled:opacity-30 transition"
            >
              <IconChevron dir="right" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}