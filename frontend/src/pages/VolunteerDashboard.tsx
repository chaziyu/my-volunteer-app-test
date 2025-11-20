import React, { useState } from 'react';
import { MapPin, Calendar, Star, CheckCircle, Search, Award } from 'lucide-react';
import { Event, User } from '../types';

interface Props {
  events: Event[];
  user: User;
  joinEvent: (id: number) => void;
  joinedEventIds: number[];
}

export default function VolunteerDashboard({ events, user, joinEvent, joinedEventIds }: Props) {
  const [filter, setFilter] = useState('');

  const filteredEvents = events.filter(e => 
    e.title.toLowerCase().includes(filter.toLowerCase()) || 
    e.location.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in duration-500">
      
      {/* LEFT COLUMN: User Profile & Stats */}
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-2xl border-2 border-emerald-50">
              👤
            </div>
            <div>
              <h3 className="font-bold text-lg text-gray-800">{user.name}</h3>
              <p className="text-xs text-gray-500 font-mono bg-gray-100 px-2 py-1 rounded">ID: {user.id}</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
              <span className="text-gray-600 font-medium">Events Joined</span>
              <span className="font-bold text-emerald-600 text-2xl">{user.eventsJoined}</span>
            </div>
            
            <div>
              <p className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                <Award size={16} className="text-orange-500" /> Badges Earned
              </p>
              <div className="flex flex-wrap gap-2">
                {user.badges.map((badge, idx) => (
                  <span key={idx} className="px-3 py-1 bg-orange-50 text-orange-700 text-xs font-bold rounded-full border border-orange-200 shadow-sm">
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: Events Feed */}
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white p-2 rounded-xl shadow-sm border border-gray-100 flex gap-2 sticky top-20 z-10">
          <div className="flex-1 bg-gray-50 rounded-lg flex items-center px-4">
            <Search className="text-gray-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search volunteer opportunities..." 
              className="w-full bg-transparent p-3 outline-none text-sm"
              onChange={(e) => setFilter(e.target.value)}
            />
          </div>
        </div>

        <div className="grid gap-4">
          {filteredEvents.map(ev => {
            const isJoined = joinedEventIds.includes(ev.id);
            return (
              <div key={ev.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-6 hover:shadow-md transition-shadow">
                <div className="w-full sm:w-32 h-32 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl flex items-center justify-center text-5xl shrink-0 shadow-inner">
                  {ev.image}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                      {ev.organizer}
                    </span>
                    <div className="flex items-center text-yellow-500 text-xs font-bold gap-1 bg-yellow-50 px-2 py-0.5 rounded-full">
                      <Star size={12} fill="currentColor" /> 4.8
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{ev.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">{ev.description}</p>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                    <div className="flex items-center gap-1.5">
                      <Calendar size={16} className="text-emerald-500" /> {ev.date}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin size={16} className="text-emerald-500" /> {ev.location}
                    </div>
                  </div>

                  <button 
                    onClick={() => joinEvent(ev.id)}
                    disabled={isJoined || ev.status === 'Full'}
                    className={`w-full sm:w-auto px-6 py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                      isJoined 
                      ? 'bg-gray-100 text-gray-500 cursor-default border border-gray-200' 
                      : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-200'
                    }`}
                  >
                    {isJoined ? (
                      <><CheckCircle size={18} /> Joined</>
                    ) : ev.status === 'Full' ? (
                      "Event Full"
                    ) : (
                      "Join Event"
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}