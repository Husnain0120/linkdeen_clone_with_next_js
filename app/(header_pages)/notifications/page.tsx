'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Bell,
  Briefcase,
  CheckCheck,
  Heart,
  MessageSquare,
  Settings,
  UserPlus,
  X,
} from 'lucide-react';
import { useState } from 'react';

// ─────────────────────────────────────────────────────────────
// MOCK DATA (Type added for easy icon rendering)
// ─────────────────────────────────────────────────────────────
const INITIAL_NOTIFICATIONS = [
  {
    id: 1,
    type: 'connection',
    name: 'Ali Hassan',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80',
    text: 'sent you a connection request.',
    time: '2h ago',
    unread: true,
  },
  {
    id: 2,
    type: 'like',
    name: 'Fatima Sheikh',
    avatar:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&h=100&q=80',
    text: 'and 12 others liked your post.',
    time: '4h ago',
    unread: true,
  },
  {
    id: 3,
    type: 'comment',
    name: 'Priya Patel',
    avatar:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&h=100&q=80',
    text: 'commented on your post: "Great insights on system design!"',
    time: '1d ago',
    unread: false,
  },
  {
    id: 4,
    type: 'job',
    name: 'Stripe',
    avatar:
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=100&h=100&q=80',
    text: 'posted a new job matching your profile.',
    time: '2d ago',
    unread: false,
  },
  {
    id: 5,
    type: 'connection',
    name: 'Hamza Malik',
    avatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&h=100&q=80',
    text: 'accepted your connection request.',
    time: '3d ago',
    unread: false,
  },
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);

  const newNotifs = notifications.filter(n => n.unread);
  const earlierNotifs = notifications.filter(n => !n.unread);

  // Mark all as read
  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  // Mark single as read
  const markAsRead = (id: number) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, unread: false } : n))
    );
  };

  // Helper for rendering type icons
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'connection':
        return <UserPlus className="h-3 w-3" />;
      case 'like':
        return <Heart className="h-3 w-3 fill-current" />;
      case 'comment':
        return <MessageSquare className="h-3 w-3 fill-current" />;
      case 'job':
        return <Briefcase className="h-3 w-3" />;
      default:
        return <Bell className="h-3 w-3" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'connection':
        return 'bg-indigo-500 text-white';
      case 'like':
        return 'bg-blue-500 text-white';
      case 'comment':
        return 'bg-emerald-500 text-white';
      case 'job':
        return 'bg-amber-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className="min-h-screen pt-16 pb-24">
      <div className="max-w-[800px] mx-auto px-4 sm:px-6 py-6">
        {/* ═══════════ HEADER ═══════════ */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">
              Notifications
            </h1>
            {newNotifs.length > 0 && (
              <span className="bg-blue-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {newNotifs.length} new
              </span>
            )}
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={markAllAsRead}
              disabled={newNotifs.length === 0}
              className="text-sm font-semibold text-gray-600 hover:text-gray-900 disabled:opacity-50 transition-colors flex items-center gap-1.5"
            >
              <CheckCheck className="h-4 w-4" />
              Mark all as read
            </button>
            <button className="p-1.5 rounded-full text-gray-500 hover:bg-gray-100 transition-colors">
              <Settings className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* ═══════════ NEW NOTIFICATIONS ═══════════ */}
        {newNotifs.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 px-1">
              New
            </h2>
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              {newNotifs.map((notif, index) => (
                <div
                  key={notif.id}
                  onClick={() => markAsRead(notif.id)}
                  className="group relative flex items-start gap-4 p-4 cursor-pointer transition-colors border-b border-gray-100 last:border-0 bg-blue-50/40 hover:bg-blue-50/80"
                >
                  {/* Unread Dot */}
                  <div className="absolute left-2 top-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-blue-600" />

                  {/* Avatar + Type Icon */}
                  <div className="relative shrink-0 ml-2">
                    <Avatar className="h-12 w-12 border border-gray-200">
                      <AvatarImage
                        src={notif.avatar}
                        className="object-cover"
                      />
                      <AvatarFallback className="bg-gray-100 text-gray-600 font-semibold">
                        {notif.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div
                      className={`absolute -bottom-1 -right-1 h-5 w-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm ${getTypeColor(notif.type)}`}
                    >
                      {getTypeIcon(notif.type)}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0 py-1">
                    <p className="text-sm text-gray-800 leading-relaxed pr-4">
                      <span className="font-semibold text-gray-900">
                        {notif.name}
                      </span>{' '}
                      {notif.text}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                  </div>

                  {/* Action Buttons (if connection) */}
                  {notif.type === 'connection' && (
                    <div className="shrink-0 self-center flex items-center gap-2">
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          markAsRead(notif.id);
                        }}
                        className="px-4 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-full transition-colors"
                      >
                        Accept
                      </button>
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          markAsRead(notif.id);
                        }}
                        className="p-2 text-gray-500 hover:bg-gray-200 rounded-full transition-colors"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ═══════════ EARLIER NOTIFICATIONS ═══════════ */}
        {earlierNotifs.length > 0 && (
          <div>
            <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 px-1">
              Earlier
            </h2>
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              {earlierNotifs.map(notif => (
                <div
                  key={notif.id}
                  className="group flex items-start gap-4 p-4 cursor-pointer transition-colors border-b border-gray-100 last:border-0 hover:bg-gray-50"
                >
                  {/* Avatar + Type Icon */}
                  <div className="relative shrink-0">
                    <Avatar className="h-12 w-12 border border-gray-200">
                      <AvatarImage
                        src={notif.avatar}
                        className="object-cover"
                      />
                      <AvatarFallback className="bg-gray-100 text-gray-600 font-semibold">
                        {notif.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div
                      className={`absolute -bottom-1 -right-1 h-5 w-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm ${getTypeColor(notif.type)}`}
                    >
                      {getTypeIcon(notif.type)}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0 py-1">
                    <p className="text-sm text-gray-800 leading-relaxed pr-4">
                      <span className="font-semibold text-gray-900">
                        {notif.name}
                      </span>{' '}
                      {notif.text}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                  </div>

                  {/* Dismiss Button on Hover */}
                  <button className="shrink-0 self-center p-2 opacity-0 group-hover:opacity-100 text-gray-400 hover:text-gray-700 hover:bg-gray-200 rounded-full transition-all">
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
