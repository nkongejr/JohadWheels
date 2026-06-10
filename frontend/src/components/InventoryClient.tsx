// components/InventoryClient.tsx
'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CarCard from '@/components/CarCard';
import { carsApi } from '@/lib/api';
import {
  Search,
  SlidersHorizontal,
  X,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

function InventoryContent() {
  const searchParams = useSearchParams();
  const [cars, setCars] = useState<any[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [types, setTypes] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState<any>(null);
  const [showFilters, setShowFilters] = useState(false);

  const [filters, setFilters] = useState({
    search: searchParams.get('brand') || '',
    brand: searchParams.get('brand') || '',
    type: '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    condition: '',
    sortBy: 'createdAt',
    sortOrder: 'desc' as 'asc' | 'desc',
    page: 1,
    limit: 12,
  });

  useEffect(() => { loadFilters(); }, []);
  useEffect(() => { loadCars(); }, [filters]);

  const loadFilters = async () => {
    try {
      const [brandsRes, typesRes] = await Promise.all([
        carsApi.getBrands(),
        carsApi.getTypes(),
      ]);
      setBrands(brandsRes.data);
      setTypes(typesRes.data);
    } catch {}
  };

  const loadCars = async () => {
    setLoading(true);
    try {
      const params: any = {
        page: filters.page,
        limit: filters.limit,
        sortBy: filters.sortBy,
        sortOrder: filters.sortOrder,
      };
      if (filters.search) params.search = filters.search;
      if (filters.brand && filters.brand !== 'All Brands') params.brand = filters.brand;
      if (filters.type && filters.type !== 'All Types') params.type = filters.type;
      if (filters.minPrice) params.minPrice = filters.minPrice;
      if (filters.maxPrice) params.maxPrice = filters.maxPrice;
      if (filters.condition) params.condition = filters.condition;

      const res = await carsApi.getAll(params);
      setCars(res.data.cars);
      setPagination(res.data.pagination);
    } catch {
      setCars([]);
    } finally {
      setLoading(false);
    }
  };

  const updateFilter = (key: string, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value, page: 1 }));
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      brand: '',
      type: '',
      minPrice: '',
      maxPrice: '',
      condition: '',
      sortBy: 'createdAt',
      sortOrder: 'desc',
      page: 1,
      limit: 12,
    });
  };

  const sortOptions = [
    { value: 'createdAt-desc', label: 'Newest First' },
    { value: 'createdAt-asc', label: 'Oldest First' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'year-desc', label: 'Year: Newest' },
    { value: 'views-desc', label: 'Most Viewed' },
  ];

  return (
    <>
      <Navbar />

      <div
        className="pt-32 pb-14"
        style={{
          background: 'linear-gradient(to bottom, #000, #111111)',
          borderBottom: '1px solid #1a1a1a',
        }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-3">
            Complete Vehicle <span className="gold-text">Inventory</span>
          </h1>
          <p className="text-gray-400">
            Search and filter our extensive collection
          </p>
        </div>
      </div>

      <div className="min-h-screen py-10" style={{ background: '#0a0a0a' }}>
        <div className="max-w-7xl mx-auto px-4">
          {/* Filters Bar */}
          <div
            className="p-4 rounded-xl border border-gray-800 mb-8"
            style={{ background: '#111111' }}
          >
            <div className="flex flex-wrap gap-3 items-center">
              <div className="flex-1 min-w-[200px] relative">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  value={filters.search}
                  onChange={(e) => updateFilter('search', e.target.value)}
                  placeholder="Search by brand, model..."
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg pl-9 pr-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 text-sm"
                />
              </div>

              <select
                value={filters.brand}
                onChange={(e) => updateFilter('brand', e.target.value)}
                className="bg-gray-900 border border-gray-700 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-yellow-500"
              >
                <option value="">All Brands</option>
                {brands.map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>

              <select
                value={filters.type}
                onChange={(e) => updateFilter('type', e.target.value)}
                className="bg-gray-900 border border-gray-700 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-yellow-500"
              >
                <option value="">All Types</option>
                {types.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>

              <select
                value={`${filters.sortBy}-${filters.sortOrder}`}
                onChange={(e) => {
                  const [sortBy, sortOrder] = e.target.value.split('-');
                  setFilters((prev) => ({
                    ...prev,
                    sortBy,
                    sortOrder: sortOrder as 'asc' | 'desc',
                    page: 1,
                  }));
                }}
                className="bg-gray-900 border border-gray-700 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-yellow-500"
              >
                {sortOptions.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 border border-gray-700 hover:border-yellow-500 text-gray-300 hover:text-yellow-400 px-3 py-2.5 rounded-lg text-sm transition-colors"
              >
                <SlidersHorizontal size={15} />
                Filters
              </button>

              {(filters.search || filters.brand || filters.type ||
                filters.minPrice || filters.maxPrice || filters.condition) && (
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-1 text-red-400 hover:text-red-300 text-sm"
                >
                  <X size={15} />
                  Clear
                </button>
              )}
            </div>

            {showFilters && (
              <div className="mt-4 pt-4 border-t border-gray-800 flex flex-wrap gap-3">
                <div className="flex items-center gap-2">
                  <label className="text-gray-400 text-sm whitespace-nowrap">Min Price:</label>
                  <input
                    type="number"
                    value={filters.minPrice}
                    onChange={(e) => updateFilter('minPrice', e.target.value)}
                    placeholder="0"
                    className="w-32 bg-gray-900 border border-gray-700 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-yellow-500"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-gray-400 text-sm whitespace-nowrap">Max Price:</label>
                  <input
                    type="number"
                    value={filters.maxPrice}
                    onChange={(e) => updateFilter('maxPrice', e.target.value)}
                    placeholder="Any"
                    className="w-32 bg-gray-900 border border-gray-700 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-yellow-500"
                  />
                </div>
                <select
                  value={filters.condition}
                  onChange={(e) => updateFilter('condition', e.target.value)}
                  className="bg-gray-900 border border-gray-700 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-yellow-500"
                >
                  <option value="">All Conditions</option>
                  <option value="New">New</option>
                  <option value="Used">Used</option>
                  <option value="Certified Pre-Owned">Certified Pre-Owned</option>
                </select>
              </div>
            )}
          </div>

          {/* Results count */}
          {pagination && (
            <div className="text-gray-400 text-sm mb-6">
              Showing{' '}
              <span className="text-yellow-400 font-medium">{cars.length}</span>{' '}
              of{' '}
              <span className="text-white font-medium">{pagination.total}</span>{' '}
              vehicles
            </div>
          )}

          {/* Cars Grid */}
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="spinner" />
            </div>
          ) : cars.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🚗</div>
              <h3 className="text-xl font-bold text-white mb-2">No vehicles found</h3>
              <p className="text-gray-400 mb-6">Try adjusting your search filters</p>
              <button
                onClick={clearFilters}
                className="btn-gold px-6 py-2.5 rounded-lg font-bold"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {cars.map((car) => (
                <CarCard key={car._id} car={car} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {pagination && pagination.pages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-10">
              <button
                onClick={() => setFilters((prev) => ({ ...prev, page: prev.page - 1 }))}
                disabled={filters.page === 1}
                className="p-2 rounded-lg border border-gray-700 text-gray-400 hover:border-yellow-500 hover:text-yellow-400 disabled:opacity-30 transition-colors"
              >
                <ChevronLeft size={18} />
              </button>

              {Array.from({ length: pagination.pages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setFilters((prev) => ({ ...prev, page }))}
                  className={`w-9 h-9 rounded-lg text-sm font-medium transition-all ${
                    filters.page === page
                      ? 'bg-yellow-500 text-black font-bold'
                      : 'border border-gray-700 text-gray-400 hover:border-yellow-500 hover:text-yellow-400'
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => setFilters((prev) => ({ ...prev, page: prev.page + 1 }))}
                disabled={filters.page === pagination.pages}
                className="p-2 rounded-lg border border-gray-700 text-gray-400 hover:border-yellow-500 hover:text-yellow-400 disabled:opacity-30 transition-colors"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default function InventoryClient() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-black flex items-center justify-center">
          <div className="spinner" />
        </div>
      }
    >
      <InventoryContent />
    </Suspense>
  );
}