'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  LayoutDashboard,
  Car,
  MessageSquare,
  Users,
  Mail,
  LogOut,
  Menu,
  X,
  ChevronRight,
  Bell,
  Settings,
  Shield,
  User,
} from 'lucide-react';

const navItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/cars', label: 'Manage Cars', icon: Car },
  { href: '/admin/inquiries', label: 'Inquiries', icon: MessageSquare },
  { href: '/admin/testimonials', label: 'Testimonials', icon: Users },
  { href: '/admin/newsletter', label: 'Newsletter', icon: Mail },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('johad_token');
    const userData = localStorage.getItem('johad_user');
    if (!token || !userData) {
      router.push('/admin');
      return;
    }
    try {
      const parsed = JSON.parse(userData);
      if (parsed.role !== 'admin') {
        router.push('/admin');
        return;
      }
      setUser(parsed);
    } catch {
      router.push('/admin');
    }
  }, []);

  // Close profile menu on outside click
  useEffect(() => {
    const close = () => setShowProfileMenu(false);
    if (showProfileMenu) {
      document.addEventListener('click', close);
      return () => document.removeEventListener('click', close);
    }
  }, [showProfileMenu]);

  const handleLogout = () => {
    localStorage.removeItem('johad_token');
    localStorage.removeItem('johad_user');
    router.push('/admin');
  };

  if (pathname === '/admin') return <>{children}</>;

  return (
    <div className="min-h-screen flex" style={{ background: '#0a0a0f' }}>
      {/* ── Sidebar overlay (mobile) ── */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── Sidebar ── */}
      <aside
        className={`fixed top-0 left-0 h-full z-50 w-64 flex flex-col transition-transform duration-300 lg:translate-x-0 lg:static lg:z-auto ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{
          background: '#0f1520',
          borderRight: '1px solid #1e2d3d',
        }}
      >
        {/* Logo */}
        <div
          className="p-5 flex items-center justify-between"
          style={{ borderBottom: '1px solid #1e2d3d' }}
        >
          <div className="relative w-32 h-10">
            <Image
              src="/logo.jpeg"
              alt="JOHAD WHEELS"
              fill
              className="object-contain object-left"
            />
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-400 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        {/* Admin badge */}
        <div className="px-4 py-3">
          <div
            className="flex items-center gap-3 p-3 rounded-xl"
            style={{
              background: 'rgba(232,25,44,0.08)',
              border: '1px solid rgba(232,25,44,0.15)',
            }}
          >
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center font-black text-sm text-white shrink-0"
              style={{
                background: 'linear-gradient(135deg, #E8192C, #ff4d5e)',
              }}
            >
              {user?.name?.charAt(0) || 'A'}
            </div>
            <div className="overflow-hidden">
              <div className="text-white text-sm font-bold truncate">
                {user?.name || 'Admin'}
              </div>
              <div className="flex items-center gap-1 text-xs" style={{ color: '#E8192C' }}>
                <Shield size={10} />
                Administrator
              </div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
          <p
            className="text-xs font-semibold uppercase tracking-wider px-3 mb-3"
            style={{ color: '#4b5563' }}
          >
            Main Menu
          </p>
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group"
                style={{
                  background: active
                    ? 'rgba(232,25,44,0.12)'
                    : 'transparent',
                  color: active ? '#E8192C' : '#9ca3af',
                  border: active
                    ? '1px solid rgba(232,25,44,0.2)'
                    : '1px solid transparent',
                }}
              >
                <Icon size={18} />
                <span className="flex-1">{item.label}</span>
                {active && <ChevronRight size={14} />}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-3" style={{ borderTop: '1px solid #1e2d3d' }}>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 text-gray-400 hover:text-red-400"
            style={{ border: '1px solid transparent' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(232,25,44,0.08)';
              e.currentTarget.style.border =
                '1px solid rgba(232,25,44,0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.border = '1px solid transparent';
            }}
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* ── Main content ── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header
          className="h-16 flex items-center justify-between px-4 md:px-6 shrink-0"
          style={{
            background: '#0f1520',
            borderBottom: '1px solid #1e2d3d',
          }}
        >
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-gray-400 hover:text-white"
          >
            <Menu size={22} />
          </button>

          <div className="hidden lg:block">
            <h1 className="text-white font-bold text-lg">
              {navItems.find((n) => n.href === pathname)?.label || 'Admin'}
            </h1>
          </div>

          <div className="flex items-center gap-3 ml-auto">
            {/* Notifications */}
            <button
              className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors relative"
              style={{
                background: '#162030',
                border: '1px solid #1e2d3d',
              }}
            >
              <Bell size={16} style={{ color: '#9ca3af' }} />
              <span
                className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full"
                style={{ background: '#E8192C' }}
              />
            </button>

            {/* View Site */}
            <Link
              href="/"
              className="text-xs font-medium px-3 py-2 rounded-lg transition-colors"
              style={{
                background: '#162030',
                color: '#9ca3af',
                border: '1px solid #1e2d3d',
              }}
            >
              View Site
            </Link>

            {/* ── Admin Profile Icon (NEW) ── */}
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowProfileMenu(!showProfileMenu);
                }}
                className="flex items-center gap-2 px-2 py-1.5 rounded-xl transition-all duration-200"
                style={{
                  background: showProfileMenu
                    ? 'rgba(232,25,44,0.1)'
                    : '#162030',
                  border: showProfileMenu
                    ? '1px solid rgba(232,25,44,0.25)'
                    : '1px solid #1e2d3d',
                }}
              >
                {/* Avatar */}
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs text-white shrink-0"
                  style={{
                    background: 'linear-gradient(135deg, #E8192C, #ff4d5e)',
                  }}
                >
                  {user?.name?.charAt(0) || 'A'}
                </div>

                {/* Name (hidden on mobile) */}
                <div className="hidden md:block text-left">
                  <div className="text-white text-xs font-bold leading-tight truncate max-w-[100px]">
                    {user?.name || 'Admin'}
                  </div>
                  <div
                    className="text-xs leading-tight flex items-center gap-1"
                    style={{ color: '#E8192C' }}
                  >
                    <Shield size={8} />
                    Admin
                  </div>
                </div>

                <ChevronRight
                  size={14}
                  style={{
                    color: '#6b7280',
                    transform: showProfileMenu
                      ? 'rotate(90deg)'
                      : 'rotate(0deg)',
                    transition: 'transform 0.2s',
                  }}
                />
              </button>

              {/* ── Profile Dropdown ── */}
              {showProfileMenu && (
                <div
                  className="absolute right-0 top-full mt-2 w-64 rounded-xl shadow-2xl overflow-hidden z-50"
                  style={{
                    background: '#0f1520',
                    border: '1px solid #1e2d3d',
                    boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Profile Header */}
                  <div
                    className="p-4"
                    style={{ borderBottom: '1px solid #1e2d3d' }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center font-black text-lg text-white shrink-0"
                        style={{
                          background:
                            'linear-gradient(135deg, #E8192C, #ff4d5e)',
                          boxShadow: '0 4px 12px rgba(232,25,44,0.3)',
                        }}
                      >
                        {user?.name?.charAt(0) || 'A'}
                      </div>
                      <div className="min-w-0">
                        <div className="text-white font-bold text-sm truncate">
                          {user?.name || 'Admin'}
                        </div>
                        <div className="text-xs truncate" style={{ color: '#6b7280' }}>
                          {user?.email || user?.username || 'admin'}
                        </div>
                        <div
                          className="flex items-center gap-1 mt-1 text-xs font-semibold"
                          style={{ color: '#E8192C' }}
                        >
                          <Shield size={10} />
                          Administrator
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="p-2">
                    <Link
                      href="/admin/dashboard"
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all"
                      style={{ color: '#9ca3af' }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#162030';
                        e.currentTarget.style.color = '#ffffff';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.color = '#9ca3af';
                      }}
                    >
                      <LayoutDashboard size={16} />
                      Dashboard
                    </Link>

                    <Link
                      href="/admin/settings"
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all"
                      style={{ color: '#9ca3af' }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#162030';
                        e.currentTarget.style.color = '#ffffff';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.color = '#9ca3af';
                      }}
                    >
                      <Settings size={16} />
                      Settings
                    </Link>

                    <Link
                      href="/"
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all"
                      style={{ color: '#9ca3af' }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#162030';
                        e.currentTarget.style.color = '#ffffff';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.color = '#9ca3af';
                      }}
                    >
                      <User size={16} />
                      View Website
                    </Link>
                  </div>

                  {/* Logout */}
                  <div className="p-2" style={{ borderTop: '1px solid #1e2d3d' }}>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all"
                      style={{ color: '#9ca3af' }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(232,25,44,0.08)';
                        e.currentTarget.style.color = '#E8192C';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.color = '#9ca3af';
                      }}
                    >
                      <LogOut size={16} />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}