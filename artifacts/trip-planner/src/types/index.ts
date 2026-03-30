export type ActivityStatus = 'open' | 'booked' | 'cancelled' | 'full';

export interface TripMember {
  id: string;
  name: string;
  avatarColor: string; 
  initials: string;
}

export interface Activity {
  id: string;
  title: string;
  description: string;
  date: string; // ISO date string YYYY-MM-DD
  startTime: string; // "14:00"
  endTime: string;  // "16:00"
  location: string;
  status: ActivityStatus;
  createdByMemberId: string;
  bookedByMemberId: string | null;
  participantIds: string[];
  createdAt: string;
}

export interface CreateActivityInput {
  title: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
}
