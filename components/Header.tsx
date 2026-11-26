'use client';

// ─────────────────────────────────────────────────────────────
// Clerk auth
// ─────────────────────────────────────────────────────────────
import { Show, useClerk, useUser } from '@clerk/nextjs';

// ─────────────────────────────────────────────────────────────
// Icons
// ─────────────────────────────────────────────────────────────
import {
  Bell,
  Briefcase,
  ChevronDown,
  Grid3x3,
  HelpCircle,
  Home,
  LogOut,
  Megaphone,
  MessageSquare,
  MoreHorizontal,
  Plus,
  Search,
  Settings,
  User,
  Users,
} from 'lucide-react';

// ─────────────────────────────────────────────────────────────
// Next.js
// ─────────────────────────────────────────────────────────────
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

// ─────────────────────────────────────────────────────────────
// Toast
// ─────────────────────────────────────────────────────────────
import { toast } from 'sonner';

// ─────────────────────────────────────────────────────────────
// UI components
// ─────────────────────────────────────────────────────────────
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { cn } from '@/lib/utils';

/* ═════════════════════════════════════════════════════════════
   NAV CONFIG
   ═════════════════════════════════════════════════════════════ */
type NavItem = {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href?: string;
  badge?: number;
};

const NAV_ITEMS: NavItem[] = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/network', label: 'Network', icon: Users },
  { href: '/jobs', label: 'Jobs', icon: Briefcase },
  { href: '/messaging', label: 'Messaging', icon: MessageSquare },
  { href: '/notifications', label: 'Notifications', icon: Bell, badge: 16 },
];

function comingSoon(name?: string) {
  toast.info(name ? `${name} is coming soon 🚀` : 'Coming soon 🚀', {
    description: "We're working on it — stay tuned!",
  });
}

/* ═════════════════════════════════════════════════════════════
   AUTH BUTTONS
   ═════════════════════════════════════════════════════════════ */
function AuthButtons({ size = 'sm' }: { size?: 'sm' | 'lg' }) {
  const { openSignIn, openSignUp } = useClerk();
  const sizeClasses =
    size === 'lg' ? 'h-10 px-6 text-sm w-full' : 'h-8 px-4 text-sm';

  return (
    <div
      className={cn(
        'flex items-center gap-2',
        size === 'lg' && 'flex-col w-full'
      )}
    >
      <button
        type="button"
        onClick={() => openSignIn()}
        className={cn(
          sizeClasses,
          'rounded-full font-semibold border border-[#0A66C2]',
          'text-[#0A66C2] bg-white hover:bg-blue-50',
          'transition-colors whitespace-nowrap'
        )}
      >
        Sign in
      </button>
      <button
        type="button"
        onClick={() => openSignUp()}
        className={cn(
          sizeClasses,
          'rounded-full font-semibold border border-[#0A66C2]',
          'bg-[#0A66C2] text-white hover:bg-[#004182]',
          'transition-colors whitespace-nowrap'
        )}
      >
        Join now
      </button>
    </div>
  );
}

/* ═════════════════════════════════════════════════════════════
   DESKTOP NAV ITEM
   ═════════════════════════════════════════════════════════════ */
function DesktopNavItem({ item, active }: { item: NavItem; active: boolean }) {
  const Icon = item.icon;
  const content = (
    <>
      <div className="relative">
        <Icon
          className={cn(
            'h-[22px] w-[22px] transition-colors',
            active ? 'text-black' : 'text-gray-600 group-hover:text-black'
          )}
        />
        {item.badge ? (
          <span className="absolute -top-1.5 -right-2 bg-red-600 text-white text-[10px] font-semibold rounded-full min-w-[16px] h-4 flex items-center justify-center px-1 leading-none">
            {item.badge}
          </span>
        ) : null}
      </div>
      <span
        className={cn(
          'text-[11px] mt-0.5 leading-tight transition-colors',
          active
            ? 'text-black font-medium'
            : 'text-gray-600 group-hover:text-black'
        )}
      >
        {item.label}
      </span>
      {active && (
        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-black" />
      )}
    </>
  );

  const baseClass =
    'group relative flex flex-col items-center justify-center h-full min-w-[80px] px-2 transition-colors';

  if (item.href) {
    return (
      <Link href={item.href} className={baseClass}>
        {content}
      </Link>
    );
  }
  return (
    <button
      type="button"
      onClick={() => comingSoon(item.label)}
      className={baseClass}
    >
      {content}
    </button>
  );
}

/* ═════════════════════════════════════════════════════════════
   MORE MENU
   ═════════════════════════════════════════════════════════════ */
function MoreMenu() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    }
    if (open) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  const items = [
    { label: 'Settings & Privacy', icon: Settings, href: '/settings/privacy' },
    { label: 'Help Center', icon: HelpCircle, href: '/help' },
  ];

  return (
    <div ref={ref} className="relative h-full">
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        className={cn(
          'group flex flex-col items-center justify-center h-full min-w-[80px] px-2 transition-colors',
          open ? 'text-black' : 'text-gray-600 hover:text-black'
        )}
      >
        <Grid3x3 className="h-[22px] w-[22px]" />
        <span className="text-[11px] mt-0.5 flex items-center gap-0.5 leading-tight">
          More{' '}
          <ChevronDown
            className={cn('h-3 w-3 transition-transform', open && 'rotate-180')}
          />
        </span>
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-1 w-60 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-50">
          {items.map(({ label, icon: Icon, href }) => (
            <button
              key={label}
              type="button"
              onClick={() => {
                setOpen(false);
                router.push(href);
              }}
              className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left"
            >
              <Icon className="h-4 w-4 text-gray-500" /> {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ═════════════════════════════════════════════════════════════
   ME DROPDOWN
   ═════════════════════════════════════════════════════════════ */
function MeDropdown() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    }
    if (open) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  if (!user) return null;

  const handleSignOut = async () => {
    setOpen(false);
    try {
      await signOut();
      router.push('/');
    } catch (err) {
      toast.error('Failed to sign out');
    }
  };

  return (
    <div ref={ref} className="relative h-full">
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        className="group flex flex-col items-center justify-center h-full min-w-[64px] px-2 transition-colors"
      >
        <Avatar className="h-6 w-6">
          <AvatarImage src={user.imageUrl} alt={user.firstName ?? 'User'} />
          <AvatarFallback className="bg-gray-300 text-gray-700 text-[10px] font-semibold">
            {user.firstName?.[0]}
            {user.lastName?.[0]}
          </AvatarFallback>
        </Avatar>
        <span className="text-[11px] text-gray-600 group-hover:text-black mt-0.5 flex items-center gap-0.5 leading-tight">
          Me{' '}
          <ChevronDown
            className={cn('h-3 w-3 transition-transform', open && 'rotate-180')}
          />
        </span>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 w-64 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-50">
          <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={user.imageUrl} />
              <AvatarFallback className="bg-gray-300 text-gray-700 text-sm font-semibold">
                {user.firstName?.[0]}
                {user.lastName?.[0]}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">
                {user.firstName} {user.lastName}
              </p>
              <p className="text-xs text-gray-500 truncate">
                @{user.firstName?.toLowerCase()}
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              setOpen(false);
              router.push('/static_profile');
            }}
            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            View profile
          </button>
          <button
            onClick={() => {
              setOpen(false);
              router.push('/settings/privacy');
            }}
            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Settings & Privacy
          </button>
          <button
            onClick={() => {
              setOpen(false);
              router.push('/help');
            }}
            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Help
          </button>
          <div className="border-t border-gray-100 mt-1 pt-1">
            <button
              onClick={handleSignOut}
              className="w-full text-left px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-100"
            >
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ═════════════════════════════════════════════════════════════
   BUSINESS / ADVERTISE MENU
   ═════════════════════════════════════════════════════════════ */
function BusinessMenuItem({
  icon: Icon,
  label,
  withChevron = false,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  withChevron?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={() => comingSoon(label)}
      className="group flex flex-col items-center justify-center h-full min-w-[80px] px-2 text-gray-600 hover:text-black transition-colors"
    >
      <Icon className="h-[22px] w-[22px]" />
      <span className="text-[11px] mt-0.5 flex items-center gap-0.5 leading-tight text-center">
        {label} {withChevron && <ChevronDown className="h-3 w-3" />}
      </span>
    </button>
  );
}

/* ═════════════════════════════════════════════════════════════
   MOBILE NAV LINK
   ═════════════════════════════════════════════════════════════ */
function MobileNavLink({ item, active }: { item: NavItem; active: boolean }) {
  const Icon = item.icon;
  const baseClass = cn(
    'relative flex flex-col items-center justify-center gap-1 p-3 rounded-lg transition-colors',
    active ? 'text-black' : 'text-gray-600 hover:text-black hover:bg-gray-50'
  );

  const inner = (
    <>
      <div className="relative">
        <Icon className="h-6 w-6" />
        {item.badge ? (
          <span className="absolute -top-1.5 -right-2 bg-red-600 text-white text-[9px] font-semibold rounded-full min-w-[14px] h-3.5 flex items-center justify-center px-1 leading-none">
            {item.badge}
          </span>
        ) : null}
      </div>
      <span className="text-[11px] font-medium">{item.label}</span>
    </>
  );

  if (item.href)
    return (
      <Link href={item.href} className={baseClass}>
        {inner}
      </Link>
    );
  return (
    <button
      type="button"
      onClick={() => comingSoon(item.label)}
      className={baseClass}
    >
      {inner}
    </button>
  );
}

/* ═════════════════════════════════════════════════════════════
   HEADER
   ═════════════════════════════════════════════════════════════ */
export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useUser();
  const { signOut } = useClerk();

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push('/');
    } catch (err) {
      toast.error('Failed to sign out');
    }
  };

  return (
    <>
      {/* ═════════════════════════════════════════════════════════
          MOBILE HEADER
          ═════════════════════════════════════════════════════════ */}
      <header className="sticky top-0 z-40 md:hidden bg-white border-b border-gray-200">
        <div className="flex items-center gap-2 px-3 h-14">
          <Link href="/" className="shrink-0" aria-label="Home">
            <div className="w-8 h-8 bg-[#0A66C2] rounded flex items-center justify-center">
              <span className="text-white font-bold text-[15px] tracking-tighter leading-none mt-0.5">
                ni
              </span>
            </div>
          </Link>

          <button
            type="button"
            onClick={() => comingSoon('Search')}
            className="flex-1 flex items-center gap-2 rounded bg-[#EEF3F8] px-3 py-1.5 text-left"
          >
            <Search className="h-4 w-4 text-gray-600 shrink-0" />
            <span className="text-sm text-gray-600 truncate">Search</span>
          </button>

          {/* ✅ UPDATED: Removed redirect, opens the Post Modal via custom event */}
          <Button
            onClick={() => {
              window.dispatchEvent(new Event('open-create-post'));
            }}
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-full text-gray-600 hover:bg-gray-100 hover:text-black shrink-0"
            aria-label="Create new post"
          >
            <Plus className="h-5 w-5" />
          </Button>

          <Drawer>
            <DrawerTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-full text-gray-600 hover:bg-gray-100 hover:text-black shrink-0"
                aria-label="More options"
              >
                <MoreHorizontal className="h-5 w-5" />
              </Button>
            </DrawerTrigger>

            <DrawerContent className="rounded-t-2xl max-h-[85vh] flex flex-col">
              <DrawerHeader className="text-left border-b shrink-0 pb-3">
                <DrawerTitle className="text-base font-semibold">
                  Menu
                </DrawerTitle>
              </DrawerHeader>

              <div className="overflow-y-auto flex-1">
                <Show when="signed-in">
                  <div className="px-4 py-4 border-b flex items-center gap-3 bg-gray-50/50">
                    <Avatar className="h-12 w-12 border-2 border-white shadow-sm">
                      <AvatarImage src={user?.imageUrl} />
                      <AvatarFallback className="bg-[#0A66C2] text-white">
                        {user?.firstName?.[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-gray-900 truncate">
                        {user?.firstName} {user?.lastName}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {user?.primaryEmailAddress?.emailAddress}
                      </p>
                    </div>
                  </div>
                </Show>

                <div className="grid grid-cols-5 gap-1 px-3 py-4 border-b">
                  {NAV_ITEMS.map(item => (
                    <MobileNavLink
                      key={item.label}
                      item={item}
                      active={!!item.href && pathname === item.href}
                    />
                  ))}
                </div>

                <div className="px-3 py-2 space-y-0.5">
                  <Show when="signed-in">
                    <button
                      type="button"
                      onClick={() => router.push('/static_profile')}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-100 text-left text-gray-700"
                    >
                      <User className="h-5 w-5 text-gray-500" />
                      <span className="text-sm font-medium">View Profile</span>
                    </button>
                  </Show>

                  <button
                    type="button"
                    onClick={() => router.push('/settings/privacy')}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-100 text-left text-gray-700"
                  >
                    <Settings className="h-5 w-5 text-gray-500" />
                    <span className="text-sm font-medium">
                      Settings & Privacy
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => router.push('/help')}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-100 text-left text-gray-700"
                  >
                    <HelpCircle className="h-5 w-5 text-gray-500" />
                    <span className="text-sm font-medium">Help Center</span>
                  </button>

                  <Show when="signed-in">
                    <button
                      type="button"
                      onClick={handleSignOut}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-red-50 text-left text-red-600 mt-1 border-t border-gray-100"
                    >
                      <LogOut className="h-5 w-5" />
                      <span className="text-sm font-medium">Sign out</span>
                    </button>
                  </Show>
                </div>
              </div>

              <DrawerFooter className="border-t shrink-0 py-3">
                <Show when="signed-out">
                  <AuthButtons size="lg" />
                </Show>
                <DrawerClose asChild>
                  <Button
                    variant="outline"
                    className="rounded-full w-full mt-2"
                  >
                    Close
                  </Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
      </header>

      {/* ═════════════════════════════════════════════════════════
          DESKTOP HEADER
          ═════════════════════════════════════════════════════════ */}
      <header className="sticky top-0 z-40 hidden md:block bg-white border-b border-gray-200">
        <div className="max-w-[1128px] mx-auto flex items-center gap-2 h-14 px-4">
          <Link href="/" className="shrink-0 mr-1" aria-label="Home">
            <div className="w-8 h-8 bg-[#0A66C2] rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-[15px] tracking-tighter leading-none mt-0.5">
                ni
              </span>
            </div>
          </Link>

          <button
            type="button"
            onClick={() => comingSoon('Search')}
            className="flex items-center gap-2 rounded bg-[#EEF3F8] hover:bg-[#DDE7F1] transition-colors px-3 w-64 h-8 text-left shrink-0"
          >
            <Search className="h-4 w-4 text-gray-600 shrink-0" />
            <span className="text-sm text-gray-600 truncate">Search</span>
          </button>

          <nav className="ml-auto flex items-center h-full">
            {NAV_ITEMS.map(item => (
              <DesktopNavItem
                key={item.label}
                item={item}
                active={!!item.href && pathname === item.href}
              />
            ))}
            <MoreMenu />
          </nav>

          <span className="h-8 w-px bg-gray-200 ml-1" />

          <div className="h-full flex items-center pl-2">
            <Show when={'signed-in'}>
              <MeDropdown />
            </Show>
            <Show when={'signed-out'}>
              <AuthButtons />
            </Show>
          </div>

          <span className="h-8 w-px bg-gray-200 hidden xl:block ml-1" />

          <div className="hidden xl:flex items-center h-full pl-1">
            <BusinessMenuItem icon={Grid3x3} label="For Business" withChevron />
            <BusinessMenuItem icon={Megaphone} label="Advertise" />
          </div>
        </div>
      </header>
    </>
  );
}
