'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Car, MessageSquare, TrendingUp, Users,
  Plus, Eye, ArrowRight, Activity,
} from 'lucide-react';
import { carsApi, contactApi, statsApi } from '@/lib/api';

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalCars: 0, featuredCars: 0, totalInquiries: 0, newInquiries: 0,
  });
  const [recentCars, setRecentCars] = useState<any[]>([]);
  const [recentInquiries, setRecentInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [carsRes, inquiriesRes] = await Promise.all([
          carsApi.getAll({ limit: 5 }),
          contactApi.getAll(),
        ]);
        const cars = carsRes.data?.cars || carsRes.data || [];
        const inquiries = inquiriesRes.data || [];
        setRecentCars(cars.slice(0, 5));
        setRecentInquiries(inquiries.slice(0, 5));
        setStats({
          totalCars: carsRes.data?.total || cars.length,
          featuredCars: cars.filter((c: any) => c.isFeatured).length,
          totalInquiries: inquiries.length,
          newInquiries: inquiries.filter((i: any) => i.status === 'new').length,
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const statCards = [
    {
      label: 'Total Cars',
      value: stats.totalCars,
      icon: Car,
      href: '/admin/cars',
      color: '#E8192C',
    },
    {
      label: 'Featured Cars',
      value: stats.featuredCars,
      icon: TrendingUp,
      href: '/admin/cars',
      color: '#3b82f6',
    },
    {
      label: 'Total Inquiries',
      value: stats.totalInquiries,
      icon: MessageSquare,
      href: '/admin/inquiries',
      color: '#10b981',
    },
    {
      label: 'New Inquiries',
      value: stats.newInquiries,
      icon: Activity,
      href: '/admin/inquiries',
      color: '#f59e0b',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white">Dashboard</h1>
          <p style={{ color: '#6b7280' }} className="text-sm mt-0.5">
            Welcome back — here&apos;s what&apos;s happening
          </p>
        </div>
        <Link
          href="/admin/cars/new"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white transition-all"
          style={{ background: 'linear-gradient(135deg, #E8192C, #ff4d5e)' }}
        >
          <Plus size={16} />
          Add Car
        </Link>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((s) => {
          const Icon = s.icon;
          return (
            <Link
              key={s.label}
              href={s.href}
              className="p-5 rounded-2xl transition-all duration-200 hover:-translate-y-0.5 block"
              style={{ background: '#0f1520', border: '1px solid #1e2d3d' }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = s.color + '40';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = '#1e2d3d';
              }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                style={{ background: s.color + '18' }}
              >
                <Icon size={20} style={{ color: s.color }} />
              </div>
              <div className="text-2xl font-black text-white mb-0.5">
                {loading ? '—' : s.value}
              </div>
              <div className="text-xs font-medium" style={{ color: '#6b7280' }}>
                {s.label}
              </div>
            </Link>
          );
        })}
      </div>

      {/* Two columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Cars */}
        <div
          className="rounded-2xl p-5"
          style={{ background: '#0f1520', border: '1px solid #1e2d3d' }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-white">Recent Cars</h3>
            <Link
              href="/admin/cars"
              className="text-xs flex items-center gap-1 transition-colors"
              style={{ color: '#E8192C' }}
            >
              View all <ArrowRight size={12} />
            </Link>
          </div>
          <div className="space-y-3">
            {loading ? (
              [...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="h-12 rounded-xl animate-pulse"
                  style={{ background: '#162030' }}
                />
              ))
            ) : recentCars.length === 0 ? (
              <div className="text-center py-8" style={{ color: '#4b5563' }}>
                <Car size={32} className="mx-auto mb-2 opacity-30" />
                <p className="text-sm">No cars yet</p>
              </div>
            ) : (
              recentCars.map((car) => (
                <div
                  key={car._id}
                  className="flex items-center justify-between p-3 rounded-xl"
                  style={{ background: '#162030' }}
                >
                  <div>
                    <div className="text-white text-sm font-semibold">
                      {car.brand} {car.model}
                    </div>
                    <div className="text-xs" style={{ color: '#6b7280' }}>
                      {car.year} · {car.condition}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className="text-xs font-bold px-2 py-0.5 rounded"
                      style={{ background: 'rgba(232,25,44,0.1)', color: '#E8192C' }}
                    >
                      KES {(car.price / 1000000).toFixed(1)}M
                    </span>
                    <Link href={`/admin/cars/${car._id}/edit`}>
                      <Eye size={14} style={{ color: '#6b7280' }} />
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Inquiries */}
        <div
          className="rounded-2xl p-5"
          style={{ background: '#0f1520', border: '1px solid #1e2d3d' }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-white">Recent Inquiries</h3>
            <Link
              href="/admin/inquiries"
              className="text-xs flex items-center gap-1"
              style={{ color: '#E8192C' }}
            >
              View all <ArrowRight size={12} />
            </Link>
          </div>
          <div className="space-y-3">
            {loading ? (
              [...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="h-12 rounded-xl animate-pulse"
                  style={{ background: '#162030' }}
                />
              ))
            ) : recentInquiries.length === 0 ? (
              <div className="text-center py-8" style={{ color: '#4b5563' }}>
                <MessageSquare size={32} className="mx-auto mb-2 opacity-30" />
                <p className="text-sm">No inquiries yet</p>
              </div>
            ) : (
              recentInquiries.map((inq) => (
                <div
                  key={inq._id}
                  className="flex items-center justify-between p-3 rounded-xl"
                  style={{ background: '#162030' }}
                >
                  <div>
                    <div className="text-white text-sm font-semibold">
                      {inq.name}
                    </div>
                    <div className="text-xs truncate max-w-[180px]" style={{ color: '#6b7280' }}>
                      {inq.subject || inq.message?.slice(0, 40)}
                    </div>
                  </div>
                  <span
                    className="text-xs font-bold px-2 py-0.5 rounded shrink-0"
                    style={
                      inq.status === 'new'
                        ? { background: 'rgba(232,25,44,0.1)', color: '#E8192C' }
                        : { background: 'rgba(16,185,129,0.1)', color: '#10b981' }
                    }
                  >
                    {inq.status || 'new'}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div
        className="rounded-2xl p-5"
        style={{ background: '#0f1520', border: '1px solid #1e2d3d' }}
      >
        <h3 className="font-bold text-white mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: 'Add New Car', href: '/admin/cars/new', icon: Plus, color: '#E8192C' },
            { label: 'View Inventory', href: '/admin/cars', icon: Car, color: '#3b82f6' },
            { label: 'Check Inquiries', href: '/admin/inquiries', icon: MessageSquare, color: '#10b981' },
            { label: 'View Site', href: '/', icon: Eye, color: '#f59e0b' },
          ].map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.label}
                href={action.href}
                className="flex flex-col items-center gap-2 p-4 rounded-xl text-center transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  background: '#162030',
                  border: '1px solid #1e2d3d',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = action.color + '40';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = '#1e2d3d';
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: action.color + '18' }}
                >
                  <Icon size={18} style={{ color: action.color }} />
                </div>
                <span className="text-xs font-semibold text-white">{action.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}