'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Upload, X, Plus } from 'lucide-react';
import { carsApi } from '@/lib/api';
import toast from 'react-hot-toast';

const BRANDS = ['BMW', 'Mercedes-Benz', 'Audi', 'Porsche', 'Range Rover', 'Lexus', 'Toyota', 'Volkswagen', 'Jaguar', 'Bentley', 'Ferrari', 'Lamborghini', 'Rolls-Royce', 'Maserati', 'Aston Martin'];
const TYPES = ['Sedan', 'SUV', 'Coupe', 'Convertible', 'Hatchback', 'Truck', 'Van', 'Sports'];
const FUELS = ['Petrol', 'Diesel', 'Hybrid', 'Electric'];
const TRANSMISSIONS = ['Automatic', 'Manual', 'Semi-Automatic'];
const CONDITIONS = ['New', 'Used', 'Certified Pre-Owned'];

const inputClass = "w-full rounded-xl px-4 py-3 text-white text-sm focus:outline-none transition-all placeholder-gray-600";
const inputStyle = { background: '#162030', border: '1px solid #1e2d3d' };

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1.5" style={{ color: '#9ca3af' }}>
        {label}
      </label>
      {children}
    </div>
  );
}

export default function NewCarPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [images, setImages] = useState<string[]>([]);

  const [form, setForm] = useState({
    brand: '', model: '', year: new Date().getFullYear(), price: '',
    originalPrice: '', type: 'Sedan', condition: 'Used', mileage: '',
    engine: '', transmission: 'Automatic', fuelType: 'Petrol',
    color: '', description: '', location: 'Karatina, Kenya',
    isFeatured: false, isLuxury: false,
    features: [] as string[],
  });

  const [featureInput, setFeatureInput] = useState('');

  const set = (key: string, val: any) =>
    setForm((p) => ({ ...p, [key]: val }));

  const focusStyle = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = '#E8192C';
    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(232,25,44,0.08)';
  };
  const blurStyle = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = '#1e2d3d';
    e.currentTarget.style.boxShadow = 'none';
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setUploading(true);
    try {
      const fd = new FormData();
      Array.from(files).forEach((f) => fd.append('images', f));
      const res = await carsApi.uploadImages(fd);
      const urls: string[] = res.data.urls || res.data;
      setImages((prev) => [...prev, ...urls]);
      toast.success(`${urls.length} image(s) uploaded`);
    } catch {
      toast.error('Image upload failed');
    } finally {
      setUploading(false);
    }
  };

  const addFeature = () => {
    if (!featureInput.trim()) return;
    set('features', [...form.features, featureInput.trim()]);
    setFeatureInput('');
  };

  const removeFeature = (i: number) =>
    set('features', form.features.filter((_, idx) => idx !== i));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.brand || !form.model || !form.price) {
      toast.error('Please fill required fields');
      return;
    }
    setSaving(true);
    try {
      await carsApi.create({
        ...form,
        price: Number(form.price),
        originalPrice: form.originalPrice ? Number(form.originalPrice) : undefined,
        mileage: form.mileage ? Number(form.mileage) : undefined,
        images,
      });
      toast.success('Car added successfully!');
      router.push('/admin/cars');
    } catch {
      toast.error('Failed to save car');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-5">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link
          href="/admin/cars"
          className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors"
          style={{ background: '#0f1520', border: '1px solid #1e2d3d', color: '#9ca3af' }}
        >
          <ArrowLeft size={16} />
        </Link>
        <div>
          <h1 className="text-2xl font-black text-white">Add New Car</h1>
          <p style={{ color: '#6b7280' }} className="text-sm">Fill in the vehicle details</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Images */}
        <section
          className="rounded-2xl p-6"
          style={{ background: '#0f1520', border: '1px solid #1e2d3d' }}
        >
          <h2 className="font-bold text-white mb-4">Vehicle Images</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
            {images.map((img, i) => (
              <div key={i} className="relative h-28 rounded-xl overflow-hidden group">
                <Image src={img} alt="" fill className="object-cover" />
                <button
                  type="button"
                  onClick={() => setImages((p) => p.filter((_, idx) => idx !== i))}
                  className="absolute top-1 right-1 w-6 h-6 rounded-full bg-red-600 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X size={12} className="text-white" />
                </button>
                {i === 0 && (
                  <div className="absolute bottom-1 left-1 text-xs px-1.5 py-0.5 rounded font-bold"
                    style={{ background: '#E8192C', color: '#fff' }}>
                    Main
                  </div>
                )}
              </div>
            ))}
            <label
              className="h-28 rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer transition-all"
              style={{
                border: '2px dashed #1e2d3d',
                background: '#162030',
                color: '#4b5563',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#E8192C')}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#1e2d3d')}
            >
              {uploading ? (
                <div className="w-6 h-6 border-2 border-red-400 border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Upload size={20} />
                  <span className="text-xs font-medium">Upload Images</span>
                </>
              )}
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleImageUpload}
                disabled={uploading}
              />
            </label>
          </div>
          <p className="text-xs" style={{ color: '#4b5563' }}>
            First image will be the main display image. Accepts JPG, PNG, WEBP.
          </p>
        </section>

        {/* Basic Info */}
        <section
          className="rounded-2xl p-6"
          style={{ background: '#0f1520', border: '1px solid #1e2d3d' }}
        >
          <h2 className="font-bold text-white mb-4">Basic Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Brand *">
              <select
                value={form.brand}
                onChange={(e) => set('brand', e.target.value)}
                required
                className={inputClass}
                style={inputStyle}
                onFocus={focusStyle}
                onBlur={blurStyle}
              >
                <option value="">Select Brand</option>
                {BRANDS.map((b) => <option key={b} value={b}>{b}</option>)}
              </select>
            </Field>

            <Field label="Model *">
              <input
                type="text"
                value={form.model}
                onChange={(e) => set('model', e.target.value)}
                placeholder="e.g. X5 M50i"
                required
                className={inputClass}
                style={inputStyle}
                onFocus={focusStyle}
                onBlur={blurStyle}
              />
            </Field>

            <Field label="Year *">
              <input
                type="number"
                value={form.year}
                onChange={(e) => set('year', Number(e.target.value))}
                min={1990}
                max={new Date().getFullYear() + 1}
                required
                className={inputClass}
                style={inputStyle}
                onFocus={focusStyle}
                onBlur={blurStyle}
              />
            </Field>

            <Field label="Type">
              <select
                value={form.type}
                onChange={(e) => set('type', e.target.value)}
                className={inputClass}
                style={inputStyle}
                onFocus={focusStyle}
                onBlur={blurStyle}
              >
                {TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </Field>

            <Field label="Condition">
              <select
                value={form.condition}
                onChange={(e) => set('condition', e.target.value)}
                className={inputClass}
                style={inputStyle}
                onFocus={focusStyle}
                onBlur={blurStyle}
              >
                {CONDITIONS.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </Field>

            <Field label="Color">
              <input
                type="text"
                value={form.color}
                onChange={(e) => set('color', e.target.value)}
                placeholder="e.g. Midnight Black"
                className={inputClass}
                style={inputStyle}
                onFocus={focusStyle}
                onBlur={blurStyle}
              />
            </Field>

            <Field label="Location">
              <input
                type="text"
                value={form.location}
                onChange={(e) => set('location', e.target.value)}
                placeholder="e.g. Nairobi, Kenya"
                className={inputClass}
                style={inputStyle}
                onFocus={focusStyle}
                onBlur={blurStyle}
              />
            </Field>
          </div>
        </section>

        {/* Pricing */}
        <section
          className="rounded-2xl p-6"
          style={{ background: '#0f1520', border: '1px solid #1e2d3d' }}
        >
          <h2 className="font-bold text-white mb-4">Pricing</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Price (KES) *">
              <input
                type="number"
                value={form.price}
                onChange={(e) => set('price', e.target.value)}
                placeholder="e.g. 5000000"
                required
                className={inputClass}
                style={inputStyle}
                onFocus={focusStyle}
                onBlur={blurStyle}
              />
            </Field>
            <Field label="Original Price (KES) — for discount display">
              <input
                type="number"
                value={form.originalPrice}
                onChange={(e) => set('originalPrice', e.target.value)}
                placeholder="e.g. 6000000"
                className={inputClass}
                style={inputStyle}
                onFocus={focusStyle}
                onBlur={blurStyle}
              />
            </Field>
          </div>
        </section>

        {/* Technical */}
        <section
          className="rounded-2xl p-6"
          style={{ background: '#0f1520', border: '1px solid #1e2d3d' }}
        >
          <h2 className="font-bold text-white mb-4">Technical Specs</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Engine">
              <input
                type="text"
                value={form.engine}
                onChange={(e) => set('engine', e.target.value)}
                placeholder="e.g. 3.0L Turbocharged V6"
                className={inputClass}
                style={inputStyle}
                onFocus={focusStyle}
                onBlur={blurStyle}
              />
            </Field>
            <Field label="Mileage (km)">
              <input
                type="number"
                value={form.mileage}
                onChange={(e) => set('mileage', e.target.value)}
                placeholder="e.g. 45000"
                className={inputClass}
                style={inputStyle}
                onFocus={focusStyle}
                onBlur={blurStyle}
              />
            </Field>
            <Field label="Transmission">
              <select
                value={form.transmission}
                onChange={(e) => set('transmission', e.target.value)}
                className={inputClass}
                style={inputStyle}
                onFocus={focusStyle}
                onBlur={blurStyle}
              >
                {TRANSMISSIONS.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </Field>
            <Field label="Fuel Type">
              <select
                value={form.fuelType}
                onChange={(e) => set('fuelType', e.target.value)}
                className={inputClass}
                style={inputStyle}
                onFocus={focusStyle}
                onBlur={blurStyle}
              >
                {FUELS.map((f) => <option key={f} value={f}>{f}</option>)}
              </select>
            </Field>
          </div>
        </section>

        {/* Description */}
        <section
          className="rounded-2xl p-6"
          style={{ background: '#0f1520', border: '1px solid #1e2d3d' }}
        >
          <h2 className="font-bold text-white mb-4">Description & Features</h2>
          <Field label="Description">
            <textarea
              value={form.description}
              onChange={(e) => set('description', e.target.value)}
              rows={4}
              placeholder="Describe the vehicle — condition, history, highlights..."
              className={inputClass + ' resize-none'}
              style={inputStyle}
              onFocus={focusStyle}
              onBlur={blurStyle}
            />
          </Field>

          {/* Features list */}
          <div className="mt-4">
            <label className="block text-sm font-medium mb-2" style={{ color: '#9ca3af' }}>
              Key Features
            </label>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={featureInput}
                onChange={(e) => setFeatureInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                placeholder="e.g. Panoramic Sunroof"
                className={inputClass + ' flex-1'}
                style={inputStyle}
                onFocus={focusStyle}
                onBlur={blurStyle}
              />
              <button
                type="button"
                onClick={addFeature}
                className="px-4 py-2.5 rounded-xl text-sm font-bold text-white"
                style={{ background: '#E8192C' }}
              >
                <Plus size={16} />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {form.features.map((f, i) => (
                <span
                  key={i}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium"
                  style={{ background: 'rgba(232,25,44,0.1)', color: '#E8192C', border: '1px solid rgba(232,25,44,0.2)' }}
                >
                  {f}
                  <button type="button" onClick={() => removeFeature(i)}>
                    <X size={12} />
                  </button>
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Flags */}
        <section
          className="rounded-2xl p-6"
          style={{ background: '#0f1520', border: '1px solid #1e2d3d' }}
        >
          <h2 className="font-bold text-white mb-4">Listing Options</h2>
          <div className="flex flex-col sm:flex-row gap-4">
            {[
              { key: 'isFeatured', label: 'Mark as Featured', desc: 'Show on homepage featured section' },
              { key: 'isLuxury', label: 'Mark as Luxury', desc: 'Add to luxury vehicles collection' },
            ].map((opt) => (
              <label
                key={opt.key}
                className="flex items-start gap-3 p-4 rounded-xl cursor-pointer flex-1 transition-all"
                style={{
                  background: (form as any)[opt.key] ? 'rgba(232,25,44,0.08)' : '#162030',
                  border: `1px solid ${(form as any)[opt.key] ? 'rgba(232,25,44,0.3)' : '#1e2d3d'}`,
                }}
              >
                <input
                  type="checkbox"
                  checked={(form as any)[opt.key]}
                  onChange={(e) => set(opt.key, e.target.checked)}
                  className="mt-0.5 accent-red-600"
                />
                <div>
                  <div className="text-white text-sm font-semibold">{opt.label}</div>
                  <div className="text-xs mt-0.5" style={{ color: '#6b7280' }}>{opt.desc}</div>
                </div>
              </label>
            ))}
          </div>
        </section>

        {/* Submit */}
        <div className="flex gap-3 pb-6">
          <Link
            href="/admin/cars"
            className="px-6 py-3 rounded-xl text-sm font-bold transition-colors"
            style={{ background: '#162030', color: '#9ca3af', border: '1px solid #1e2d3d' }}
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="flex-1 py-3 rounded-xl font-bold text-white text-sm flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            style={{ background: 'linear-gradient(135deg, #E8192C, #ff4d5e)' }}
          >
            {saving ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Saving...
              </>
            ) : (
              'Save Vehicle'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}