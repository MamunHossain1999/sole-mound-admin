import { useState } from "react";

interface LineItem {
  id: number;
  name: string;
  size: string;
  emoji: string;
  bg: string;
  qty: number;
  price: number;
  tax: number;
}

const ITEMS: LineItem[] = [
  { id:1, name:"Men Black Slim Fit T-shirt", size:"M", emoji:"👕", bg:"from-gray-700 to-gray-900", qty:1, price:80,  tax:3 },
  { id:2, name:"Dark Green Cargo Pent",      size:"M", emoji:"👖", bg:"from-green-700 to-gray-800", qty:3, price:110, tax:4 },
  { id:3, name:"Men Dark Brown Wallet",      size:"S", emoji:"👜", bg:"from-amber-700 to-yellow-900",qty:1, price:132, tax:5 },
  { id:4, name:"Kid's Yellow T-shirt",       size:"S", emoji:"👕", bg:"from-yellow-400 to-amber-500",qty:2, price:110, tax:5 },
];

const DISCOUNT    = 60;
const TAX_RATE    = 0.155;

export default function InvoiceDetails() {
  const [items, setItems] = useState<LineItem[]>(ITEMS);
  const [printed, setPrinted] = useState(false);

  const subTotal = items.reduce((s, i) => s + (i.price + i.tax) * i.qty, 0);
  const estTax   = Math.round(subTotal * TAX_RATE * 100) / 100;
  const grand    = subTotal - DISCOUNT + estTax;

  const handlePrint = () => { setPrinted(true); window.print(); };

  return (
    <div className="min-h-screen px-6 py-8"
      style={{ background:"linear-gradient(135deg,#fff5f7 0%,#fdf2ff 55%,#fff9f0 100%)", fontFamily:"'Lato','Segoe UI',sans-serif" }}>
      <div className="max-w-2xl mx-auto">

        {/* ── Header ── */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800" style={{ fontFamily:"'Georgia',serif" }}>Invoice</h1>
            <nav className="flex items-center gap-1 text-xs text-gray-400 mt-1">
              <span className="hover:text-rose-400 cursor-pointer transition">Dashboard</span>
              <span>›</span>
              <span className="hover:text-rose-400 cursor-pointer transition">Invoice</span>
              <span>›</span>
              <span className="text-gray-500 font-medium">Details</span>
            </nav>
          </div>
          <div className="flex gap-2">
            <button onClick={handlePrint}
              className="px-5 py-2 rounded-xl border border-gray-200 bg-white text-gray-700 text-sm font-medium hover:border-rose-300 hover:text-rose-500 transition shadow-sm">
              Print
            </button>
            <button className="px-5 py-2 rounded-xl bg-rose-500 text-white text-sm font-semibold hover:bg-rose-600 transition shadow-md shadow-rose-200">
              Submit
            </button>
          </div>
        </div>

        {/* ── Invoice Card ── */}
        <div className="bg-white rounded-3xl border border-rose-50 shadow-sm overflow-hidden">

          {/* Invoice Header (purple band) */}
          <div className="bg-violet-100/60 px-6 py-5 flex items-start justify-between">
            {/* Left: Company */}
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-400 to-purple-600 flex items-center justify-center shadow">
                <span className="text-white text-2xl">⛰️</span>
              </div>
              <div>
                <p className="font-bold text-gray-800 text-sm leading-snug">Sole Mound Admin.</p>
                <p className="text-xs text-gray-500 mt-1">01***************</p>
                <p className="text-xs text-gray-500">Address</p>
                <p className="text-xs text-violet-500 hover:underline cursor-pointer">info@solemound.com.</p>
              </div>
            </div>

            {/* Right: Invoice meta */}
            <div className="text-right space-y-1 min-w-[180px]">
              <div className="flex justify-between gap-8">
                <span className="text-xs text-gray-500">Invoice :</span>
                <span className="text-xs font-bold text-gray-800">#INV-0758267/90</span>
              </div>
              <div className="flex justify-between gap-8">
                <span className="text-xs text-gray-500">Issue Date :</span>
                <span className="text-xs font-semibold text-rose-500">23 April 2024</span>
              </div>
              <div className="flex justify-between gap-8">
                <span className="text-xs text-gray-500">Due Date :</span>
                <span className="text-xs font-semibold text-rose-500">26 April 2024</span>
              </div>
              <div className="flex justify-between gap-8">
                <span className="text-xs text-gray-500">Amount :</span>
                <span className="text-xs font-bold text-gray-800">$737.00</span>
              </div>
              <div className="flex justify-between gap-8 items-center">
                <span className="text-xs text-gray-500">Status :</span>
                <span className="text-[11px] font-bold bg-emerald-100 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full">Paid</span>
              </div>
            </div>
          </div>

          <div className="px-6 py-5 space-y-5">
            {/* Issue From / For */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-xs font-bold text-gray-500 mb-2">Issue From :</p>
                <p className="text-sm font-bold text-gray-800">Sole Mound Admin.</p>
                <p className="text-xs text-gray-500 mt-1">Phone: 01***************</p>
                <p className="text-xs text-gray-500">Address</p>
                <p className="text-xs text-gray-500">Issue mail: info@solemound.com.</p>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-500 mb-2">Issue For :</p>
                <p className="text-sm font-bold text-gray-800">Gaston Lapierre</p>
                <p className="text-xs text-gray-500 mt-1">1344 Hershell Hollow Road WA 98168, UK</p>
                <p className="text-xs text-gray-500">Phone : +(123) 732-760-5760</p>
                <p className="text-xs text-gray-500">Email : hello@dundermifflin.com</p>
              </div>
            </div>

            {/* Line Items Table */}
            <div className="border border-gray-100 rounded-2xl overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wider border-b border-gray-100">
                    <th className="px-4 py-3 text-left">Product Name</th>
                    <th className="px-4 py-3 text-center">Quantity</th>
                    <th className="px-4 py-3 text-right">Price</th>
                    <th className="px-4 py-3 text-right">Tax</th>
                    <th className="px-4 py-3 text-right">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map(item => {
                    const total = (item.price + item.tax) * item.qty;
                    return (
                      <tr key={item.id} className="border-b border-gray-50 last:border-0 hover:bg-rose-50/20 transition">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${item.bg} flex items-center justify-center text-base shadow-inner shrink-0`}>
                              {item.emoji}
                            </div>
                            <div>
                              <p className="font-semibold text-gray-700 text-xs leading-tight">{item.name}</p>
                              <p className="text-[11px] text-gray-400">Size : {item.size}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-center text-gray-600">{item.qty}</td>
                        <td className="px-4 py-3 text-right text-gray-700">${item.price.toFixed(2)}</td>
                        <td className="px-4 py-3 text-right text-gray-700">${item.tax.toFixed(2)}</td>
                        <td className="px-4 py-3 text-right font-bold text-gray-800">${total.toFixed(2)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Totals */}
            <div className="flex justify-end">
              <div className="w-64 space-y-2">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Sub Total :</span>
                  <span className="font-semibold text-gray-800">${subTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Discount :</span>
                  <span className="font-semibold text-red-500">-${DISCOUNT.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Estimated Tax (15.5%) :</span>
                  <span className="font-semibold text-gray-800">${estTax.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-100 pt-2 flex justify-between text-sm font-bold text-gray-800">
                  <span>Grand Amount :</span>
                  <span>${grand.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Payment Notice */}
            <div className="flex items-start gap-3 bg-rose-50 border border-rose-100 rounded-2xl p-4">
              <div className="w-7 h-7 rounded-full bg-rose-500 flex items-center justify-center text-white text-xs font-bold shrink-0 mt-0.5">O</div>
              <p className="text-xs text-gray-600 leading-relaxed">
                All accounts are to be paid within 7 days from receipt of invoice. To be paid by cheque or credit card or direct payment online.
                If account is not paid within 7 days the credits details supplied as confirmation of work undertaken will be charged the agreed quoted fee noted above.
              </p>
            </div>

            {/* Bottom Actions */}
            <div className="flex justify-end gap-3 pt-2">
              <button onClick={handlePrint}
                className="px-6 py-2.5 rounded-xl border border-gray-200 bg-white text-gray-700 text-sm font-medium hover:border-rose-300 hover:text-rose-500 transition shadow-sm">
                Print
              </button>
              <button className="px-8 py-2.5 rounded-xl bg-rose-500 text-white text-sm font-semibold hover:bg-rose-600 transition shadow-md shadow-rose-200">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}