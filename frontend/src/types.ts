export interface User {
  id: string;
  name: string;
  role: 'volunteer' | 'organizer';
  badges: string[];
  eventsJoined: number;
}

export interface Event {
  id: number;
  title: string;
  location: string;
  date: string;
  organizer: string;
  description: string;
  participants: number;
  maxParticipants: number;
  status: 'Open' | 'Full' | 'Completed';
  image: string;
}