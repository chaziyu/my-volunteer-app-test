import React, { useState } from 'react';
import { Plus, Users, Calendar } from 'lucide-react';
import { Event } from '../types';

interface Props {
  events: Event[];
  addEvent: (event: Partial<Event>) => void;
}

export default function OrganizerDashboard({ events, addEvent }: Props) {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ title: '', date: '', location: '', description: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addEvent(formData);
    setShowModal(false);
    setFormData({ title: '', date: '', location: '', description: '' });
  };

  return (
    <div className="animate-in slide-in-from-bottom-4 duration-500">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:border-emerald-200 transition-colors">
          <p className="text-gray-500 text-sm font-medium mb-1">Active Events</p>
          <p className="text-4xl font-bold text-gray-800">{events.length}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:border-emerald-200 transition-colors">
          <p className="text-gray-500 text-sm font-medium mb-1">Total Impact</p>
          <p className="text-4xl font-bold text-emerald-600">
            {events.reduce((acc, curr) => acc + curr.participants, 0)} <span className="text-lg text-gray-400 font-normal">volunteers</span>
          </p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-gray-900 hover:bg-gray-800 text-white p-6 rounded-2xl shadow-lg flex flex-col items-center justify-center gap-2 transition-all transform hover:scale-[1.02]"
        >
          <Plus size={28} className="text-emerald-400" />
          <span className="font-bold">Create New Event</span>
        </button>
      </div>

      {/* Events Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h3 className="font-bold text-gray-800 text-lg">Managed Events</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider font-semibold">
              <tr>
                <th className="p-5">Event Name</th>
                <th className="p-5">Date</th>
                <th className="p-5">Participation</th>
                <th className="p-5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {events.map(ev => (
                <tr key={ev.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-5 font-bold text-gray-800">{ev.title}</td>
                  <td className="p-5 text-gray-600 flex items-center gap-2">
                    <Calendar size={14} /> {ev.date}
                  </td>
                  <td className="p-5 text-gray-600">
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-emerald-500" 
                          style={{ width: `${(ev.participants / ev.maxParticipants) * 100}%` }}
                        />
                      </div>
                      <span className="text-xs font-mono">{ev.participants}/{ev.maxParticipants}</span>
                    </div>
                  </td>
                  <td className="p-5">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      ev.status === 'Full' ? 'bg-red-100 text-red-600' : 'bg-emerald-100 text-emerald-700'
                    }`}>
                      {ev.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Event Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-lg rounded-2xl p-8 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900">New Event</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">Event Title</label>
                <input required type="text" className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all" 
                  value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} placeholder="e.g. Beach Cleanup" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5">Date</label>
                  <input required type="date" className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" 
                    value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5">Location</label>
                  <input required type="text" className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" 
                    value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} placeholder="e.g. Central Park" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">Description</label>
                <textarea required className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" rows={3}
                  value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} placeholder="What will volunteers do?" />
              </div>
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 bg-gray-100 text-gray-600 py-3 rounded-xl font-bold hover:bg-gray-200 transition-colors">Cancel</button>
                <button type="submit" className="flex-1 bg-emerald-600 text-white py-3 rounded-xl font-bold hover:bg-emerald-700 shadow-lg shadow-emerald-200 transition-all">Create Event</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}