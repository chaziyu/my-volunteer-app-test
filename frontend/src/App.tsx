import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import VolunteerDashboard from './pages/VolunteerDashboard';
import OrganizerDashboard from './pages/OrganizerDashboard';
import { MOCK_EVENTS, MOCK_USER } from './data/mockData';
import { Event, User } from './types';

// LOGIN SCREEN COMPONENT (Internal to this file for simplicity)
const LoginScreen = ({ onLogin }: { onLogin: (role: 'volunteer' | 'organizer') => void }) => (
  <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 flex items-center justify-center p-4">
    <div className="bg-white max-w-md w-full p-8 rounded-3xl shadow-2xl text-center border-4 border-white">
      <div className="bg-emerald-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
        <span className="text-4xl">🏙️</span>
      </div>
      <h1 className="text-3xl font-extrabold text-gray-900 mb-2 tracking-tight">VolunteerHub</h1>
      <p className="text-emerald-600 font-medium mb-8 bg-emerald-50 inline-block px-4 py-1 rounded-full text-sm">
        SDG 11: Sustainable Cities
      </p>
      
      <div className="space-y-4">
        <button 
          onClick={() => onLogin('volunteer')}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white p-4 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all shadow-lg shadow-emerald-200 hover:scale-[1.02]"
        >
           Volunteer Login
        </button>
        <button 
          onClick={() => onLogin('organizer')}
          className="w-full bg-white border-2 border-gray-200 hover:border-gray-400 text-gray-700 p-4 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all hover:bg-gray-50"
        >
           Organizer Login
        </button>
      </div>
      <p className="mt-8 text-xs text-gray-400">Group 25 SULAM Project • Powered by React & FastAPI</p>
    </div>
  </div>
);

function App() {
  // State Simulation (In a real app, this comes from Clerk + Backend)
  const [userRole, setUserRole] = useState<'volunteer' | 'organizer' | null>(null);
  const [events, setEvents] = useState<Event[]>(MOCK_EVENTS);
  const [user, setUser] = useState<User>(MOCK_USER);
  const [myEvents, setMyEvents] = useState<number[]>([]); // Store IDs of joined events

  const handleLogin = (role: 'volunteer' | 'organizer') => {
    setUserRole(role);
    // Reset user role in mock data for display purposes
    setUser({ ...user, role }); 
  };

  const handleLogout = () => {
    setUserRole(null);
  };

  const handleJoinEvent = (eventId: number) => {
    if (myEvents.includes(eventId)) return;
    
    setMyEvents([...myEvents, eventId]);
    
    // Update local event stats
    setEvents(events.map(e => 
      e.id === eventId ? { ...e, participants: e.participants + 1 } : e
    ));

    // Badge Logic (Gamification)
    const newEventCount = user.eventsJoined + 1;
    let newBadges = [...user.badges];
    if (newEventCount >= 5 && !newBadges.includes("Super Star")) {
      alert("🏆 You earned the 'Super Star' Badge!");
      newBadges.push("Super Star");
    }

    setUser({
      ...user,
      eventsJoined: newEventCount,
      badges: newBadges
    });
  };

  const handleAddEvent = (newEvent: Partial<Event>) => {
    const eventObj: Event = {
      id: events.length + 1,
      title: newEvent.title || 'New Event',
      location: newEvent.location || 'TBD',
      date: newEvent.date || '2025-01-01',
      organizer: 'Group 25 Admin',
      description: newEvent.description || '',
      participants: 0,
      maxParticipants: 50,
      status: 'Open',
      image: '🗓️'
    };
    setEvents([eventObj, ...events]);
    alert("Event created successfully!");
  };

  // If not logged in, show Login Screen
  if (!userRole) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
        <Navbar userRole={userRole} onLogout={handleLogout} />
        
        <main className="max-w-6xl mx-auto px-4 py-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
              {userRole === 'organizer' ? 'Organizer Dashboard' : 'Volunteer Dashboard'}
            </h2>
            <p className="text-gray-500 mt-1">Welcome back, {user.name}</p>
          </div>

          <Routes>
            <Route path="/" element={
              userRole === 'organizer' ? (
                <OrganizerDashboard events={events} addEvent={handleAddEvent} />
              ) : (
                <VolunteerDashboard 
                  events={events} 
                  user={user} 
                  joinEvent={handleJoinEvent}
                  joinedEventIds={myEvents}
                />
              )
            } />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;