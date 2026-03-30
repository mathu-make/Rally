import { TripMember, Activity } from '../types';

export const SEED_MEMBERS: TripMember[] = [
  { id: 'm1', name: 'Alex', avatarColor: 'bg-violet-500', initials: 'AL' },
  { id: 'm2', name: 'Maya', avatarColor: 'bg-rose-500', initials: 'MA' },
  { id: 'm3', name: 'Jordan', avatarColor: 'bg-blue-500', initials: 'JO' },
  { id: 'm4', name: 'Sam', avatarColor: 'bg-emerald-500', initials: 'SA' },
  { id: 'm5', name: 'Riley', avatarColor: 'bg-amber-500', initials: 'RI' },
];

export const SEED_ACTIVITIES: Activity[] = [
  {
    id: 'a1',
    title: 'Ramen Tour in Shinjuku 🍜',
    description: 'Hitting up 3 legendary ramen spots. Come hungry! We will meet near the Godzilla head.',
    date: '2026-04-10',
    startTime: '18:00',
    endTime: '21:00',
    location: 'Shinjuku, Tokyo',
    status: 'open',
    createdByMemberId: 'm1',
    bookedByMemberId: null,
    participantIds: ['m1', 'm3', 'm4'],
    createdAt: new Date().toISOString()
  },
  {
    id: 'a2',
    title: 'TeamLab Borderless ✨',
    description: 'Immersive digital art museum. I got the tickets already, just show up on time!',
    date: '2026-04-11',
    startTime: '10:00',
    endTime: '13:00',
    location: 'Azabudai Hills, Tokyo',
    status: 'booked',
    createdByMemberId: 'm2',
    bookedByMemberId: 'm2',
    participantIds: ['m1', 'm2', 'm3', 'm4', 'm5'],
    createdAt: new Date().toISOString()
  },
  {
    id: 'a3',
    title: 'Tsukiji Market Breakfast 🍣',
    description: 'Early morning fresh sushi and street food. Yes, it means waking up at 6 AM. Worth it.',
    date: '2026-04-12',
    startTime: '06:30',
    endTime: '09:00',
    location: 'Tsukiji Outer Market',
    status: 'open',
    createdByMemberId: 'm3',
    bookedByMemberId: null,
    participantIds: ['m3', 'm5'],
    createdAt: new Date().toISOString()
  },
  {
    id: 'a4',
    title: 'Shibuya Crossing Photoshoot 📸',
    description: 'Need to get that iconic scramble crossing shot for the gram.',
    date: '2026-04-12',
    startTime: '15:00',
    endTime: '16:30',
    location: 'Shibuya Station',
    status: 'open',
    createdByMemberId: 'm4',
    bookedByMemberId: null,
    participantIds: [],
    createdAt: new Date().toISOString()
  },
  {
    id: 'a5',
    title: 'Mt Fuji Day Trip 🗻',
    description: 'Renting a van to drive down to Kawaguchiko. Need someone to help navigate!',
    date: '2026-04-14',
    startTime: '07:00',
    endTime: '19:00',
    location: 'Lake Kawaguchi',
    status: 'open',
    createdByMemberId: 'm1',
    bookedByMemberId: null,
    participantIds: ['m1', 'm2', 'm4', 'm5'],
    createdAt: new Date().toISOString()
  },
  {
    id: 'a6',
    title: 'Karaoke Night 🎤',
    description: 'All-you-can-drink Nomihodai karaoke box. Start practicing your high notes.',
    date: '2026-04-15',
    startTime: '21:00',
    endTime: '23:59',
    location: 'Akihabara',
    status: 'open',
    createdByMemberId: 'm5',
    bookedByMemberId: null,
    participantIds: ['m1', 'm3', 'm5'],
    createdAt: new Date().toISOString()
  },
  {
    id: 'a7',
    title: 'Sushi Masterclass 🔪',
    description: 'Learn to make nigiri from a local chef. Need exact numbers by next week!',
    date: '2026-04-16',
    startTime: '11:00',
    endTime: '14:00',
    location: 'Ginza',
    status: 'open',
    createdByMemberId: 'm2',
    bookedByMemberId: null,
    participantIds: ['m2', 'm4'],
    createdAt: new Date().toISOString()
  },
  {
    id: 'a8',
    title: 'Onsen Day at Hakone ♨️',
    description: 'Relaxing hot springs day. We are doing a private bath so tattoos are totally fine.',
    date: '2026-04-18',
    startTime: '09:00',
    endTime: '17:00',
    location: 'Hakone',
    status: 'open',
    createdByMemberId: 'm3',
    bookedByMemberId: null,
    participantIds: ['m3'],
    createdAt: new Date().toISOString()
  }
];
