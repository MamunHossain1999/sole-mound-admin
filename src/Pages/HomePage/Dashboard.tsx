import { useState } from "react";

/* ─── Top Stat Cards ─── */
const topStats = [
  { label:"Total Brands",     value:"456",     icon:"🛒", grad:"from-violet-500 to-purple-600" },
  { label:"Total Categories", value:"23",      icon:"🏷️", grad:"from-emerald-400 to-teal-500"  },
  { label:"Total Products",   value:"30",      icon:"📦", grad:"from-sky-400    to-blue-500"   },
  { label:"Total Users",      value:"1777",    icon:"👥", grad:"from-rose-400   to-pink-500"   },
  { label:"Total Sales",      value:"$53,543", icon:"💰", grad:"from-amber-400  to-orange-400" },
];

/* ─── Order Stats ─── */
const orderMini = [
  { icon:"⚙️", label:"Processed Order", value:5,    bg:"from-amber-100  to-yellow-50",  dot:"bg-amber-400"   },
  { icon:"🚚", label:"On The Way",       value:23,   bg:"from-rose-100   to-pink-50",    dot:"bg-rose-400"    },
  { icon:"📦", label:"Pick-Up",          value:13,   bg:"from-violet-100 to-purple-50",  dot:"bg-violet-400"  },
  { icon:"❌", label:"Orders Cancelled", value:14,   bg:"from-red-100    to-rose-50",    dot:"bg-red-400"     },
];

/* ─── Top Selling Products ─── */
const topProducts = [
  { name:"Apple iPhone 13",     orders:506, status:"Stock", price:"$999.29" },
  { name:"Nike Air Jordan",     orders:506, status:"Stock", price:"$72.40"  },
  { name:"Beats Studio 2",      orders:506, status:"Stock", price:"$99.90"  },
  { name:"Apple Watch Series 7",orders:506, status:"Out",   price:"$249.99" },
  { name:"Amazon Echo Dot",     orders:506, status:"Stock", price:"$79.40"  },
];

/* ─── Top Brands ─── */
const topBrands = [
  { name:"Levis",              logo:"👖", orders:506, color:"bg-red-600"    },
  { name:"Nike Air Jordan",    logo:"✔️", orders:456, color:"bg-gray-900"   },
  { name:"Vans",               logo:"⭕", orders:405, color:"bg-gray-700"   },
  { name:"Apple Watch Series 7",logo:"🍎",orders:398, color:"bg-gray-800"   },
  { name:"Amazon Echo Dot",    logo:"📢", orders:346, color:"bg-orange-500" },
];

/* ─── Latest Orders ─── */
const latestOrders = [
  { product:"Iphone 13 Pro", orderId:"#11232", date:"Jun 29,2022", status:"Delivered", amount:"$400.00" },
  { product:"Macbook Pro",   orderId:"#11232", date:"Jun 29,2022", status:"Pending",   amount:"$288.00" },
  { product:"Macbook Pro",   orderId:"#11232", date:"Jun 29,2022", status:"Pending",   amount:"$288.00" },
  { product:"Microsoft Book",orderId:"#11232", date:"Jun 29,2022", status:"Delivered", amount:"$100.00" },
  { product:"Apple Pen",     orderId:"#11232", date:"Jun 29,2022", status:"Delivered", amount:"$60.00"  },
  { product:"Airpods",       orderId:"#11232", date:"Jun 29,2022", status:"Delivered", amount:"$80.00"  },
];

const regions = [
  { name:"England",         pct:48 },
  { name:"Northern Ireland",pct:25 },
  { name:"Scotland",        pct:15 },
  { name:"Wales",           pct:11 },
];

/* ─── Status badge ─── */
const StatusBadge = ({ status }: { status: string }) => {
  const styles: Record<string, string> = {
    Delivered:"text-emerald-600", Pending:"text-amber-500", Out:"text-red-500", Stock:"text-emerald-500"
  };
  const dots: Record<string, string> = {
    Delivered:"bg-emerald-500", Pending:"bg-amber-400", Out:"bg-red-500", Stock:"bg-emerald-500"
  };
  return (
    <span className={`flex items-center gap-1 text-xs font-medium ${styles[status] || "text-gray-500"}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dots[status] || "bg-gray-400"}`} />
      {status}
    </span>
  );
};

export default function Dashboard() {
  const [walletPeriod, setWalletPeriod] = useState("This Month");

  return (
    <div className="min-h-screen px-5 py-6 space-y-5"
      style={{ background:"linear-gradient(135deg,#fff5f7 0%,#fdf2ff 50%,#fff9f0 100%)", fontFamily:"'Lato','Segoe UI',sans-serif" }}>

      {/* ── TOP STAT CARDS ── */}
      <div className="grid grid-cols-5 gap-3">
        {topStats.map(s => (
          <div key={s.label} className={`bg-gradient-to-br ${s.grad} rounded-2xl p-4 text-white shadow-md relative overflow-hidden`}>
            <p className="text-xs font-semibold opacity-80 mb-1">{s.label}</p>
            <p className="text-2xl font-bold leading-tight">{s.value}</p>
            <span className="absolute bottom-3 right-3 text-3xl opacity-20 select-none">{s.icon}</span>
          </div>
        ))}
      </div>

      {/* ── ROW 2 ── */}
      <div className="grid grid-cols-3 gap-4">

        {/* Total Orders */}
        <div className="bg-white rounded-2xl border border-rose-50 shadow-sm p-5 space-y-4">
          <div>
            <p className="text-xs text-gray-400 font-medium">Total Orders</p>
            <p className="text-3xl font-bold text-gray-800 mt-0.5">4563</p>
          </div>
          <button className="w-full py-2.5 rounded-xl bg-gradient-to-r from-rose-400 to-pink-500 text-white text-sm font-semibold shadow shadow-rose-200 hover:shadow-rose-300 hover:shadow-md transition flex items-center justify-center gap-2">
            All Order <span className="text-base">+</span>
          </button>
          <div className="space-y-3 pt-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-500 text-sm">⏳</div>
                <p className="text-xs text-gray-500">Orders Pending</p>
              </div>
              <p className="font-bold text-gray-800 text-sm">1034</p>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-500 text-sm">✅</div>
                <p className="text-xs text-gray-500">Orders Completed</p>
              </div>
              <p className="font-bold text-gray-800 text-sm">2345</p>
            </div>
          </div>
        </div>

        {/* Order Mini Stats */}
        <div className="grid grid-cols-2 gap-3">
          {orderMini.map(o => (
            <div key={o.label} className={`bg-gradient-to-br ${o.bg} rounded-2xl p-4 border border-white shadow-sm flex flex-col gap-2`}>
              <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center text-xl shadow-sm">
                {o.icon}
              </div>
              <div>
                <p className="text-[11px] text-gray-500 leading-tight">{o.label}</p>
                <p className="text-xl font-bold text-gray-800">{o.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Admin Wallet */}
        <div className="bg-white rounded-2xl border border-rose-50 shadow-sm p-5">
          <div className="flex items-center justify-between mb-3">
            <p className="font-bold text-gray-800 text-sm" style={{ fontFamily:"'Georgia',serif" }}>Admin Wallet</p>
            <select value={walletPeriod} onChange={e => setWalletPeriod(e.target.value)}
              className="text-xs border border-gray-200 rounded-lg px-2 py-1 bg-white focus:outline-none focus:ring-2 focus:ring-rose-300">
              <option>This Month</option>
              <option>Last Month</option>
              <option>This Year</option>
            </select>
          </div>
          {/* Wallet icon */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-100 to-yellow-50 flex items-center justify-center text-2xl shadow-inner">👛</div>
            <div>
              <p className="text-[11px] text-gray-400">Total Earning</p>
              <p className="text-lg font-bold text-gray-800">$456</p>
            </div>
          </div>
          <div className="space-y-2">
            {[
              { label:"Already Withdraw", value:"$456", color:"text-emerald-600" },
              { label:"Pending Withdraw", value:"$345", color:"text-amber-500"   },
              { label:"Rejected Withdraw",value:"$76",  color:"text-red-500"     },
            ].map(w => (
              <div key={w.label} className="flex items-center justify-between bg-gray-50 rounded-xl px-3 py-2.5">
                <p className="text-xs text-gray-500">{w.label}</p>
                <p className={`text-sm font-bold ${w.color}`}>{w.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── ROW 3: Top Products + Top Brands ── */}
      <div className="grid grid-cols-2 gap-4">

        {/* Top Selling Products */}
        <div className="bg-white rounded-2xl border border-rose-50 shadow-sm p-5">
          <h2 className="font-bold text-gray-800 text-sm mb-4" style={{ fontFamily:"'Georgia',serif" }}>Top Selling Products</h2>
          <table className="w-full text-xs">
            <thead>
              <tr className="text-rose-400 font-semibold border-b border-gray-100">
                <th className="pb-2 text-left">Products</th>
                <th className="pb-2 text-center">Total Order</th>
                <th className="pb-2 text-left">Status</th>
                <th className="pb-2 text-right">Price</th>
              </tr>
            </thead>
            <tbody>
              {topProducts.map((p, i) => (
                <tr key={i} className="border-b border-gray-50 hover:bg-rose-50/30 transition">
                  <td className="py-2.5 text-gray-700 font-medium">{p.name}</td>
                  <td className="py-2.5 text-center text-gray-500">{p.orders}</td>
                  <td className="py-2.5"><StatusBadge status={p.status} /></td>
                  <td className="py-2.5 text-right font-semibold text-gray-800">{p.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Top Brands */}
        <div className="bg-white rounded-2xl border border-rose-50 shadow-sm p-5">
          <h2 className="font-bold text-gray-800 text-sm mb-4" style={{ fontFamily:"'Georgia',serif" }}>Top Brands</h2>
          <table className="w-full text-xs">
            <thead>
              <tr className="text-rose-400 font-semibold border-b border-gray-100">
                <th className="pb-2 text-left">Brands</th>
                <th className="pb-2 text-right">Order</th>
              </tr>
            </thead>
            <tbody>
              {topBrands.map((b, i) => (
                <tr key={i} className="border-b border-gray-50 hover:bg-rose-50/30 transition">
                  <td className="py-2.5">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-7 h-7 rounded-lg ${b.color} flex items-center justify-center text-white text-sm shadow-sm`}>
                        {b.logo}
                      </div>
                      <span className="text-gray-700 font-medium">{b.name}</span>
                    </div>
                  </td>
                  <td className="py-2.5 text-right font-semibold text-gray-700">{b.orders}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── ROW 4: Latest Orders + Revenue by Region ── */}
      <div className="grid grid-cols-2 gap-4">

        {/* Latest Orders */}
        <div className="bg-white rounded-2xl border border-rose-50 shadow-sm p-5">
          <h2 className="font-bold text-gray-800 text-sm mb-4" style={{ fontFamily:"'Georgia',serif" }}>Latest Orders</h2>
          <table className="w-full text-xs">
            <thead>
              <tr className="text-rose-400 font-semibold border-b border-gray-100">
                <th className="pb-2 text-left">Products</th>
                <th className="pb-2 text-left">Order ID</th>
                <th className="pb-2 text-left">Date</th>
                <th className="pb-2 text-left">Status</th>
                <th className="pb-2 text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {latestOrders.map((o, i) => (
                <tr key={i} className="border-b border-gray-50 hover:bg-rose-50/30 transition">
                  <td className="py-2 text-gray-700 font-medium">{o.product}</td>
                  <td className="py-2 text-rose-400 font-mono">{o.orderId}</td>
                  <td className="py-2 text-gray-400">{o.date}</td>
                  <td className="py-2"><StatusBadge status={o.status} /></td>
                  <td className="py-2 text-right font-bold text-gray-800">{o.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Revenue by Region */}
        <div className="bg-white rounded-2xl border border-rose-50 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-gray-800 text-sm" style={{ fontFamily:"'Georgia',serif" }}>Revenue by Region</h2>
            <button className="text-gray-400 hover:text-gray-600 text-lg">···</button>
          </div>

          {/* World map placeholder */}
          <div className="w-full h-32 bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl flex items-center justify-center mb-4 border border-gray-100 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              {[...Array(8)].map((_,i) => (
                <div key={i} className="absolute rounded-full border border-blue-300"
                  style={{ width:`${40+i*30}px`, height:`${20+i*15}px`, top:`${15+i*5}%`, left:`${5+i*10}%`, transform:"rotate(-15deg)" }} />
              ))}
            </div>
            <div className="relative z-10 grid grid-cols-5 gap-1 opacity-40 text-lg">
              {["🌍","🌎","🌏","🗺️","📍","🌐","🏔️","🌊","⛰️","🗾"].map((e,i) => <span key={i}>{e}</span>)}
            </div>
          </div>

          {/* Region bars */}
          <div className="space-y-3">
            {regions.map(r => (
              <div key={r.name}>
                <div className="flex justify-between text-xs text-gray-600 mb-1">
                  <span className="font-medium">{r.name}</span>
                  <span className="text-gray-400">{r.pct}%</span>
                </div>
                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-rose-400 to-pink-500 rounded-full transition-all duration-700"
                    style={{ width:`${r.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}