'use client';

import {
  ArrowRight,
  BookOpen,
  Briefcase,
  ChevronRight,
  CreditCard,
  FileText,
  Globe,
  HelpCircle,
  LifeBuoy,
  Mail,
  MessageSquare,
  Phone,
  Search,
  Settings,
  Shield,
  Users,
  Video,
} from 'lucide-react';
import { useState } from 'react';

export default function HelpCenterPage() {
  const [query, setQuery] = useState('');

  const categories = [
    {
      icon: Users,
      title: 'Account & Profile',
      desc: 'Sign in, password, profile settings',
      count: 24,
    },
    {
      icon: MessageSquare,
      title: 'Messaging & Connections',
      desc: 'InMail, invitations, connections',
      count: 18,
    },
    {
      icon: CreditCard,
      title: 'Billing & Premium',
      desc: 'Subscription, payment, invoices',
      count: 12,
    },
    {
      icon: Briefcase,
      title: 'Jobs & Applications',
      desc: 'Apply, saved jobs, job alerts',
      count: 31,
    },
    {
      icon: Shield,
      title: 'Privacy & Security',
      desc: 'Data, visibility, two-step auth',
      count: 22,
    },
    {
      icon: Settings,
      title: 'Settings & Preferences',
      desc: 'Language, notifications, ads',
      count: 15,
    },
  ];

  const popularArticles = [
    { title: 'How to change your LinkedIn password', views: '245k views' },
    {
      title: 'Set up two-step verification for your account',
      views: '189k views',
    },
    { title: 'Why am I not receiving invitations?', views: '132k views' },
    { title: 'Cancel or manage your Premium subscription', views: '98k views' },
    { title: 'Report a fake profile or impersonation', views: '87k views' },
  ];

  const contactOptions = [
    {
      icon: MessageSquare,
      title: 'Chat with us',
      desc: 'Available 24/7 · ~2 min wait',
      action: 'Start chat',
    },
    {
      icon: Mail,
      title: 'Email support',
      desc: 'Replies within 24 hours',
      action: 'Send email',
    },
    {
      icon: Phone,
      title: 'Call us',
      desc: 'Mon–Fri, 9am–6pm PKT',
      action: 'Request callback',
    },
  ];

  return (
    // ✅ Removed bg-gray-50 — Transparent to use layout background
    <div className="min-h-screen pt-16 pb-24">
      {/* ═══════════ HERO SEARCH ═══════════ */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white relative overflow-hidden">
        {/* Decorative background blur */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-[1120px] mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold mb-5">
            <LifeBuoy className="h-4 w-4" />
            Help Center
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            How can we help you today?
          </h1>
          <p className="text-sm sm:text-base text-blue-100 mt-3 max-w-2xl mx-auto">
            Search our knowledge base, browse popular topics, or get in touch
            with our support team.
          </p>

          <div className="mt-8 max-w-xl mx-auto">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
              <input
                value={query}
                onChange={e => setQuery(e.target.value)}
                type="text"
                placeholder="Search help articles…"
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white text-gray-900 placeholder-gray-500 text-sm shadow-2xl shadow-black/20 focus:outline-none focus:ring-4 focus:ring-blue-500/50 transition-all"
              />
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xs text-blue-100">
              <span>Popular:</span>
              {['Password reset', 'InMail', 'Billing', 'Report abuse'].map(
                t => (
                  <button
                    key={t}
                    className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 transition-colors"
                  >
                    {t}
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-[1120px] mx-auto px-4 sm:px-6 py-10">
        {/* ═══════════ CATEGORIES GRID ═══════════ */}
        <section>
          <div className="flex items-end justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold text-gray-900 tracking-tight">
                Browse by topic
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Find answers organized by category
              </p>
            </div>
            <button className="text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline hidden sm:block">
              View all topics
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {categories.map(({ icon: Icon, title, desc, count }) => (
              <button
                key={title}
                className="text-left bg-white rounded-2xl border border-gray-200/80 p-5 hover:border-blue-300 hover:shadow-lg hover:-translate-y-0.5 transition-all group shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
              >
                <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 text-blue-600 flex items-center justify-center mb-4 group-hover:from-blue-600 group-hover:to-indigo-600 group-hover:text-white group-hover:shadow-md transition-all duration-300">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-bold text-gray-900">{title}</h3>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed line-clamp-2">
                  {desc}
                </p>
                <div className="flex items-center justify-between mt-4 text-xs">
                  <span className="text-gray-400 font-medium">
                    {count} articles
                  </span>
                  <ArrowRight className="h-4 w-4 text-gray-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* ═══════════ POPULAR ARTICLES & SIDEBAR ═══════════ */}
        <section className="mt-10">
          <div className="grid lg:grid-cols-[1fr_340px] gap-6">
            {/* Popular Articles */}
            <div className="bg-white rounded-2xl border border-gray-200/80 p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-lg bg-blue-50 flex items-center justify-center">
                    <BookOpen className="h-4 w-4 text-blue-600" />
                  </div>
                  <h2 className="text-base font-bold text-gray-900">
                    Popular articles
                  </h2>
                </div>
                <button className="text-xs font-semibold text-blue-600 hover:underline">
                  View all
                </button>
              </div>
              <ul className="divide-y divide-gray-100">
                {popularArticles.map((a, i) => (
                  <li key={a.title}>
                    <button className="w-full flex items-center justify-between gap-3 py-3.5 text-left group">
                      <div className="flex items-start gap-3 min-w-0">
                        <span className="text-xs font-bold text-gray-300 w-6 shrink-0 mt-0.5 group-hover:text-blue-400 transition-colors">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-2">
                            {a.title}
                          </p>
                          <p className="text-[11px] text-gray-400 mt-1">
                            {a.views}
                          </p>
                        </div>
                      </div>
                      <ChevronRight className="h-4 w-4 text-gray-300 group-hover:text-blue-600 shrink-0 transition-colors group-hover:translate-x-0.5" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick links & Guides */}
            <div className="space-y-4">
              <div className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
                <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <FileText className="h-4 w-4 text-blue-600" />
                  Quick guides
                </h3>
                <ul className="space-y-1">
                  {[
                    'Getting started with LinkedIn',
                    'Complete your profile 100%',
                    'Build your network fast',
                    'Writing your first post',
                  ].map(g => (
                    <li key={g}>
                      <button className="w-full flex items-center gap-2 text-left text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50/50 rounded-lg px-2 py-1.5 -ml-2 transition-colors">
                        <ChevronRight className="h-3.5 w-3.5 text-gray-400 shrink-0" />
                        {g}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
                <h3 className="text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <Video className="h-4 w-4 text-blue-600" />
                  Video tutorials
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Short 2–3 minute walkthroughs of the most-used features.
                </p>
                <button className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 group">
                  Watch tutorials{' '}
                  <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>

              <div className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
                <h3 className="text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <Globe className="h-4 w-4 text-blue-600" />
                  Community
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Ask questions and get answers from other LinkedIn members.
                </p>
                <button className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 group">
                  Visit community{' '}
                  <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ CONTACT SUPPORT ═══════════ */}
        <section className="mt-12">
          <div className="mb-4">
            <h2 className="text-lg font-bold text-gray-900 tracking-tight">
              Still need help?
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Pick the channel that works best for you
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {contactOptions.map(({ icon: Icon, title, desc, action }) => (
              <div
                key={title}
                className="bg-white rounded-2xl border border-gray-200/80 p-6 hover:border-blue-300 hover:shadow-lg transition-all duration-200 shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
              >
                <div className="h-12 w-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-base font-bold text-gray-900">{title}</h3>
                <p className="text-xs text-gray-500 mt-1">{desc}</p>
                <button className="mt-5 w-full inline-flex items-center justify-center gap-1.5 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors shadow-sm">
                  {action}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* ═══════════ FAQ SECTION ═══════════ */}
        <section className="mt-12 bg-white rounded-2xl border border-gray-200/80 p-6 sm:p-8 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
          <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-blue-600" />
            Frequently asked questions
          </h2>
          <div className="divide-y divide-gray-100">
            {[
              [
                'How do I reset my password?',
                'Go to the sign-in page, click "Forgot password?", and follow the instructions sent to your email or phone.',
              ],
              [
                'How can I cancel my Premium subscription?',
                "Navigate to Settings → Billing → Manage subscription → Cancel. You'll retain access until the end of your billing cycle.",
              ],
              [
                "Why can't I message someone?",
                'You can only message 1st-degree connections or people with an open profile. Upgrading to Premium unlocks InMail.',
              ],
              [
                'How do I report a fake profile?',
                'Open the profile, click "More" → "Report / Block" → "Report this profile" and follow the steps.',
              ],
            ].map(([q, a], i) => (
              <details key={q} className="group py-4" open={i === 0}>
                <summary className="flex items-center justify-between gap-3 cursor-pointer list-none">
                  <span className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {q}
                  </span>
                  <div className="h-6 w-6 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-blue-50 transition-colors shrink-0">
                    <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600 transition-transform group-open:rotate-90" />
                  </div>
                </summary>
                <p className="text-sm text-gray-600 mt-2 leading-relaxed pr-10">
                  {a}
                </p>
              </details>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
