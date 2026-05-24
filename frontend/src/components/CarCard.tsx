'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Eye, Fuel, Settings, Calendar, MapPin, Gauge, Car } from 'lucide-react';
import { formatPrice, formatMileage } from '@/lib/utils';

interface Car {
  _id: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  originalPrice?: number;
  type: string;
  condition: string;
  mileage?: number;
  engine?: string;
  transmission?: string;
  fuelType?: string;
  color?: string;
  images: string[];
  isFeatured?: boolean;
  isLuxury?: boolean;
  location?: string;
  views?: number;
}

interface CarCardProps {
  car: Car;
}

export default function CarCard({ car }: CarCardProps) {
  const discount =
    car.originalPrice && car.originalPrice > car.price
      ? Math.round(
          ((car.originalPrice - car.price) / car.originalPrice) * 100,
        )
      : null;

  return (
    <Link href={`/cars/${car._id}`} className="block h-full">
      <div
        className="group h-full flex flex-col rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
        style={{
          background: '#0f1520',
          border: '1px solid #1e2d3d',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'rgba(232,25,44,0.4)';
          e.currentTarget.style.boxShadow =
            '0 20px 40px rgba(232,25,44,0.12)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = '#1e2d3d';
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        {/* ── Image ── */}
        <div className="relative h-52 overflow-hidden" style={{ background: '#162030' }}>
          {car.images && car.images.length > 0 ? (
            <Image
              src={car.images[0]}
              alt={`${car.brand} ${car.model}`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            /* Placeholder — no emoji */
            <div
              className="w-full h-full flex flex-col items-center justify-center gap-2"
              style={{ background: '#162030' }}
            >
              <Car size={48} style={{ color: '#1e2d3d' }} />
              <span className="text-xs" style={{ color: '#2d4057' }}>
                No Image
              </span>
            </div>
          )}

          {/* Dark gradient overlay at bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* ── Top-left badges ── */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {car.isFeatured && (
              <span
                className="text-xs font-bold px-2.5 py-0.5 rounded"
                style={{
                  background: 'linear-gradient(135deg, #E8192C, #ff4d5e)',
                  color: '#ffffff',
                }}
              >
                Featured
              </span>
            )}
            {car.isLuxury && (
              <span
                className="text-xs font-bold px-2.5 py-0.5 rounded"
                style={{
                  background: 'linear-gradient(135deg, #1e2d3d, #253648)',
                  color: '#ffffff',
                  border: '1px solid rgba(232,25,44,0.3)',
                }}
              >
                Luxury
              </span>
            )}
            <span
              className="text-xs font-bold px-2.5 py-0.5 rounded"
              style={
                car.condition === 'New'
                  ? { background: '#16a34a', color: '#ffffff' }
                  : { background: '#1e2d3d', color: '#9ca3af' }
              }
            >
              {car.condition}
            </span>
          </div>

          {/* ── Discount badge (top-right) ── */}
          {discount && (
            <div
              className="absolute top-3 right-3 text-xs font-black px-2.5 py-0.5 rounded text-white"
              style={{
                background: 'linear-gradient(135deg, #E8192C, #ff4d5e)',
              }}
            >
              -{discount}%
            </div>
          )}

          {/* ── Views (bottom-right) ── */}
          <div
            className="absolute bottom-3 right-3 flex items-center gap-1 text-xs px-2 py-1 rounded-full"
            style={{
              background: 'rgba(0,0,0,0.65)',
              color: '#9ca3af',
              backdropFilter: 'blur(4px)',
            }}
          >
            <Eye size={11} />
            {car.views || 0}
          </div>
        </div>

        {/* ── Content ── */}
        <div className="p-4 flex flex-col flex-1">
          {/* Title */}
          <div className="mb-3">
            <h3 className="font-bold text-white text-lg leading-tight">
              {car.brand}{' '}
              <span style={{ color: '#E8192C' }}>{car.model}</span>
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <span
                className="text-xs px-2 py-0.5 rounded font-medium"
                style={{ background: '#1e2d3d', color: '#9ca3af' }}
              >
                {car.type}
              </span>
              {car.color && (
                <span className="text-gray-500 text-xs">{car.color}</span>
              )}
            </div>
          </div>

          {/* ── Specs grid ── */}
          <div
            className="grid grid-cols-2 gap-2 mb-4 p-3 rounded-xl"
            style={{ background: '#162030' }}
          >
            <div className="flex items-center gap-1.5 text-gray-400 text-xs">
              <Calendar size={12} style={{ color: '#E8192C' }} />
              {car.year}
            </div>
            <div className="flex items-center gap-1.5 text-gray-400 text-xs">
              <Settings size={12} style={{ color: '#E8192C' }} />
              {car.transmission || 'Auto'}
            </div>
            <div className="flex items-center gap-1.5 text-gray-400 text-xs">
              <Fuel size={12} style={{ color: '#E8192C' }} />
              {car.fuelType || 'Petrol'}
            </div>
            <div className="flex items-center gap-1.5 text-gray-400 text-xs">
              <Gauge size={12} style={{ color: '#E8192C' }} />
              {formatMileage(car.mileage || 0)}
            </div>
          </div>

          {/* ── Location ── */}
          {car.location && (
            <div
              className="flex items-center gap-1.5 text-xs mb-3"
              style={{ color: '#6b7280' }}
            >
              <MapPin size={11} style={{ color: '#E8192C' }} />
              {car.location}
            </div>
          )}

          {/* ── Price row ── */}
          <div
            className="flex items-end justify-between pt-3 mt-auto"
            style={{ borderTop: '1px solid #1e2d3d' }}
          >
            <div>
              <div
                className="font-black text-xl"
                style={{ color: '#E8192C' }}
              >
                {formatPrice(car.price)}
              </div>
              {car.originalPrice && car.originalPrice > car.price && (
                <div className="text-gray-500 text-xs line-through mt-0.5">
                  {formatPrice(car.originalPrice)}
                </div>
              )}
            </div>

            {/* View button */}
            <div
              className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg transition-all duration-200"
              style={{
                background: 'rgba(232,25,44,0.1)',
                color: '#E8192C',
                border: '1px solid rgba(232,25,44,0.2)',
              }}
            >
              View Details
              <span className="group-hover:translate-x-0.5 transition-transform duration-200 inline-block">
                →
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}