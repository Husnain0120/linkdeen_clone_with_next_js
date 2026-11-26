// components/Footer.tsx
import { Github, Globe, Linkedin, Twitter } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  const columns = [
    {
      title: 'Product',
      links: [
        { name: 'Features', href: '/features' },
        { name: 'Pricing', href: '/pricing' },
        { name: 'Changelog', href: '/changelog' },
        { name: 'Roadmap', href: '/roadmap' },
        { name: 'Status', href: '/status' },
      ],
    },
    {
      title: 'Company',
      links: [
        { name: 'About', href: '/about' },
        { name: 'Blog', href: '/blog' },
        { name: 'Careers', href: '/careers' },
        { name: 'Press', href: '/press' },
        { name: 'Contact', href: '/contact' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { name: 'Help Center', href: '/help' },
        { name: 'Developers', href: '/developers' },
        { name: 'Community', href: '/community' },
        { name: 'Guides', href: '/guides' },
        { name: 'API Docs', href: '/docs' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { name: 'Privacy', href: '/privacy' },
        { name: 'Terms', href: '/terms' },
        { name: 'Security', href: '/security' },
        { name: 'Cookies', href: '/cookies' },
        { name: 'Accessibility', href: '/accessibility' },
      ],
    },
  ];

  const socials = [
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: Github, href: 'https://github.com', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  ];

  return (
    <footer className="relative bg-white border-t border-gray-100 overflow-hidden">
      {/* ═══════════ TOP: Brand + Columns ═══════════ */}
      <div className="max-w-[1128px] mx-auto px-4 sm:px-6 pt-16">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 md:gap-6">
          {/* Brand column */}
          <div className="col-span-2 flex flex-col justify-between">
            <div>
              <Link href="/" className="inline-flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center">
                  <span className="text-white font-bold text-base leading-none">
                    R
                  </span>
                </div>
                <span className="text-xl font-bold text-gray-900 tracking-tight">
                  Ranius
                </span>
              </Link>
              <p className="mt-4 text-sm text-gray-500 leading-relaxed max-w-[220px]">
                Share your moments, thoughts, and build meaningful connections.
              </p>
            </div>

            {/* Socials */}
            <div className="flex items-center gap-2 mt-6">
              {socials.map(({ icon: Icon, href, label }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  aria-label={label}
                  className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:text-white hover:bg-blue-600 hover:border-blue-600 transition-all duration-200"
                >
                  <Icon size={15} />
                </Link>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {columns.map(col => (
            <div key={col.title}>
              <h4 className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-4">
                {col.title}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map(link => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-500 hover:text-blue-600 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* ═══════════ GIANT "RANIUS" — blue → white elegant fade ═══════════ */}
      <div className="relative w-full  flex justify-center items-end pt-12 pb-2  select-none pointer-events-none">
        <h1
          className="
            text-[clamp(56px,22vw,240px)]
            font-black leading-none tracking-tighter
            pr-2

            text-transparent bg-clip-text
            bg-gradient-to-b
            from-blue-900
            via-blue-200
            to-white
font-serif
            whitespace-nowrap
          "
          aria-hidden="true"
        >
          R A N I U S
        </h1>
      </div>

      {/* ═══════════ BOTTOM BAR — very last ═══════════ */}
      <div className="border-t border-gray-100">
        <div className="max-w-[1128px] mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Left: Language + Copyright */}
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-900 transition-colors">
              <Globe size={13} />
              English (US)
            </button>
            <span className="text-xs text-gray-400">
              © {new Date().getFullYear()} Ranius Inc.
            </span>
          </div>

          {/* Right: Legal links */}
          <nav className="flex items-center gap-5">
            {['Privacy', 'Terms', 'Sitemap'].map(name => (
              <Link
                key={name}
                href={`/${name.toLowerCase()}`}
                className="text-xs text-gray-500 hover:text-gray-900 transition-colors"
              >
                {name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
