import { useState } from "react";

/* ─── Types ─── */
interface LineItem {
  id: number;
  name: string;
  size: string;
  qty: number;
  price: string;
  tax: string;
}

/* ─── Icons ─── */
const IcoExport = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4"><path d="M12 3v9M8 8l4-5 4 5" strokeLinecap="round" strokeLinejoin="round"/><path d="M3 14v2a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-2" strokeLinecap="round"/></svg>;
const IcoImport = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4"><path d="M12 15V6M8 12l4 4 4-4" strokeLinecap="round" strokeLinejoin="round"/><path d="M3 14v2a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-2" strokeLinecap="round"/></svg>;
const IcoPlus   = () => <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3 h-3"><path d="M10 4v12M4 10h12" strokeLinecap="round"/></svg>;
const IcoMinus  = () => <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3 h-3"><path d="M4 10h12" strokeLinecap="round"/></svg>;
const IcoDollar = () => <span className="text-gray-400 text-sm font-semibold">$</span>;

/* ─── Reusable ─── */
const Label = ({ children }: { children: React.ReactNode }) => (
  <p className="text-xs font-semibold text-gray-600 mb-1.5">{children}</p>
);
const Input = ({ placeholder, value, onChange, type = "text" }: {
  placeholder?: string; value: string; onChange: (v: string) => void; type?: string;
}) => (
  <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent transition"
  />
);
const DollarInput = ({ placeholder = "000", value, onChange }: {
  placeholder?: string; value: string; onChange: (v: string) => void;
}) => (
  <div className="relative flex items-center border border-gray-200 rounded-xl bg-white overflow-hidden focus-within:ring-2 focus-within:ring-rose-300 transition">
    <div className="pl-3 pr-1.5 flex items-center shrink-0"><IcoDollar /></div>
    <input type="number" value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
      className="flex-1 py-2.5 pr-3 text-sm text-gray-700 placeholder-gray-300 bg-transparent focus:outline-none"
    />
  </div>
);

let nextId = 2;

export default function InvoiceCreate() {
  /* Sender */
  const [senderName,    setSenderName]    = useState("");
  const [senderAddress, setSenderAddress] = useState("");
  const [senderPhone,   setSenderPhone]   = useState("");

  /* Invoice meta */
  const [invoiceNum,  setInvoiceNum]  = useState("");
  const [issueDate,   setIssueDate]   = useState("");
  const [dueDate,     setDueDate]     = useState("");
  const [amount,      setAmount]      = useState("");

  /* Issue From */
  const [fromName,    setFromName]    = useState("");
  const [fromAddress, setFromAddress] = useState("");
  const [fromPhone,   setFromPhone]   = useState("");
  const [fromEmail,   setFromEmail]   = useState("");

  /* Issue For */
  const [forName,     setForName]     = useState("");
  const [forAddress,  setForAddress]  = useState("");
  const [forPhone,    setForPhone]    = useState("");
  const [forEmail,    setForEmail]    = useState("");

  /* Discount */
  const [discount,    setDiscount]    = useState("");

  /* Line items */
  const [items, setItems] = useState<LineItem[]>([
    { id:1, name:"", size:"", qty:1, price:"", tax:"" }
  ]);

  const addItem = () => {
    setItems(prev => [...prev, { id: nextId++, name:"", size:"", qty:1, price:"", tax:"" }]);
  };

  const clearItem = (id: number) => {
    setItems(prev => prev.map(i => i.id === id ? { ...i, name:"", size:"", qty:1, price:"", tax:"" } : i));
  };

  const updateItem = (id: number, field: keyof LineItem, val: string | number) => {
    setItems(prev => prev.map(i => i.id === id ? { ...i, [field]: val } : i));
  };

  const adjustQty = (id: number, delta: number) => {
    setItems(prev => prev.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i));
  };

  /* Calculations */
  const subTotal = items.reduce((s, i) => {
    const p = parseFloat(i.price) || 0;
    const t = parseFloat(i.tax)   || 0;
    return s + (p + t) * i.qty;
  }, 0);
  const disc     = parseFloat(discount) || 0;
  const estTax   = Math.round(subTotal * 0.155 * 100) / 100;
  const grand    = Math.max(0, subTotal - disc + estTax);

  const handleSubmit = () => alert("Invoice created successfully!");
  const handleClear  = () => {
    setSenderName(""); setSenderAddress(""); setSenderPhone("");
    setInvoiceNum(""); setIssueDate(""); setDueDate(""); setAmount("");
    setFromName(""); setFromAddress(""); setFromPhone(""); setFromEmail("");
    setForName(""); setForAddress(""); setForPhone(""); setForEmail("");
    setDiscount("");
    setItems([{ id:1, name:"", size:"", qty:1, price:"", tax:"" }]);
  };

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
              <span className="text-gray-500 font-medium">Create</span>
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

        {/* ── Main Card ── */}
        <div className="bg-white rounded-3xl border border-rose-50 shadow-sm p-6 space-y-5">

          {/* Logo + Invoice Number */}
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-400 to-purple-600 flex items-center justify-center shadow shrink-0">
              <span className="text-white text-2xl">⛰️</span>
            </div>
            <div className="flex-1 max-w-xs ml-auto">
              <Label>Invoice Number :</Label>
              <Input placeholder="#INV-0758267/90" value={invoiceNum} onChange={setInvoiceNum} />
            </div>
          </div>

          {/* Sender + Date grid */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Sender Name</Label>
              <Input placeholder="First Name" value={senderName} onChange={setSenderName} />
            </div>
            <div>
              <Label>Issue Date</Label>
              <Input placeholder="dd-mm-yyyy" value={issueDate} onChange={setIssueDate} type="date" />
            </div>
            <div>
              <Label>Sender Full Address</Label>
              <Input placeholder="Enter Address" value={senderAddress} onChange={setSenderAddress} />
            </div>
            <div>
              <Label>Due Date</Label>
              <Input placeholder="dd-mm-yyyy" value={dueDate} onChange={setDueDate} type="date" />
            </div>
            <div>
              <Label>Phone Number</Label>
              <Input placeholder="Number" value={senderPhone} onChange={setSenderPhone} />
            </div>
            <div>
              <Label>Amount</Label>
              <DollarInput placeholder="000" value={amount} onChange={setAmount} />
            </div>
          </div>

          {/* Issue From / For */}
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-3">
              <p className="text-xs font-bold text-gray-600">Issue From :</p>
              <Input placeholder="First Name"    value={fromName}    onChange={setFromName}    />
              <Input placeholder="Enter Address" value={fromAddress} onChange={setFromAddress} />
              <Input placeholder="Number"        value={fromPhone}   onChange={setFromPhone}   />
              <Input placeholder="Email Address" value={fromEmail}   onChange={setFromEmail} type="email" />
            </div>
            <div className="space-y-3">
              <p className="text-xs font-bold text-gray-600">Issue For :</p>
              <Input placeholder="First Name"    value={forName}    onChange={setForName}    />
              <Input placeholder="Enter Address" value={forAddress} onChange={setForAddress} />
              <Input placeholder="Number"        value={forPhone}   onChange={setForPhone}   />
              <Input placeholder="Email Address" value={forEmail}   onChange={setForEmail} type="email" />
            </div>
          </div>

          {/* Line Items */}
          <div className="border border-gray-100 rounded-2xl overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-12 gap-2 bg-rose-50/60 px-4 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              <div className="col-span-4">Product Name</div>
              <div className="col-span-2 text-center">Quantity</div>
              <div className="col-span-2 text-right">Price</div>
              <div className="col-span-2 text-right">Tax</div>
              <div className="col-span-2 text-right">Total</div>
            </div>

            {/* Rows */}
            {items.map(item => {
              const p = parseFloat(item.price) || 0;
              const t = parseFloat(item.tax)   || 0;
              const total = (p + t) * item.qty;
              return (
                <div key={item.id} className="px-4 py-3 border-t border-gray-100">
                  <div className="grid grid-cols-12 gap-2 items-start">
                    {/* Thumb + Name */}
                    <div className="col-span-4 flex items-center gap-2">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-rose-100 to-pink-100 flex items-center justify-center text-lg shrink-0">📦</div>
                      <div className="flex-1 space-y-1">
                        <input value={item.name} onChange={e => updateItem(item.id,"name",e.target.value)}
                          placeholder="Product Name"
                          className="w-full px-2 py-1.5 rounded-lg border border-gray-200 text-xs text-gray-700 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-rose-300 transition"
                        />
                        <input value={item.size} onChange={e => updateItem(item.id,"size",e.target.value)}
                          placeholder="Product Size"
                          className="w-full px-2 py-1.5 rounded-lg border border-gray-200 text-xs text-gray-400 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-rose-300 transition"
                        />
                      </div>
                    </div>
                    {/* Qty */}
                    <div className="col-span-2 flex items-center justify-center gap-1 pt-1">
                      <button onClick={() => adjustQty(item.id, -1)}
                        className="w-6 h-6 rounded-lg bg-gray-100 hover:bg-rose-100 flex items-center justify-center transition">
                        <IcoMinus />
                      </button>
                      <span className="w-6 text-center text-xs font-bold text-gray-700">{item.qty}</span>
                      <button onClick={() => adjustQty(item.id, 1)}
                        className="w-6 h-6 rounded-lg bg-gray-100 hover:bg-rose-100 flex items-center justify-center transition">
                        <IcoPlus />
                      </button>
                    </div>
                    {/* Price */}
                    <div className="col-span-2 pt-1">
                      <DollarInput placeholder="000" value={item.price} onChange={v => updateItem(item.id,"price",v)} />
                    </div>
                    {/* Tax */}
                    <div className="col-span-2 pt-1">
                      <DollarInput placeholder="000" value={item.tax} onChange={v => updateItem(item.id,"tax",v)} />
                    </div>
                    {/* Total */}
                    <div className="col-span-2 pt-1">
                      <DollarInput placeholder="000" value={total > 0 ? total.toFixed(2) : ""} onChange={() => {}} />
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Actions */}
            <div className="px-4 py-3 border-t border-gray-100 flex justify-end gap-2">
              <button onClick={() => items.length > 0 && clearItem(items[items.length-1].id)}
                className="px-4 py-2 rounded-xl bg-rose-400 text-white text-xs font-semibold hover:bg-rose-500 transition shadow shadow-rose-200">
                Clear Product
              </button>
              <button onClick={addItem}
                className="px-4 py-2 rounded-xl border border-gray-200 bg-white text-gray-600 text-xs font-semibold hover:border-rose-300 hover:text-rose-500 transition">
                Add More
              </button>
            </div>
          </div>

          {/* Totals */}
          <div className="flex justify-end">
            <div className="w-64 space-y-3">
              <div>
                <Label>Sub Total</Label>
                <DollarInput placeholder="000" value={subTotal > 0 ? subTotal.toFixed(2) : ""} onChange={() => {}} />
              </div>
              <div>
                <Label>Discount</Label>
                <DollarInput placeholder="000" value={discount} onChange={setDiscount} />
              </div>
              <div>
                <Label>Estimated Tax (15.5%)</Label>
                <DollarInput placeholder="000" value={estTax > 0 ? estTax.toFixed(2) : ""} onChange={() => {}} />
              </div>
              <div>
                <Label>Grand Amount :</Label>
                <DollarInput placeholder="000" value={grand > 0 ? grand.toFixed(2) : ""} onChange={() => {}} />
              </div>
            </div>
          </div>

          {/* Notice */}
          <div className="flex items-start gap-3 bg-rose-50 border border-rose-100 rounded-2xl p-4">
            <div className="w-7 h-7 rounded-full bg-rose-500 flex items-center justify-center text-white text-xs font-bold shrink-0 mt-0.5">O</div>
            <p className="text-xs text-gray-600 leading-relaxed">
              All accounts are to be paid within 7 days from receipt of invoice. To be paid by cheque or credit card or direct payment online.
              If account is not paid within 7 days the credits details supplied as confirmation of work undertaken will be charged the agreed quoted fee noted above.
            </p>
          </div>

          {/* Submit */}
          <div className="flex justify-end gap-3">
            <button onClick={handleClear}
              className="px-6 py-2.5 rounded-xl border border-gray-200 bg-white text-gray-600 text-sm font-medium hover:border-rose-300 hover:text-rose-500 transition shadow-sm">
              Clear
            </button>
            <button onClick={handleSubmit}
              className="px-8 py-2.5 rounded-xl bg-rose-500 text-white text-sm font-semibold hover:bg-rose-600 transition shadow-md shadow-rose-200">
              Create Invoice
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}