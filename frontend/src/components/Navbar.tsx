import React from 'react';
import { Link } from 'react-router-dom';
import { LayoutDashboard, LogOut, User as UserIcon } from 'lucide-react';

interface NavbarProps {
  userRole: 'volunteer' | 'organizer' | null;
  onLogout: () => void;
}

export default function Navbar({ userRole, onLogout }: NavbarProps) {
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="bg-emerald-600 text-white p-1.5 rounded-lg">
            <LayoutDashboard size={20} />
          </div>
          <span className="font-bold text-gray-800 text-lg tracking-tight">VolunteerHub</span>
        </Link>

        <div className="flex items-center gap-4">
          {userRole ? (
            <>
              <span className="text-sm font-medium text-gray-600 hidden sm:block bg-gray-100 px-3 py-1 rounded-full">
                {userRole === 'organizer' ? 'Organizer Mode' : 'Volunteer Mode'}
              </span>
              <button 
                onClick={onLogout}
                className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-red-600 transition-colors"
              >
                <LogOut size={18} />
                Logout
              </button>
              <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700 font-bold border border-emerald-200">
                <UserIcon size={16} />
              </div>
            </>
          ) : (
            <Link to="/" className="text-sm font-bold text-emerald-600 hover:underline">
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}