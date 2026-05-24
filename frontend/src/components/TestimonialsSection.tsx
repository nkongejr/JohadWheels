'use client';

import { useEffect, useState } from 'react';
import { Star, Quote } from 'lucide-react';
import { testimonialsApi } from '@/lib/api';

interface Testimonial {
  _id: string;
  name: string;
  title: string;
  message: string;
  rating: number;
}

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        await testimonialsApi.seed();
        const res = await testimonialsApi.getAll();
        setTestimonials(res.data);
      } catch {
        setTestimonials([
          {
            _id: '1',
            name: 'John Mwangi',
            title: 'CEO, Tech Startup',
            message:
              'JOHAD WHEELS provided exceptional service. Found my dream BMW within budget. Highly recommended!',
            rating: 5,
          },
          {
            _id: '2',
            name: 'Sarah Kamau',
            title: 'Business Owner',
            message:
              'Transparent pricing and amazing selection. The team was professional throughout the entire process.',
            rating: 5,
          },
          {
            _id: '3',
            name: 'David Ochieng',
            title: 'Director, Finance',
            message:
              'Best car dealership in Kenya. Got my Range Rover at an unbeatable price with great financing options.',
            rating: 5,
          },
        ]);
      }
    };
    load();
  }, []);

  const getInitials = (name: string) =>
    name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();

  return (
    <section
      className="section-padding"
      style={{ background: '#0f1520' }}
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-14">
          <div
            className="text-sm font-semibold mb-3 uppercase tracking-wider"
            style={{ color: '#E8192C' }}
          >
            Client Reviews
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            What Our{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #E8192C, #ff4d5e)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Clients Say
            </span>
          </h2>
          <p className="text-gray-400">
            Real reviews from verified, satisfied customers
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.slice(0, 3).map((t, i) => (
            <div
              key={t._id}
              className="p-6 rounded-2xl flex flex-col transition-all duration-300 hover:-translate-y-1"
              style={{
                background: '#162030',
                border: '1px solid #1e2d3d',
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.borderColor = 'rgba(232,25,44,0.3)')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.borderColor = '#1e2d3d')
              }
            >
              {/* Quote icon */}
              <div className="mb-4">
                <Quote
                  size={28}
                  style={{ color: '#E8192C', opacity: 0.6 }}
                />
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(t.rating || 5)].map((_, idx) => (
                  <Star
                    key={idx}
                    size={14}
                    className="fill-current"
                    style={{ color: '#E8192C' }}
                  />
                ))}
              </div>

              {/* Message */}
              <p className="text-gray-300 text-sm leading-relaxed mb-6 italic flex-1">
                &quot;{t.message}&quot;
              </p>

              {/* Author */}
              <div
                className="flex items-center gap-3 pt-4"
                style={{ borderTop: '1px solid #1e2d3d' }}
              >
                {/* Avatar */}
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 font-black text-sm text-white"
                  style={{
                    background: 'linear-gradient(135deg, #E8192C, #ff4d5e)',
                  }}
                >
                  {getInitials(t.name)}
                </div>
                <div>
                  <div className="font-bold text-white text-sm">
                    {t.name}
                  </div>
                  <div className="text-gray-500 text-xs">{t.title}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Overall rating bar */}
        <div
          className="mt-12 p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-center gap-6 text-center sm:text-left"
          style={{
            background: '#162030',
            border: '1px solid rgba(232,25,44,0.2)',
          }}
        >
          <div>
            <div
              className="text-5xl font-black"
              style={{ color: '#E8192C' }}
            >
              5.0
            </div>
            <div className="flex gap-1 justify-center sm:justify-start mt-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className="fill-current"
                  style={{ color: '#E8192C' }}
                />
              ))}
            </div>
          </div>
          <div
            className="w-px h-12 hidden sm:block"
            style={{ background: '#1e2d3d' }}
          />
          <div>
            <div className="text-white font-bold text-lg">
              Average Rating
            </div>
            <div className="text-gray-400 text-sm">
              Based on 5,000+ verified customer reviews
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}