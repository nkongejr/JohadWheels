'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/inventory', label: 'Inventory' },
    { href: '/luxury', label: 'Luxury Cars' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'shadow-lg shadow-black/50'
          : ''
      }`}
      style={{
        background: scrolled
          ? 'rgba(10, 10, 15, 0.98)'
          : 'rgba(10, 10, 15, 0.85)',
        backdropFilter: 'blur(12px)',
      }}
    >
      {/* ── Top bar ── */}
      {/* <div
        style={{
          background: 'linear-gradient(90deg, #c0141f, #E8192C, #c0141f)',
        }}
        className="py-1.5"
      >
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between text-xs text-white font-medium">
          <span className="flex items-center gap-1">
            
            Karatina, Kenya
          </span>
          <div className="flex items-center gap-4">
            <a
              href="tel:0797250555"
              className="flex items-center gap-1 hover:opacity-80 transition-opacity"
            >
              <Phone size={11} />
              0797 250 555
            </a>
            <span className="text-red-300 hidden sm:block">|</span>
            <a
              href="tel:0721424515"
              className="flex items-center gap-1 hover:opacity-80 transition-opacity hidden sm:flex"
            >
              <Phone size={11} />
              0721 424 515
            </a>
            <span className="text-red-300 hidden md:block">|</span>
            <a
              href="mailto:joshmark.ke254@gmail.com"
              className="hover:opacity-80 hidden md:block transition-opacity"
            >
              joshmark.ke254@gmail.com
            </a>
          </div>
        </div>
      </div> */}

      {/* ── Main nav ── */}
      <div
        className="max-w-7xl mx-auto px-4"
        style={{ borderBottom: '1px solid rgba(30,45,61,0.6)' }}
      >
        <div className="flex items-center justify-between h-16">

          {/* ── Logo ── */}
          <Link href="/" className="flex items-center gap-3 group">
            {/* Logo image — place logo.png in /public */}
            <div className="relative w-36 h-12 shrink-0">
              <Image
                src="/logo.jpeg"
                alt="JOHAD WHEELS"
                fill
                className="object-contain object-left"
                priority
              />
            </div>
          </Link>

          {/* ── Desktop Links ── */}
          <div className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium transition-all duration-200 relative group"
                style={{
                  color: pathname === link.href ? '#E8192C' : '#d1d5db',
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = '#E8192C')
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color =
                    pathname === link.href ? '#E8192C' : '#d1d5db')
                }
              >
                {link.label}
                {/* Active underline */}
                <span
                  className="absolute -bottom-0.5 left-0 h-0.5 transition-all duration-200"
                  style={{
                    background: '#E8192C',
                    width: pathname === link.href ? '100%' : '0%',
                  }}
                />
                {/* Hover underline */}
                <span
                  className="absolute -bottom-0.5 left-0 h-0.5 opacity-0 group-hover:opacity-100 group-hover:w-full transition-all duration-200"
                  style={{
                    background: '#E8192C',
                    width: '0%',
                  }}
                />
              </Link>
            ))}
          </div>

          {/* ── CTA Buttons (desktop) ── */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/contact"
              className="text-xs px-5 py-2.5 rounded font-bold text-white transition-all duration-200"
              style={{
                background: 'linear-gradient(135deg, #E8192C, #ff4d5e)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow =
                  '0 6px 20px rgba(232,25,44,0.45)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              Book Test Drive
            </Link>
            {/* <Link
              href="/admin"
              className="text-xs font-medium transition-colors px-3 py-2 rounded"
              style={{ color: '#6b7280' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#E8192C';
                e.currentTarget.style.background = 'rgba(232,25,44,0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#6b7280';
                e.currentTarget.style.background = 'transparent';
              }}
            >
              Admin
            </Link> */}
          </div>

          {/* ── Mobile menu button ── */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden transition-colors p-2 rounded-lg"
            style={{ color: '#d1d5db' }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = '#E8192C')
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = '#d1d5db')
            }
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* ── Mobile Menu ── */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
        style={{
          background: 'rgba(10,10,15,0.99)',
          borderTop: '1px solid #1e2d3d',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
          {/* Mobile logo */}
          <div className="flex items-center gap-3 pb-4 mb-1" style={{ borderBottom: '1px solid #1e2d3d' }}>
            <div className="relative w-32 h-10">
              <Image
                src="/logo.jpeg"
                alt="JOHAD WHEELS"
                fill
                className="object-contain object-left"
              />
            </div>
            <div
              className="text-xs px-2 py-0.5 rounded font-semibold tracking-wide"
              style={{ background: '#1e2d3d', color: '#9ca3af' }}
            >
              PREMIUM CARS. FAIR PRICES.
            </div>
          </div>

          {/* Nav links */}
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="py-3 px-4 rounded-lg text-sm font-medium transition-all flex items-center justify-between"
              style={{
                background:
                  pathname === link.href
                    ? 'rgba(232,25,44,0.1)'
                    : 'transparent',
                color:
                  pathname === link.href ? '#E8192C' : '#d1d5db',
                border:
                  pathname === link.href
                    ? '1px solid rgba(232,25,44,0.2)'
                    : '1px solid transparent',
              }}
            >
              {link.label}
              {pathname === link.href && (
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: '#E8192C' }}
                />
              )}
            </Link>
          ))}

          {/* Mobile CTA buttons */}
          <div
            className="pt-3 mt-1 flex gap-2"
            style={{ borderTop: '1px solid #1e2d3d' }}
          >
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="flex-1 text-center text-sm py-2.5 rounded font-bold text-white transition-all"
              style={{
                background: 'linear-gradient(135deg, #E8192C, #ff4d5e)',
              }}
            >
              Book Test Drive
            </Link>
            {/* <Link
              href="/admin"
              onClick={() => setIsOpen(false)}
              className="px-4 py-2.5 rounded text-sm font-medium transition-colors"
              style={{
                border: '1px solid #1e2d3d',
                color: '#9ca3af',
              }}
            >
              Admin
            </Link> */}
          </div>

          {/* Mobile contact quick links */}
          <div
            className="pt-3 mt-1 grid grid-cols-2 gap-2"
            style={{ borderTop: '1px solid #1e2d3d' }}
          >
            <a
              href="tel:0797250555"
              className="flex items-center gap-2 p-2.5 rounded-lg text-xs font-medium transition-colors"
              style={{
                background: 'rgba(232,25,44,0.08)',
                color: '#ff4d5e',
                border: '1px solid rgba(232,25,44,0.15)',
              }}
            >
              <Phone size={13} />
              0797 250 555
            </a>
            <a
              href="https://wa.me/254797250555"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 p-2.5 rounded-lg text-xs font-medium transition-colors"
              style={{
                background: 'rgba(34,197,94,0.08)',
                color: '#4ade80',
                border: '1px solid rgba(34,197,94,0.15)',
              }}
            >
              <span>💬</span>
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}