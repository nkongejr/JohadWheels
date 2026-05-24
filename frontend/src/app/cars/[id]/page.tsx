'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { carsApi } from '@/lib/api';
import { formatPrice, formatMileage } from '@/lib/utils';
import {
  ArrowLeft,
  Calendar,
  Fuel,
  Settings,
  Users,
  Eye,
  MapPin,
  Phone,
  MessageCircle,
  CheckCircle,
  Car,
  Gauge,
  Palette,
} from 'lucide-react';

export default function CarDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [car, setCar] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await carsApi.getOne(params.id as string);
        setCar(res.data);
      } catch {
        router.push('/inventory');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="spinner" />
      </div>
    );
  }

  if (!car) return null;

  const discount =
    car.originalPrice && car.originalPrice > car.price
      ? Math.round(((car.originalPrice - car.price) / car.originalPrice) * 100)
      : null;

  return (
    <>
      <Navbar />
      <div className="min-h-screen" style={{ background: '#0a0a0a', paddingTop: '96px' }}>
        <div className="max-w-7xl mx-auto px-4 py-10">
          {/* Back button */}
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-400 hover:text-yellow-400 transition-colors mb-8"
          >
            <ArrowLeft size={18} />
            Back to Inventory
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Left - Images */}
            <div className="lg:col-span-2">
              {/* Main Image */}
              <div className="relative h-80 md:h-[450px] rounded-2xl overflow-hidden mb-4 bg-gray-900">
                {car.images && car.images.length > 0 ? (
                  <Image
                    src={car.images[selectedImage]}
                    alt={`${car.brand} ${car.model}`}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-7xl">
                    🚗
                  </div>
                )}
                {car.isFeatured && (
                  <div className="absolute top-4 left-4 bg-yellow-500 text-black text-sm font-bold px-3 py-1 rounded-full">
                    Featured
                  </div>
                )}
                {discount && (
                  <div className="absolute top-4 right-4 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                    -{discount}%
                  </div>
                )}
                <div className="absolute bottom-4 right-4 flex items-center gap-1.5 bg-black/70 text-gray-300 text-xs px-3 py-1.5 rounded-full">
                  <Eye size={13} />
                  {car.views || 0} views
                </div>
              </div>

              {/* Thumbnails */}
              {car.images && car.images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {car.images.map((img: string, i: number) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(i)}
                      className={`relative w-24 h-16 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                        selectedImage === i
                          ? 'border-yellow-400'
                          : 'border-transparent'
                      }`}
                    >
                      <Image src={img} alt="" fill className="object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Description */}
              {car.description && (
                <div
                  className="mt-6 p-6 rounded-xl border border-gray-800"
                  style={{ background: '#111111' }}
                >
                  <h2 className="font-bold text-white text-lg mb-3">
                    About This Vehicle
                  </h2>
                  <p className="text-gray-400 leading-relaxed text-sm">
                    {car.description}
                  </p>
                </div>
              )}

              {/* Features */}
              {car.features && car.features.length > 0 && (
                <div
                  className="mt-6 p-6 rounded-xl border border-gray-800"
                  style={{ background: '#111111' }}
                >
                  <h2 className="font-bold text-white text-lg mb-4">
                    Features & Equipment
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {car.features.map((f: string, i: number) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 text-gray-400 text-sm"
                      >
                        <CheckCircle
                          size={14}
                          className="text-yellow-400 shrink-0"
                        />
                        {f}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Specs */}
              <div
                className="mt-6 p-6 rounded-xl border border-gray-800"
                style={{ background: '#111111' }}
              >
                <h2 className="font-bold text-white text-lg mb-4">
                  Specifications
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[
                    {
                      icon: <Calendar size={16} />,
                      label: 'Year',
                      value: car.year,
                    },
                    {
                      icon: <Car size={16} />,
                      label: 'Type',
                      value: car.type,
                    },
                    {
                      icon: <Gauge size={16} />,
                      label: 'Mileage',
                      value: formatMileage(car.mileage),
                    },
                    {
                      icon: <Settings size={16} />,
                      label: 'Transmission',
                      value: car.transmission || 'N/A',
                    },
                    {
                      icon: <Fuel size={16} />,
                      label: 'Fuel',
                      value: car.fuelType || 'N/A',
                    },
                    {
                      icon: <Users size={16} />,
                      label: 'Seats',
                      value: car.seats || 'N/A',
                    },
                    {
                      icon: <Palette size={16} />,
                      label: 'Color',
                      value: car.color || 'N/A',
                    },
                    {
                      icon: <Car size={16} />,
                      label: 'Condition',
                      value: car.condition,
                    },
                    {
                      icon: <Settings size={16} />,
                      label: 'Engine',
                      value: car.engine || 'N/A',
                    },
                  ].map((spec, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-lg"
                      style={{ background: '#0a0a0a' }}
                    >
                      <div className="flex items-center gap-2 text-yellow-400 mb-1">
                        {spec.icon}
                        <span className="text-gray-500 text-xs">
                          {spec.label}
                        </span>
                      </div>
                      <div className="text-white text-sm font-medium">
                        {spec.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right - Price & Contact */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-4">
                {/* Price Card */}
                <div
                  className="p-6 rounded-2xl border border-gray-800"
                  style={{ background: '#111111' }}
                >
                  <div className="mb-2">
                    <span className="text-gray-400 text-sm">
                      {car.brand} {car.model} {car.year}
                    </span>
                  </div>
                  <h1 className="text-2xl font-black text-white mb-1">
                    {car.brand} {car.model}
                  </h1>

                  <div className="mt-4 mb-2">
                    <div className="text-3xl font-black text-yellow-400">
                      {formatPrice(car.price)}
                    </div>
                    {car.originalPrice && car.originalPrice > car.price && (
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-gray-500 text-sm line-through">
                          {formatPrice(car.originalPrice)}
                        </span>
                        <span className="text-green-400 text-sm font-bold">
                          Save {formatPrice(car.originalPrice - car.price)}
                        </span>
                      </div>
                    )}
                  </div>

                  {car.location && (
                    <div className="flex items-center gap-2 text-gray-400 text-sm mt-3 mb-4">
                      <MapPin size={14} className="text-yellow-500" />
                      {car.location}
                    </div>
                  )}

                  <div
                    className={`inline-flex items-center gap-1.5 text-sm font-bold px-3 py-1 rounded-full mb-5 ${
                      car.isAvailable
                        ? 'bg-green-500/10 text-green-400'
                        : 'bg-red-500/10 text-red-400'
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${car.isAvailable ? 'bg-green-400' : 'bg-red-400'}`}
                    />
                    {car.isAvailable ? 'Available' : 'Sold'}
                  </div>

                  {/* CTA Buttons */}
                  <div className="space-y-2">
                    <a
                      href={`https://wa.me/254716296585?text=Hi, I'm interested in the ${car.brand} ${car.model} ${car.year} listed on JOHAD WHEELS for ${formatPrice(car.price)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-white py-3 rounded-lg font-bold text-sm transition-colors"
                    >
                      <MessageCircle size={18} />
                      WhatsApp Enquiry
                    </a>
                    <a
                      href="tel:0716296585"
                      className="w-full flex items-center justify-center gap-2 btn-gold py-3 rounded-lg font-bold text-sm"
                    >
                      <Phone size={18} />
                      Call Now
                    </a>
                    <Link
                      href="/contact"
                      className="w-full flex items-center justify-center border border-gray-700 hover:border-yellow-500 text-gray-300 hover:text-yellow-400 py-3 rounded-lg font-bold text-sm transition-colors"
                    >
                      Book Test Drive
                    </Link>
                  </div>
                </div>

                {/* Quick Info */}
                <div
                  className="p-5 rounded-xl border border-gray-800"
                  style={{ background: '#111111' }}
                >
                  <h3 className="font-bold text-white text-sm mb-4">
                    Quick Info
                  </h3>
                  <div className="space-y-3">
                    {[
                      { label: 'Brand', value: car.brand },
                      { label: 'Model', value: car.model },
                      { label: 'Year', value: car.year },
                      { label: 'Condition', value: car.condition },
                      {
                        label: 'Mileage',
                        value: formatMileage(car.mileage),
                      },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="flex justify-between text-sm"
                      >
                        <span className="text-gray-500">{item.label}</span>
                        <span className="text-white font-medium">
                          {item.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}