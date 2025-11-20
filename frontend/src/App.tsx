import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import VolunteerDashboard from './pages/VolunteerDashboard';
import OrganizerDashboard from './pages/OrganizerDashboard';
import { MOCK_EVENTS, MOCK_USER } from './data/mockData';
import { Event, User } from './types';

// --- LOGIN SCREEN COMPONENT ---
const LoginScreen = ({ onLogin }: { onLogin: (role: 'volunteer' | 'organizer') => void }) => (
  <div className="min-h-screen flex items-center justify-center p-4 bg-green-50">
    <div className="bg-white max-w-md w-full p-8 rounded-3xl shadow-xl text-center border border-green-100">
      <div className="bg-emerald-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
        <span className="text-4xl">🏙️</span>
      </div>
      <h1 className="text-3xl font-extrabold text-gray-900 mb-2">VolunteerHub</h1>
      <p className="text-emerald-600 font-medium mb-8 bg-emerald-50 inline-block px-4 py-1 rounded-full text-sm">
        SDG 11: Sustainable Cities
      </p>
      
      <div className="space-y-4">
        <button 
          onClick={() => onLogin('volunteer')}
          className="btn-primary w-full flex items-center justify-center gap-3"
        >
           Volunteer Login
        </button>
        <button 
          onClick={() => onLogin('organizer')}
          className="btn-secondary w-full flex items-center justify-center gap-3"
        >
           Organizer Login
        </button>
      </div>
      <p className="mt-8 text-xs text-gray-400">Group 25 SULAM Project • Powered by React</p>
    </div>
  </div>
);

// --- MAIN APP COMPONENT ---
function App() {
  // State Management (Simulating a Database)
  const [userRole, setUserRole] = useState<'volunteer' | 'organizer' | null>(null);
  const [events, setEvents] = useState<Event[]>(MOCK_EVENTS);
  const [user, setUser] = useState<User>(MOCK_USER);
  const [myEvents, setMyEvents] = useState<number[]>([]); 

  // Login Handler
  const handleLogin = (role: 'volunteer' | 'organizer') => {
    setUserRole(role);
    setUser({ ...user, role }); 
  };

  // Logout Handler
  const handleLogout = () => {
    setUserRole(null);
  };

  // Volunteer: Join Event Handler
  const handleJoinEvent = (eventId: number) => {
    if (myEvents.includes(eventId)) return;
    
    setMyEvents([...myEvents, eventId]);
    
    // Update participant count locally
    setEvents(events.map(e => 
      e.id === eventId ? { ...e, participants: e.participants + 1 } : e
    ));

    // Gamification Logic: Award Badge
    const newEventCount = user.eventsJoined + 1;
    let newBadges = [...user.badges];
    
    if (newEventCount >= 5 && !newBadges.includes("Super Star")) {
      alert("🏆 CONGRATULATIONS! You earned the 'Super Star' Badge!");
      newBadges.push("Super Star");
    }

    setUser({
      ...user,
      eventsJoined: newEventCount,
      badges: newBadges
    });
  };

  // Organizer: Create Event Handler
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

  // Render Login Screen if no user role
  if (!userRole) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  // Render Dashboard if logged in
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
        <Navbar userRole={userRole} onLogout={handleLogout} />
        
        <main className="max-w-6xl mx-auto px-4 py-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
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