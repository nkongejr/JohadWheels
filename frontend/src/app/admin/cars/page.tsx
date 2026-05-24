'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Plus, Search, Edit, Trash2, Star, Gem, Filter } from 'lucide-react';
import { carsApi } from '@/lib/api';
import toast from 'react-hot-toast';
import { formatPrice } from '@/lib/utils';

export default function AdminCarsPage() {
  const [cars, setCars] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [deleting, setDeleting] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      const res = await carsApi.getAll({ limit: 100 });
      setCars(res.data?.cars || res.data || []);
    } catch {
      toast.error('Failed to load cars');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this car?')) return;
    setDeleting(id);
    try {
      await carsApi.delete(id);
      toast.success('Car deleted');
      setCars((prev) => prev.filter((c) => c._id !== id));
    } catch {
      toast.error('Failed to delete');
    } finally {
      setDeleting(null);
    }
  };

  const filtered = cars.filter((c) => {
    const matchSearch =
      !search ||
      `${c.brand} ${c.model}`.toLowerCase().includes(search.toLowerCase());
    const matchFilter =
      filter === 'all' ||
      (filter === 'featured' && c.isFeatured) ||
      (filter === 'luxury' && c.isLuxury) ||
      (filter === 'new' && c.condition === 'New') ||
      (filter === 'used' && c.condition !== 'New');
    return matchSearch && matchFilter;
  });

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white">Manage Cars</h1>
          <p style={{ color: '#6b7280' }} className="text-sm">
            {cars.length} vehicles in inventory
          </p>
        </div>
        <Link
          href="/admin/cars/new"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white"
          style={{ background: 'linear-gradient(135deg, #E8192C, #ff4d5e)' }}
        >
          <Plus size={16} />
          Add Car
        </Link>
      </div>

      {/* Filters */}
      <div
        className="p-4 rounded-2xl flex flex-col sm:flex-row gap-3"
        style={{ background: '#0f1520', border: '1px solid #1e2d3d' }}
      >
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search cars..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl text-white text-sm focus:outline-none"
            style={{ background: '#162030', border: '1px solid #1e2d3d' }}
            onFocus={(e) => (e.currentTarget.style.borderColor = '#E8192C')}
            onBlur={(e) => (e.currentTarget.style.borderColor = '#1e2d3d')}
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {['all', 'featured', 'luxury', 'new', 'used'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="px-3 py-2 rounded-lg text-xs font-semibold capitalize transition-all"
              style={
                filter === f
                  ? { background: '#E8192C', color: '#fff' }
                  : { background: '#162030', color: '#9ca3af', border: '1px solid #1e2d3d' }
              }
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Cars Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-64 rounded-2xl animate-pulse"
              style={{ background: '#0f1520' }}
            />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div
          className="rounded-2xl p-16 text-center"
          style={{ background: '#0f1520', border: '1px solid #1e2d3d' }}
        >
          <Filter size={40} className="mx-auto mb-3 opacity-20 text-white" />
          <p className="text-white font-bold mb-1">No cars found</p>
          <p style={{ color: '#6b7280' }} className="text-sm">
            Try adjusting your search or filters
          </p>
          <Link
            href="/admin/cars/new"
            className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-lg text-sm font-bold text-white"
            style={{ background: '#E8192C' }}
          >
            <Plus size={14} /> Add First Car
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((car) => (
            <div
              key={car._id}
              className="rounded-2xl overflow-hidden transition-all duration-200"
              style={{ background: '#0f1520', border: '1px solid #1e2d3d' }}
            >
              {/* Image */}
              <div className="relative h-44" style={{ background: '#162030' }}>
                {car.images?.[0] ? (
                  <Image
                    src={car.images[0]}
                    alt={`${car.brand} ${car.model}`}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span style={{ color: '#1e2d3d', fontSize: 48 }}>🚗</span>
                  </div>
                )}
                {/* Badges */}
                <div className="absolute top-2 left-2 flex gap-1">
                  {car.isFeatured && (
                    <span
                      className="text-xs font-bold px-2 py-0.5 rounded flex items-center gap-1"
                      style={{ background: '#E8192C', color: '#fff' }}
                    >
                      <Star size={10} /> Featured
                    </span>
                  )}
                  {car.isLuxury && (
                    <span
                      className="text-xs font-bold px-2 py-0.5 rounded flex items-center gap-1"
                      style={{ background: '#1e2d3d', color: '#fff', border: '1px solid rgba(232,25,44,0.3)' }}
                    >
                      <Gem size={10} /> Luxury
                    </span>
                  )}
                </div>
                <div className="absolute top-2 right-2">
                  <span
                    className="text-xs font-bold px-2 py-0.5 rounded"
                    style={
                      car.condition === 'New'
                        ? { background: '#16a34a', color: '#fff' }
                        : { background: '#1e2d3d', color: '#9ca3af' }
                    }
                  >
                    {car.condition}
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-1">
                  <div>
                    <h3 className="font-bold text-white">
                      {car.brand} <span style={{ color: '#E8192C' }}>{car.model}</span>
                    </h3>
                    <p className="text-xs" style={{ color: '#6b7280' }}>
                      {car.year} · {car.type} · {car.transmission}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="font-black text-sm" style={{ color: '#E8192C' }}>
                      {formatPrice(car.price)}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div
                  className="flex gap-2 mt-3 pt-3"
                  style={{ borderTop: '1px solid #1e2d3d' }}
                >
                  <Link
                    href={`/admin/cars/${car._id}/edit`}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-bold transition-all"
                    style={{
                      background: 'rgba(232,25,44,0.1)',
                      color: '#E8192C',
                      border: '1px solid rgba(232,25,44,0.2)',
                    }}
                  >
                    <Edit size={13} /> Edit
                  </Link>
                  <Link
                    href={`/cars/${car._id}`}
                    target="_blank"
                    className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-all"
                    style={{
                      background: '#162030',
                      color: '#9ca3af',
                      border: '1px solid #1e2d3d',
                    }}
                  >
                    View
                  </Link>
                  <button
                    onClick={() => handleDelete(car._id)}
                    disabled={deleting === car._id}
                    className="flex items-center justify-center px-3 py-2 rounded-lg text-xs transition-all disabled:opacity-50"
                    style={{
                      background: 'rgba(239,68,68,0.1)',
                      color: '#ef4444',
                      border: '1px solid rgba(239,68,68,0.2)',
                    }}
                  >
                    {deleting === car._id ? (
                      <div className="w-3 h-3 border border-red-400 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Trash2 size={13} />
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}