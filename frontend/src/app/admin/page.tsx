'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { authApi } from '@/lib/api';
import toast from 'react-hot-toast';
import { Lock, User, Eye, EyeOff } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('johad_token');
    const user = localStorage.getItem('johad_user');
    if (token && user) {
      try {
        const parsed = JSON.parse(user);
        if (parsed.role === 'admin') router.push('/admin/dashboard');
      } catch {
        localStorage.removeItem('johad_token');
        localStorage.removeItem('johad_user');
      }
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Send username for login
      const res = await authApi.login({
        username: form.username.toLowerCase().trim(),
        password: form.password,
      });

      if (res.data.user.role !== 'admin') {
        toast.error('Admin access required');
        return;
      }

      localStorage.setItem('johad_token', res.data.token);
      localStorage.setItem('johad_user', JSON.stringify(res.data.user));
      toast.success(`Welcome back, ${res.data.user.name}!`);
      router.push('/admin/dashboard');
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  const handleSetupAdmin = async () => {
    try {
      const res = await authApi.setupAdmin();
      toast.success('Admin accounts created! Check console for details.');
      console.table([
        { Name: 'Harrison Muriithi', Username: 'harrison', Password: 'Admin@2026' },
        { Name: 'Dishon Mwathi',     Username: 'dishon',   Password: 'Admin@2026' },
        { Name: 'Joshmark Kivuma',   Username: 'joshmark', Password: 'Admin@2026' },
      ]);
    } catch {
      toast.error('Setup failed or admins already exist');
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{ background: '#0a0a0f' }}
    >
      {/* Background decorations */}
      <div
        className="absolute top-0 left-0 w-96 h-96 rounded-full blur-3xl opacity-10"
        style={{ background: '#E8192C', transform: 'translate(-50%, -50%)' }}
      />
      <div
        className="absolute bottom-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-10"
        style={{ background: '#1e2d3d', transform: 'translate(50%, 50%)' }}
      />

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="relative w-48 h-16 mx-auto mb-4">
            <Image
              src="/logo.jpeg"
              alt="JOHAD WHEELS"
              fill
              className="object-contain"
            />
          </div>
          <div
            className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase"
            style={{
              background: 'rgba(232,25,44,0.1)',
              border: '1px solid rgba(232,25,44,0.3)',
              color: '#E8192C',
            }}
          >
            Admin Portal
          </div>
        </div>

        {/* Card */}
        <div
          className="rounded-2xl p-8 shadow-2xl"
          style={{
            background: '#0f1520',
            border: '1px solid #1e2d3d',
            boxShadow: '0 25px 60px rgba(0,0,0,0.5)',
          }}
        >
          <h2 className="text-xl font-black text-white mb-1 text-center">
            Admin Sign In
          </h2>
          <p className="text-gray-500 text-sm text-center mb-6">
            Use your username and password
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Username */}
            <div>
              <label
                className="block text-sm font-medium mb-1.5"
                style={{ color: '#9ca3af' }}
              >
                Username
              </label>
              <div className="relative">
                <User
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2"
                  style={{ color: '#4b5563' }}
                />
                <input
                  type="text"
                  required
                  placeholder="e.g. harrison"
                  value={form.username}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, username: e.target.value }))
                  }
                  className="w-full pl-10 pr-4 py-3 rounded-xl text-white
                             placeholder-gray-600 text-sm focus:outline-none transition-all"
                  style={{ background: '#162030', border: '1px solid #1e2d3d' }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#E8192C';
                    e.currentTarget.style.boxShadow =
                      '0 0 0 3px rgba(232,25,44,0.08)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = '#1e2d3d';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                className="block text-sm font-medium mb-1.5"
                style={{ color: '#9ca3af' }}
              >
                Password
              </label>
              <div className="relative">
                <Lock
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2"
                  style={{ color: '#4b5563' }}
                />
                <input
                  type={showPass ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={form.password}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, password: e.target.value }))
                  }
                  className="w-full pl-10 pr-10 py-3 rounded-xl text-white
                             placeholder-gray-600 text-sm focus:outline-none transition-all"
                  style={{ background: '#162030', border: '1px solid #1e2d3d' }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#E8192C';
                    e.currentTarget.style.boxShadow =
                      '0 0 0 3px rgba(232,25,44,0.08)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = '#1e2d3d';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2"
                  style={{ color: '#4b5563' }}
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Admin hint box
            <div
              className="rounded-xl p-3 text-xs space-y-1"
              style={{
                background: 'rgba(232,25,44,0.05)',
                border: '1px solid rgba(232,25,44,0.15)',
              }}
            >
              <p className="font-semibold" style={{ color: '#E8192C' }}>
                Admin Usernames:
              </p>
              {[
                { name: 'Harrison Muriithi', user: 'harrison' },
                { name: 'Dishon Mwathi',     user: 'dishon'   },
                { name: 'Joshmark Kivuma',   user: 'joshmark' },
              ].map((a) => (
                <div
                  key={a.user}
                  className="flex justify-between"
                  style={{ color: '#6b7280' }}
                >
                  <span>{a.name}</span>
                  <button
                    type="button"
                    onClick={() =>
                      setForm((p) => ({ ...p, username: a.user }))
                    }
                    className="font-mono font-bold hover:underline"
                    style={{ color: '#E8192C' }}
                  >
                    {a.user}
                  </button>
                </div>
              ))}
            </div> */}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl font-bold text-white text-sm
                         transition-all duration-200 disabled:opacity-50
                         flex items-center justify-center gap-2 mt-2"
              style={{
                background: 'linear-gradient(135deg, #E8192C, #ff4d5e)',
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.currentTarget.style.boxShadow =
                    '0 8px 25px rgba(232,25,44,0.4)';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing In...
                </>
              ) : (
                'Sign In to Dashboard'
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px" style={{ background: '#1e2d3d' }} />
            <span className="text-xs" style={{ color: '#4b5563' }}>
              First time setup?
            </span>
            <div className="flex-1 h-px" style={{ background: '#1e2d3d' }} />
          </div>

          {/* Setup */}
          <button
            onClick={handleSetupAdmin}
            className="w-full py-3 rounded-xl font-semibold text-sm transition-all duration-200"
            style={{
              border: '1px solid rgba(232,25,44,0.3)',
              color: '#E8192C',
              background: 'transparent',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(232,25,44,0.08)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
            }}
          >
            Setup Admin Accounts
          </button>
        </div>

        <p
          className="text-center text-xs mt-5"
          style={{ color: '#374151' }}
        >
          © {new Date().getFullYear()} JOHAD WHEELS. All rights reserved.
        </p>
      </div>
    </div>
  );
}