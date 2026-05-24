'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Search,
  ChevronDown,
  Star,
  Shield,
  Phone,
  Mail,
  MapPin,
  Facebook,
  MessageCircle,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CarCard from '@/components/CarCard';
import StatsSection from '@/components/StatsSection';
import WhyChooseUs from '@/components/WhyChooseUs';
import TestimonialsSection from '@/components/TestimonialsSection';
import { carsApi, contactApi, newsletterApi, testimonialsApi } from '@/lib/api';
import toast from 'react-hot-toast';

export default function HomePage() {
  const router = useRouter();
  const [featuredCars, setFeaturedCars] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchBrand, setSearchBrand] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [brands, setBrands] = useState<string[]>([]);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [sending, setSending] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');

  useEffect(() => {
    const init = async () => {
      try {
        await carsApi.seed();
        await testimonialsApi.seed();
        const [featuredRes, brandsRes] = await Promise.all([
          carsApi.getFeatured(),
          carsApi.getBrands(),
        ]);
        setFeaturedCars(featuredRes.data);
        setBrands(brandsRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchBrand) params.set('brand', searchBrand);
    if (priceRange) {
      const [min, max] = priceRange.split('-');
      if (min) params.set('minPrice', min);
      if (max) params.set('maxPrice', max);
    }
    router.push(`/inventory?${params.toString()}`);
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      await contactApi.send(contactForm);
      toast.success('Message sent successfully!');
      setContactForm({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch {
      toast.error('Failed to send message. Try again.');
    } finally {
      setSending(false);
    }
  };

  const handleNewsletterSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    try {
      await newsletterApi.subscribe(newsletterEmail);
      toast.success('Subscribed successfully!');
      setNewsletterEmail('');
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Failed to subscribe');
    }
  };

  return (
    <>
      <Navbar />

         {/* ===== HERO SECTION ===== */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ paddingTop: '96px', background: '#ffffff' }}
      >
        {/* Background decorative elements */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {/* Large red swoosh shape top-right — mimics the car silhouette curves */}
          <svg
            className="absolute -top-20 -right-20 w-[700px] h-[500px] opacity-10"
            viewBox="0 0 700 500"
            fill="none"
          >
            <path
              d="M200 400 Q400 100 700 200 Q600 300 500 250 Q700 350 650 450 Z"
              fill="#E8192C"
            />
          </svg>

          {/* Bottom-left navy shape */}
          <svg
            className="absolute -bottom-10 -left-10 w-[400px] h-[300px] opacity-8"
            viewBox="0 0 400 300"
            fill="none"
          >
            <path
              d="M0 300 Q100 100 300 150 Q200 250 100 200 Z"
              fill="#1e2d3d"
            />
          </svg>

          {/* Subtle grid pattern */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'linear-gradient(rgba(30,45,61,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(30,45,61,0.04) 1px, transparent 1px)',
              backgroundSize: '50px 50px',
            }}
          />

          {/* Red accent line top */}
          <div
            className="absolute top-0 left-0 right-0 h-1"
            style={{
              background: 'linear-gradient(90deg, #E8192C, #ff4d5e, #E8192C)',
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* ── Left: Text content ── */}
            <div>
              {/* Badge */}
              <div
                className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-6"
                style={{
                  background: 'rgba(232,25,44,0.08)',
                  border: '1px solid rgba(232,25,44,0.25)',
                }}
              >
                <Star
                  size={14}
                  className="fill-current"
                  style={{ color: '#E8192C' }}
                />
                <span
                  className="text-sm font-semibold"
                  style={{ color: '#E8192C' }}
                >
                  Kenya&apos;s Premier Luxury Car Dealer
                </span>
              </div>

              {/* Headline */}
              <h1
                className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight mb-6"
                style={{ color: '#1e2d3d' }}
              >
                Drive Your{' '}
                <span
                  style={{
                    background: 'linear-gradient(135deg, #E8192C, #ff4d5e)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Dream Car
                </span>{' '}
                Today
              </h1>

              <p
                className="text-lg md:text-xl mb-10 leading-relaxed"
                style={{ color: '#4b5563' }}
              >
                Premium Cars. Fair Prices. Trusted by thousands of Kenyans
                across the country.
              </p>

              {/* Search Form */}
              <form
                onSubmit={handleSearch}
                className="rounded-2xl p-4 mb-8 shadow-lg"
                style={{
                  background: '#ffffff',
                  border: '1px solid rgba(30,45,61,0.12)',
                  boxShadow: '0 8px 32px rgba(30,45,61,0.1)',
                }}
              >
                <div className="flex flex-col md:flex-row gap-3">
                  {/* Brand search */}
                  <div className="flex-1 relative">
                    <Search
                      size={16}
                      className="absolute left-3 top-1/2 -translate-y-1/2"
                      style={{ color: '#9ca3af' }}
                    />
                    <input
                      type="text"
                      value={searchBrand}
                      onChange={(e) => setSearchBrand(e.target.value)}
                      placeholder="Search by brand..."
                      className="w-full rounded-lg pl-9 pr-4 py-3 text-sm focus:outline-none transition-colors"
                      style={{
                        background: '#f8fafc',
                        border: '1px solid #e2e8f0',
                        color: '#1e2d3d',
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = '#E8192C';
                        e.currentTarget.style.boxShadow =
                          '0 0 0 3px rgba(232,25,44,0.08)';
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = '#e2e8f0';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                      list="brands-list"
                    />
                    <datalist id="brands-list">
                      {brands.map((b) => (
                        <option key={b} value={b} />
                      ))}
                    </datalist>
                  </div>

                  {/* Price range */}
                  <select
                    value={priceRange}
                    onChange={(e) => setPriceRange(e.target.value)}
                    className="rounded-lg px-4 py-3 text-sm min-w-[160px] focus:outline-none transition-colors"
                    style={{
                      background: '#f8fafc',
                      border: '1px solid #e2e8f0',
                      color: '#1e2d3d',
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = '#E8192C';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = '#e2e8f0';
                    }}
                  >
                    <option value="">All Prices</option>
                    <option value="0-5000000">Under KES 5M</option>
                    <option value="5000000-10000000">KES 5M – 10M</option>
                    <option value="10000000-20000000">KES 10M – 20M</option>
                    <option value="20000000-50000000">KES 20M – 50M</option>
                    <option value="50000000-">Above KES 50M</option>
                  </select>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="px-8 py-3 rounded-lg text-sm font-bold text-white whitespace-nowrap transition-all duration-200"
                    style={{
                      background: 'linear-gradient(135deg, #E8192C, #ff4d5e)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow =
                        '0 6px 20px rgba(232,25,44,0.4)';
                      e.currentTarget.style.transform = 'translateY(-1px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = 'none';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    Find Cars
                  </button>
                </div>
              </form>

              {/* Quick Stats */}
              <div
                className="flex flex-wrap gap-6 mb-8 p-4 rounded-xl"
                style={{
                  background: '#f8fafc',
                  border: '1px solid rgba(30,45,61,0.08)',
                }}
              >
                {[
                  { num: '500+', label: 'Premium Cars' },
                  { num: '5,000+', label: 'Happy Clients' },
                  { num: '98%', label: 'Success Rate' },
                ].map((s, i) => (
                  <div key={s.label} className="flex items-center gap-3">
                    {i > 0 && (
                      <div
                        className="w-px h-8 hidden sm:block"
                        style={{ background: '#e2e8f0' }}
                      />
                    )}
                    <div>
                      <div
                        className="text-2xl font-black"
                        style={{ color: '#E8192C' }}
                      >
                        {s.num}
                      </div>
                      <div className="text-xs font-medium" style={{ color: '#6b7280' }}>
                        {s.label}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/inventory"
                  className="py-3 px-8 rounded-lg font-bold text-white transition-all duration-200"
                  style={{
                    background: 'linear-gradient(135deg, #E8192C, #ff4d5e)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow =
                      '0 8px 25px rgba(232,25,44,0.4)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  Browse Inventory
                </Link>
                <Link
                  href="/contact"
                  className="py-3 px-8 rounded-lg font-bold transition-all duration-200"
                  style={{
                    border: '2px solid #1e2d3d',
                    color: '#1e2d3d',
                    background: 'transparent',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#1e2d3d';
                    e.currentTarget.style.color = '#ffffff';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = '#1e2d3d';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  Get In Touch
                </Link>
              </div>
            </div>

            {/* ── Right: Hero image ── */}
            <div className="relative hidden lg:block">
              {/* Main image card */}
              <div
                className="relative h-[520px] rounded-3xl overflow-hidden shadow-2xl"
                style={{
                  border: '3px solid rgba(232,25,44,0.15)',
                }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200&q=80"
                  alt="Luxury Car"
                  fill
                  className="object-cover"
                  priority
                />
                {/* Subtle overlay */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(to top, rgba(30,45,61,0.3) 0%, transparent 60%)',
                  }}
                />
              </div>

              {/* Floating card — Verified */}
              <div
                className="absolute -bottom-5 -left-6 p-4 rounded-2xl shadow-xl"
                style={{
                  background: '#ffffff',
                  border: '1px solid rgba(232,25,44,0.2)',
                  boxShadow: '0 20px 40px rgba(30,45,61,0.15)',
                }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: 'rgba(232,25,44,0.1)' }}
                  >
                    <Shield size={20} style={{ color: '#E8192C' }} />
                  </div>
                  <div>
                    <div
                      className="font-bold text-sm"
                      style={{ color: '#1e2d3d' }}
                    >
                      Verified Dealer
                    </div>
                    <div className="text-xs" style={{ color: '#6b7280' }}>
                      100% Verified Vehicles
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating card — Rating */}
              <div
                className="absolute -top-4 -right-4 p-4 rounded-2xl shadow-xl"
                style={{
                  background: '#1e2d3d',
                  boxShadow: '0 20px 40px rgba(30,45,61,0.3)',
                }}
              >
                <div className="text-center">
                  <div
                    className="text-2xl font-black"
                    style={{ color: '#E8192C' }}
                  >
                    5.0
                  </div>
                  <div className="flex gap-0.5 justify-center my-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={12}
                        className="fill-current"
                        style={{ color: '#E8192C' }}
                      />
                    ))}
                  </div>
                  <div className="text-xs" style={{ color: '#9ca3af' }}>
                    5,000+ Reviews
                  </div>
                </div>
              </div>

              {/* Decorative red ring */}
              <div
                className="absolute -z-10 top-8 right-8 w-72 h-72 rounded-full"
                style={{
                  border: '2px dashed rgba(232,25,44,0.15)',
                }}
              />
              <div
                className="absolute -z-10 top-16 right-16 w-52 h-52 rounded-full"
                style={{
                  border: '2px solid rgba(232,25,44,0.08)',
                }}
              />
            </div>
          </div>
        </div>

        {/* ── Mobile hero image (shows below text on small screens) ── */}
        <div className="lg:hidden w-full mt-8 px-4 pb-8 relative z-10">
          <div className="relative h-56 rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80"
              alt="Luxury Car"
              fill
              className="object-cover"
              priority
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(to top, rgba(30,45,61,0.4), transparent)',
              }}
            />
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 animate-bounce hidden lg:block">
          <div
            className="w-8 h-12 rounded-full border-2 flex items-start justify-center pt-2"
            style={{ borderColor: 'rgba(232,25,44,0.3)' }}
          >
            <div
              className="w-1.5 h-3 rounded-full animate-bounce"
              style={{ background: '#E8192C' }}
            />
          </div>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <StatsSection />

      {/* ===== FEATURED VEHICLES ===== */}
      <section className="section-padding" style={{ background: '#0a0a0f' }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-end justify-between mb-10">
            <div>
              <div
                className="text-sm font-semibold mb-2 uppercase tracking-wider"
                style={{ color: '#E8192C' }}
              >
                Handpicked Selections
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-white">
                Featured Luxury{' '}
                <span className="brand-text">Vehicles</span>
              </h2>
              <p className="text-gray-400 mt-2">
                Handpicked premium vehicles for discerning buyers
              </p>
            </div>
            <Link
              href="/inventory"
              className="hidden md:block px-6 py-2.5 rounded-lg text-sm font-semibold transition-all"
              style={{
                border: '1px solid #E8192C',
                color: '#ff4d5e',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#E8192C';
                e.currentTarget.style.color = '#ffffff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#ff4d5e';
              }}
            >
              View All Vehicles →
            </Link>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="spinner" />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredCars.slice(0, 6).map((car) => (
                <CarCard key={car._id} car={car} />
              ))}
            </div>
          )}

          <div className="text-center mt-10">
            <Link href="/inventory" className="btn-red px-10 py-3 rounded-lg font-bold inline-block">
              View All Vehicles
            </Link>
          </div>
        </div>
      </section>

      {/* ===== WHY CHOOSE US ===== */}
      <WhyChooseUs />

      {/* ===== TESTIMONIALS ===== */}
      <TestimonialsSection />

      {/* ===== ABOUT SECTION ===== */}
      <section className="section-padding" style={{ background: '#0f1520' }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            {/* Content */}
            <div>
              <div
                className="text-sm font-semibold mb-3 uppercase tracking-wider"
                style={{ color: '#E8192C' }}
              >
                About Us
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-6">
                About{' '}
                <span className="font-black" style={{ color: '#ffffff' }}>JOHAD</span>
                <span className="font-black brand-text">WHEELS</span>
              </h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Since 2022, JOHAD WHEELS has been Kenya&apos;s premier destination
                for luxury vehicles. We specialize in sourcing, verifying, and
                selling premium automobiles from leading manufacturers including
                BMW, Mercedes-Benz, Audi, Porsche, and Range Rover.
              </p>
              <p className="text-gray-400 leading-relaxed mb-8">
                Our mission is to make luxury car ownership accessible to
                discerning Kenyan buyers through transparent pricing, flexible
                financing options, and exceptional customer service.
              </p>

              {/* Mini Stats */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                {[
                  { num: '500+', label: 'Vehicles Sold' },
                  { num: '5,000+', label: 'Happy Customers' },
                  { num: '2+', label: 'Years Experience' },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="text-center p-4 rounded-xl"
                    style={{ border: '1px solid #1e2d3d', background: '#162030' }}
                  >
                    <div
                      className="text-2xl font-black mb-1"
                      style={{ color: '#E8192C' }}
                    >
                      {s.num}
                    </div>
                    <div className="text-gray-400 text-xs">{s.label}</div>
                  </div>
                ))}
              </div>

              <Link href="/about" className="btn-red px-8 py-3 rounded-lg font-bold inline-block">
                Learn More
              </Link>
            </div>

            {/* Image */}
            <div className="relative">
             <div className="relative h-[450px] rounded-2xl overflow-hidden">
  <Image
    src="https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800"
    alt="Toyota Land Cruiser Prado TX"
    fill
    className="object-cover"
  />
  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
</div>
              {/* Floating badge */}
              <div
                className="absolute -bottom-6 -left-6 p-5 rounded-xl shadow-2xl"
                style={{
                  background: '#0f1520',
                  border: '1px solid rgba(232,25,44,0.3)',
                }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ background: 'rgba(232,25,44,0.15)' }}
                  >
                    <Shield style={{ color: '#E8192C' }} size={20} />
                  </div>
                  <div>
                    <div className="text-white font-bold text-sm">Verified Dealer</div>
                    <div className="text-gray-400 text-xs">100% Verified Vehicles</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CONTACT SECTION ===== */}
      <section id="contact" className="section-padding" style={{ background: '#0a0a0f' }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <div
              className="text-sm font-semibold mb-3 uppercase tracking-wider"
              style={{ color: '#E8192C' }}
            >
              Reach Out
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              Get In <span className="brand-text">Touch</span>
            </h2>
            <p className="text-gray-400">
              We&apos;d love to hear from you. Contact us anytime.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Contact Form */}
            <div
              className="p-8 rounded-2xl"
              style={{ background: '#0f1520', border: '1px solid #1e2d3d' }}
            >
              <h3 className="font-bold text-white text-xl mb-6">Send a Message</h3>
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-gray-400 text-sm mb-1.5 block">
                      Your Name
                    </label>
                    <input
                      type="text"
                      value={contactForm.name}
                      onChange={(e) =>
                        setContactForm({ ...contactForm, name: e.target.value })
                      }
                      placeholder="Your Name"
                      required
                      className="w-full rounded-lg px-4 py-3 text-white placeholder-gray-500 text-sm focus:outline-none transition-colors"
                      style={{ background: '#162030', border: '1px solid #1e2d3d' }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = '#E8192C')}
                      onBlur={(e) => (e.currentTarget.style.borderColor = '#1e2d3d')}
                    />
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm mb-1.5 block">
                      Your Email
                    </label>
                    <input
                      type="email"
                      value={contactForm.email}
                      onChange={(e) =>
                        setContactForm({ ...contactForm, email: e.target.value })
                      }
                      placeholder="Your Email"
                      required
                      className="w-full rounded-lg px-4 py-3 text-white placeholder-gray-500 text-sm focus:outline-none transition-colors"
                      style={{ background: '#162030', border: '1px solid #1e2d3d' }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = '#E8192C')}
                      onBlur={(e) => (e.currentTarget.style.borderColor = '#1e2d3d')}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-gray-400 text-sm mb-1.5 block">Phone</label>
                  <input
                    type="tel"
                    value={contactForm.phone}
                    onChange={(e) =>
                      setContactForm({ ...contactForm, phone: e.target.value })
                    }
                    placeholder="Your Phone"
                    className="w-full rounded-lg px-4 py-3 text-white placeholder-gray-500 text-sm focus:outline-none transition-colors"
                    style={{ background: '#162030', border: '1px solid #1e2d3d' }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = '#E8192C')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = '#1e2d3d')}
                  />
                </div>

                <div>
                  <label className="text-gray-400 text-sm mb-1.5 block">Subject</label>
                  <select
                    value={contactForm.subject}
                    onChange={(e) =>
                      setContactForm({ ...contactForm, subject: e.target.value })
                    }
                    className="w-full rounded-lg px-4 py-3 text-white text-sm focus:outline-none transition-colors"
                    style={{ background: '#162030', border: '1px solid #1e2d3d' }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = '#E8192C')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = '#1e2d3d')}
                  >
                    <option value="">Select Subject</option>
                    <option value="Purchase Inquiry">Purchase Inquiry</option>
                    <option value="Test Drive">Book Test Drive</option>
                    <option value="Financing">Financing Options</option>
                    <option value="General">General Inquiry</option>
                  </select>
                </div>

                <div>
                  <label className="text-gray-400 text-sm mb-1.5 block">Message</label>
                  <textarea
                    value={contactForm.message}
                    onChange={(e) =>
                      setContactForm({ ...contactForm, message: e.target.value })
                    }
                    placeholder="Your Message"
                    required
                    rows={4}
                    className="w-full rounded-lg px-4 py-3 text-white placeholder-gray-500 text-sm focus:outline-none transition-colors resize-none"
                    style={{ background: '#162030', border: '1px solid #1e2d3d' }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = '#E8192C')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = '#1e2d3d')}
                  />
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  className="w-full btn-red py-3.5 rounded-lg font-bold disabled:opacity-50"
                >
                  {sending ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-5">
              {/* Logo display in contact section */}
              <div
                className="p-6 rounded-xl flex items-center gap-4"
                style={{ background: '#0f1520', border: '1px solid #1e2d3d' }}
              >
                <div className="relative w-24 h-16 shrink-0">
                  <Image
                    src="/logo.jpeg"
                    alt="JOHAD WHEELS Logo"
                    fill
                    className="object-contain"
                  />
                </div>
                <div>
                  <div className="text-white font-black text-lg leading-tight">
                    <span>JOHAD</span>
                    <span style={{ color: '#E8192C' }}>WHEELS</span>
                  </div>
                  <div
                    className="text-xs font-semibold mt-1 px-2 py-0.5 rounded inline-block"
                    style={{ background: '#1e2d3d', color: '#aab4be' }}
                  >
                    PREMIUM CARS. FAIR PRICES.
                  </div>
                </div>
              </div>

              <div
                className="p-6 rounded-xl"
                style={{ background: '#0f1520', border: '1px solid #1e2d3d' }}
              >
                <h3 className="font-bold text-white text-lg mb-5">
                  Contact Information
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: 'rgba(232,25,44,0.1)' }}
                    >
                      <MapPin style={{ color: '#E8192C' }} size={18} />
                    </div>
                    <div>
                      <div className="text-white font-medium text-sm">Location</div>
                      <div className="text-gray-400 text-sm">Karatina, Kenya</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: 'rgba(232,25,44,0.1)' }}
                    >
                      <Phone style={{ color: '#E8192C' }} size={18} />
                    </div>
                    <div>
                      <div className="text-white font-medium text-sm mb-1">Phone</div>
                      <a href="tel:0797250555" className="text-gray-400 text-sm hover:text-red-400 block transition-colors">
                        0797 250 555
                      </a>
                      <a href="tel:0721424515" className="text-gray-400 text-sm hover:text-red-400 block transition-colors">
                        0721 424 515
                      </a>
                      <a href="tel:0715295535" className="text-gray-400 text-sm hover:text-red-400 block transition-colors">
                        0715 295 535
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: 'rgba(232,25,44,0.1)' }}
                    >
                      <Mail style={{ color: '#E8192C' }} size={18} />
                    </div>
                    <div>
                      <div className="text-white font-medium text-sm">Email</div>
                      <a
                        href="mailto:Johadwheels.co.ke"
                        className="text-gray-400 text-sm hover:text-red-400 transition-colors"
                      >
                        Johadwheels.co.ke
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div
                className="p-6 rounded-xl"
                style={{ background: '#0f1520', border: '1px solid #1e2d3d' }}
              >
                <h3 className="font-bold text-white text-lg mb-5">
                  Connect With Us
                </h3>
                <div className="space-y-3">
                  <a
                    href="https://wa.me/254797250555"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-lg transition-colors"
                    style={{
                      background: 'rgba(34,197,94,0.08)',
                      border: '1px solid rgba(34,197,94,0.2)',
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = 'rgba(34,197,94,0.15)')
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = 'rgba(34,197,94,0.08)')
                    }
                  >
                    <MessageCircle className="text-green-400" size={20} />
                    <span className="text-green-400 text-sm font-medium">
                      Chat with us on WhatsApp
                    </span>
                  </a>

                  <a
                    href="https://www.facebook.com/profile.php?id=61590238221238"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-lg transition-colors"
                    style={{
                      background: 'rgba(59,130,246,0.08)',
                      border: '1px solid rgba(59,130,246,0.2)',
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = 'rgba(59,130,246,0.15)')
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = 'rgba(59,130,246,0.08)')
                    }
                  >
                    <Facebook className="text-blue-400" size={20} />
                    <span className="text-blue-400 text-sm font-medium">
                      Visit our Facebook page
                    </span>
                  </a>

                  <a
                    href="https://www.tiktok.com/@johadwheels?fbclid=IwY2xjawR3s7hleHRuA2FlbQIxMQBzcnRjBmFwcF9pZAwzNTA2ODU1MzE3MjgAAR6c4sQvjnlU9W27V__3TlsVSHBfnDvdjAvAHH-knsb6gJKo_6gtTTK48idp9Q_aem_LOxv7C_0MZ3mR_j-4pb-1g"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-lg transition-colors"
                    style={{
                      background: 'rgba(232,25,44,0.08)',
                      border: '1px solid rgba(232,25,44,0.2)',
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = 'rgba(232,25,44,0.15)')
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = 'rgba(232,25,44,0.08)')
                    }
                  >
                    <span className="text-lg">📱</span>
                    <span className="text-sm font-medium" style={{ color: '#ff4d5e' }}>
                      Follow us on TikTok
                    </span>
                  </a>
                </div>
              </div>

              {/* Newsletter */}
              <div
                className="p-6 rounded-xl"
                style={{
                  background: 'linear-gradient(135deg, #1e2d3d, #162030)',
                  border: '1px solid rgba(232,25,44,0.25)',
                }}
              >
                <h3 className="font-bold text-white text-lg mb-2">
                  Stay Updated
                </h3>
                <p className="text-gray-400 text-sm mb-4">
                  Get notified about new arrivals and exclusive deals.
                </p>
                <form onSubmit={handleNewsletterSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Your email"
                    className="flex-1 rounded-lg px-3 py-2.5 text-white placeholder-gray-500 text-sm focus:outline-none"
                    style={{ background: '#0a0a0f', border: '1px solid #1e2d3d' }}
                  />
                  <button type="submit" className="btn-red px-4 py-2.5 rounded-lg text-sm font-bold">
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}