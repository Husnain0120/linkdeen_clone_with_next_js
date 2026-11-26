'use client';

import VerifiedBadge from '@/components/instagram-verified-badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Award,
  BadgeCheck,
  BookOpen,
  Briefcase,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Eye,
  Globe,
  GraduationCap,
  ImagePlus,
  Languages,
  Link2,
  Mail,
  MapPin,
  MessageSquare,
  MoreHorizontal,
  PenLine,
  Pencil,
  Plus,
  Repeat2,
  Send,
  Share2,
  Sparkles,
  ThumbsUp,
  Users,
} from 'lucide-react';
import { useState } from 'react';

export default function ProfilePage() {
  const [isNewUser, setIsNewUser] = useState(false);
  const [isOwn, setIsOwn] = useState(true);
  const [activeTab, setActiveTab] = useState<'posts' | 'experience'>(
    'experience'
  );

  return (
    <>
      {/* ═══════════ DEV TOGGLE BAR ═══════════ */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-4 bg-gray-900 text-white rounded-full pl-4 pr-2 py-1.5 shadow-2xl">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-semibold tracking-wide">
            isNewUser
          </span>
          <button
            onClick={() => setIsNewUser(v => !v)}
            className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
              isNewUser ? 'bg-emerald-500' : 'bg-gray-600'
            }`}
          >
            <span
              className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
                isNewUser ? 'translate-x-5' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
        <div className="h-4 w-px bg-gray-700" />
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-semibold tracking-wide">isOwn</span>
          <button
            onClick={() => setIsOwn(v => !v)}
            className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
              isOwn ? 'bg-blue-500' : 'bg-gray-600'
            }`}
          >
            <span
              className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
                isOwn ? 'translate-x-5' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
        <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-gray-700 text-gray-300 ml-1">
          {isOwn ? 'OWN' : 'VIEW'}
        </span>
      </div>

      <div className="bg-white min-h-screen mt-16 mb-24 pb-20 rounded-b-xl">
        {/* ═══════════ COVER ═══════════ */}
        <div className="relative h-40 sm:h-56 md:h-64 rounded-t-xl overflow-hidden">
          {isNewUser ? (
            <div className="w-full h-full border-2 border-dashed border-red-200 bg-red-50/40 flex items-center justify-center">
              {isOwn ? (
                <button className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-red-200 rounded-full text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors shadow-sm">
                  <ImagePlus className="h-3.5 w-3.5" />
                  Add cover photo
                </button>
              ) : (
                <span className="text-xs text-gray-500">No cover photo</span>
              )}
            </div>
          ) : (
            <>
              <img
                src="https://images.unsplash.com/photo-1557682250-33bd709cbe85?auto=format&fit=crop&w=1600&q=80"
                alt="Cover"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

              {/* ⭐ Cover edit button — own profile only */}
              {isOwn && (
                <button
                  className="absolute top-4 right-4 inline-flex items-center gap-1.5 bg-white/95 hover:bg-white backdrop-blur px-3 py-1.5 rounded-full text-xs font-semibold text-gray-700 shadow-md transition-colors"
                  aria-label="Edit cover"
                >
                  <Pencil className="h-3.5 w-3.5" />
                  Edit cover
                </button>
              )}
            </>
          )}
        </div>

        {/* ═══════════ PROFILE HEADER ═══════════ */}
        <div className="max-w-[1120px] mx-auto px-4 sm:px-6">
          {/* Row 1: Avatar + Actions */}
          <div className="flex items-end justify-between -mt-14 sm:-mt-16">
            {/* ⭐ Avatar with edit badge — own profile only */}
            <div className="relative">
              <Avatar className="h-28 w-28 sm:h-32 sm:w-32 ring-[5px] ring-white shadow-xl">
                <AvatarImage
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&h=400&q=80"
                  className="object-cover object-center w-full h-full"
                />
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white text-4xl font-bold">
                  AK
                </AvatarFallback>
              </Avatar>
              {isOwn && !isNewUser && (
                <button
                  className="absolute bottom-1.5 right-1.5 h-8 w-8 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-md hover:bg-gray-50 transition-colors"
                  aria-label="Edit photo"
                >
                  <Pencil className="h-3.5 w-3.5 text-gray-700" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 pb-2">
              {isOwn ? (
                <button className="px-6 py-2 bg-blue-600 text-white text-sm font-semibold rounded-full hover:bg-blue-700 transition-colors">
                  Edit profile
                </button>
              ) : (
                <>
                  <button className="px-6 py-2 bg-gray-900 text-white text-sm font-semibold rounded-full hover:bg-gray-800 transition-colors">
                    Follow
                  </button>
                  <button className="px-6 py-2 bg-white border border-gray-300 text-gray-800 text-sm font-semibold rounded-full hover:bg-gray-50 transition-colors">
                    Message
                  </button>
                  <button
                    className="p-2 bg-white border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
                    aria-label="Share"
                  >
                    <Share2 className="h-4 w-4 text-gray-600" />
                  </button>
                  <button
                    className="p-2 bg-white border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
                    aria-label="More options"
                  >
                    <MoreHorizontal className="h-4 w-4 text-gray-600" />
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Row 2: Name / username / email */}
          <div className="mt-4">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 tracking-tight">
                Abdullah Khan
              </h1>
              {!isNewUser && <ProfileBadge isOwn={isOwn} />}
            </div>
            <p className="text-sm text-gray-500 mt-0.5">@abdullahkhan</p>
            {isNewUser && (
              <p className="text-sm text-gray-600 mt-1.5 flex items-center gap-1.5">
                <Mail className="h-3.5 w-3.5 text-gray-400" />
                abdullah@example.com
              </p>
            )}
          </div>

          {/* Completion banner — own new-user only */}
          {isNewUser && isOwn && (
            <div className="mt-6 max-w-2xl rounded-2xl border border-blue-200 bg-blue-50 p-4 flex items-center justify-between gap-4 flex-wrap">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-gray-900">
                  Complete your profile
                </p>
                <p className="text-xs text-gray-600 mt-0.5">
                  Profiles with all details get <strong>5× more views</strong>.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-32 h-1.5 bg-white rounded-full overflow-hidden">
                  <div
                    className="h-full bg-red-400 rounded-full"
                    style={{ width: '17%' }}
                  />
                </div>
                <span className="text-xs font-semibold text-gray-700">17%</span>
              </div>
            </div>
          )}

          {/* NEW USER EMPTY STATE */}
          {isNewUser ? (
            <>
              <div className="mt-6 max-w-2xl space-y-2">
                <EmptyRow
                  label="Headline"
                  hint="e.g. Software Engineer at Stripe · Ex-Careem · Building payments"
                  action="Add headline"
                  icon={PenLine}
                  isOwn={isOwn}
                />
                <EmptyRow
                  label="Location"
                  hint="Where are you based?"
                  action="Add location"
                  icon={MapPin}
                  isOwn={isOwn}
                />
                <EmptyRow
                  label="Website"
                  hint="Portfolio, blog, or social link"
                  action="Add website"
                  icon={Link2}
                  isOwn={isOwn}
                />
                <EmptyRow
                  label="Skills"
                  hint="Showcase what you're good at"
                  action="Add skills"
                  icon={Sparkles}
                  isOwn={isOwn}
                />
              </div>

              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-4 pt-4 border-t border-gray-100 max-w-2xl">
                {[
                  ['0', 'followers'],
                  ['0', 'following'],
                  ['0', 'posts'],
                  ['0', 'recommendations'],
                ].map(([n, l]) => (
                  <span key={l}>
                    <strong className="text-gray-900 font-bold">{n}</strong>{' '}
                    <span className="text-gray-500 text-sm">{l}</span>
                  </span>
                ))}
              </div>

              <div className="mt-8">
                <EmptyAboutSection isOwn={isOwn} />
              </div>

              <div className="flex items-center gap-1 mt-8 border-b border-gray-200 overflow-x-auto">
                {[
                  { id: 'posts', label: 'Posts' },
                  { id: 'experience', label: 'Experience' },
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`px-4 py-3 text-sm font-semibold relative transition-colors whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'text-gray-900'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {tab.label}
                    {activeTab === tab.id && (
                      <span className="absolute bottom-0 left-2 right-2 h-[3px] bg-blue-600 rounded-t-full" />
                    )}
                  </button>
                ))}
              </div>
            </>
          ) : (
            /* FULL PROFILE CONTENT */
            <>
              {/* ⭐ Headline block with edit icon */}
              <div className="mt-4 max-w-2xl relative group">
                {isOwn && (
                  <div className="absolute -top-1 right-0">
                    <EditIcon label="Edit headline" />
                  </div>
                )}
                <div className="flex items-center gap-1.5 flex-wrap pr-10">
                  <Briefcase className="h-4 w-4 text-gray-400 shrink-0" />
                  <span className="text-[15px] font-bold text-gray-900">
                    Software Engineer
                  </span>
                  <span className="text-[15px] text-gray-500">at</span>
                  <span className="text-[15px] font-bold text-gray-900">
                    Stripe
                  </span>
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-2 py-0.5 ml-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Current
                  </span>
                </div>

                <p className="text-[14px] text-gray-700 mt-1.5 leading-relaxed">
                  Building payment infrastructure at scale · Writing about
                  systems & pragmatism
                </p>

                <div className="flex items-center gap-1.5 flex-wrap mt-2">
                  <span className="text-[11px] font-medium text-gray-500">
                    Previously at
                  </span>
                  <span className="text-[11px] font-semibold text-gray-700 bg-gray-100 border border-gray-200 px-2 py-0.5 rounded-full">
                    Careem
                  </span>
                  <span className="text-[11px] font-semibold text-gray-700 bg-gray-100 border border-gray-200 px-2 py-0.5 rounded-full">
                    NayaPay
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-2 mt-3">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-2.5 py-1">
                    <CheckCircle2 className="h-3 w-3" />
                    Open to work
                  </span>
                </div>

                {/* ⭐ Meta row — each item has pencil on own */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-3 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    Karachi, Pakistan
                  </span>
                  <span className="flex items-center gap-1 text-blue-600 hover:underline cursor-pointer">
                    <Link2 className="h-4 w-4" />
                    abdullah.dev
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    Joined March 2022
                  </span>
                  <span className="flex items-center gap-1 text-blue-600 hover:underline cursor-pointer">
                    <Users className="h-4 w-4" />
                    Contact info
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-4 pt-4 border-t border-gray-100">
                  <span className="cursor-pointer group">
                    <strong className="text-gray-900 font-bold group-hover:underline">
                      1.2K
                    </strong>{' '}
                    <span className="text-gray-500 text-sm">followers</span>
                  </span>
                  <span className="cursor-pointer group">
                    <strong className="text-gray-900 font-bold group-hover:underline">
                      847
                    </strong>{' '}
                    <span className="text-gray-500 text-sm">following</span>
                  </span>
                  <span className="cursor-pointer group">
                    <strong className="text-gray-900 font-bold group-hover:underline">
                      128
                    </strong>{' '}
                    <span className="text-gray-500 text-sm">posts</span>
                  </span>
                  <span className="cursor-pointer group">
                    <strong className="text-gray-900 font-bold group-hover:underline">
                      24
                    </strong>{' '}
                    <span className="text-gray-500 text-sm">
                      recommendations
                    </span>
                  </span>
                </div>
              </div>

              <div className="mt-8">
                <AboutSection isOwn={isOwn} />
              </div>

              <div className="flex items-center gap-1 mt-8 border-b border-gray-200 overflow-x-auto">
                {[
                  { id: 'posts', label: 'Posts' },
                  { id: 'experience', label: 'Experience' },
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`px-4 py-3 text-sm font-semibold relative transition-colors whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'text-gray-900'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {tab.label}
                    {activeTab === tab.id && (
                      <span className="absolute bottom-0 left-2 right-2 h-[3px] bg-blue-600 rounded-t-full" />
                    )}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* CONTENT GRID */}
        <div className="max-w-[1120px] mx-auto px-4 sm:px-6 mt-6">
          <div className="grid lg:grid-cols-[1fr_340px] gap-6">
            <div className="min-w-0">
              {isNewUser ? (
                activeTab === 'posts' ? (
                  <EmptyPosts isOwn={isOwn} />
                ) : (
                  <EmptyExperience isOwn={isOwn} />
                )
              ) : activeTab === 'posts' ? (
                <PostsFeed isOwn={isOwn} />
              ) : (
                <ExperienceTab isOwn={isOwn} />
              )}
            </div>

            <aside className="space-y-4">
              {isNewUser ? (
                <>
                  <EmptySidebarCard
                    icon={Eye}
                    title="Profile views"
                    message="No views yet"
                    isOwn={isOwn}
                  />
                  <EmptySidebarCard
                    icon={Briefcase}
                    title="Intro"
                    message="Add a short intro about yourself"
                    action="Add intro"
                    isOwn={isOwn}
                  />
                  <EmptySidebarCard
                    icon={Languages}
                    title="Languages"
                    message="Add languages you speak"
                    action="Add language"
                    isOwn={isOwn}
                  />
                  <EmptySidebarCard
                    icon={BadgeCheck}
                    title="Certifications"
                    message="Add your certifications"
                    action="Add certification"
                    isOwn={isOwn}
                  />
                  <EmptySidebarCard
                    icon={Award}
                    title="Highlights"
                    message="No highlights yet"
                    isOwn={isOwn}
                  />
                  <EmptySidebarCard
                    icon={Users}
                    title="Similar people"
                    message="Follow people to see suggestions"
                    isOwn={isOwn}
                  />
                </>
              ) : (
                <>
                  <ProfileViewsCard />
                  <IntroCard isOwn={isOwn} />
                  <LanguagesCard isOwn={isOwn} />
                  <CertificationsCard isOwn={isOwn} />
                  <HighlightsCard isOwn={isOwn} />
                  <SimilarPeopleCard />
                </>
              )}
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}

/* ═══════════════════════════════════════════════
   ⭐ REUSABLE EDIT ICON
   ═══════════════════════════════════════════════ */

function EditIcon({ label }: { label?: string }) {
  return (
    <button
      className="p-1.5 rounded-full text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
      aria-label={label || 'Edit'}
      title={label || 'Edit'}
    >
      <Pencil className="h-3.5 w-3.5" />
    </button>
  );
}

/* ═══════════════════════════════════════════════
   ⭐ PROFILE BADGE
   ═══════════════════════════════════════════════ */

function ProfileBadge({ isOwn, size = 22 }: { isOwn: boolean; size?: number }) {
  return (
    <div className="inline-flex items-center gap-1.5">
      <VerifiedBadge size={size} />
      {isOwn && (
        <button className="inline-flex items-center gap-1 rounded-full border border-blue-200 bg-blue-50 hover:bg-blue-100 px-2 py-0.5 text-[10px] font-semibold text-blue-600 transition-colors">
          <BadgeCheck className="h-3 w-3" />
          Get Verified
        </button>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   EMPTY STATE HELPERS (isOwn-aware)
   ═══════════════════════════════════════════════ */

function EmptyRow({
  label,
  hint,
  action,
  icon: Icon = Plus,
  isOwn,
}: {
  label: string;
  hint?: string;
  action: string;
  icon?: any;
  isOwn: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border-2 border-dashed border-red-200 bg-red-50/40 px-4 py-3">
      <div className="flex items-center gap-3 min-w-0">
        <div className="h-8 w-8 shrink-0 rounded-lg bg-white border border-red-200 flex items-center justify-center">
          <Icon className="h-4 w-4 text-red-500" />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-gray-900 truncate">
            {label}
          </p>
          {hint && <p className="text-xs text-gray-500 truncate">{hint}</p>}
        </div>
      </div>
      {isOwn ? (
        <button className="shrink-0 inline-flex items-center gap-1 text-xs font-semibold text-red-600 hover:text-red-700 bg-white border border-red-200 hover:bg-red-50 rounded-full px-3 py-1.5 transition-colors">
          <Plus className="h-3 w-3" />
          {action}
        </button>
      ) : (
        <span className="shrink-0 text-[11px] text-gray-400 italic">
          Not added
        </span>
      )}
    </div>
  );
}

function EmptyCard({
  title,
  message,
  action,
  isOwn,
}: {
  title: string;
  message: string;
  action: string;
  isOwn: boolean;
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      <h2 className="text-lg font-bold text-gray-900 mb-4">{title}</h2>
      <div className="rounded-xl border-2 border-dashed border-red-200 bg-red-50/40 p-5 flex items-center justify-between gap-4 flex-wrap">
        <p className="text-sm text-gray-600">{message}</p>
        {isOwn && (
          <button className="inline-flex items-center gap-1 text-xs font-semibold text-red-600 hover:text-red-700 bg-white border border-red-200 hover:bg-red-50 rounded-full px-3 py-1.5 transition-colors">
            <Plus className="h-3 w-3" />
            {action}
          </button>
        )}
      </div>
    </div>
  );
}

function EmptyAboutSection({ isOwn }: { isOwn: boolean }) {
  return (
    <div className="space-y-3">
      <EmptyCard
        title="About"
        message="Write a short bio about yourself"
        action="Add bio"
        isOwn={isOwn}
      />
      <EmptyCard
        title="Skills"
        message="Add skills to help people find you"
        action="Add skills"
        isOwn={isOwn}
      />
      <EmptyCard
        title="Education"
        message="Add your education history"
        action="Add education"
        isOwn={isOwn}
      />
    </div>
  );
}

function EmptyPosts({ isOwn }: { isOwn: boolean }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-10 text-center">
      <div className="mx-auto h-12 w-12 rounded-2xl border-2 border-dashed border-red-200 bg-red-50/40 flex items-center justify-center mb-3">
        <MessageSquare className="h-5 w-5 text-red-500" />
      </div>
      <h3 className="text-base font-bold text-gray-900">No posts yet</h3>
      <p className="text-sm text-gray-500 mt-1">
        {isOwn
          ? 'Share your first update with your network.'
          : "This user hasn't posted anything yet."}
      </p>
      {isOwn && (
        <button className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-full hover:bg-blue-700 transition-colors">
          <Plus className="h-3.5 w-3.5" />
          Create post
        </button>
      )}
    </div>
  );
}

function EmptyExperience({ isOwn }: { isOwn: boolean }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8">
      <h2 className="text-lg font-bold text-gray-900 mb-6">Experience</h2>
      <div className="rounded-xl border-2 border-dashed border-red-200 bg-red-50/40 p-10 text-center">
        <div className="mx-auto h-12 w-12 rounded-2xl bg-white border border-red-200 flex items-center justify-center mb-3">
          <Briefcase className="h-5 w-5 text-red-500" />
        </div>
        <h3 className="text-base font-bold text-gray-900">
          No experience added
        </h3>
        <p className="text-sm text-gray-500 mt-1">
          {isOwn
            ? 'Add your work experience to stand out.'
            : "This user hasn't added any experience yet."}
        </p>
        {isOwn && (
          <button className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-full hover:bg-blue-700 transition-colors">
            <Plus className="h-3.5 w-3.5" />
            Add experience
          </button>
        )}
      </div>
    </div>
  );
}

function EmptySidebarCard({
  icon: Icon,
  title,
  message,
  action,
  isOwn,
}: {
  icon: any;
  title: string;
  message: string;
  action?: string;
  isOwn: boolean;
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Icon className="h-4 w-4 text-gray-500" />
          <h2 className="text-sm font-bold text-gray-900">{title}</h2>
        </div>
        {isOwn && <EditIcon label={`Edit ${title}`} />}
      </div>
      <div className="rounded-xl border-2 border-dashed border-red-200 bg-red-50/40 p-4 text-center">
        <p className="text-xs text-gray-600">{message}</p>
        {isOwn && action && (
          <button className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-red-600 hover:text-red-700">
            <Plus className="h-3 w-3" />
            {action}
          </button>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   FULL-VIEW COMPONENTS (isOwn-aware)
   ═══════════════════════════════════════════════ */

function PostsFeed({ isOwn }: { isOwn: boolean }) {
  const posts = [
    {
      time: '2h',
      text: 'Just shipped v2 of the Webhooks system at Stripe. Reduced customer support tickets by 40%. The secret? Idempotency keys done right, retries handled at the queue level, and a proper dead-letter system. Write-up coming soon.',
      likes: 342,
      comments: 48,
      reposts: 24,
    },
    {
      time: '1d',
      text: 'The best code review I ever received was 3 words: "Why not simpler?" I scrapped 200 lines that day. Still one of my favorite engineering lessons.',
      likes: 1284,
      comments: 92,
      reposts: 187,
    },
    {
      time: '3d',
      text: 'Reading through the PostgreSQL internals again. Every time I go back, I learn something new about how MVCC actually works under the hood. Infinite depth in that codebase.',
      likes: 219,
      comments: 31,
      reposts: 12,
    },
  ];

  return (
    <div className="space-y-3">
      {posts.map((post, i) => (
        <article
          key={i}
          className="bg-white rounded-2xl border border-gray-200 p-5 hover:border-gray-300 transition-colors"
        >
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&h=100&q=80"
                  className="object-cover"
                />
                <AvatarFallback className="bg-blue-600 text-white text-sm font-bold">
                  AK
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-semibold text-gray-900">
                  Abdullah Khan
                </p>
                <p className="text-xs text-gray-500">
                  @abdullahkhan · {post.time}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              {/* ⭐ Post edit — own only */}
              {isOwn && <EditIcon label="Edit post" />}
              <button className="text-gray-400 hover:text-gray-600">
                <MoreHorizontal className="h-4 w-4" />
              </button>
            </div>
          </div>

          <p className="text-[15px] text-gray-800 leading-relaxed whitespace-pre-line">
            {post.text}
          </p>

          <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
            <button className="flex items-center gap-2 text-xs text-gray-500 hover:text-blue-600 transition-colors group">
              <ThumbsUp className="h-4 w-4 group-hover:scale-110 transition-transform" />
              <span className="font-medium">{post.likes}</span>
            </button>
            <button className="flex items-center gap-2 text-xs text-gray-500 hover:text-blue-600 transition-colors group">
              <MessageSquare className="h-4 w-4 group-hover:scale-110 transition-transform" />
              <span className="font-medium">{post.comments}</span>
            </button>
            <button className="flex items-center gap-2 text-xs text-gray-500 hover:text-emerald-600 transition-colors group">
              <Repeat2 className="h-4 w-4 group-hover:scale-110 transition-transform" />
              <span className="font-medium">{post.reposts}</span>
            </button>
            <button className="flex items-center gap-2 text-xs text-gray-500 hover:text-blue-600 transition-colors">
              <Send className="h-4 w-4" />
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}

function AboutSection({ isOwn }: { isOwn: boolean }) {
  const skills = [
    'TypeScript',
    'React',
    'Node.js',
    'PostgreSQL',
    'System Design',
    'Rust',
    'Next.js',
    'Tailwind',
    'Distributed Systems',
    'API Design',
  ];

  return (
    <div className="space-y-3">
      {/* Bio */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold text-gray-900">About</h2>
          {isOwn && <EditIcon label="Edit bio" />}
        </div>
        <p className="text-[15px] text-gray-700 leading-relaxed">
          I'm a software engineer focused on payments infrastructure and
          developer tooling. Currently at Stripe, working on APIs that power
          millions of transactions daily. Previously built frontend systems at
          Careem and spent a year at a small fintech startup. I write about
          systems design, PostgreSQL, and pragmatic engineering on my blog.
        </p>
      </div>

      {/* Skills */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">Skills</h2>
          {isOwn && <EditIcon label="Edit skills" />}
        </div>
        <div className="flex flex-wrap gap-2">
          {skills.map(skill => (
            <span
              key={skill}
              className="px-3 py-1.5 bg-gray-50 border border-gray-200 text-gray-700 text-xs font-medium rounded-lg hover:bg-gray-100 hover:border-gray-300 transition-colors cursor-pointer"
            >
              {skill}
            </span>
          ))}
          {isOwn && (
            <button className="inline-flex items-center gap-1 px-3 py-1.5 border border-dashed border-blue-300 text-blue-600 text-xs font-medium rounded-lg hover:bg-blue-50 transition-colors">
              <Plus className="h-3 w-3" />
              Add skill
            </button>
          )}
        </div>
      </div>

      {/* Education */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">Education</h2>
          {isOwn && <EditIcon label="Edit education" />}
        </div>
        <div className="flex items-start gap-4">
          <div className="h-12 w-12 rounded-xl bg-[#1E40AF] flex items-center justify-center text-white font-bold text-lg shrink-0">
            N
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-900">
              National University of Sciences & Technology (NUST)
            </h3>
            <p className="text-sm text-gray-600 mt-0.5">
              BS Computer Science · 2018 – 2022
            </p>
            <p className="text-sm text-gray-700 mt-2 leading-relaxed">
              Graduated with distinction. Focused on distributed systems and
              databases. Final year project: a distributed key-value store built
              in Rust.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ExperienceTab({ isOwn }: { isOwn: boolean }) {
  const experiences = [
    {
      logo: 'S',
      bg: 'bg-[#635BFF]',
      title: 'Software Engineer',
      company: 'Stripe',
      type: 'Full-time',
      dates: 'Jan 2024 – Present · 1 yr',
      location: 'Karachi, Pakistan · Remote',
      current: true,
      description:
        'Building payment infrastructure APIs used by thousands of businesses. Focus areas: idempotency, webhooks, and developer experience for the Payments API. Shipped v2 of the Webhooks system that reduced customer support tickets by 40%.',
    },
    {
      logo: 'C',
      bg: 'bg-[#1DB954]',
      title: 'Software Engineer II',
      company: 'Careem',
      type: 'Full-time',
      dates: 'Jun 2022 – Dec 2023 · 1 yr 7 mos',
      location: 'Lahore, Pakistan',
      description:
        'Led frontend architecture for the Careem Pay consumer app (4M+ MAU). Migrated from Angular to React + TypeScript, improving initial load time by 62%. Mentored 3 junior engineers.',
    },
    {
      logo: 'N',
      bg: 'bg-gray-800',
      title: 'Software Engineering Intern',
      company: 'NayaPay',
      type: 'Internship',
      dates: 'May 2021 – Aug 2021 · 4 mos',
      location: 'Karachi, Pakistan',
      description:
        'Worked on the merchant dashboard team. Built reporting views and integrated Stripe Atlas for international onboarding.',
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-gray-900">Experience</h2>
        {isOwn && (
          <div className="flex items-center gap-1">
            <button className="inline-flex items-center gap-1 rounded-full border border-blue-200 bg-blue-50 hover:bg-blue-100 px-2.5 py-1 text-[11px] font-semibold text-blue-600 transition-colors">
              <Plus className="h-3 w-3" />
              Add
            </button>
            <EditIcon label="Edit experience" />
          </div>
        )}
      </div>

      <div className="relative border-l-2 border-gray-100 ml-4 space-y-8">
        {experiences.map((exp, i) => (
          <div key={i} className="relative pl-8">
            <span
              className={`absolute -left-[11px] top-2 h-5 w-5 rounded-full border-4 border-white ${
                exp.current ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            />
            <div className="flex items-start gap-4">
              <div
                className={`h-11 w-11 shrink-0 rounded-xl ${exp.bg} flex items-center justify-center text-white font-bold text-lg`}
              >
                {exp.logo}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <h3 className="text-base font-bold text-gray-900">
                      {exp.title}
                    </h3>
                    <p className="text-sm text-gray-700 mt-0.5">
                      {exp.company} ·{' '}
                      <span className="text-gray-500 font-normal">
                        {exp.type}
                      </span>
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{exp.dates}</p>
                    <p className="text-xs text-gray-500">{exp.location}</p>
                  </div>
                  {isOwn && (
                    <div className="shrink-0">
                      <EditIcon label="Edit entry" />
                    </div>
                  )}
                </div>
                <p className="text-[14px] text-gray-700 mt-2.5 leading-relaxed">
                  {exp.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProfileViewsCard() {
  const viewers = [
    {
      name: 'Fatima Sheikh',
      avatar:
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&h=100&q=80',
      initials: 'FS',
    },
    {
      name: 'Ali Hassan',
      avatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80',
      initials: 'AH',
    },
    {
      name: 'Priya Patel',
      avatar:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&h=100&q=80',
      initials: 'PP',
    },
    {
      name: 'Sarah Chen',
      avatar:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80',
      initials: 'SC',
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5">
      <div className="flex items-center gap-2 mb-3">
        <Eye className="h-4 w-4 text-blue-600" />
        <h2 className="text-sm font-bold text-gray-900">Profile views</h2>
      </div>
      <p className="text-2xl font-bold text-gray-900">1,284</p>
      <p className="text-xs text-gray-500 mt-0.5">in the last 90 days</p>

      <div className="flex items-center gap-1 mt-4">
        {viewers.map((viewer, i) => (
          <Avatar
            key={i}
            className="h-8 w-8 ring-2 ring-white -ml-2 first:ml-0 hover:z-10 hover:scale-110 transition-transform cursor-pointer"
          >
            <AvatarImage src={viewer.avatar} className="object-cover" />
            <AvatarFallback className="bg-gray-300 text-gray-700 text-[10px] font-semibold">
              {viewer.initials}
            </AvatarFallback>
          </Avatar>
        ))}
        <span className="text-xs text-gray-500 ml-2">+12 others viewed</span>
      </div>
    </div>
  );
}

function IntroCard({ isOwn }: { isOwn: boolean }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-bold text-gray-900">Intro</h2>
        {isOwn && <EditIcon label="Edit intro" />}
      </div>
      <p className="text-sm text-gray-700 leading-relaxed">
        Software engineer building payment infrastructure at Stripe. Writing
        about systems and pragmatism.
      </p>
      <div className="space-y-2.5 mt-4 text-sm">
        <div className="flex items-start gap-2.5 text-gray-600">
          <Briefcase className="h-4 w-4 shrink-0 text-gray-400 mt-0.5" />
          <span>
            Engineer at <strong className="text-gray-900">Stripe</strong>
          </span>
        </div>
        <div className="flex items-start gap-2.5 text-gray-600">
          <GraduationCap className="h-4 w-4 shrink-0 text-gray-400 mt-0.5" />
          <span>
            Studied at <strong className="text-gray-900">NUST Islamabad</strong>
          </span>
        </div>
        <div className="flex items-start gap-2.5 text-gray-600">
          <MapPin className="h-4 w-4 shrink-0 text-gray-400 mt-0.5" />
          Karachi, Pakistan
        </div>
        <div className="flex items-start gap-2.5 text-gray-600">
          <Link2 className="h-4 w-4 shrink-0 text-gray-400 mt-0.5" />
          <span className="text-blue-600 hover:underline cursor-pointer">
            abdullah.dev
          </span>
        </div>
        <div className="flex items-start gap-2.5 text-gray-600">
          <Globe className="h-4 w-4 shrink-0 text-gray-400 mt-0.5" />
          <span>English · Urdu (Native)</span>
        </div>
      </div>
    </div>
  );
}

function LanguagesCard({ isOwn }: { isOwn: boolean }) {
  const languages = [
    { name: 'English', level: 'Native or bilingual', progress: 100 },
    { name: 'Urdu', level: 'Native or bilingual', progress: 100 },
    { name: 'Arabic', level: 'Elementary', progress: 35 },
  ];

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Languages className="h-4 w-4 text-gray-600" />
          <h2 className="text-sm font-bold text-gray-900">Languages</h2>
        </div>
        {isOwn && <EditIcon label="Edit languages" />}
      </div>
      <div className="space-y-3">
        {languages.map(lang => (
          <div key={lang.name}>
            <div className="flex items-center justify-between mb-1">
              <p className="text-sm font-semibold text-gray-900">{lang.name}</p>
              <span className="text-[11px] text-gray-500">{lang.level}</span>
            </div>
            <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 rounded-full transition-all"
                style={{ width: `${lang.progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CertificationsCard({ isOwn }: { isOwn: boolean }) {
  const certs = [
    {
      name: 'AWS Solutions Architect',
      issuer: 'Amazon Web Services',
      year: '2024',
      icon: 'A',
      bg: 'bg-[#FF9900]',
    },
    {
      name: 'Google Cloud Engineer',
      issuer: 'Google Cloud',
      year: '2023',
      icon: 'G',
      bg: 'bg-[#4285F4]',
    },
    {
      name: 'Stripe Certified Developer',
      issuer: 'Stripe',
      year: '2024',
      icon: 'S',
      bg: 'bg-[#635BFF]',
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <BadgeCheck className="h-4 w-4 text-gray-600" />
          <h2 className="text-sm font-bold text-gray-900">Certifications</h2>
        </div>
        {isOwn && <EditIcon label="Edit certifications" />}
      </div>
      <div className="space-y-3">
        {certs.map(cert => (
          <div
            key={cert.name}
            className="flex items-start gap-3 group cursor-pointer"
          >
            <div
              className={`h-9 w-9 shrink-0 rounded-lg ${cert.bg} flex items-center justify-center text-white font-bold text-sm`}
            >
              {cert.icon}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[13px] font-semibold text-gray-900 leading-tight group-hover:text-blue-600 transition-colors">
                {cert.name}
              </p>
              <p className="text-[11px] text-gray-500 mt-0.5">
                {cert.issuer} · {cert.year}
              </p>
            </div>
          </div>
        ))}
      </div>
      <button className="mt-3 w-full flex items-center justify-center gap-1 text-xs font-semibold text-gray-600 hover:text-gray-900 py-2 rounded-lg hover:bg-gray-50 transition-colors">
        Show all
        <ChevronRight className="h-3 w-3" />
      </button>
    </div>
  );
}

function HighlightsCard({ isOwn }: { isOwn: boolean }) {
  const highlights = [
    {
      icon: Award,
      label: 'Open Source',
      description: '12 merged PRs',
      color: 'text-amber-600 bg-amber-50',
    },
    {
      icon: Users,
      label: 'Mentorship',
      description: '4 engineers',
      color: 'text-blue-600 bg-blue-50',
    },
    {
      icon: BookOpen,
      label: 'Articles',
      description: '18 published',
      color: 'text-purple-600 bg-purple-50',
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-bold text-gray-900">Highlights</h2>
        {isOwn && <EditIcon label="Edit highlights" />}
      </div>
      <div className="space-y-3">
        {highlights.map(({ icon: Icon, label, description, color }) => (
          <div key={label} className="flex items-center gap-3">
            <div
              className={`h-9 w-9 rounded-lg ${color} flex items-center justify-center shrink-0`}
            >
              <Icon className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">
                {label}
              </p>
              <p className="text-xs text-gray-500 truncate">{description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SimilarPeopleCard() {
  const people = [
    {
      name: 'Fatima Sheikh',
      title: 'Senior SDE at Microsoft',
      avatar:
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&h=100&q=80',
      initials: 'FS',
    },
    {
      name: 'Ali Hassan',
      title: 'Staff Engineer at Vercel',
      avatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80',
      initials: 'AH',
    },
    {
      name: 'Priya Patel',
      title: 'Product Lead at Figma',
      avatar:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&h=100&q=80',
      initials: 'PP',
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5">
      <h2 className="text-sm font-bold text-gray-900 mb-3">Similar people</h2>
      <div className="space-y-3">
        {people.map(person => (
          <div
            key={person.name}
            className="flex items-start gap-3 group cursor-pointer"
          >
            <Avatar className="h-10 w-10 shrink-0">
              <AvatarImage
                src={person.avatar}
                className="object-cover object-center"
              />
              <AvatarFallback className="bg-gray-300 text-gray-700 text-xs font-semibold">
                {person.initials}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 truncate transition-colors">
                {person.name}
              </p>
              <p className="text-xs text-gray-500 line-clamp-1">
                {person.title}
              </p>
            </div>
            <button className="text-[11px] font-semibold text-blue-600 border border-blue-200 bg-blue-50 hover:bg-blue-100 rounded-full px-2.5 py-1 shrink-0 transition-colors">
              Follow
            </button>
          </div>
        ))}
      </div>
      <button className="mt-3 w-full flex items-center justify-center gap-1 text-xs font-semibold text-gray-600 hover:text-gray-900 py-2 rounded-lg hover:bg-gray-50 transition-colors">
        View all
        <ChevronRight className="h-3 w-3" />
      </button>
    </div>
  );
}
