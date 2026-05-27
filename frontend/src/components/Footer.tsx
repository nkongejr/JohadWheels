'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, Facebook, MessageCircle } from 'lucide-react';
import { newsletterApi } from '@/lib/api';
import toast from 'react-hot-toast';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      await newsletterApi.subscribe(email);
      toast.success('Subscribed successfully!');
      setEmail('');
    } catch (err: any) {
      toast.error(
        err?.response?.data?.message || 'Subscription failed. Try again.',
      );
    } finally {
      setLoading(false);
    }
  };

  const quickLinks = [
    { href: '/', label: 'Home' },
    { href: '/inventory', label: 'Inventory' },
    { href: '/luxury', label: 'Featured Cars' },
    { href: '/about', label: 'About Us' },
    { href: '/contact', label: 'Book Test Drive' },
    { href: '/contact', label: 'Contact Us' },
    { href: '/admin', label: 'Admin Portal' },
  ];

  return (
    <footer
      style={{
        background: '#0a0a0f',
        borderTop: '1px solid #1e2d3d',
      }}
    >
      {/* ── Main Footer ── */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* ── Brand ── */}
          <div className="lg:col-span-1">
            {/* Logo */}
            <div className="relative w-40 h-14 mb-5">
              <Image
                src="/logo.jpeg"
                alt="JOHAD WHEELS"
                fill
                className="object-contain object-left"
              />
            </div>

            <p className="text-gray-400 text-sm leading-relaxed mb-5">
              Premium luxury vehicles for discerning Kenyan buyers.
              Fair prices, verified cars, exceptional service.
            </p>

            {/* Tagline badge */}
            <div
              className="inline-block px-3 py-1.5 rounded text-xs font-semibold tracking-wider mb-5"
              style={{
                background: '#1e2d3d',
                color: '#9ca3af',
                border: '1px solid rgba(232,25,44,0.15)',
              }}
            >
              PREMIUM CARS. FAIR PRICES.
            </div>

            {/* Social Links */}
            <div className="flex gap-3">
              <a
                href="https://wa.me/254797250555"
                target="_blank"
                rel="noopener noreferrer"
                title="WhatsApp"
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200"
                style={{ background: '#1e2d3d' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#16a34a';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#1e2d3d';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <MessageCircle size={16} className="text-white" />
              </a>

              <a
                href="https://www.facebook.com/profile.php?id=61590238221238"
                target="_blank"
                rel="noopener noreferrer"
                title="Facebook"
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200"
                style={{ background: '#1e2d3d' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#1d4ed8';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#1e2d3d';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <Facebook size={16} className="text-white" />
              </a>

              <a
                href="https://www.tiktok.com/@johadwheels?fbclid=IwY2xjawR3s7hleHRuA2FlbQIxMQBzcnRjBmFwcF9pZAwzNTA2ODU1MzE3MjgAAR6c4sQvjnlU9W27V__3TlsVSHBfnDvdjAvAHH-knsb6gJKo_6gtTTK48idp9Q_aem_LOxv7C_0MZ3mR_j-4pb-1g"
                target="_blank"
                rel="noopener noreferrer"
                title="TikTok"
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200"
                style={{ background: '#1e2d3d' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#E8192C';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#1e2d3d';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z" />
                </svg>
              </a>
            </div>
          </div>

          {/* ── Quick Links ── */}
          <div>
            <h4
              className="font-bold text-white mb-5 text-sm uppercase tracking-wider pb-3"
              style={{ borderBottom: '1px solid #1e2d3d' }}
            >
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-400 text-sm transition-all duration-200 flex items-center gap-2 group"
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = '#E8192C')
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = '#9ca3af')
                    }
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full shrink-0 transition-colors duration-200"
                      style={{ background: '#1e2d3d' }}
                    />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Contact ── */}
          <div>
            <h4
              className="font-bold text-white mb-5 text-sm uppercase tracking-wider pb-3"
              style={{ borderBottom: '1px solid #1e2d3d' }}
            >
              Contact
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                  style={{ background: 'rgba(232,25,44,0.1)' }}
                >
                  <MapPin size={14} style={{ color: '#E8192C' }} />
                </div>
                <span className="text-gray-400 text-sm pt-1.5">
                  Karatina, Kenya
                </span>
              </li>

              <li className="flex items-start gap-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                  style={{ background: 'rgba(232,25,44,0.1)' }}
                >
                  <Phone size={14} style={{ color: '#E8192C' }} />
                </div>
                <div className="text-sm space-y-1">
                  {[
                    { tel: '07162965855', display: '0716 296 585' },
                    { tel: '0797230565', display: '0797 230 565' },
                    { tel: '0791424616', display: '0791 424 616' },
           ].map((p) => (
                    <a
                      key={p.tel}
                      href={`tel:${p.tel}`}
                      className="block text-gray-400 transition-colors duration-200"
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = '#E8192C')
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = '#9ca3af')
                      }
                    >
                      {p.display}
                    </a>
                  ))}
                </div>
              </li>

              <li className="flex items-start gap-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                  style={{ background: 'rgba(232,25,44,0.1)' }}
                >
                  <Mail size={14} style={{ color: '#E8192C' }} />
                </div>
                <a
                  href="mailto:Johadwheels.co.ke"
                  className="text-gray-400 text-sm pt-1.5 transition-colors duration-200"
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = '#E8192C')
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = '#9ca3af')
                  }
                >
                 Johadwheels.co.ke
                </a>
              </li>
            </ul>
          </div>

          {/* ── Newsletter ── */}
          <div>
            <h4
              className="font-bold text-white mb-5 text-sm uppercase tracking-wider pb-3"
              style={{ borderBottom: '1px solid #1e2d3d' }}
            >
              Newsletter
            </h4>
            <p className="text-gray-400 text-sm mb-4 leading-relaxed">
              Subscribe to get updates on new arrivals and exclusive deals.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="w-full rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none transition-colors"
                style={{
                  background: '#0f1520',
                  border: '1px solid #1e2d3d',
                }}
                onFocus={(e) =>
                  (e.currentTarget.style.borderColor = '#E8192C')
                }
                onBlur={(e) =>
                  (e.currentTarget.style.borderColor = '#1e2d3d')
                }
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full text-sm py-2.5 rounded-lg font-bold text-white transition-all duration-200 disabled:opacity-50"
                style={{
                  background: 'linear-gradient(135deg, #E8192C, #ff4d5e)',
                }}
                onMouseEnter={(e) => {
                  if (!loading) {
                    e.currentTarget.style.boxShadow =
                      '0 6px 20px rgba(232,25,44,0.4)';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                {loading ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/254797250555"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex items-center gap-2 p-3 rounded-lg text-sm font-medium transition-all duration-200"
              style={{
                background: 'rgba(34,197,94,0.08)',
                border: '1px solid rgba(34,197,94,0.2)',
                color: '#4ade80',
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = 'rgba(34,197,94,0.15)')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = 'rgba(34,197,94,0.08)')
              }
            >
              <MessageCircle size={16} />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* ── Divider ── */}
      <div style={{ borderTop: '1px solid #1e2d3d' }}>
        <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-xs" style={{ color: '#4b5563' }}>
            © {new Date().getFullYear()} JOHAD WHEELS. All rights reserved. | Karatina, Kenya
          </p>
          <div className="flex items-center gap-2 text-xs" style={{ color: '#4b5563' }}>
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: '#E8192C' }}
            />
            Premium Cars. Fair Prices.
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: '#E8192C' }}
            />
          </div>
        </div>
      </div>
    </footer>
  );
}