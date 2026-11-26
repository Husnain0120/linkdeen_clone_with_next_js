'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Calendar,
  Check,
  CheckCircle2,
  FileText,
  Handshake,
  UserPlus,
  Users,
  X,
} from 'lucide-react';
import { useState } from 'react';

// ─────────────────────────────────────────────────────────────
// MOCK DATA
// ─────────────────────────────────────────────────────────────
const INVITATIONS = [
  {
    id: 1,
    name: 'Adeel Ahmad',
    title:
      'React | NextJS | TypeScript | NodeJS | MongoDB Building scalable web & mobile applications',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80',
    mutuals: 'Syed Hamza Mehmood and 49 other mutual connections',
    mutualAvatars: [
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=50&h=50&q=80',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=50&h=50&q=80',
    ],
  },
  {
    id: 2,
    name: 'Zainab Ali',
    title: 'Product Designer at Figma',
    avatar:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&h=100&q=80',
    mutuals: 'Omar Farooq and 12 other mutual connections',
    mutualAvatars: [
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=50&h=50&q=80',
    ],
  },
];

const SUGGESTIONS = [
  {
    id: 1,
    name: 'Hassan Zahid',
    title: 'Backend Engineer | Go | NestJS',
    mutuals: '24 mutual connections',
    avatar:
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&h=200&q=80',
    cover:
      'https://images.unsplash.com/photo-1557682250-33bd709cbe85?auto=format&fit=crop&w=300&h=100&q=80',
    followsYou: true,
  },
  {
    id: 2,
    name: 'Aima Khan',
    title: 'Student at Virtual University',
    mutuals: '1 mutual connection',
    avatar: '',
    cover: '',
    followsYou: false,
  },
  {
    id: 3,
    name: 'Hassaan Zahid',
    title: 'Senior Software Engineer | MERN',
    mutuals: '53 mutual connections',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200&q=80',
    cover: '',
    followsYou: true,
  },
  {
    id: 4,
    name: 'Salha Saeed',
    title: 'Student at Virtual University',
    mutuals: 'Based on your profile',
    avatar: '',
    cover: '',
    followsYou: false,
  },
  {
    id: 5,
    name: 'Haseeb Khan',
    title: 'Backend Developer | Node.js',
    mutuals: '31 mutual connections',
    avatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&h=200&q=80',
    cover:
      'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=300&h=100&q=80',
    followsYou: false,
  },
  {
    id: 6,
    name: 'Adeel Ahmed',
    title: 'Student at Virtual University',
    mutuals: 'Based on your profile',
    avatar:
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&h=200&q=80',
    cover: '',
    followsYou: false,
  },
  {
    id: 7,
    name: 'Mehmood Ul Hassan',
    title: 'Senior Software Engineer | TypeScript',
    mutuals: '24 mutual connections',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200&q=80',
    cover:
      'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=300&h=100&q=80',
    followsYou: true,
  },
  {
    id: 8,
    name: 'Emerald Sea',
    title: 'Student at Virtual University',
    mutuals: 'VU Pakistan',
    avatar: '',
    cover: '',
    followsYou: false,
  },
];

export default function NetworkPage() {
  const [activeTab, setActiveTab] = useState<'grow' | 'catchup'>('grow');
  const [dismissedInvites, setDismissedInvites] = useState<number[]>([]);
  const [following, setFollowing] = useState<number[]>([]);
  const [dismissedSuggestions, setDismissedSuggestions] = useState<number[]>(
    []
  );

  const toggleFollow = (id: number) => {
    setFollowing(prev =>
      prev.includes(id) ? prev.filter(fId => fId !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen pt-16 pb-24">
      <div className="max-w-[1120px] mx-auto px-4 sm:px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-[225px_1fr] gap-6">
          {/* ═══════════ LEFT SIDEBAR ═══════════ */}
          <aside className="space-y-3">
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-base font-semibold text-gray-900">
                  Manage my network
                </h2>
              </div>
              <nav className="py-1">
                {[
                  { icon: Users, label: 'Connections', count: '6,011' },
                  { icon: Users, label: 'Following & followers', count: '' },
                  { icon: Users, label: 'Groups', count: '7' },
                  { icon: Calendar, label: 'Events', count: '3' },
                  { icon: FileText, label: 'Pages', count: '268' },
                  { icon: FileText, label: 'Newsletters', count: '81' },
                ].map(({ icon: Icon, label, count }) => (
                  <button
                    key={label}
                    className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-gray-100 transition-colors"
                  >
                    <span className="flex items-center gap-2.5 text-sm font-medium text-gray-600">
                      <Icon className="h-4 w-4" />
                      {label}
                    </span>
                    {count && (
                      <span className="text-xs text-gray-500">{count}</span>
                    )}
                  </button>
                ))}
              </nav>
            </div>

            {/* Simple Footer Links */}
            <div className="px-2 text-[11px] text-gray-500 flex flex-wrap gap-x-3 gap-y-1">
              <a href="#" className="hover:underline hover:text-blue-600">
                About
              </a>
              <a href="#" className="hover:underline hover:text-blue-600">
                Accessibility
              </a>
              <a href="#" className="hover:underline hover:text-blue-600">
                Help Center
              </a>
              <a href="#" className="hover:underline hover:text-blue-600">
                Privacy & Terms
              </a>
            </div>
          </aside>

          {/* ═══════════ MAIN CONTENT ═══════════ */}
          <main className="space-y-3 min-w-0">
            {/* Standard Underline Tabs */}
            <div className="bg-white rounded-lg border border-gray-200 flex px-4 pt-1 gap-6">
              <button
                onClick={() => setActiveTab('grow')}
                className={`pb-3 text-sm font-semibold transition-colors relative ${
                  activeTab === 'grow'
                    ? 'text-gray-900'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Grow
                {activeTab === 'grow' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-700" />
                )}
              </button>
              <button
                onClick={() => setActiveTab('catchup')}
                className={`pb-3 text-sm font-semibold transition-colors relative ${
                  activeTab === 'catchup'
                    ? 'text-gray-900'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Catch up
                {activeTab === 'catchup' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-700" />
                )}
              </button>
            </div>

            {activeTab === 'grow' && (
              <>
                {/* ── Invitations (Dense & Professional) ── */}
                <div className="bg-white rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
                    <h2 className="text-base font-semibold text-gray-900">
                      Invitations (
                      {INVITATIONS.length - dismissedInvites.length})
                    </h2>
                    <button className="text-sm font-semibold text-gray-500 hover:text-blue-600 hover:underline">
                      Show all
                    </button>
                  </div>
                  <div className="divide-y divide-gray-100">
                    {INVITATIONS.filter(
                      inv => !dismissedInvites.includes(inv.id)
                    ).map(inv => (
                      <div key={inv.id} className="p-4 flex gap-3">
                        <Avatar className="h-14 w-14 shrink-0 cursor-pointer">
                          <AvatarImage
                            src={inv.avatar}
                            className="object-cover"
                          />
                          <AvatarFallback className="bg-gray-100 text-gray-600">
                            {inv.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-900 cursor-pointer hover:underline hover:text-blue-600 truncate">
                            {inv.name}
                          </p>
                          <p className="text-xs text-gray-500 line-clamp-2 mt-0.5">
                            {inv.title}
                          </p>
                          <div className="flex items-center gap-1.5 mt-1.5">
                            <div className="flex -space-x-1.5">
                              {inv.mutualAvatars.map((av, i) => (
                                <Avatar
                                  key={i}
                                  className="h-4 w-4 border border-white"
                                >
                                  <AvatarImage src={av} />
                                </Avatar>
                              ))}
                            </div>
                            <p className="text-xs text-gray-500 truncate">
                              {inv.mutuals}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2 shrink-0 mt-1">
                          <button
                            onClick={() =>
                              setDismissedInvites(prev => [...prev, inv.id])
                            }
                            className="px-4 py-1.5 rounded-full text-sm font-semibold text-gray-600 hover:bg-gray-100 transition-colors"
                          >
                            Ignore
                          </button>
                          <button
                            onClick={() =>
                              setDismissedInvites(prev => [...prev, inv.id])
                            }
                            className="px-4 py-1.5 rounded-full text-sm font-semibold text-blue-600 border border-blue-600 hover:bg-blue-50 transition-colors"
                          >
                            Accept
                          </button>
                        </div>
                      </div>
                    ))}
                    {INVITATIONS.length === dismissedInvites.length && (
                      <div className="p-8 text-center">
                        <p className="text-sm font-semibold text-gray-900">
                          No pending invitations
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* ── Suggestions Grid (Professional Cards) ── */}
                <div className="bg-white rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
                    <h2 className="text-base font-semibold text-gray-900">
                      People you may know
                    </h2>
                    <button className="text-sm font-semibold text-gray-500 hover:text-blue-600 hover:underline">
                      Show all
                    </button>
                  </div>

                  <div className="p-4 grid grid-cols-2 md:grid-cols-4 gap-3">
                    {SUGGESTIONS.filter(
                      s => !dismissedSuggestions.includes(s.id)
                    ).map(person => {
                      const isFollowing = following.includes(person.id);
                      const isMutual = isFollowing && person.followsYou;

                      return (
                        <div
                          key={person.id}
                          className="relative rounded-lg border border-gray-200 overflow-hidden flex flex-col items-center text-center pb-4 bg-white"
                        >
                          {/* Cover Photo */}
                          <div
                            className={`w-full h-[60px] ${person.cover ? 'bg-cover bg-center' : 'bg-gray-100'}`}
                            style={{
                              backgroundImage: person.cover
                                ? `url(${person.cover})`
                                : 'none',
                            }}
                          />

                          {/* Dismiss (X) Button */}
                          <button
                            onClick={() =>
                              setDismissedSuggestions(prev => [
                                ...prev,
                                person.id,
                              ])
                            }
                            className="absolute top-1.5 right-1.5 h-6 w-6 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black transition-colors z-10"
                          >
                            <X className="h-3 w-3" />
                          </button>

                          {/* Avatar */}
                          <Avatar className="h-16 w-16 -mt-8 ring-2 ring-white z-0">
                            {person.avatar ? (
                              <AvatarImage
                                src={person.avatar}
                                className="object-cover"
                              />
                            ) : (
                              <div className="w-full h-full bg-gray-100 flex items-center justify-center border border-gray-200">
                                <Users className="h-8 w-8 text-gray-400" />
                              </div>
                            )}
                          </Avatar>

                          {/* Info */}
                          <div className="px-2 mt-1 flex-1 flex flex-col items-center w-full">
                            <p className="text-sm font-semibold text-gray-900 line-clamp-1 w-full">
                              {person.name}
                            </p>
                            <p className="text-xs text-gray-500 line-clamp-2 min-h-[32px] leading-tight mt-0.5 w-full">
                              {person.title}
                            </p>

                            {/* Mutual Connections / Badge */}
                            <div className="flex items-center justify-center mt-1.5 w-full px-1 h-4">
                              {isMutual ? (
                                <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-gray-700">
                                  <Handshake className="h-3 w-3" /> Mutual
                                  connection
                                </span>
                              ) : (
                                <p className="text-[10px] text-gray-500 truncate">
                                  {person.mutuals}
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Follow Button (Standard Outline) */}
                          <button
                            onClick={() => toggleFollow(person.id)}
                            className={`mt-2 w-[85%] py-1 rounded-full text-sm font-semibold flex items-center justify-center gap-1 transition-colors ${
                              isMutual
                                ? 'text-gray-700 border border-gray-400 hover:bg-gray-50'
                                : isFollowing
                                  ? 'text-gray-600 border border-gray-400 hover:bg-gray-50'
                                  : 'text-blue-600 border border-blue-600 hover:bg-blue-50'
                            }`}
                          >
                            {isMutual ? (
                              <>
                                <Check className="h-3.5 w-3.5" /> Mutual
                              </>
                            ) : isFollowing ? (
                              <>
                                <Check className="h-3.5 w-3.5" /> Following
                              </>
                            ) : (
                              <>
                                <UserPlus className="h-3.5 w-3.5" /> Follow
                              </>
                            )}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            )}

            {activeTab === 'catchup' && (
              <div className="bg-white rounded-lg border border-gray-200 p-10 text-center">
                <CheckCircle2 className="h-8 w-8 text-gray-400 mx-auto mb-3" />
                <h2 className="text-base font-semibold text-gray-900">
                  You're all caught up!
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Check back later for new updates from your network.
                </p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
