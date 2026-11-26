'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Bell,
  Briefcase,
  ChartNoAxesColumn,
  ChevronRight,
  Globe,
  MoreHorizontal,
  User,
} from 'lucide-react';
import { useState } from 'react';

// ─────────────────────────────────────────────────────────────
// MOCK DATA (Matching the image)
// ─────────────────────────────────────────────────────────────
const INITIAL_NOTIFICATIONS = [
  {
    id: 1,
    type: 'newsletter',
    unread: true,
    time: '3h',
    avatar: null,
    iconType: 'globe',
    text: (
      <>
        New from{' '}
        <strong className="font-semibold text-gray-900">Jobgether</strong> in
        Jobgether Newsletter : Your Next Remote Employer Probably Isn't Based in
        Your Country
      </>
    ),
  },
  {
    id: 2,
    type: 'profile',
    unread: true,
    time: '3h',
    avatar:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&h=100&q=80',
    text: (
      <>
        New from{' '}
        <strong className="font-semibold text-gray-900">
          Carine Jamous,CPD
        </strong>{' '}
        in Search for a job easily!: How to Build a Job Search Strategy That
        Actually Works
      </>
    ),
  },
  {
    id: 3,
    type: 'newsletter',
    unread: false,
    time: '3h',
    avatar: null,
    iconType: 'w3schools',
    text: (
      <>
        New from{' '}
        <strong className="font-semibold text-gray-900">w3schools.com</strong>{' '}
        in W3Schools Newsletter: Black Friday: Get full access at $299
      </>
    ),
  },
  {
    id: 4,
    type: 'job',
    unread: false,
    time: '5h',
    avatar: null,
    iconType: 'jobs_blue',
    text: (
      <>
        <strong className="font-semibold text-gray-900">
          Web Developer or Frontend Developer or Back End Developer
        </strong>
        : new opportunities in Rawalpindi on-site or hybrid or remote
      </>
    ),
    action: 'View jobs',
  },
  {
    id: 5,
    type: 'analytics',
    unread: false,
    time: '6h',
    avatar: null,
    iconType: 'analytics',
    text: (
      <>
        Your post has reached{' '}
        <strong className="font-semibold text-gray-900">29 impressions</strong>{' '}
        so far. View more analytics.
      </>
    ),
    preview:
      'https://images.unsplash.com/photo-1557682250-33bd709cbe85?auto=format&fit=crop&w=100&h=100&q=80', // Post preview image
    previewText: 'Ameen',
  },
  {
    id: 6,
    type: 'job',
    unread: false,
    time: '8h',
    avatar: null,
    iconType: 'systems_ltd',
    text: (
      <>
        <strong className="font-semibold text-gray-900">Systems Limited</strong>{' '}
        job: new opportunities in Pakistan
      </>
    ),
    action: 'View jobs',
  },
  {
    id: 7,
    type: 'job',
    unread: false,
    time: '11h',
    avatar: null,
    iconType: 'red_logo',
    text: (
      <>
        <strong className="font-semibold text-gray-900">
          Software Engineering Specialist
        </strong>
        : new opportunities in Lahore
      </>
    ),
    action: 'View jobs',
  },
  {
    id: 8,
    type: 'premium',
    unread: false,
    time: '23h',
    avatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&h=100&q=80',
    text: (
      <>
        <strong className="font-semibold text-gray-900">Web Development</strong>{' '}
        request from Muhammad Anus and other clients are available. Show
        Requests.
      </>
    ),
    premiumBadge: true,
  },
  {
    id: 9,
    type: 'job',
    unread: false,
    time: '1d',
    avatar: null,
    iconType: 'w_logo',
    text: (
      <>
        <strong className="font-semibold text-gray-900">
          mean stack developer
        </strong>
        : new opportunities in Rawalpindi
      </>
    ),
    action: 'View jobs',
  },
];

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState('All');
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);

  const markAsRead = (id: number) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, unread: false } : n))
    );
  };

  const tabs = ['All', 'Jobs', 'My posts', 'Mentions'];

  // Helper to render the left icon based on type
  const renderIcon = (notif: any) => {
    if (notif.avatar) {
      return (
        <Avatar className="h-10 w-10 border border-gray-200">
          <AvatarImage src={notif.avatar} className="object-cover" />
          <AvatarFallback className="bg-gray-100 text-gray-600">
            <User className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
      );
    }

    // Custom logos for mock data
    switch (notif.iconType) {
      case 'globe':
        return (
          <div className="h-10 w-10 rounded-full bg-white border border-gray-200 flex items-center justify-center">
            <Globe className="h-5 w-5 text-green-500" />
          </div>
        );
      case 'w3schools':
        return (
          <div className="h-10 w-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-green-600 font-bold text-xs">
            W3
          </div>
        );
      case 'jobs_blue':
        return (
          <div className="h-10 w-10 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center">
            <Briefcase className="h-5 w-5 text-blue-600" />
          </div>
        );
      case 'analytics':
        return (
          <div className="h-10 w-10 rounded-full bg-orange-50 border border-orange-100 flex items-center justify-center">
            <ChartNoAxesColumn className="h-5 w-5 text-orange-500" />
          </div>
        );
      case 'systems_ltd':
        return (
          <div className="h-10 w-10 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-[10px] font-bold text-gray-600 text-center leading-tight">
            systems
          </div>
        );
      case 'red_logo':
        return (
          <div className="h-10 w-10 rounded-full bg-red-600 flex items-center justify-center text-white font-bold">
            L
          </div>
        );
      case 'w_logo':
        return (
          <div className="h-10 w-10 rounded-full bg-yellow-50 border border-yellow-200 flex items-center justify-center text-yellow-600 font-bold">
            W
          </div>
        );
      default:
        return (
          <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
            <Bell className="h-5 w-5 text-gray-500" />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen pt-16 pb-24">
      <div className="max-w-[1128px] mx-auto px-4 sm:px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-[225px_1fr_300px] gap-6">
          {/* ═══════════ LEFT SIDEBAR (Profile Card) ═══════════ */}
          <aside className="space-y-3 hidden lg:block">
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden text-center">
              {/* Cover Image */}
              <div className="h-16 bg-gradient-to-r from-gray-800 to-gray-900 w-full relative">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557682250-33bd709cbe85?auto=format&fit=crop&w=300&h=100&q=80')] bg-cover bg-center opacity-40 mix-blend-overlay" />
              </div>
              {/* Avatar */}
              <div className="px-4 pb-4 relative">
                <Avatar className="h-16 w-16 mx-auto -mt-8 ring-4 ring-white bg-white">
                  <AvatarImage src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&h=200&q=80" />
                  <AvatarFallback>MH</AvatarFallback>
                </Avatar>
                <h2 className="text-base font-bold text-gray-900 mt-2 hover:underline cursor-pointer">
                  Muhammad Husn...
                </h2>
                <p className="text-xs text-gray-500 mt-1 leading-snug">
                  Full Stack Web Developer | MERN & Next.js | React | Node.js |
                  ...
                </p>
                <p className="text-xs text-gray-500 mt-1">Rawalpindi, Punjab</p>

                {/* 🟢 RANIUS LOGO INSTEAD OF LINKEDIN */}
                <div className="flex items-center justify-center gap-1.5 mt-3">
                  <div className="h-5 w-5 bg-[#0A66C2] rounded flex items-center justify-center text-white text-[10px] font-bold leading-none">
                    ni
                  </div>
                  <span className="text-xs font-semibold text-gray-700">
                    Virtual University of Pakistan
                  </span>
                </div>
              </div>
            </div>

            {/* Manage Notifications Button */}
            <button className="w-full flex items-center justify-between bg-white rounded-lg border border-gray-200 p-3 hover:bg-gray-50 transition-colors">
              <span className="text-sm font-semibold text-gray-700">
                Manage notifications
              </span>
              <ChevronRight className="h-4 w-4 text-gray-500" />
            </button>
          </aside>

          {/* ═══════════ MAIN CONTENT ═══════════ */}
          <main className="min-w-0">
            {/* Tabs */}
            <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-hide">
              {tabs.map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-1.5 text-sm font-semibold rounded-full border transition-colors whitespace-nowrap ${
                    activeTab === tab
                      ? 'bg-[#000000] text-white border-black'
                      : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Notification List */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              {notifications.map(notif => (
                <div
                  key={notif.id}
                  onClick={() => markAsRead(notif.id)}
                  className={`relative flex gap-3 p-4 border-b border-gray-200 last:border-0 cursor-pointer transition-colors group ${
                    notif.unread
                      ? 'bg-[#EDF3F8] hover:bg-[#E1E9F1]'
                      : 'bg-white hover:bg-gray-50'
                  }`}
                >
                  {/* Unread Blue Dot */}
                  {notif.unread && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-blue-600" />
                  )}

                  {/* Icon/Avatar */}
                  <div className="shrink-0 mt-1">{renderIcon(notif)}</div>

                  {/* Content */}
                  <div className="flex-1 min-w-0 pr-8">
                    <div className="text-[14px] text-gray-800 leading-snug">
                      {notif.text}
                    </div>

                    {notif.premiumBadge && (
                      <div className="mt-1.5 inline-flex items-center gap-1 text-[10px] font-semibold text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded-sm">
                        <div className="w-1.5 h-1.5 bg-amber-500 rounded-full" />{' '}
                        Powered by Premium
                      </div>
                    )}

                    {notif.action && (
                      <button className="mt-2.5 px-4 py-1 text-sm font-semibold text-blue-600 border border-blue-600 rounded-full hover:bg-blue-50 transition-colors">
                        {notif.action}
                      </button>
                    )}

                    {/* Post Preview (for analytics type) */}
                    {notif.preview && (
                      <div className="mt-2 flex items-start gap-2">
                        <img
                          src={notif.preview}
                          alt="post"
                          className="w-12 h-12 object-cover rounded border border-gray-300"
                        />
                        <div className="text-xs text-gray-600 bg-white p-2 rounded border border-gray-200 shadow-sm mt-1">
                          {notif.previewText}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Right Side (Time + More Menu) */}
                  <div className="shrink-0 flex flex-col items-end absolute right-4 top-4">
                    <span className="text-[12px] text-gray-500 mb-1">
                      {notif.time}
                    </span>
                    <button className="text-gray-400 hover:text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity">
                      <MoreHorizontal className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </main>

          {/* ═══════════ RIGHT SIDEBAR (Ad & Footer) ═══════════ */}
          <aside className="hidden lg:block space-y-4">
            {/* Ad Banner */}
            <div className="bg-[#0A66C2] rounded-lg overflow-hidden cursor-pointer relative group">
              <div className="absolute top-4 left-4 z-10">
                {/* 🟢 RANIUS BRANDING IN AD */}
                <div className="text-white font-bold text-xl leading-tight mb-2">
                  See
                  <br />
                  who's
                  <br />
                  hiring
                  <br />
                  on
                  <br />
                  Ranius
                </div>
                <div className="bg-white text-black text-sm font-bold px-3 py-1 rounded-full inline-flex items-center justify-center mt-2 shadow-sm">
                  <span className="text-[#0A66C2] font-bold text-lg leading-none">
                    ni
                  </span>
                </div>
              </div>
              <img
                src="https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=300&h=250&q=80"
                alt="See who's hiring"
                className="w-full h-64 object-cover opacity-90 group-hover:opacity-100 transition-opacity"
              />
            </div>

            {/* Footer Links */}
            <div className="px-4 text-center">
              <div className="flex flex-wrap justify-center gap-x-3 gap-y-1.5 text-[11px] text-gray-500 font-medium">
                {[
                  'About',
                  'Accessibility',
                  'Help Center',
                  'Send Feedback',
                  'Privacy & Terms',
                  'Ad Choices',
                  'Advertising',
                  'Business Services',
                  'Get the Ranius app',
                  'More',
                ].map(link => (
                  <a
                    key={link}
                    href="#"
                    className="hover:underline hover:text-blue-600"
                  >
                    {link}
                  </a>
                ))}
              </div>

              {/* 🟢 RANIUS FOOTER LOGO */}
              <div className="flex items-center justify-center gap-1.5 mt-4">
                <div className="w-5 h-5 bg-[#0A66C2] rounded flex items-center justify-center">
                  <span className="text-white font-bold text-[10px] leading-none">
                    ni
                  </span>
                </div>
                <span className="text-[11px] text-gray-500 ml-1">
                  Ranius Corporation © 2026
                </span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
