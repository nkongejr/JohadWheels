'use client';

import {
  CheckCircle,
  DollarSign,
  CreditCard,
  HeadphonesIcon,
  Truck,
  Users
} from 'lucide-react';

const features = [
  {
    icon: CheckCircle,
    title: 'Verified Vehicles',
    desc: 'All cars undergo thorough inspection and verification before listing.',
  },
  {
    icon: DollarSign,
    title: 'Affordable Prices',
    desc: 'Best market prices for premium vehicles — no hidden charges.',
  },
  {
    icon: CreditCard,
    title: 'Flexible Financing',
    desc: 'Easy loan options with competitive interest rates tailored for you.',
  },
  {
    icon: HeadphonesIcon,
    title: 'Expert Support',
    desc: 'Dedicated team to assist you throughout the entire purchase journey.',
  },
  {
    icon: Truck,
    title: 'Fast Delivery',
    desc: 'Quick delivery and efficient paperwork processing nationwide.',
  },
  {
    icon: Users,
    title: 'Trusted Partner',
    desc: '2+ years experience with over 5,000 satisfied clients across Kenya.',
  },
];

export default function WhyChooseUs() {
  return (
    <section
      className="section-padding"
      style={{ background: '#0a0a0f' }}
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-14">
          <div
            className="text-sm font-semibold mb-3 uppercase tracking-wider"
            style={{ color: '#E8192C' }}
          >
            Our Advantages
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            Why Choose{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #E8192C, #ff4d5e)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              JOHAD WHEELS?
            </span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Industry-leading service, premium selection, and a team that puts
            you first.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div
                key={i}
                className="p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1 group cursor-default"
                style={{
                  background: '#0f1520',
                  border: '1px solid #1e2d3d',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(232,25,44,0.35)';
                  e.currentTarget.style.boxShadow =
                    '0 16px 40px rgba(232,25,44,0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#1e2d3d';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
                  style={{
                    background: 'rgba(232,25,44,0.1)',
                    border: '1px solid rgba(232,25,44,0.2)',
                  }}
                >
                  <Icon size={22} style={{ color: '#E8192C' }} />
                </div>

                {/* Title */}
                <h3 className="font-bold text-white text-lg mb-2">
                  {f.title}
                </h3>

                {/* Desc */}
                <p className="text-gray-400 text-sm leading-relaxed">
                  {f.desc}
                </p>

                {/* Bottom accent line on hover */}
                <div
                  className="mt-4 h-0.5 w-0 group-hover:w-full transition-all duration-300 rounded-full"
                  style={{ background: 'linear-gradient(90deg, #E8192C, transparent)' }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}