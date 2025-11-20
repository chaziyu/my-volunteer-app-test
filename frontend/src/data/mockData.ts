import { Event, User } from "../types";

export const MOCK_EVENTS: Event[] = [
  {
    id: 1,
    title: "Urban Garden Cleanup (SDG 11)",
    location: "KK12 Hall Area",
    date: "2025-11-25",
    organizer: "UM Eco Club",
    description: "Help us maintain the community garden. Tools provided. Snacks included!",
    participants: 12,
    maxParticipants: 20,
    status: "Open",
    image: "🌱"
  },
  {
    id: 2,
    title: "Recycling Drive 2025",
    location: "Student Union Building",
    date: "2025-12-01",
    organizer: "Student Council",
    description: "Collecting e-waste and paper for sustainable disposal.",
    participants: 45,
    maxParticipants: 100,
    status: "Open",
    image: "♻️"
  },
  {
    id: 3,
    title: "Food Bank Sorting",
    location: "Community Center",
    date: "2025-11-28",
    organizer: "Food Aid Foundation",
    description: "Sorting donated goods for distribution to urban poor.",
    participants: 15,
    maxParticipants: 15,
    status: "Full",
    image: "🍱"
  }
];

export const MOCK_USER: User = {
  id: "user_123",
  name: "Volunteer Alex",
  role: "volunteer",
  badges: ["Newbie", "Green Hero"],
  eventsJoined: 4
};