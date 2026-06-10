// components/ContactClient.tsx
'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { contactApi } from '@/lib/api';
import toast from 'react-hot-toast';
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Facebook,
  Clock,
} from 'lucide-react';

export default function ContactClient() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await contactApi.send(form);
      toast.success("Message sent successfully! We'll be in touch soon.");
      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch {
      toast.error('Failed to send. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      {/* Header */}
      <section
        className="relative pt-36 pb-16"
        style={{ background: 'linear-gradient(to bottom, #000, #0a0a0a)' }}
      >
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-black text-white mb-5">
            Get In <span className="gold-text">Touch</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            We&apos;d love to hear from you. Contact us anytime.
          </p>
        </div>
      </section>

      <section className="section-padding" style={{ background: '#0a0a0a' }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Contact Form */}
            <div
              className="lg:col-span-2 p-8 rounded-2xl border border-gray-800"
              style={{ background: '#111111' }}
            >
              <h2 className="text-2xl font-black text-white mb-6">
                Send Us a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-gray-400 text-sm mb-1.5 block">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Your Name"
                      required
                      className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm mb-1.5 block">
                      Your Email *
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="Your Email"
                      required
                      className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-gray-400 text-sm mb-1.5 block">
                    Your Phone
                  </label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="Your Phone"
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 text-sm"
                  />
                </div>
                <div>
                  <label className="text-gray-400 text-sm mb-1.5 block">
                    Select Subject
                  </label>
                  <select
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-yellow-500 text-sm"
                  >
                    <option value="">Select Subject</option>
                    <option value="Purchase Inquiry">Purchase Inquiry</option>
                    <option value="Test Drive">Book Test Drive</option>
                    <option value="Financing">Financing Options</option>
                    <option value="Trade-In">Trade-In</option>
                    <option value="General">General Inquiry</option>
                  </select>
                </div>
                <div>
                  <label className="text-gray-400 text-sm mb-1.5 block">
                    Your Message *
                  </label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Your Message"
                    required
                    rows={5}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 text-sm resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-gold py-4 rounded-lg font-bold disabled:opacity-50 text-base"
                >
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-5">
              {[
                {
                  icon: <MapPin className="text-yellow-400" size={22} />,
                  title: 'Location',
                  content: ['Karatina, Kenya'],
                },
                {
                  icon: <Phone className="text-yellow-400" size={22} />,
                  title: 'Phone',
                  content: ['0716 296 585', '0797 230 565', '0791 424 616'],
                  links: ['tel:0716296585', 'tel:0797230565', 'tel:0791424616'],
                },
                {
                  icon: <Mail className="text-yellow-400" size={22} />,
                  title: 'Email',
                  content: ['Johadwheels@gmail.com'],
                  links: ['mailto:Johadwheels@gmail.com'],
                },
                {
                  icon: <Clock className="text-yellow-400" size={22} />,
                  title: 'Hours',
                  content: ['Mon - Sat: 8am - 6pm', 'Sunday: 10am - 4pm'],
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="p-5 rounded-xl border border-gray-800"
                  style={{ background: '#111111' }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                      {item.icon}
                    </div>
                    <div className="font-bold text-white">{item.title}</div>
                  </div>
                  <div className="space-y-1 pl-13">
                    {item.content.map((c, j) =>
                      item.links ? (
                        <a
                          key={j}
                          href={item.links[j]}
                          className="block text-gray-400 text-sm hover:text-yellow-400 transition-colors"
                        >
                          {c}
                        </a>
                      ) : (
                        <p key={j} className="text-gray-400 text-sm">
                          {c}
                        </p>
                      ),
                    )}
                  </div>
                </div>
              ))}

              {/* Social */}
              <div
                className="p-5 rounded-xl border border-gray-800"
                style={{ background: '#111111' }}
              >
                <div className="font-bold text-white mb-4">Social Media</div>
                <div className="space-y-2">
                  <a
                    href="https://wa.me/254716296585"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-lg bg-green-600/10 border border-green-600/20 hover:bg-green-600/20 transition-colors"
                  >
                    <MessageCircle size={18} className="text-green-400" />
                    <div>
                      <div className="text-green-400 text-sm font-medium">WhatsApp</div>
                      <div className="text-gray-500 text-xs">Chat with us</div>
                    </div>
                  </a>
                  <a
                    href="https://www.facebook.com/profile.php?id=61590238221238"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-lg bg-blue-600/10 border border-blue-600/20 hover:bg-blue-600/20 transition-colors"
                  >
                    <Facebook size={18} className="text-blue-400" />
                    <div>
                      <div className="text-blue-400 text-sm font-medium">Facebook</div>
                      <div className="text-gray-500 text-xs">Visit our Facebook page</div>
                    </div>
                  </a>
                  <a
                    href="https://www.tiktok.com/@johadwheels"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-lg bg-pink-600/10 border border-pink-600/20 hover:bg-pink-600/20 transition-colors"
                  >
                    <span className="text-pink-400 text-lg w-[18px] text-center">📱</span>
                    <div>
                      <div className="text-pink-400 text-sm font-medium">TikTok</div>
                      <div className="text-gray-500 text-xs">Follow us on TikTok</div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* MAP */}
          <div className="mt-10">
            <div
              className="rounded-2xl overflow-hidden border border-gray-800"
              style={{ background: '#111111' }}
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                    <MapPin className="text-yellow-400" size={18} />
                  </div>
                  <div>
                    <div className="text-white font-bold text-sm">Our Location</div>
                    <div className="text-gray-500 text-xs">Karatina, Kenya</div>
                  </div>
                </div>
                <a
                  href="https://maps.app.goo.gl/2YSsJ95htsaT8QLZA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold"
                  style={{
                    background: 'rgba(234,179,8,0.1)',
                    color: '#eab308',
                    border: '1px solid rgba(234,179,8,0.2)',
                  }}
                >
                  <MapPin size={14} />
                  Open in Google Maps
                </a>
              </div>

              <div className="relative w-full h-[400px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3989.675287329894!2d37.123851!3d-0.48515499999999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMMKwMjknMDYuNiJTIDM3wrAwNycyNS45IkU!5e0!3m2!1sen!2ske!4v1780431646218!5m2!1sen!2ske"
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
              </div>

              <div
                className="px-6 py-4 flex flex-wrap items-center justify-between gap-3"
                style={{ borderTop: '1px solid #1a1a1a' }}
              >
                <div className="flex flex-wrap gap-4">
                  <a
                    href="https://wa.me/254716296585?text=Hi, I need directions to JOHAD WHEELS"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-green-400 hover:text-green-300 transition-colors"
                  >
                    <MessageCircle size={15} />
                    Get Directions via WhatsApp
                  </a>
                  <a
                    href="tel:0716296585"
                    className="flex items-center gap-2 text-sm text-yellow-400 hover:text-yellow-300 transition-colors"
                  >
                    <Phone size={15} />
                    Call for Directions
                  </a>
                </div>
                <div className="text-gray-600 text-xs">
                  📍 Karatina Town, Nyeri County, Kenya
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}