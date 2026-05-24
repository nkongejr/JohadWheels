'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CarCard from '@/components/CarCard';
import { carsApi } from '@/lib/api';
import { Crown } from 'lucide-react';

export default function LuxuryPage() {
  const [cars, setCars] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await carsApi.getLuxury();
        setCars(res.data);
      } catch {
        setCars([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section
        className="relative pt-36 pb-20 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0a0a0a, #1a1000)' }}
      >
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'radial-gradient(circle at 30% 50%, #d4a017 0%, transparent 60%), radial-gradient(circle at 70% 50%, #b8860b 0%, transparent 60%)',
            }}
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/30 rounded-full px-5 py-2 mb-6">
            <Crown size={16} className="text-yellow-400" />
            <span className="text-yellow-400 text-sm font-medium">
              Luxury Collection
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-5">
            Luxury <span className="gold-text">Vehicles</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Explore our handpicked collection of premium luxury automobiles.
            Each vehicle represents the pinnacle of automotive engineering and
            craftsmanship.
          </p>
        </div>
      </section>

      {/* Brands Showcase */}
      <section className="py-10 border-y border-gray-800" style={{ background: '#111111' }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-8">
            {['BMW', 'Mercedes-Benz', 'Audi', 'Porsche', 'Range Rover', 'Lamborghini', 'Ferrari', 'Bentley'].map((brand) => (
              <div key={brand} className="text-gray-600 hover:text-yellow-400 transition-colors font-bold text-sm tracking-wider cursor-default">
                {brand}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cars Grid */}
      <section className="section-padding" style={{ background: '#0a0a0a' }}>
        <div className="max-w-7xl mx-auto px-4">
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="spinner" />
            </div>
          ) : cars.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              No luxury vehicles available
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-black text-white">
                    {cars.length} Luxury Vehicles Available
                  </h2>
                  <p className="text-gray-400 text-sm mt-1">
                    Exclusively curated for discerning buyers
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {cars.map((car) => (
                  <CarCard key={car._id} car={car} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}