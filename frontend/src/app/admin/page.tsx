'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { authApi } from '@/lib/api';
import toast from 'react-hot-toast';
import { Lock, Mail, Eye, EyeOff } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
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
      const res = await authApi.login(form);
      if (res.data.user.role !== 'admin') {
        toast.error('Admin access required');
        return;
      }
      localStorage.setItem('johad_token', res.data.token);
      localStorage.setItem('johad_user', JSON.stringify(res.data.user));
      toast.success('Welcome back, Admin!');
      router.push('/admin/dashboard');
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSetupAdmin = async () => {
    try {
      await authApi.setupAdmin();
      toast.success('Admin created! Email: admin@johadwheels.com | Pass: Admin@2024');
    } catch {
      toast.error('Setup failed or admin already exists');
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
            Sign In
          </h2>
          <p className="text-gray-500 text-sm text-center mb-6">
            Access your admin dashboard
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: '#9ca3af' }}>
                Email Address
              </label>
              <div className="relative">
                <Mail
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2"
                  style={{ color: '#4b5563' }}
                />
                <input
                  type="email"
                  required
                  placeholder="admin@johadwheels.com"
                  value={form.email}
                  onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                  className="w-full pl-10 pr-4 py-3 rounded-xl text-white placeholder-gray-600 text-sm focus:outline-none transition-all"
                  style={{ background: '#162030', border: '1px solid #1e2d3d' }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#E8192C';
                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(232,25,44,0.08)';
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
              <label className="block text-sm font-medium mb-1.5" style={{ color: '#9ca3af' }}>
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
                  onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
                  className="w-full pl-10 pr-10 py-3 rounded-xl text-white placeholder-gray-600 text-sm focus:outline-none transition-all"
                  style={{ background: '#162030', border: '1px solid #1e2d3d' }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#E8192C';
                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(232,25,44,0.08)';
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

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl font-bold text-white text-sm transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2 mt-2"
              style={{
                background: 'linear-gradient(135deg, #E8192C, #ff4d5e)',
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(232,25,44,0.4)';
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
            <span className="text-xs" style={{ color: '#4b5563' }}>First time?</span>
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
            Setup Admin Account
          </button>
        </div>

        <p className="text-center text-xs mt-5" style={{ color: '#374151' }}>
          © {new Date().getFullYear()} JOHAD WHEELS. All rights reserved.
        </p>
      </div>
    </div>
  );
}