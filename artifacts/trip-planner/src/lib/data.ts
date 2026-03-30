import { useState, useEffect } from 'react';
import { TripMember, Activity, CreateActivityInput } from '../types';
import { SEED_MEMBERS, SEED_ACTIVITIES } from '../data/seed';

const MEMBERS_KEY = 'trip_planner_members';
const ACTIVITIES_KEY = 'trip_planner_activities';
const CURRENT_MEMBER_KEY = 'trip_planner_current_member';

// Super simple Event Bus for cross-component reactivity
type Listener = () => void;
const listeners = new Set<Listener>();
const emit = () => listeners.forEach(l => l());

export const subscribe = (l: Listener) => {
  listeners.add(l);
  return () => { listeners.delete(l); };
};

// Initialize seed data synchronously at module load time so that hooks
// always find data in localStorage when they first call getMembers().
export function initializeSeedData() {
  if (!localStorage.getItem(MEMBERS_KEY)) {
    localStorage.setItem(MEMBERS_KEY, JSON.stringify(SEED_MEMBERS));
  }
  if (!localStorage.getItem(ACTIVITIES_KEY)) {
    localStorage.setItem(ACTIVITIES_KEY, JSON.stringify(SEED_ACTIVITIES));
  }
}

// Run immediately when the module is imported so hooks always see data
initializeSeedData();

// Data Access Layer
export function getMembers(): TripMember[] {
  const data = localStorage.getItem(MEMBERS_KEY);
  return data ? JSON.parse(data) : [];
}

export function getCurrentMember(): TripMember | null {
  const id = localStorage.getItem(CURRENT_MEMBER_KEY);
  if (!id) return null;
  const members = getMembers();
  return members.find(m => m.id === id) || null;
}

export function setCurrentMember(memberId: string | null) {
  if (memberId) {
    localStorage.setItem(CURRENT_MEMBER_KEY, memberId);
  } else {
    localStorage.removeItem(CURRENT_MEMBER_KEY);
  }
  emit();
}

export function getActivities(): Activity[] {
  const data = localStorage.getItem(ACTIVITIES_KEY);
  return data ? JSON.parse(data) : [];
}

function saveActivities(activities: Activity[]) {
  localStorage.setItem(ACTIVITIES_KEY, JSON.stringify(activities));
  emit();
}

export function createActivity(input: CreateActivityInput, createdByMemberId: string): Activity {
  const activities = getActivities();
  const newActivity: Activity = {
    ...input,
    id: `a_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    status: 'open',
    createdByMemberId,
    bookedByMemberId: null,
    participantIds: [createdByMemberId], // creator auto-joins
    createdAt: new Date().toISOString()
  };
  
  activities.push(newActivity);
  saveActivities(activities);
  return newActivity;
}

export function joinActivity(activityId: string, memberId: string): Activity | null {
  const activities = getActivities();
  const index = activities.findIndex(a => a.id === activityId);
  if (index === -1) return null;
  
  const activity = activities[index];
  if (!activity.participantIds.includes(memberId)) {
    activity.participantIds.push(memberId);
    saveActivities(activities);
  }
  return activity;
}

export function leaveActivity(activityId: string, memberId: string): Activity | null {
  const activities = getActivities();
  const index = activities.findIndex(a => a.id === activityId);
  if (index === -1) return null;
  
  const activity = activities[index];
  activity.participantIds = activity.participantIds.filter(id => id !== memberId);
  
  // If the volunteer leaves, they un-volunteer automatically
  if (activity.bookedByMemberId === memberId) {
    activity.bookedByMemberId = null;
    activity.status = 'open';
  }
  
  saveActivities(activities);
  return activity;
}

export function volunteerToBook(activityId: string, memberId: string): Activity | null {
  const activities = getActivities();
  const index = activities.findIndex(a => a.id === activityId);
  if (index === -1) return null;
  
  const activity = activities[index];
  // Guard: only allow volunteering when no one else has already claimed the booking slot
  if (activity.bookedByMemberId && activity.bookedByMemberId !== memberId) {
    return activity; // already booked by someone else — no-op
  }
  activity.bookedByMemberId = memberId;
  activity.status = 'booked';
  
  // Auto-join if not already participating
  if (!activity.participantIds.includes(memberId)) {
    activity.participantIds.push(memberId);
  }
  
  saveActivities(activities);
  return activity;
}

// React Hooks
export function useActivities() {
  const [activities, setActivities] = useState<Activity[]>(getActivities());
  useEffect(() => subscribe(() => setActivities(getActivities())), []);
  return activities;
}

export function useMembers() {
  const [members, setMembers] = useState<TripMember[]>(getMembers());
  useEffect(() => subscribe(() => setMembers(getMembers())), []);
  return members;
}

export function useCurrentMember() {
  const [member, setMember] = useState<TripMember | null>(getCurrentMember());
  useEffect(() => subscribe(() => setMember(getCurrentMember())), []);
  return member;
}
