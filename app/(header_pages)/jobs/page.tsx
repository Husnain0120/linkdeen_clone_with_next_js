'use client';

import {
  ArrowUpRight,
  BadgeCheck,
  Bookmark,
  BookmarkCheck,
  Briefcase,
  Building2,
  ChevronDown,
  ChevronRight,
  Clock,
  DollarSign,
  GraduationCap,
  MapPin,
  Search,
  SlidersHorizontal,
  Sparkles,
  Star,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react';
import { useState } from 'react';

type Job = {
  id: number;
  title: string;
  company: string;
  logo: string;
  logoBg: string;
  location: string;
  type: string;
  level: string;
  posted: string;
  applicants: string;
  salary: string;
  easyApply: boolean;
  promoted?: boolean;
  verified?: boolean;
  match: number;
};

export default function JobsPage() {
  const [savedIds, setSavedIds] = useState<number[]>([2]);

  const jobs: Job[] = [
    {
      id: 1,
      title: 'Senior Software Engineer, Payments',
      company: 'Stripe',
      logo: 'S',
      logoBg: 'bg-gradient-to-br from-[#635BFF] to-[#4B44D1]',
      location: 'Remote · Pakistan',
      type: 'Full-time',
      level: 'Senior',
      posted: '2 hours ago',
      applicants: '34 applicants',
      salary: 'PKR 8M – 12M / yr',
      easyApply: true,
      promoted: true,
      verified: true,
      match: 94,
    },
    {
      id: 2,
      title: 'Staff Frontend Engineer',
      company: 'Vercel',
      logo: 'V',
      logoBg: 'bg-black',
      location: 'Remote · Worldwide',
      type: 'Full-time',
      level: 'Staff',
      posted: '5 hours ago',
      applicants: '128 applicants',
      salary: 'USD 180k – 240k',
      easyApply: false,
      verified: true,
      match: 88,
    },
    {
      id: 3,
      title: 'Backend Engineer (Node.js / Postgres)',
      company: 'Careem',
      logo: 'C',
      logoBg: 'bg-gradient-to-br from-[#1DB954] to-[#159A43]',
      location: 'Lahore, Pakistan',
      type: 'Full-time',
      level: 'Mid',
      posted: '1 day ago',
      applicants: '56 applicants',
      salary: 'PKR 5M – 7M / yr',
      easyApply: true,
      match: 82,
    },
    {
      id: 4,
      title: 'Product Engineer',
      company: 'Figma',
      logo: 'F',
      logoBg: 'bg-gradient-to-br from-[#F24E1E] to-[#D83B0D]',
      location: 'San Francisco · Hybrid',
      type: 'Full-time',
      level: 'Senior',
      posted: '2 days ago',
      applicants: '302 applicants',
      salary: 'USD 200k – 260k',
      easyApply: false,
      verified: true,
      match: 71,
    },
    {
      id: 5,
      title: 'Software Engineer, ML Infrastructure',
      company: 'OpenAI',
      logo: 'O',
      logoBg: 'bg-gradient-to-br from-[#10A37F] to-[#0D8567]',
      location: 'Remote · USA',
      type: 'Full-time',
      level: 'Senior',
      posted: '3 days ago',
      applicants: '210 applicants',
      salary: 'USD 220k – 320k',
      easyApply: false,
      verified: true,
      match: 65,
    },
  ];

  const filters = [
    {
      label: 'Date Posted',
      options: ['Any time', 'Past 24 hours', 'Past week'],
    },
    {
      label: 'Experience Level',
      options: ['Internship', 'Mid-Senior', 'Director'],
    },
    { label: 'Job Type', options: ['Full-time', 'Part-time', 'Contract'] },
  ];

  return (
    // ✅ Removed bg-gray-50 — Transparent to use layout background
    <div className="min-h-screen pt-16 pb-24">
      {/* ═══════════ HEADER / SEARCH BAR ═══════════ */}
      <div className="border-b border-gray-200/80 bg-white/80 backdrop-blur-sm sticky top-14 z-30">
        <div className="max-w-[1120px] mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between gap-4 mb-3">
            <h1 className="text-xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center shadow-md shadow-blue-500/20">
                <Briefcase className="h-4 w-4 text-white" />
              </div>
              Find your next role
            </h1>
            <button className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700">
              My Applications <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Custom Search Bar */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1 group">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
              <input
                type="text"
                placeholder="Job title, company, or keyword"
                defaultValue="Software Engineer"
                className="pl-10 pr-4 py-2.5 w-full rounded-xl border border-gray-200 bg-gray-50/70 text-sm focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-400 transition-all"
              />
            </div>
            <div className="relative sm:w-64 group">
              <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
              <input
                type="text"
                placeholder="City or remote"
                defaultValue="Karachi, PK"
                className="pl-10 pr-4 py-2.5 w-full rounded-xl border border-gray-200 bg-gray-50/70 text-sm focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-400 transition-all"
              />
            </div>
            <button className="px-6 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 shadow-md shadow-blue-500/20 transition-all shrink-0">
              Search
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1120px] mx-auto px-4 sm:px-6 py-6">
        <div className="grid lg:grid-cols-[240px_1fr_280px] gap-6">
          {/* ═══════ LEFT — Filters ═══════ */}
          <aside className="space-y-4">
            <div className="rounded-2xl border border-gray-200/80 bg-white p-4 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold text-gray-900 flex items-center gap-1.5">
                  <SlidersHorizontal className="h-3.5 w-3.5 text-gray-500" />{' '}
                  Filters
                </h2>
                <button className="text-[11px] font-semibold text-blue-600 hover:underline">
                  Reset
                </button>
              </div>

              <div className="space-y-4">
                {filters.map(f => (
                  <div
                    key={f.label}
                    className="border-b border-gray-100 last:border-0 pb-4 last:pb-0"
                  >
                    <button className="flex items-center justify-between w-full text-left mb-2 group">
                      <span className="text-xs font-semibold text-gray-700 group-hover:text-gray-900">
                        {f.label}
                      </span>
                      <ChevronDown className="h-3.5 w-3.5 text-gray-400 group-hover:text-gray-600" />
                    </button>
                    <div className="space-y-2">
                      {f.options.map(o => (
                        <label
                          key={o}
                          className="flex items-center gap-2.5 text-xs text-gray-600 cursor-pointer hover:text-gray-900 group"
                        >
                          <div className="h-4 w-4 rounded border border-gray-300 group-hover:border-blue-500 flex items-center justify-center transition-colors">
                            <input type="checkbox" className="peer sr-only" />
                            <div className="h-2 w-2 rounded-sm bg-blue-600 opacity-0 peer-checked:opacity-100 transition-opacity" />
                          </div>
                          {o}
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Salary Insights Widget */}
            <div className="rounded-2xl border border-emerald-200/60 bg-gradient-to-br from-emerald-50/80 via-white to-white p-4 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-7 w-7 rounded-lg bg-emerald-100 flex items-center justify-center">
                  <TrendingUp className="h-3.5 w-3.5 text-emerald-700" />
                </div>
                <h3 className="text-sm font-semibold text-gray-900">
                  Salary Insights
                </h3>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed mb-3">
                Software Engineers in Karachi earn{' '}
                <strong className="text-gray-900">PKR 6.4M</strong> on average.
              </p>
              <button className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 group">
                View more{' '}
                <ArrowUpRight className="h-3 w-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </aside>

          {/* ═══════ MAIN — Job Cards ═══════ */}
          <main className="space-y-4 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <h2 className="text-base font-semibold text-gray-900 tracking-tight">
                Top picks for you
              </h2>
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full font-medium">
                {jobs.length} jobs
              </span>
            </div>

            {jobs.map(job => {
              const saved = savedIds.includes(job.id);
              return (
                <article
                  key={job.id}
                  className="group relative bg-white rounded-2xl border border-gray-200/80 p-5 hover:border-blue-300 hover:shadow-lg transition-all duration-200"
                >
                  <div className="flex items-start gap-4">
                    {/* Company Logo */}
                    <div
                      className={`h-14 w-14 shrink-0 rounded-xl ${job.logoBg} flex items-center justify-center text-white font-bold text-xl shadow-sm`}
                    >
                      {job.logo}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          {/* Title & Verified */}
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <h3 className="text-base font-semibold text-gray-900 group-hover:text-blue-600 transition-colors cursor-pointer truncate">
                              {job.title}
                            </h3>
                            {job.verified && (
                              <BadgeCheck className="h-4 w-4 text-blue-500 shrink-0" />
                            )}
                          </div>

                          {/* Company & Promoted */}
                          <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
                            <span className="flex items-center gap-1 font-medium">
                              <Building2 className="h-3.5 w-3.5 text-gray-400" />{' '}
                              {job.company}
                            </span>
                            {job.promoted && (
                              <span className="text-[10px] font-semibold text-amber-700 bg-amber-50 border border-amber-200/50 px-1.5 py-0.5 rounded-md">
                                Promoted
                              </span>
                            )}
                          </div>

                          {/* Location & Time */}
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2 text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" /> {job.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" /> {job.posted}
                            </span>
                          </div>
                        </div>

                        {/* Save Button */}
                        <button
                          onClick={() =>
                            setSavedIds(prev =>
                              saved
                                ? prev.filter(id => id !== job.id)
                                : [...prev, job.id]
                            )
                          }
                          className={`p-2 rounded-full transition-colors shrink-0 ${saved ? 'text-blue-600 bg-blue-50' : 'text-gray-400 hover:text-gray-700 hover:bg-gray-100'}`}
                        >
                          {saved ? (
                            <BookmarkCheck className="h-5 w-5" />
                          ) : (
                            <Bookmark className="h-5 w-5" />
                          )}
                        </button>
                      </div>

                      {/* Tags (Type, Level, Salary) */}
                      <div className="flex flex-wrap items-center gap-2 mt-3">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium bg-gray-100/80 text-gray-700 rounded-md border border-gray-200/50">
                          <Briefcase className="h-3 w-3" /> {job.type}
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium bg-gray-100/80 text-gray-700 rounded-md border border-gray-200/50">
                          <GraduationCap className="h-3 w-3" /> {job.level}
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 rounded-md border border-emerald-100">
                          <DollarSign className="h-3 w-3" /> {job.salary}
                        </span>
                      </div>

                      {/* Footer (Applicants, Match, Apply) */}
                      <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          {job.easyApply && (
                            <span className="inline-flex items-center gap-1 font-semibold text-blue-600">
                              <Sparkles className="h-3.5 w-3.5" /> Easy Apply
                            </span>
                          )}
                          <span className="flex items-center gap-1">
                            <Users className="h-3.5 w-3.5" /> {job.applicants}
                          </span>
                        </div>

                        <div className="flex items-center gap-3">
                          {/* Custom Match Score Badge */}
                          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200">
                            <Zap className="h-3 w-3 text-emerald-600 fill-emerald-600" />
                            <span className="text-[11px] font-bold text-emerald-700">
                              {job.match}% Match
                            </span>
                          </div>

                          <button className="px-4 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-full shadow-sm transition-colors">
                            {job.easyApply ? 'Apply Now' : 'View Job'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </main>

          {/* ═══════ RIGHT SIDEBAR ═══════ */}
          <aside className="space-y-4">
            {/* Job Alert Widget */}
            <div className="rounded-2xl border border-gray-200/80 bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-sm">
                  <Star className="h-4 w-4 text-white fill-white" />
                </div>
                <h3 className="text-sm font-semibold text-gray-900">
                  Job Alert
                </h3>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed mb-4">
                Get the latest jobs matched to your profile, delivered daily to
                your inbox.
              </p>
              <button className="w-full py-2 text-xs font-semibold text-gray-700 border border-gray-300 bg-white hover:bg-gray-50 rounded-xl transition-colors">
                Create Job Alert
              </button>
            </div>

            {/* Application Tracker Widget */}
            <div className="rounded-2xl border border-gray-200/80 bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">
                Application Tracker
              </h3>

              <div className="space-y-3">
                {[
                  {
                    label: 'Applied',
                    count: 12,
                    max: 15,
                    color: 'bg-blue-500',
                    textColor: 'text-blue-600',
                  },
                  {
                    label: 'Interviewing',
                    count: 3,
                    max: 15,
                    color: 'bg-amber-500',
                    textColor: 'text-amber-600',
                  },
                  {
                    label: 'Rejected',
                    count: 5,
                    max: 15,
                    color: 'bg-gray-400',
                    textColor: 'text-gray-500',
                  },
                ].map(s => (
                  <div key={s.label}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-medium text-gray-600">
                        {s.label}
                      </span>
                      <span className={`text-xs font-bold ${s.textColor}`}>
                        {s.count}
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${s.color} rounded-full`}
                        style={{ width: `${(s.count / s.max) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <button className="mt-4 w-full flex items-center justify-center gap-1 text-xs font-semibold text-gray-600 hover:text-gray-900 transition-colors">
                View all applications <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Resume Check Widget */}
            <div className="rounded-2xl border border-gray-200/80 bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
              <h3 className="text-sm font-semibold text-gray-900 mb-2">
                Resume Check
              </h3>
              <div className="flex items-center gap-2 mb-3">
                <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                <p className="text-xs text-gray-600 font-medium">
                  Needs attention
                </p>
              </div>
              <p className="text-xs text-gray-500 mb-4 leading-relaxed">
                Your resume is missing{' '}
                <strong className="text-gray-900">2 key skills</strong> required
                for most jobs in your field.
              </p>
              <button className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700">
                Improve resume <ArrowUpRight className="h-3 w-3" />
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
