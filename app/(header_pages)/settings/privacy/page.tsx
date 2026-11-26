'use client';

import {
  Bell,
  Briefcase,
  ChevronRight,
  Download,
  Eye,
  FileText,
  Fingerprint,
  Globe,
  Key,
  Lock,
  LogOut,
  Mail,
  Palette,
  Shield,
  Smartphone,
  Trash2,
  User,
  Users,
} from 'lucide-react';
import { useState } from 'react';

export default function SettingsPrivacyPage() {
  const [activeSection, setActiveSection] = useState('account');
  const [toggles, setToggles] = useState<Record<string, boolean>>({
    publicProfile: true,
    shareEmail: false,
    searchable: true,
    activityBroadcast: true,
    personalizedAds: false,
    allowTagging: true,
  });

  const nav = [
    { id: 'account', label: 'Account preferences', icon: User },
    { id: 'privacy', label: 'Visibility', icon: Eye },
    { id: 'communications', label: 'Communications', icon: Mail },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'advertising', label: 'Advertising', icon: Palette },
    { id: 'security', label: 'Sign-in & security', icon: Lock },
    { id: 'data', label: 'Data privacy', icon: Shield },
  ];

  const toggle = (key: string) =>
    setToggles(prev => ({ ...prev, [key]: !prev[key] }));

  return (
    // ✅ Removed bg-gray-50 — Transparent to use layout background
    <div className="min-h-screen pt-16 pb-24">
      <div className="max-w-[1120px] mx-auto px-4 sm:px-6 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            Settings & Privacy
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage your account preferences, privacy, and security.
          </p>
        </div>

        <div className="grid lg:grid-cols-[280px_1fr] gap-6">
          {/* ═══════ LEFT NAV ═══════ */}
          <aside>
            <div className="bg-white rounded-2xl border border-gray-200/80 p-2 sticky top-20 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
              <nav className="space-y-0.5">
                {nav.map(({ id, label, icon: Icon }) => {
                  const isActive = activeSection === id;
                  return (
                    <button
                      key={id}
                      onClick={() => setActiveSection(id)}
                      className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                        isActive
                          ? 'bg-blue-50 text-blue-700'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      <Icon
                        className={`h-4 w-4 ${
                          isActive ? 'text-blue-600' : 'text-gray-400'
                        }`}
                      />
                      <span className="flex-1 text-left">{label}</span>
                      <ChevronRight
                        className={`h-3.5 w-3.5 ${
                          isActive ? 'text-blue-600' : 'text-gray-300'
                        }`}
                      />
                    </button>
                  );
                })}
              </nav>

              <div className="border-t border-gray-100 mt-2 pt-2 space-y-0.5">
                <button className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors">
                  <LogOut className="h-4 w-4 text-gray-400" />
                  Sign out
                </button>
                <button className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-colors">
                  <Trash2 className="h-4 w-4" />
                  Close account
                </button>
              </div>
            </div>
          </aside>

          {/* ═══════ RIGHT CONTENT ═══════ */}
          <main className="space-y-5 min-w-0">
            {/* ACCOUNT */}
            {activeSection === 'account' && (
              <>
                <SectionCard
                  icon={User}
                  title="Account information"
                  description="Update your basic profile details and contact preferences."
                >
                  <div className="grid sm:grid-cols-2 gap-5">
                    <Field label="Full name" defaultValue="Abdullah Khan" />
                    <Field
                      label="Headline"
                      defaultValue="Software Engineer at Stripe"
                    />
                    <Field
                      label="Email"
                      defaultValue="abdullah@example.com"
                      type="email"
                    />
                    <Field label="Phone" defaultValue="+92 300 1234567" />
                    <Field label="Location" defaultValue="Karachi, Pakistan" />
                    <Field
                      label="Industry"
                      defaultValue="Software Development"
                    />
                  </div>
                </SectionCard>

                <SectionCard
                  icon={Globe}
                  title="Language & region"
                  description="Set the language and region for your experience."
                >
                  <div className="grid sm:grid-cols-2 gap-5">
                    <Select
                      label="Language"
                      value="English (US)"
                      options={[
                        'English (US)',
                        'English (UK)',
                        'اردو',
                        'العربية',
                      ]}
                    />
                    <Select
                      label="Region"
                      value="Pakistan"
                      options={[
                        'Pakistan',
                        'United States',
                        'United Kingdom',
                        'UAE',
                      ]}
                    />
                  </div>
                </SectionCard>

                <SectionCard
                  icon={Briefcase}
                  title="Profile visibility"
                  description="Control who can find and view your profile."
                >
                  <ToggleRow
                    label="Public profile"
                    description="Make your profile visible to people outside the network."
                    checked={toggles.publicProfile}
                    onChange={() => toggle('publicProfile')}
                  />
                  <ToggleRow
                    label="Search engine indexing"
                    description="Allow search engines like Google to index your profile."
                    checked={toggles.searchable}
                    onChange={() => toggle('searchable')}
                  />
                </SectionCard>
              </>
            )}

            {/* PRIVACY */}
            {activeSection === 'privacy' && (
              <>
                <SectionCard
                  icon={Eye}
                  title="Profile viewing options"
                  description="Choose what people see when they view your profile."
                >
                  <div className="space-y-2.5">
                    {[
                      {
                        label: 'Your full name and headline',
                        hint: 'Recommended',
                      },
                      { label: 'Your anonymous member', hint: 'Semi-private' },
                      { label: 'Private (only to you)', hint: 'Fully private' },
                    ].map((opt, i) => (
                      <label
                        key={opt.label}
                        className="flex items-start gap-3 p-3.5 rounded-xl border border-gray-200/80 hover:border-blue-300 hover:bg-blue-50/40 cursor-pointer transition-all group"
                      >
                        <input
                          type="radio"
                          name="viewing"
                          defaultChecked={i === 0}
                          className="mt-0.5 h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">
                            {opt.label}
                          </p>
                          <p className="text-xs text-gray-500 mt-0.5">
                            {opt.hint}
                          </p>
                        </div>
                      </label>
                    ))}
                  </div>
                </SectionCard>

                <SectionCard
                  icon={Users}
                  title="Interactions"
                  description="Manage who can see your activity and connections."
                >
                  <ToggleRow
                    label="Share profile updates"
                    description="Notify your network when you update your profile."
                    checked={toggles.activityBroadcast}
                    onChange={() => toggle('activityBroadcast')}
                  />
                  <ToggleRow
                    label="Allow tagging"
                    description="Let people tag you in posts and comments."
                    checked={toggles.allowTagging}
                    onChange={() => toggle('allowTagging')}
                  />
                  <ToggleRow
                    label="Share email with connections"
                    description="Your email will be visible on your profile."
                    checked={toggles.shareEmail}
                    onChange={() => toggle('shareEmail')}
                  />
                </SectionCard>
              </>
            )}

            {/* COMMUNICATIONS */}
            {activeSection === 'communications' && (
              <SectionCard
                icon={Mail}
                title="Who can reach you"
                description="Control which messages and invitations reach your inbox."
              >
                <div className="space-y-5">
                  <Select
                    label="Who can send you invitations"
                    value="Everyone"
                    options={['Everyone', 'Only people I know', 'No one']}
                  />
                  <Select
                    label="Who can send you messages"
                    value="Connections only"
                    options={['Everyone', 'Connections only', 'No one']}
                  />
                  <div className="pt-2">
                    <ToggleRow
                      label="InMail"
                      description="Allow recruiters to message you even without a connection."
                      checked={true}
                      onChange={() => {}}
                    />
                  </div>
                </div>
              </SectionCard>
            )}

            {/* NOTIFICATIONS */}
            {activeSection === 'notifications' && (
              <SectionCard
                icon={Bell}
                title="Notification preferences"
                description="Choose what updates you want to be notified about."
              >
                <div className="divide-y divide-gray-100">
                  {[
                    ['Connection invitations', true],
                    ['Messages', true],
                    ['Post likes & comments', true],
                    ['Job alerts', true],
                    ['Weekly digest', false],
                    ['Newsletter', false],
                  ].map(([label, def]) => (
                    <ToggleRow
                      key={label as string}
                      label={label as string}
                      checked={!!def}
                      onChange={() => {}}
                    />
                  ))}
                </div>
                <div className="mt-5 flex items-center gap-2 text-xs text-blue-700 bg-blue-50/50 p-3 rounded-xl border border-blue-100">
                  <Smartphone className="h-4 w-4 shrink-0" />
                  Push notifications are enabled on your mobile device.
                </div>
              </SectionCard>
            )}

            {/* ADVERTISING */}
            {activeSection === 'advertising' && (
              <SectionCard
                icon={Palette}
                title="Ad preferences"
                description="Customize the ads you see based on your interests."
              >
                <ToggleRow
                  label="Personalized ads"
                  description="Use your activity to personalize the ads shown to you."
                  checked={toggles.personalizedAds}
                  onChange={() => toggle('personalizedAds')}
                />
                <div className="mt-5 p-4 rounded-xl bg-gray-50 border border-gray-200/80 text-xs text-gray-600 leading-relaxed">
                  <strong className="text-gray-900 block mb-1">
                    Ad topics we use:
                  </strong>
                  Software engineering, Product design, Startups, Cloud
                  computing.
                </div>
              </SectionCard>
            )}

            {/* SIGN-IN & SECURITY */}
            {activeSection === 'security' && (
              <>
                <SectionCard
                  icon={Lock}
                  title="Sign-in & security"
                  description="Protect your account with stronger authentication."
                >
                  <div className="space-y-3">
                    <ActionRow
                      icon={Key}
                      title="Password"
                      subtitle="Last changed 42 days ago"
                      action="Change"
                    />
                    <ActionRow
                      icon={Fingerprint}
                      title="Two-step verification"
                      subtitle="Adds an extra layer of security on login"
                      action="Turn on"
                      badge="Recommended"
                    />
                    <ActionRow
                      icon={Smartphone}
                      title="Two-factor authentication (SMS)"
                      subtitle="+92 •••• 4567"
                      action="Manage"
                    />
                    <ActionRow
                      icon={Mail}
                      title="Recovery email"
                      subtitle="abdullah.backup@example.com"
                      action="Edit"
                    />
                  </div>
                </SectionCard>

                <SectionCard
                  icon={Shield}
                  title="Active sessions"
                  description="Devices currently logged into your account."
                >
                  <div className="space-y-3">
                    {[
                      {
                        device: 'MacBook Pro · Chrome',
                        location: 'Karachi, PK',
                        current: true,
                      },
                      {
                        device: 'iPhone 15 · App',
                        location: 'Karachi, PK',
                        current: false,
                      },
                      {
                        device: 'Windows · Edge',
                        location: 'Lahore, PK',
                        current: false,
                      },
                    ].map(s => (
                      <div
                        key={s.device}
                        className="flex items-center justify-between gap-3 p-4 rounded-xl border border-gray-200/80 bg-white hover:border-gray-300 transition-colors"
                      >
                        <div>
                          <p className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                            {s.device}
                            {s.current && (
                              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-md px-1.5 py-0.5">
                                This device
                              </span>
                            )}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {s.location}
                          </p>
                        </div>
                        {!s.current && (
                          <button className="text-xs font-semibold text-red-600 hover:text-red-700 hover:underline transition-colors">
                            Sign out
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </SectionCard>
              </>
            )}

            {/* DATA PRIVACY */}
            {activeSection === 'data' && (
              <>
                <SectionCard
                  icon={Download}
                  title="Download your data"
                  description="Get a copy of your data and activity."
                >
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                    Request an archive of your profile, connections, posts, and
                    messages.
                  </p>
                  <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 shadow-sm transition-all">
                    <Download className="h-4 w-4" />
                    Request data archive
                  </button>
                </SectionCard>

                <SectionCard
                  icon={FileText}
                  title="Your data on the platform"
                  description="See what data we collect and how we use it."
                >
                  <div className="space-y-2">
                    {[
                      'Activity and usage',
                      'Advertising data',
                      'Third-party integrations',
                      'Retention & deletion',
                    ].map(l => (
                      <button
                        key={l}
                        className="w-full flex items-center justify-between p-3.5 rounded-xl border border-gray-200/80 hover:bg-gray-50 hover:border-gray-300 transition-all group"
                      >
                        <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                          {l}
                        </span>
                        <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-gray-600" />
                      </button>
                    ))}
                  </div>
                </SectionCard>

                <SectionCard
                  icon={Trash2}
                  title="Delete account"
                  description="Permanently delete your account and all data."
                  danger
                >
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                    This action cannot be undone. All your data will be
                    permanently deleted.
                  </p>
                  <button className="inline-flex items-center gap-2 px-5 py-2.5 border border-red-200 bg-red-50 text-red-600 text-sm font-semibold rounded-xl hover:bg-red-100 hover:border-red-300 transition-all">
                    <Trash2 className="h-4 w-4" />
                    Delete my account
                  </button>
                </SectionCard>
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

/* ═══════════ Reusable Components ═══════════ */

function SectionCard({
  icon: Icon,
  title,
  description,
  children,
  danger,
}: {
  icon: any;
  title: string;
  description?: string;
  children: React.ReactNode;
  danger?: boolean;
}) {
  return (
    <section
      className={`bg-white rounded-2xl border ${
        danger ? 'border-red-200/80' : 'border-gray-200/80'
      } p-6 sm:p-7 shadow-[0_1px_2px_rgba(0,0,0,0.04)]`}
    >
      <div className="flex items-start gap-3.5 mb-5">
        <div
          className={`h-10 w-10 shrink-0 rounded-xl flex items-center justify-center ${
            danger
              ? 'bg-red-50 text-red-600'
              : 'bg-gradient-to-br from-blue-50 to-indigo-50 text-blue-600'
          }`}
        >
          <Icon className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <h2 className="text-base font-bold text-gray-900 tracking-tight">
            {title}
          </h2>
          {description && (
            <p className="text-xs text-gray-500 mt-0.5">{description}</p>
          )}
        </div>
      </div>
      {children}
    </section>
  );
}

function Field({
  label,
  defaultValue,
  type = 'text',
}: {
  label: string;
  defaultValue?: string;
  type?: string;
}) {
  return (
    <div>
      <label className="text-xs font-semibold text-gray-700 block mb-1.5">
        {label}
      </label>
      <input
        type={type}
        defaultValue={defaultValue}
        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/50 text-sm text-gray-900 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-400 transition-all"
      />
    </div>
  );
}

function Select({
  label,
  value,
  options,
}: {
  label: string;
  value: string;
  options: string[];
}) {
  return (
    <div>
      <label className="text-xs font-semibold text-gray-700 block mb-1.5">
        {label}
      </label>
      <select
        defaultValue={value}
        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/50 text-sm text-gray-900 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-400 transition-all"
      >
        {options.map(o => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}

function ToggleRow({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description?: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <div className="flex items-start justify-between gap-4 py-3.5 border-b border-gray-100 last:border-0">
      <div className="min-w-0">
        <p className="text-sm font-semibold text-gray-900">{label}</p>
        {description && (
          <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
            {description}
          </p>
        )}
      </div>
      <button
        onClick={onChange}
        className={`relative shrink-0 inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          checked ? 'bg-blue-600' : 'bg-gray-200'
        }`}
        aria-pressed={checked}
      >
        <span
          className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-sm transition-transform ${
            checked ? 'translate-x-5' : 'translate-x-0.5'
          }`}
        />
      </button>
    </div>
  );
}

function ActionRow({
  icon: Icon,
  title,
  subtitle,
  action,
  badge,
}: {
  icon: any;
  title: string;
  subtitle?: string;
  action: string;
  badge?: string;
}) {
  return (
    <div className="flex items-center gap-3.5 p-4 rounded-xl border border-gray-200/80 bg-white hover:border-gray-300 transition-colors">
      <div className="h-10 w-10 rounded-xl bg-gray-50 flex items-center justify-center shrink-0 border border-gray-100">
        <Icon className="h-4 w-4 text-gray-600" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-gray-900 flex items-center gap-2">
          {title}
          {badge && (
            <span className="text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200/60 rounded-md px-1.5 py-0.5">
              {badge}
            </span>
          )}
        </p>
        {subtitle && <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>}
      </div>
      <button className="shrink-0 text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline transition-colors">
        {action}
      </button>
    </div>
  );
}
