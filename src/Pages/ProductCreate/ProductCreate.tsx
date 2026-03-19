import { useState, useRef } from "react";

/* ─── Types ─── */
interface Variant { option: string; values: string[] }

/* ─── SVG Icons ─── */
const IcoX       = () => <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3"><path d="M5 5l10 10M15 5L5 15" strokeLinecap="round"/></svg>;
const IcoPlus    = () => <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path d="M10 4v12M4 10h12" strokeLinecap="round"/></svg>;
const IcoCloud   = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10 text-rose-300"><path d="M7 16a4 4 0 0 1-.88-7.903A5 5 0 1 1 15.9 6L16 6a5 5 0 0 1 1 9.9M15 13l-3-3m0 0l-3 3m3-3v12" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const IcoChevron = () => <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path d="M5 7l5 5 5-5" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const IcoTag     = () => <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-3.5 h-3.5"><path d="M9.5 2H4a2 2 0 0 0-2 2v5.5l8.5 8.5a2 2 0 0 0 2.83 0l4.67-4.67a2 2 0 0 0 0-2.83L9.5 2z" strokeLinecap="round" strokeLinejoin="round"/><circle cx="6.5" cy="7.5" r="1" fill="currentColor"/></svg>;

/* ─── Reusable Field ─── */
const Label = ({ children }: { children: React.ReactNode }) => (
  <p className="text-xs font-semibold text-gray-600 mb-1.5">{children}</p>
);
const Input = ({ placeholder, type="text", value, onChange, className="" }: {
  placeholder?: string; type?: string; value?: string;
  onChange?: (v: string) => void; className?: string;
}) => (
  <input type={type} value={value} onChange={e => onChange?.(e.target.value)}
    placeholder={placeholder}
    className={`w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-gray-50/60 text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent transition ${className}`}
  />
);
const Textarea = ({ placeholder, rows=4 }: { placeholder?: string; rows?: number }) => (
  <textarea rows={rows} placeholder={placeholder}
    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-gray-50/60 text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-rose-300 resize-none transition"
  />
);
const Select = ({ placeholder }: { placeholder?: string }) => (
  <div className="relative">
    <select className="w-full appearance-none px-3 py-2.5 rounded-xl border border-gray-200 bg-gray-50/60 text-sm text-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-300 transition pr-8">
      <option value="">{placeholder}</option>
    </select>
    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"><IcoChevron /></span>
  </div>
);

/* ─── Drop Zone ─── */
const DropZone = ({ label, hint }: { label: string; hint: string }) => {
  const [dragging, setDragging] = useState(false);
  const [files, setFiles] = useState<string[]>([]);
  const ref = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault(); setDragging(false);
    const names = Array.from(e.dataTransfer.files).map(f => f.name);
    setFiles(prev => [...prev, ...names]);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const names = Array.from(e.target.files || []).map(f => f.name);
    setFiles(prev => [...prev, ...names]);
  };

  return (
    <div>
      <Label>{label}</Label>
      <div
        onDragOver={e => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => ref.current?.click()}
        className={`border-2 border-dashed rounded-2xl p-8 flex flex-col items-center gap-2 cursor-pointer transition
          ${dragging ? "border-rose-400 bg-rose-50" : "border-rose-200 bg-rose-50/30 hover:bg-rose-50 hover:border-rose-300"}`}
      >
        <IcoCloud />
        <p className="text-sm text-gray-500 text-center">
          Drop your images here, or{" "}
          <span className="text-rose-500 font-semibold hover:underline">click to browse</span>
        </p>
        <p className="text-[11px] text-gray-400">{hint}</p>
        <input ref={ref} type="file" multiple accept="image/*" className="hidden" onChange={handleChange} />
      </div>
      {files.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {files.map((f, i) => (
            <span key={i} className="flex items-center gap-1 text-xs bg-rose-100 text-rose-600 px-2 py-0.5 rounded-full">
              {f}
              <button onClick={e => { e.stopPropagation(); setFiles(prev => prev.filter((_,j)=>j!==i)); }}
                className="hover:text-red-600 transition"><IcoX /></button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

/* ─── Tag Input ─── */
const TagInput = ({ tags, onAdd, onRemove, placeholder }: {
  tags: string[]; onAdd: (t: string) => void; onRemove: (t: string) => void; placeholder?: string;
}) => {
  const [val, setVal] = useState("");
  const submit = () => { if (val.trim() && !tags.includes(val.trim())) { onAdd(val.trim()); setVal(""); } };
  return (
    <div>
      <div className="flex gap-2">
        <input value={val} onChange={e => setVal(e.target.value)}
          onKeyDown={e => e.key === "Enter" && (e.preventDefault(), submit())}
          placeholder={placeholder}
          className="flex-1 px-3 py-2 rounded-xl border border-gray-200 bg-gray-50/60 text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-rose-300 transition"
        />
        <button onClick={submit}
          className="px-3 py-2 rounded-xl bg-rose-100 text-rose-500 hover:bg-rose-200 transition text-sm font-medium">
          Add
        </button>
      </div>
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-2">
          {tags.map(t => (
            <span key={t} className="flex items-center gap-1 text-xs bg-rose-100 text-rose-600 px-2.5 py-1 rounded-full font-medium">
              {t}
              <button onClick={() => onRemove(t)} className="hover:text-red-600 transition"><IcoX /></button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

/* ─── Section Card ─── */
const Card = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
    <h2 className="font-bold text-gray-800 text-base" style={{ fontFamily: "'Georgia',serif" }}>{title}</h2>
    {children}
  </div>
);

/* ─── Main Component ─── */
export default function ProductCreate() {
  const [tags,        setTags]        = useState(["T-Shirt", "Min Clothes", "Summer Collection"]);
  const [productTags, setProductTags] = useState<string[]>([]);
  const [hasTax,      setHasTax]      = useState(false);
  const [isDigital,   setIsDigital]   = useState(false);
  const [variants,    setVariants]    = useState<Variant[]>([{ option: "Size", values: ["S","M","L","XL"] }]);
  const [newVarVal,   setNewVarVal]   = useState<string[]>([""]);
  const [status,      setStatus]      = useState("Pending");

  const addVariant = () => {
    setVariants(v => [...v, { option: "", values: [] }]);
    setNewVarVal(v => [...v, ""]);
  };
  const removeVariant = (i: number) => {
    setVariants(v => v.filter((_,j)=>j!==i));
    setNewVarVal(v => v.filter((_,j)=>j!==i));
  };
  const addVarValue = (i: number) => {
    const val = newVarVal[i].trim();
    if (!val) return;
    setVariants(v => v.map((vr,j) => j===i ? {...vr, values:[...vr.values, val]} : vr));
    setNewVarVal(v => v.map((x,j) => j===i ? "" : x));
  };
  const removeVarValue = (vi: number, val: string) =>
    setVariants(v => v.map((vr,j) => j===vi ? {...vr, values: vr.values.filter(x=>x!==val)} : vr));

  return (
    <div className="min-h-screen px-4 py-8"
      style={{ background:"linear-gradient(135deg,#fff5f7 0%,#fdf2ff 55%,#fff9f0 100%)", fontFamily:"'Lato','Segoe UI',sans-serif" }}>

      <div className="max-w-4xl mx-auto">
        {/* ── Page Title ── */}
        <h1 className="text-2xl font-bold text-gray-800 mb-6" style={{ fontFamily:"'Georgia',serif" }}>
          Add New Product
        </h1>

        <div className="flex gap-5 items-start">
          {/* ── LEFT COLUMN ── */}
          <div className="flex-1 space-y-5">

            {/* General Info */}
            <Card title="General Information">
              <div>
                <Label>Product Name</Label>
                <Input placeholder="Type product name here…" />
              </div>
              <div>
                <Label>Description</Label>
                <Textarea placeholder="Type product description here…" rows={5} />
              </div>
            </Card>

            {/* Media */}
            <Card title="Media">
              <DropZone
                label="Photo"
                hint="1200 × 1200 (4:3) recommended. PNG, JPG, and GIF files are allowed."
              />
              <DropZone
                label="Video"
                hint="1600 × 1200 (4:3) recommended. PNG, JPG, and GIF files are allowed."
              />
            </Card>

            {/* Pricing */}
            <Card title="Pricing">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Product Price</Label>
                  <Input placeholder="Offer price" type="number" />
                </div>
                <div>
                  <Label>Discount Percentage (%)</Label>
                  <Input placeholder="Disc. Price" type="number" />
                </div>
              </div>
              <label className="flex items-center gap-2 cursor-pointer select-none mt-1">
                <div
                  onClick={() => setHasTax(!hasTax)}
                  className={`w-8 h-4 rounded-full transition relative ${hasTax ? "bg-rose-500" : "bg-gray-200"}`}>
                  <span className={`absolute top-0.5 w-3 h-3 rounded-full bg-white shadow transition-all ${hasTax ? "left-4" : "left-0.5"}`} />
                </div>
                <span className="text-sm text-gray-600">Add tax for this product</span>
              </label>
            </Card>

            {/* Inventory */}
            <Card title="Inventory">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label>SKU</Label>
                  <Input placeholder="Type product SKU here" />
                </div>
                <div>
                  <Label>Barcode</Label>
                  <Input placeholder="Product barcode" />
                </div>
                <div>
                  <Label>Quantity</Label>
                  <Input placeholder="Type product quantity here" type="number" />
                </div>
              </div>
            </Card>

            {/* Different Options / Variants */}
            <Card title="Different Options">
              {variants.map((vr, i) => (
                <div key={i} className="border border-gray-100 rounded-2xl p-4 space-y-3 bg-gray-50/40">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Option {i+1}</p>
                    {variants.length > 1 && (
                      <button onClick={() => removeVariant(i)}
                        className="text-xs text-red-400 hover:text-red-600 transition flex items-center gap-1">
                        <IcoX /> Remove
                      </button>
                    )}
                  </div>
                  <div>
                    <Label>Name</Label>
                    <input value={vr.option}
                      onChange={e => setVariants(v => v.map((x,j) => j===i ? {...x, option:e.target.value} : x))}
                      placeholder="e.g. Size, Color…"
                      className="w-full px-3 py-2 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-rose-300 transition"
                    />
                  </div>
                  <div>
                    <Label>Values</Label>
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {vr.values.map(val => (
                        <span key={val} className="flex items-center gap-1 text-xs font-semibold bg-rose-100 text-rose-600 px-2.5 py-1 rounded-full">
                          {val}
                          <button onClick={() => removeVarValue(i, val)}
                            className="hover:text-red-600 transition"><IcoX /></button>
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <input value={newVarVal[i]}
                        onChange={e => setNewVarVal(v => v.map((x,j) => j===i ? e.target.value : x))}
                        onKeyDown={e => e.key==="Enter" && (e.preventDefault(), addVarValue(i))}
                        placeholder="Add value, press Enter"
                        className="flex-1 px-3 py-2 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-rose-300 transition"
                      />
                      <button onClick={() => addVarValue(i)}
                        className="px-3 py-2 rounded-xl bg-rose-100 text-rose-500 hover:bg-rose-200 transition text-sm font-medium">
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <button onClick={addVariant}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-500 text-white text-sm font-semibold hover:bg-rose-600 transition shadow shadow-rose-200">
                <IcoPlus /> Add Variant
              </button>
            </Card>

            {/* Shipping */}
            <Card title="Shipping">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <div onClick={() => setIsDigital(!isDigital)}
                  className={`w-8 h-4 rounded-full transition relative ${isDigital ? "bg-rose-500" : "bg-gray-200"}`}>
                  <span className={`absolute top-0.5 w-3 h-3 rounded-full bg-white shadow transition-all ${isDigital ? "left-4" : "left-0.5"}`} />
                </div>
                <span className="text-sm text-gray-600 font-medium">This is a digital item</span>
              </label>

              {!isDigital && (
                <div className="grid grid-cols-3 gap-4">
                  <div><Label>Weight</Label><Input placeholder="Product weight" /></div>
                  <div><Label>Height</Label><Input placeholder="Height (cm)" /></div>
                  <div><Label>Length</Label><Input placeholder="Length (cm)" /></div>
                </div>
              )}
            </Card>
          </div>

          {/* ── RIGHT COLUMN ── */}
          <div className="w-56 space-y-4 shrink-0">

            {/* Category */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 space-y-3">
              <h3 className="font-bold text-gray-800 text-sm" style={{ fontFamily:"'Georgia',serif" }}>Category</h3>
              <div>
                <Label>Product Category</Label>
                <Select placeholder="Select…" />
              </div>
              <div>
                <Label>Product Tags</Label>
                <TagInput tags={productTags} onAdd={t => setProductTags(p=>[...p,t])}
                  onRemove={t => setProductTags(p=>p.filter(x=>x!==t))} placeholder="Selects…" />
              </div>
            </div>

            {/* Status */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-gray-800 text-sm" style={{ fontFamily:"'Georgia',serif" }}>Status</h3>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  status === "Published" ? "bg-emerald-100 text-emerald-700" :
                  status === "Pending"   ? "bg-amber-100  text-amber-600"   :
                                           "bg-gray-100    text-gray-500"
                }`}>{status}</span>
              </div>
              <div>
                <Label>Product Status</Label>
                <div className="relative">
                  <select value={status} onChange={e => setStatus(e.target.value)}
                    className="w-full appearance-none px-3 py-2 rounded-xl border border-gray-200 bg-gray-50/60 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-rose-300 transition pr-8">
                    <option>Pending</option>
                    <option>Published</option>
                    <option>Draft</option>
                    <option>Archived</option>
                  </select>
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"><IcoChevron /></span>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 space-y-3">
              <h3 className="font-bold text-gray-800 text-sm flex items-center gap-1.5" style={{ fontFamily:"'Georgia',serif" }}>
                <IcoTag /> Tags
              </h3>
              <TagInput tags={tags} onAdd={t => setTags(p=>[...p,t])}
                onRemove={t => setTags(p=>p.filter(x=>x!==t))} placeholder="Add Tag Source" />
            </div>
          </div>
        </div>

        {/* ── Bottom Actions ── */}
        <div className="flex justify-end gap-3 mt-6">
          <button className="px-6 py-2.5 rounded-xl border border-gray-200 bg-white text-gray-600 text-sm font-medium hover:border-rose-300 hover:text-rose-500 transition shadow-sm">
            Cancel
          </button>
          <button className="px-8 py-2.5 rounded-xl bg-rose-500 text-white text-sm font-semibold hover:bg-rose-600 transition shadow-md shadow-rose-200">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}