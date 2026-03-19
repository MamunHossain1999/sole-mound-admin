import { useState } from "react";

/* ─── Icons ─── */
const IcoStar    = ({ filled }: { filled: boolean }) => (
  <svg viewBox="0 0 20 20" className={`w-4 h-4 ${filled ? "text-amber-400" : "text-gray-200"}`} fill="currentColor">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
  </svg>
);
const IcoCheck   = () => <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.2" className="w-3.5 h-3.5 text-emerald-500"><path d="M4 10l4 4 8-8" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const IcoMinus   = () => <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4"><path d="M4 10h12" strokeLinecap="round"/></svg>;
const IcoPlus    = () => <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4"><path d="M10 4v12M4 10h12" strokeLinecap="round"/></svg>;
const IcoTruck   = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5"><path d="M1 3h15v13H1zM16 8h4l3 3v5h-7V8z" strokeLinecap="round" strokeLinejoin="round"/><circle cx="5.5" cy="18.5" r="1.5"/><circle cx="18.5" cy="18.5" r="1.5"/></svg>;
const IcoDiscount= () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5"><path d="M9 9h.01M15 15h.01M7 3l-4 4 14 14 4-4L7 3z" strokeLinecap="round"/></svg>;
const IcoSupport = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5"><path d="M18.364 5.636a9 9 0 1 1-12.728 0" strokeLinecap="round"/><path d="M12 12m-3 0a3 3 0 1 0 6 0 3 3 0 1 0-6 0" strokeLinecap="round"/></svg>;
const IcoThumb   = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z" strokeLinecap="round" strokeLinejoin="round"/><path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" strokeLinecap="round"/></svg>;
const IcoFlag    = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1zM4 22v-7" strokeLinecap="round" strokeLinejoin="round"/></svg>;

/* ─── Stars ─── */
const Stars = ({ rating, size = "md" }: { rating: number; size?: "sm"|"md" }) => (
  <div className="flex gap-0.5">
    {[1,2,3,4,5].map(i => (
      <span key={i} className={size === "sm" ? "scale-75" : ""}>
        <IcoStar filled={i <= Math.round(rating)} />
      </span>
    ))}
  </div>
);

/* ─── Thumbnail ─── */
const thumbs = [
  { emoji: "👕", bg: "from-gray-800 to-gray-900", label: "Black" },
  { emoji: "👕", bg: "from-amber-500 to-orange-400", label: "Orange" },
  { emoji: "👕", bg: "from-gray-100 to-gray-200", label: "White" },
  { emoji: "👕", bg: "from-sky-400 to-blue-500", label: "Blue" },
];

const reviews = [
  {
    name: "Henny K. Mark",
    avatar: "HM",
    avatarBg: "from-rose-400 to-pink-500",
    rating: 4,
    title: "Excellent Quality",
    date: "Reviewed in the US on 16 November 2023",
    body: "Medium thickness. Did not shrink after wash. Good elasticity. XL size. Perfectly fit for 5.10 height and heavy body. Did not fade after wash. Only for instance colour 5-shirt colour light fits.",
    helpful: 12,
  },
  {
    name: "Jorge Herry",
    avatar: "JH",
    avatarBg: "from-amber-400 to-orange-400",
    rating: 4,
    title: "Good Quality",
    date: "Reviewed in US on 21 December 2021",
    body: "Good fabric, in my poor cotton is skin friendly. Set like size campus. Shaded nice.",
    helpful: 8,
  },
];

const itemDetails = [
  ["Product Dimensions",   "52.3 x 40.6 x 6.4 cm; 900 Grams"],
  ["Date First Available", "22 September 2021"],
  ["Department",           "Men"],
  ["Manufacturer",         "Greensboro, NC 27410 Prince Pal"],
  ["Item model number",    "113742"],
  ["Country of Origin",    "U.S.A"],
  ["Manufacturer (addr.)", "Suite 348, 89257 Doumbob Union, Gilbertmouth"],
  ["Packer",               "Apt. 726 80915 Hung Stream, Ryantown, WV 44284"],
  ["Importer",             "Apt. 726 80915 Hung Stream, Ryantown, WV 44284"],
  ["Item Weight",          "900 g"],
  ["Item Dimensions",      "52.3 x 40.6 x 6.4 Centimeters"],
  ["Generic Name",         "T-Shirt"],
  ["Best Sellers Rank",    "#1.5 in Clothing & Accessories"],
];

export default function ProductDetails() {
  const [qty,       setQty]       = useState(1);
  const [selColor,  setSelColor]  = useState(0);
  const [selSize,   setSelSize]   = useState("M");
  const [selThumb,  setSelThumb]  = useState(0);
  const [expanded,  setExpanded]  = useState(false);

  const colors = [
    { bg: "bg-purple-500", label: "Purple" },
    { bg: "bg-orange-400", label: "Orange" },
    { bg: "bg-gray-200",   label: "White"  },
    { bg: "bg-sky-500",    label: "Blue"   },
  ];
  const sizes = ["S","M","L","XL","XXL"];

  const desc = `Top in sweatshirt fabric made from a cotton blend with a soft brushed inside. Relaxed fit with dropped shoulders, long sleeves and ribbing around the neckline, cuffs and hem. Small metal text applique`;

  return (
    <div className="min-h-screen px-4 py-8"
      style={{ background:"linear-gradient(135deg,#fff5f7 0%,#fdf2ff 55%,#fff9f0 100%)", fontFamily:"'Lato','Segoe UI',sans-serif" }}>
      <div className="max-w-3xl mx-auto space-y-5">

        {/* ── Product Card ── */}
        <div className="bg-white rounded-3xl border border-rose-50 shadow-sm overflow-hidden">
          <div className="flex flex-col md:flex-row gap-0">

            {/* Images */}
            <div className="md:w-64 p-5 flex flex-col gap-3 border-r border-gray-50">
              {/* Main image */}
              <div className={`rounded-2xl bg-gradient-to-br ${thumbs[selThumb].bg} h-52 flex items-center justify-center text-7xl shadow-inner`}>
                {thumbs[selThumb].emoji}
              </div>
              {/* Thumbs */}
              <div className="flex gap-2 justify-center">
                {thumbs.map((t,i) => (
                  <button key={i} onClick={() => setSelThumb(i)}
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${t.bg} flex items-center justify-center text-xl transition border-2 ${selThumb===i ? "border-rose-400 shadow-md" : "border-transparent"}`}>
                    {t.emoji}
                  </button>
                ))}
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 p-6 space-y-4">
              <div className="flex items-start gap-2">
                <span className="text-[10px] font-bold bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full mt-0.5">In Stock</span>
              </div>
              <h1 className="text-xl font-bold text-gray-800 leading-tight" style={{ fontFamily:"'Georgia',serif" }}>
                Men Black Slim Fit T-shirt
              </h1>
              <div className="flex items-center gap-2">
                <Stars rating={4} />
                <span className="text-xs text-rose-400 font-medium">(44 Reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-3">
                <span className="text-2xl font-bold text-gray-900">$80.00</span>
                <span className="text-sm text-gray-400 line-through">$100.00</span>
                <span className="text-xs font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded-full border border-red-100">20% OFF</span>
              </div>

              {/* Colors */}
              <div>
                <p className="text-xs font-semibold text-gray-500 mb-2">Colours in Stock</p>
                <div className="flex gap-2">
                  {colors.map((c,i) => (
                    <button key={i} onClick={() => setSelColor(i)}
                      className={`w-7 h-7 rounded-full ${c.bg} border-2 transition ${selColor===i ? "border-rose-500 scale-110 shadow-md" : "border-white shadow"}`} />
                  ))}
                </div>
              </div>

              {/* Sizes */}
              <div>
                <p className="text-xs font-semibold text-gray-500 mb-2">Size in 'fit'</p>
                <div className="flex gap-2">
                  {sizes.map(s => (
                    <button key={s} onClick={() => setSelSize(s)}
                      className={`w-9 h-9 rounded-xl text-xs font-bold border transition ${
                        selSize===s
                          ? "bg-rose-500 text-white border-rose-500 shadow-md shadow-rose-200"
                          : "bg-white text-gray-600 border-gray-200 hover:border-rose-300 hover:text-rose-500"
                      }`}>{s}</button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div>
                <p className="text-xs font-semibold text-gray-500 mb-2">Quantity</p>
                <div className="flex items-center gap-0">
                  <button onClick={() => setQty(q => Math.max(1,q-1))}
                    className="w-9 h-9 rounded-l-xl border border-r-0 border-gray-200 bg-gray-50 flex items-center justify-center hover:bg-rose-50 hover:text-rose-500 transition">
                    <IcoMinus />
                  </button>
                  <div className="w-12 h-9 border border-gray-200 flex items-center justify-center text-sm font-bold text-gray-800">
                    {qty}
                  </div>
                  <button onClick={() => setQty(q => q+1)}
                    className="w-9 h-9 rounded-r-xl border border-l-0 border-gray-200 bg-gray-50 flex items-center justify-center hover:bg-rose-50 hover:text-rose-500 transition">
                    <IcoPlus />
                  </button>
                </div>
              </div>

              {/* Badges */}
              <div className="space-y-1 pt-1">
                {[
                  "In Stock",
                  "Free delivery available",
                  "Sales: 10% Off Use Code: CODE123",
                ].map((b,i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-gray-600">
                    <IcoCheck />{b}
                  </div>
                ))}
              </div>

              {/* Description */}
              <div>
                <p className="text-xs font-semibold text-gray-500 mb-1">Description</p>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {expanded ? desc : desc.slice(0,120) + "…"}
                  <button onClick={() => setExpanded(!expanded)}
                    className="ml-1 text-rose-400 font-semibold hover:underline text-xs">
                    {expanded ? "Show less" : "Read more"}
                  </button>
                </p>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-1">
                <button className="flex-1 py-2.5 rounded-xl bg-rose-500 text-white text-sm font-bold hover:bg-rose-600 transition shadow-md shadow-rose-200">
                  Add to Cart
                </button>
                <button className="flex-1 py-2.5 rounded-xl border-2 border-rose-400 text-rose-500 text-sm font-bold hover:bg-rose-50 transition">
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── Service Badges ── */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { icon: <IcoTruck />,    title: "Free shipping for all orders over $100", sub: "Only for this issue" },
            { icon: <IcoDiscount />, title: "Special discounts for customers",         sub: "Coupons up to $100" },
            { icon: <IcoSupport />,  title: "Export Customer Service",                sub: "9:00 – 20:00, 7 days/week" },
          ].map((b,i) => (
            <div key={i} className="bg-white rounded-2xl border border-rose-50 shadow-sm p-4 flex flex-col items-center text-center gap-2">
              <span className="text-rose-400">{b.icon}</span>
              <p className="text-xs font-semibold text-gray-700 leading-snug">{b.title}</p>
              <p className="text-[11px] text-gray-400">{b.sub}</p>
            </div>
          ))}
        </div>

        {/* ── Bottom Grid: Item Details + Reviews ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          {/* Item Details */}
          <div className="bg-white rounded-2xl border border-rose-50 shadow-sm p-5">
            <h2 className="font-bold text-gray-800 text-base mb-4" style={{ fontFamily:"'Georgia',serif" }}>
              Item Detail
            </h2>
            <div className="space-y-2">
              {itemDetails.map(([k,v]) => (
                <div key={k} className="flex gap-2 text-xs border-b border-gray-50 pb-2 last:border-0 last:pb-0">
                  <span className="text-gray-400 w-36 shrink-0">{k}</span>
                  <span className="text-gray-700 font-medium leading-snug">{v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Reviews */}
          <div className="bg-white rounded-2xl border border-rose-50 shadow-sm p-5">
            <h2 className="font-bold text-gray-800 text-base mb-4" style={{ fontFamily:"'Georgia',serif" }}>
              Top Review From World
            </h2>
            <div className="space-y-5">
              {reviews.map((r,i) => (
                <div key={i} className="border-b border-gray-50 last:border-0 pb-5 last:pb-0">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${r.avatarBg} flex items-center justify-center text-white text-xs font-bold shadow`}>
                      {r.avatar}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800">{r.name}</p>
                      <div className="flex items-center gap-1">
                        <Stars rating={r.rating} size="sm" />
                        <span className="text-[10px] text-gray-400 ml-1 font-medium">{r.title}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-[10px] text-gray-400 mb-1 font-medium">{r.date}</p>
                  <p className="text-xs text-gray-600 leading-relaxed mb-3">{r.body}</p>
                  <div className="flex gap-3">
                    <button className="flex items-center gap-1 text-xs text-gray-400 hover:text-rose-500 transition">
                      <IcoThumb /> Helpful ({r.helpful})
                    </button>
                    <button className="flex items-center gap-1 text-xs text-gray-400 hover:text-red-500 transition">
                      <IcoFlag /> Report
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}