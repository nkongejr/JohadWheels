'use client';

import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import { Car, Users, TrendingUp, Award } from 'lucide-react';

const stats = [
  { value: 500, suffix: '+', label: 'Premium Cars', icon: Car },
  { value: 5000, suffix: '+', label: 'Happy Clients', icon: Users },
  { value: 98, suffix: '%', label: 'Success Rate', icon: TrendingUp },
  { value: 2, suffix: '+', label: 'Years Experience', icon: Award },
];

export default function StatsSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <section
      ref={ref}
      className="py-16"
      style={{
        background: '#0f1520',
        borderTop: '1px solid #1e2d3d',
        borderBottom: '1px solid #1e2d3d',
      }}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={i}
                className="text-center group"
              >
                {/* Icon */}
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:scale-110"
                  style={{
                    background: 'rgba(232,25,44,0.1)',
                    border: '1px solid rgba(232,25,44,0.2)',
                  }}
                >
                  <Icon size={24} style={{ color: '#E8192C' }} />
                </div>

                {/* Number */}
                <div className="text-3xl md:text-4xl font-black text-white mb-1">
                  {inView ? (
                    <CountUp end={stat.value} duration={2.5} separator="," />
                  ) : (
                    '0'
                  )}
                  <span style={{ color: '#E8192C' }}>{stat.suffix}</span>
                </div>

                {/* Label */}
                <div className="text-gray-400 text-sm font-medium">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}