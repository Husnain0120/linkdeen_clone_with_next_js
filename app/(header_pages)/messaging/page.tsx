'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Archive,
  Briefcase,
  Calendar,
  CheckCheck,
  ChevronLeft,
  FileText,
  Image as ImageIcon,
  Link2,
  MapPin,
  MoreHorizontal,
  Paperclip,
  PenSquare,
  Phone,
  Search,
  Send,
  Smile,
  Star,
  Video,
} from 'lucide-react';
import { useState } from 'react';

export default function MessagingPage() {
  const [activeId, setActiveId] = useState(1);
  const [draft, setDraft] = useState('');

  const conversations = [
    {
      id: 1,
      name: 'Fatima Sheikh',
      title: 'Senior SDE at Microsoft',
      avatar:
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&h=100&q=80',
      initials: 'FS',
      preview: 'Sure, let me send you the deck after our call.',
      time: '2m',
      unread: 2,
      online: true,
    },
    {
      id: 2,
      name: 'Ali Hassan',
      title: 'Staff Engineer at Vercel',
      avatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80',
      initials: 'AH',
      preview: 'That migration looks good to me 👍',
      time: '18m',
      unread: 0,
      online: true,
    },
    {
      id: 3,
      name: 'Priya Patel',
      title: 'Product Lead at Figma',
      avatar:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&h=100&q=80',
      initials: 'PP',
      preview: 'Loved the Figma file — left a few comments.',
      time: '1h',
      unread: 0,
      online: false,
    },
    {
      id: 4,
      name: 'Sarah Chen',
      title: 'Product Manager at Figma',
      avatar:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80',
      initials: 'SC',
      preview: 'Thanks for accepting my invite!',
      time: '3h',
      unread: 1,
      online: false,
    },
    {
      id: 5,
      name: 'Bilal Ahmed',
      title: 'ML Engineer at OpenAI',
      avatar:
        'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=100&h=100&q=80',
      initials: 'BA',
      preview: 'Interesting paper — let me read it tonight.',
      time: '1d',
      unread: 0,
      online: false,
    },
    {
      id: 6,
      name: 'Hamza Malik',
      title: 'Backend Engineer at Careem',
      avatar:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&h=100&q=80',
      initials: 'HM',
      preview: 'Deployed the fix. Let me know if it works.',
      time: '2d',
      unread: 0,
      online: false,
    },
  ];

  const messages = [
    {
      id: 1,
      from: 'them',
      text: 'Hey Abdullah! Just saw your post on webhooks — really insightful.',
      time: '10:24 AM',
    },
    {
      id: 2,
      from: 'me',
      text: 'Thanks Fatima! Means a lot coming from you.',
      time: '10:26 AM',
    },
    {
      id: 3,
      from: 'them',
      text: "Are you open to chatting about the retry strategy you mentioned? We're facing similar issues at Microsoft.",
      time: '10:27 AM',
    },
    {
      id: 4,
      from: 'me',
      text: 'Absolutely — happy to jump on a quick call this week. Thursday afternoon work?',
      time: '10:30 AM',
    },
    {
      id: 5,
      from: 'them',
      text: 'Sure, let me send you the deck after our call.',
      time: '10:32 AM',
    },
  ];

  const active = conversations.find(c => c.id === activeId)!;

  return (
    // ✅ Removed `bg-gray-50` — layout handles the background
    <div className="min-h-screen pt-16 pb-24">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-5">
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden grid md:grid-cols-[320px_1fr_280px] min-h-[calc(100vh-160px)]">
          {/* ═══════ LEFT — Conversations ═══════ */}
          <aside className="border-r border-gray-200 flex flex-col bg-white">
            {/* Header */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <h1 className="text-base font-bold text-gray-900">Messaging</h1>
                <div className="flex items-center gap-1">
                  <button
                    className="p-1.5 rounded-full text-gray-500 hover:bg-gray-100 transition-colors"
                    aria-label="New message"
                  >
                    <PenSquare className="h-4 w-4" />
                  </button>
                  <button
                    className="p-1.5 rounded-full text-gray-500 hover:bg-gray-100 transition-colors"
                    aria-label="More"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search messages"
                  className="pl-8 pr-3 py-1.5 w-full rounded-md bg-gray-100 border border-transparent text-xs focus:bg-white focus:border-gray-300 focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Conversation list */}
            <div className="flex-1 overflow-y-auto divide-y divide-gray-50">
              {conversations.map(c => (
                <button
                  key={c.id}
                  onClick={() => setActiveId(c.id)}
                  className={`w-full text-left p-3 flex items-start gap-3 transition-colors ${
                    activeId === c.id ? 'bg-blue-50/60' : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="relative shrink-0">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={c.avatar} className="object-cover" />
                      <AvatarFallback className="bg-blue-600 text-white text-xs font-bold">
                        {c.initials}
                      </AvatarFallback>
                    </Avatar>
                    {c.online && (
                      <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-white" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-semibold text-gray-900 truncate">
                        {c.name}
                      </p>
                      <span className="text-[10px] text-gray-400 shrink-0">
                        {c.time}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">
                      {c.preview}
                    </p>
                  </div>
                  {c.unread > 0 && (
                    <span className="mt-1 h-5 min-w-5 px-1 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                      {c.unread}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </aside>

          {/* ═══════ MIDDLE — Chat ═══════ */}
          <section className="flex flex-col bg-white min-h-0">
            {/* Chat header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
              <div className="flex items-center gap-3 min-w-0">
                <button
                  className="md:hidden p-1 -ml-1 text-gray-500"
                  aria-label="Back"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <Avatar className="h-9 w-9">
                  <AvatarImage src={active.avatar} className="object-cover" />
                  <AvatarFallback className="bg-blue-600 text-white text-xs font-bold">
                    {active.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">
                    {active.name}
                  </p>
                  <p className="text-[11px] text-gray-500 truncate">
                    {active.online ? (
                      <span className="text-emerald-600 font-medium">
                        ● Online
                      </span>
                    ) : (
                      active.title
                    )}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  className="p-2 rounded-full text-gray-500 hover:bg-gray-100 transition-colors"
                  aria-label="Call"
                >
                  <Phone className="h-4 w-4" />
                </button>
                <button
                  className="p-2 rounded-full text-gray-500 hover:bg-gray-100 transition-colors"
                  aria-label="Video call"
                >
                  <Video className="h-4 w-4" />
                </button>
                <button
                  className="p-2 rounded-full text-gray-500 hover:bg-gray-100 transition-colors"
                  aria-label="More"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-gradient-to-b from-white to-gray-50/40">
              <div className="flex justify-center">
                <span className="text-[10px] text-gray-400 bg-white px-2 py-0.5 rounded-full border border-gray-200">
                  Today
                </span>
              </div>
              {messages.map(m => (
                <div
                  key={m.id}
                  className={`flex items-end gap-2 ${m.from === 'me' ? 'justify-end' : 'justify-start'}`}
                >
                  {m.from === 'them' && (
                    <Avatar className="h-7 w-7 shrink-0">
                      <AvatarImage
                        src={active.avatar}
                        className="object-cover"
                      />
                      <AvatarFallback className="bg-blue-600 text-white text-[10px] font-bold">
                        {active.initials}
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`max-w-[70%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed ${
                      m.from === 'me'
                        ? 'bg-blue-600 text-white rounded-br-md'
                        : 'bg-gray-100 text-gray-900 rounded-bl-md'
                    }`}
                  >
                    {m.text}
                    <div
                      className={`flex items-center gap-1 mt-1 text-[10px] ${
                        m.from === 'me'
                          ? 'text-blue-100 justify-end'
                          : 'text-gray-500'
                      }`}
                    >
                      {m.time}
                      {m.from === 'me' && <CheckCheck className="h-3 w-3" />}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Composer */}
            <div className="border-t border-gray-200 p-3 bg-white">
              <div className="flex items-end gap-2 rounded-2xl border border-gray-200 bg-gray-50 focus-within:bg-white focus-within:border-blue-400 transition-colors px-3 py-1.5">
                <button
                  className="p-1.5 rounded-full text-gray-500 hover:bg-gray-100 transition-colors"
                  aria-label="Attach"
                >
                  <Paperclip className="h-4 w-4" />
                </button>
                <button
                  className="p-1.5 rounded-full text-gray-500 hover:bg-gray-100 transition-colors"
                  aria-label="Image"
                >
                  <ImageIcon className="h-4 w-4" />
                </button>
                <textarea
                  value={draft}
                  onChange={e => setDraft(e.target.value)}
                  placeholder={`Message ${active.name.split(' ')[0]}…`}
                  rows={1}
                  className="flex-1 bg-transparent resize-none outline-none text-sm text-gray-800 placeholder-gray-500 py-1.5 max-h-24"
                />
                <button
                  className="p-1.5 rounded-full text-gray-500 hover:bg-gray-100 transition-colors"
                  aria-label="Emoji"
                >
                  <Smile className="h-4 w-4" />
                </button>
                <button
                  disabled={!draft.trim()}
                  className="p-2 rounded-full bg-blue-600 text-white disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
                  aria-label="Send"
                >
                  <Send className="h-3.5 w-3.5" />
                </button>
              </div>
              <p className="text-[10px] text-gray-400 mt-2 px-1">
                Press Enter to send · Shift + Enter for a new line
              </p>
            </div>
          </section>

          {/* ═══════ RIGHT — Profile details ═══════ */}
          <aside className="hidden md:flex flex-col border-l border-gray-200 bg-white">
            <div className="p-5 text-center border-b border-gray-100">
              <Avatar className="h-20 w-20 mx-auto ring-4 ring-white shadow">
                <AvatarImage src={active.avatar} className="object-cover" />
                <AvatarFallback className="bg-blue-600 text-white text-xl font-bold">
                  {active.initials}
                </AvatarFallback>
              </Avatar>
              <p className="text-base font-bold text-gray-900 mt-3">
                {active.name}
              </p>
              <p className="text-xs text-gray-500 mt-0.5">{active.title}</p>
              <div className="flex items-center justify-center gap-2 mt-3">
                <button className="inline-flex items-center gap-1 px-3 py-1.5 text-[11px] font-semibold text-gray-700 border border-gray-300 hover:bg-gray-50 rounded-full transition-colors">
                  <Star className="h-3 w-3" />
                  Star
                </button>
                <button className="inline-flex items-center gap-1 px-3 py-1.5 text-[11px] font-semibold text-gray-700 border border-gray-300 hover:bg-gray-50 rounded-full transition-colors">
                  <Archive className="h-3 w-3" />
                  Archive
                </button>
              </div>
            </div>

            <div className="p-5 space-y-3 text-sm">
              <div className="flex items-start gap-2.5 text-gray-600">
                <Briefcase className="h-4 w-4 shrink-0 text-gray-400 mt-0.5" />
                <span>
                  Senior SDE at{' '}
                  <strong className="text-gray-900">Microsoft</strong>
                </span>
              </div>
              <div className="flex items-start gap-2.5 text-gray-600">
                <MapPin className="h-4 w-4 shrink-0 text-gray-400 mt-0.5" />
                Seattle, USA
              </div>
              <div className="flex items-start gap-2.5 text-gray-600">
                <Calendar className="h-4 w-4 shrink-0 text-gray-400 mt-0.5" />
                Connected 3 months ago
              </div>
              <div className="flex items-start gap-2.5 text-gray-600">
                <Link2 className="h-4 w-4 shrink-0 text-gray-400 mt-0.5" />
                <span className="text-blue-600 hover:underline cursor-pointer">
                  fatima.dev
                </span>
              </div>
            </div>

            <div className="border-t border-gray-100 p-5">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">
                Shared files
              </h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs text-gray-700 hover:bg-gray-50 p-1.5 rounded-md cursor-pointer">
                  <FileText className="h-4 w-4 text-red-500" />
                  <span className="truncate">webhooks-v2-deck.pdf</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-700 hover:bg-gray-50 p-1.5 rounded-md cursor-pointer">
                  <FileText className="h-4 w-4 text-blue-500" />
                  <span className="truncate">architecture.md</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
