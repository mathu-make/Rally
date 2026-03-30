import { useState } from 'react';
import { Rocket } from 'lucide-react';
import { useActivities } from '@/lib/data';
import { ActivityCard } from '@/components/ActivityCard';
import { ActivityDetailsModal } from '@/components/ActivityDetailsModal';
import { Activity } from '@/types';

export function ActivityBoard() {
  const activities = useActivities();
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);

  // Sort by date ascending, then by time
  const sortedActivities = [...activities].sort((a, b) => {
    const dateCompare = a.date.localeCompare(b.date);
    if (dateCompare !== 0) return dateCompare;
    return a.startTime.localeCompare(b.startTime);
  });

  return (
    <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground tracking-tight">Activity Board</h1>
          <p className="text-muted-foreground mt-1 text-base">
            {activities.length} {activities.length === 1 ? 'activity' : 'activities'} planned so far. Jump in!
          </p>
        </div>
      </div>

      {sortedActivities.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center bg-card rounded-3xl border border-dashed border-border/80 shadow-sm">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
            <Rocket className="w-10 h-10 text-primary" />
          </div>
          <h2 className="text-2xl font-display font-bold text-foreground mb-2">It's quiet... too quiet.</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            The itinerary is completely empty. Be the hero this group needs and propose the first epic adventure!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {sortedActivities.map((activity) => (
            <ActivityCard 
              key={activity.id} 
              activity={activity} 
              onClickDetails={() => setSelectedActivity(activity)}
            />
          ))}
        </div>
      )}

      <ActivityDetailsModal 
        isOpen={!!selectedActivity} 
        activity={selectedActivity} 
        onClose={() => setSelectedActivity(null)} 
      />
    </div>
  );
}
