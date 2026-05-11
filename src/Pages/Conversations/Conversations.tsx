import { useState, useRef, useEffect } from "react";

/* ─── Types ─── */
interface Contact {
  id: number;
  name: string;
  preview: string;
  time: string;
  badge?: number | "New";
  online: boolean;
  avatarBg: string;
  initials: string;
}

interface Message {
  id: number;
  text: string;
  sender: "them" | "me";
  time: string;
}

interface ChatData {
  [key: number]: Message[];
}

/* ─── Data ─── */
const CONTACTS: Contact[] = [
  { id:1, name:"Jane Doe",       preview:"Hi, I want make enquiries about yo...", time:"12:55 am", badge:"New", online:true,  avatarBg:"from-rose-400 to-pink-500",    initials:"JD" },
  { id:2, name:"Janet Adebayo",  preview:"Hi, I want make enquiries about yo...", time:"12:46 am", badge:"New", online:false, avatarBg:"from-amber-400 to-orange-400", initials:"JA" },
  { id:3, name:"Kunle Adekunle", preview:"Hi, I want make enquiries about yo...", time:"12:42 am", badge:"New", online:true,  avatarBg:"from-violet-400 to-purple-500",initials:"KA" },
  { id:4, name:"Jane Doe",       preview:"Hi, I want make enquiries about yo...", time:"12:40 am", badge:2,     online:false, avatarBg:"from-sky-400 to-blue-500",     initials:"JD" },
  { id:5, name:"Janet Adebayo",  preview:"Hi, I want make enquiries about yo...", time:"12:38 am", online:false, avatarBg:"from-teal-400 to-cyan-500",    initials:"JA" },
  { id:6, name:"Kunle Adekunle", preview:"Hi, I want make enquiries about yo...", time:"12:35 am", online:true,  avatarBg:"from-fuchsia-400 to-pink-500", initials:"KA" },
  { id:7, name:"Jane Doe",       preview:"Hi, I want make enquiries about yo...", time:"17:55 am", online:false, avatarBg:"from-rose-400 to-pink-500",    initials:"JD" },
  { id:8, name:"Janet Adebayo",  preview:"Hi, I want make enquiries about yo...", time:"13:55 am", online:true,  avatarBg:"from-amber-400 to-orange-400", initials:"JA" },
  { id:9, name:"Kunle Adekunle", preview:"Hi, I want make enquiries about yo...", time:"11:55 am", online:false, avatarBg:"from-indigo-400 to-blue-500",  initials:"KA" },
  { id:10,name:"Kunle Adekunle", preview:"Hi, I want make enquiries about yo...", time:"10:30 am", online:true,  avatarBg:"from-emerald-400 to-green-500",initials:"KA" },
];

const INITIAL_CHATS: ChatData = {
  1: [
    { id:1, text:"Hello, I want to make enquiries about your product", sender:"them", time:"12:55 am" },
    { id:2, text:"Hello Janet, thank you for reaching out",             sender:"me",   time:"12:57 am" },
    { id:3, text:"What do you need to know?",                           sender:"me",   time:"12:57 am" },
    { id:4, text:"I want to know if the price is negotiable. I need about 2 Units", sender:"them", time:"12:55 am" },
    { id:5, text:"What do you need to know?",                           sender:"me",   time:"12:57 am" },
  ],
  2: [
    { id:1, text:"Hi, I'm interested in bulk orders", sender:"them", time:"12:46 am" },
    { id:2, text:"Sure! How many units are you looking for?", sender:"me", time:"12:47 am" },
  ],
  3: [
    { id:1, text:"Do you offer express delivery?", sender:"them", time:"12:42 am" },
    { id:2, text:"Yes, we do! Delivery takes 2-3 business days.", sender:"me", time:"12:43 am" },
  ],
};

/* ─── Icons ─── */
const IcoSearch  = () => <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4"><circle cx="9" cy="9" r="6"/><path d="M15 15l-3-3" strokeLinecap="round"/></svg>;
const IcoSend    = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const IcoEmoji   = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5 text-gray-400"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2" strokeLinecap="round"/><circle cx="9" cy="9" r="1" fill="currentColor"/><circle cx="15" cy="9" r="1" fill="currentColor"/></svg>;
const IcoAttach  = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5 text-gray-400"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const IcoCart    = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4 text-gray-400"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" strokeLinecap="round" strokeLinejoin="round"/><path d="M3 6h18M16 10a4 4 0 0 1-8 0" strokeLinecap="round"/></svg>;
const IcoDot     = ({ online }: { online: boolean }) => <span className={`w-2.5 h-2.5 rounded-full border-2 border-white ${online ? "bg-emerald-400" : "bg-gray-300"}`} />;

const Avatar = ({ initials, bg, size="md" }: { initials: string; bg: string; size?: "sm"|"md" }) => (
  <div className={`rounded-full bg-gradient-to-br ${bg} flex items-center justify-center text-white font-bold shadow shrink-0 ${size==="sm" ? "w-8 h-8 text-xs" : "w-10 h-10 text-sm"}`}>
    {initials}
  </div>
);

/* ─── Date Divider ─── */
const DateDivider = ({ label }: { label: string }) => (
  <div className="flex items-center justify-center my-3">
    <span className="text-[11px] text-gray-400 bg-gray-100 px-3 py-0.5 rounded-full">{label}</span>
  </div>
);

export default function Conversations() {
  const [activeId,  setActiveId]  = useState(1);
  const [search,    setSearch]    = useState("");
  const [message,   setMessage]   = useState("");
  const [chats,     setChats]     = useState<ChatData>(INITIAL_CHATS);
  const bottomRef = useRef<HTMLDivElement>(null);

  const activeContact = CONTACTS.find(c => c.id === activeId)!;
  const messages = chats[activeId] || [];

  const filteredContacts = CONTACTS.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const sendMessage = () => {
    if (!message.trim()) return;
    const now = new Date();
    const time = now.toLocaleTimeString("en-US", { hour:"2-digit", minute:"2-digit", hour12:true }).toLowerCase();
    const newMsg: Message = { id: Date.now(), text: message.trim(), sender:"me", time };
    setChats(prev => ({ ...prev, [activeId]: [...(prev[activeId] || []), newMsg] }));
    setMessage("");
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior:"smooth" });
  }, [chats, activeId]);

  return (
    <div className="h-screen flex flex-col px-6 py-8"
      style={{ background:"linear-gradient(135deg,#fff5f7 0%,#fdf2ff 55%,#fff9f0 100%)", fontFamily:"'Lato','Segoe UI',sans-serif" }}>

      {/* ── Page Header ── */}
      <div className="mb-5">
        <h1 className="text-2xl font-bold text-gray-800" style={{ fontFamily:"'Georgia',serif" }}>Conversations</h1>
        <nav className="flex items-center gap-1 text-xs text-gray-400 mt-1">
          <span className="hover:text-rose-400 cursor-pointer transition">Dashboard</span>
          <span>›</span>
          <span className="text-gray-500 font-medium">Conversations</span>
        </nav>
      </div>

      {/* ── Main Layout ── */}
      <div className="flex flex-1 gap-4 min-h-0">

        {/* ── CONTACTS PANEL ── */}
        <div className="w-56 shrink-0 bg-white rounded-2xl border border-rose-50 shadow-sm flex flex-col overflow-hidden">
          {/* Header */}
          <div className="px-4 pt-4 pb-3 border-b border-rose-50">
            <div className="flex items-center justify-between mb-3">
              <p className="font-bold text-gray-800 text-sm" style={{ fontFamily:"'Georgia',serif" }}>Contacts</p>
              <span className="text-xs font-bold text-rose-400 bg-rose-50 px-1.5 py-0.5 rounded-full">{CONTACTS.length}</span>
            </div>
            <div className="relative">
              <input value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Search for anything..."
                className="w-full pl-3 pr-8 py-2 rounded-xl border border-rose-100 bg-rose-50/40 text-xs focus:outline-none focus:ring-2 focus:ring-rose-300 placeholder-rose-300 transition"
              />
              <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-rose-400"><IcoSearch /></span>
            </div>
          </div>

          {/* Contact list */}
          <div className="flex-1 overflow-y-auto">
            {filteredContacts.map(c => (
              <button key={c.id} onClick={() => setActiveId(c.id)}
                className={`w-full flex items-start gap-2.5 px-4 py-3 text-left transition border-b border-gray-50 last:border-0 ${activeId===c.id ? "bg-rose-50" : "hover:bg-gray-50"}`}>
                <div className="relative shrink-0 mt-0.5">
                  <Avatar initials={c.initials} bg={c.avatarBg} size="sm" />
                  <span className="absolute -bottom-0.5 -right-0.5"><IcoDot online={c.online} /></span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold text-gray-800 truncate">{c.name}</p>
                    {c.badge && (
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full shrink-0 ml-1 ${c.badge==="New" ? "bg-rose-500 text-white" : "bg-rose-100 text-rose-600"}`}>
                        {c.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] text-gray-400 truncate mt-0.5">{c.preview}</p>
                  <p className="text-[10px] text-gray-300 mt-0.5">{c.time}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* ── CHAT PANEL ── */}
        <div className="flex-1 bg-white rounded-2xl border border-rose-50 shadow-sm flex flex-col overflow-hidden min-w-0">

          {/* Chat Header */}
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-rose-50">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Avatar initials={activeContact.initials} bg={activeContact.avatarBg} />
                <span className="absolute -bottom-0.5 -right-0.5"><IcoDot online={activeContact.online} /></span>
              </div>
              <div>
                <p className="font-bold text-gray-800 text-sm">{activeContact.name}</p>
                <div className="flex items-center gap-1.5">
                  <span className={`w-1.5 h-1.5 rounded-full ${activeContact.online ? "bg-emerald-400" : "bg-gray-300"}`} />
                  <span className="text-[11px] text-gray-400">{activeContact.online ? "Online" : "Offline"} · {activeContact.time}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="text-xs font-semibold text-gray-500 hover:text-rose-500 transition border border-gray-200 px-3 py-1.5 rounded-xl hover:border-rose-300">
                New Customer
              </button>
              <button className="text-xs font-semibold text-rose-400 hover:text-rose-600 transition hover:underline">
                View Profile
              </button>
              <div className="flex items-center gap-1 text-xs text-gray-400 border border-gray-100 rounded-xl px-2.5 py-1.5">
                <IcoCart />
                <span>0 Orders</span>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-1">

            {/* Product card */}
            <div className="flex justify-center mb-3">
              <div className="bg-rose-50 border border-rose-100 rounded-2xl p-3 flex items-center gap-3 max-w-xs">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gray-100 to-slate-200 flex items-center justify-center text-xl shrink-0">📱</div>
                <div>
                  <p className="text-xs font-bold text-gray-800">iPhone 13</p>
                  <p className="text-xs text-rose-500 font-semibold">$730,000.00</p>
                  <p className="text-[10px] text-gray-400">12 In Stock</p>
                </div>
              </div>
            </div>

            <DateDivider label="12 August 2022" />

            {messages.map((msg, i) => {
              const isMe = msg.sender === "me";
              const showDate = i === messages.length - 3;
              return (
                <div key={msg.id}>
                  {showDate && i > 2 && <DateDivider label="Today" />}
                  <div className={`flex ${isMe ? "justify-end" : "justify-start"} mb-2`}>
                    <div className={`max-w-xs ${isMe ? "items-end" : "items-start"} flex flex-col`}>
                      <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                        isMe
                          ? "bg-gradient-to-br from-rose-50 to-pink-50 text-gray-700 rounded-br-sm border border-rose-100"
                          : "bg-gradient-to-br from-violet-100 to-purple-100 text-gray-800 rounded-bl-sm"
                      }`}>
                        {msg.text}
                      </div>
                      <div className="flex items-center gap-1 mt-1">
                        <span className="text-[10px] text-gray-400">{msg.time}</span>
                        {isMe && <span className="text-[10px] text-violet-400">✓✓</span>}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            <div ref={bottomRef} />
          </div>

          {/* Message Input */}
          <div className="px-4 py-3 border-t border-rose-50">
            <div className="flex items-center gap-3 bg-gray-50 rounded-2xl px-4 py-2.5 border border-gray-100">
              <button className="shrink-0 hover:text-rose-400 transition"><IcoAttach /></button>
              <input
                value={message}
                onChange={e => setMessage(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Your message"
                className="flex-1 bg-transparent text-sm text-gray-700 placeholder-gray-300 focus:outline-none"
              />
              <button className="shrink-0 hover:text-rose-400 transition"><IcoEmoji /></button>
              <button onClick={sendMessage}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-500 text-white text-xs font-semibold hover:bg-rose-600 transition shadow shadow-rose-200 shrink-0">
                Send <IcoSend />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}