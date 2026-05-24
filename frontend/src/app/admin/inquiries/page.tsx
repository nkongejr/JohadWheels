'use client';

import { useState, useEffect } from 'react';
import { MessageSquare, Trash2, Check, Phone, Mail } from 'lucide-react';
import { contactApi } from '@/lib/api';
import toast from 'react-hot-toast';

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  const load = async () => {
    setLoading(true);
    try {
      const res = await contactApi.getAll();
      setInquiries(res.data || []);
    } catch {
      toast.error('Failed to load inquiries');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const markRead = async (id: string) => {
    try {
      await contactApi.updateStatus(id, { status: 'read' });
      setInquiries((p) =>
        p.map((i) => (i._id === id ? { ...i, status: 'read' } : i))
      );
    } catch {
      toast.error('Failed to update');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this inquiry?')) return;
    try {
      await contactApi.delete(id);
      setInquiries((p) => p.filter((i) => i._id !== id));
      toast.success('Deleted');
    } catch {
      toast.error('Failed to delete');
    }
  };

  const filtered = inquiries.filter(
    (i) => filter === 'all' || i.status === filter || (!i.status && filter === 'new')
  );

  const newCount = inquiries.filter((i) => !i.status || i.status === 'new').length;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white">Inquiries</h1>
          <p style={{ color: '#6b7280' }} className="text-sm">
            {newCount} new · {inquiries.length} total
          </p>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2">
        {['all', 'new', 'read'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className="px-4 py-2 rounded-xl text-sm font-semibold capitalize transition-all"
            style={
              filter === f
                ? { background: '#E8192C', color: '#fff' }
                : { background: '#0f1520', color: '#9ca3af', border: '1px solid #1e2d3d' }
            }
          >
            {f} {f === 'new' && newCount > 0 && `(${newCount})`}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="space-y-3">
        {loading ? (
          [...Array(4)].map((_, i) => (
            <div key={i} className="h-28 rounded-2xl animate-pulse" style={{ background: '#0f1520' }} />
          ))
        ) : filtered.length === 0 ? (
          <div className="rounded-2xl p-16 text-center" style={{ background: '#0f1520', border: '1px solid #1e2d3d' }}>
            <MessageSquare size={40} className="mx-auto mb-3 opacity-20 text-white" />
            <p className="text-white font-bold">No inquiries</p>
          </div>
        ) : (
          filtered.map((inq) => {
            const isNew = !inq.status || inq.status === 'new';
            return (
              <div
                key={inq._id}
                className="rounded-2xl p-5 transition-all"
                style={{
                  background: '#0f1520',
                  border: `1px solid ${isNew ? 'rgba(232,25,44,0.25)' : '#1e2d3d'}`,
                }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-white">{inq.name}</span>
                      {isNew && (
                        <span
                          className="text-xs font-bold px-2 py-0.5 rounded"
                          style={{ background: 'rgba(232,25,44,0.15)', color: '#E8192C' }}
                        >
                          New
                        </span>
                      )}
                      {inq.subject && (
                        <span
                          className="text-xs px-2 py-0.5 rounded"
                          style={{ background: '#1e2d3d', color: '#9ca3af' }}
                        >
                          {inq.subject}
                        </span>
                      )}
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed mb-3">
                      {inq.message}
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {inq.email && (
                        <a
                          href={`mailto:${inq.email}`}
                          className="flex items-center gap-1.5 text-xs transition-colors"
                          style={{ color: '#6b7280' }}
                        >
                          <Mail size={12} style={{ color: '#E8192C' }} />
                          {inq.email}
                        </a>
                      )}
                      {inq.phone && (
                        <a
                          href={`tel:${inq.phone}`}
                          className="flex items-center gap-1.5 text-xs"
                          style={{ color: '#6b7280' }}
                        >
                          <Phone size={12} style={{ color: '#E8192C' }} />
                          {inq.phone}
                        </a>
                      )}
                      <span className="text-xs" style={{ color: '#4b5563' }}>
                        {new Date(inq.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {isNew && (
                      <button
                        onClick={() => markRead(inq._id)}
                        className="w-8 h-8 rounded-lg flex items-center justify-center transition-all"
                        style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)' }}
                        title="Mark as read"
                      >
                        <Check size={14} style={{ color: '#10b981' }} />
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(inq._id)}
                      className="w-8 h-8 rounded-lg flex items-center justify-center transition-all"
                      style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)' }}
                    >
                      <Trash2 size={14} style={{ color: '#ef4444' }} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}