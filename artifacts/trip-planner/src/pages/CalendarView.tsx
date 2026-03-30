import { useState } from 'react';
import { 
  format, 
  parseISO, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  eachDayOfInterval, 
  isSameMonth, 
  isToday,
  addMonths,
  subMonths
} from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useActivities } from '@/lib/data';
import { Activity } from '@/types';
import { Button } from '@/components/ui/button';
import { ActivityDetailsModal } from '@/components/ActivityDetailsModal';
import { cn } from '@/lib/utils';

export function CalendarView() {
  const activities = useActivities();
  const [currentDate, setCurrentDate] = useState(new Date(2026, 3, 1)); // Default to April 2026 (seed data)
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

  const days = eachDayOfInterval({ start: startDate, end: endDate });
  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const getStatusColorClass = (status: string) => {
    switch (status) {
      case 'open': return 'bg-lime-400 text-lime-950 hover:bg-lime-500';
      case 'booked': return 'bg-indigo-500 text-white hover:bg-indigo-600';
      case 'cancelled': return 'bg-gray-200 text-gray-700 hover:bg-gray-300';
      case 'full': return 'bg-amber-500 text-white hover:bg-amber-600';
      default: return 'bg-primary text-primary-foreground';
    }
  };

  return (
    <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between mb-8 bg-card p-4 rounded-2xl shadow-sm border border-border/50">
        <h1 className="text-2xl font-display font-bold text-foreground">
          {format(currentDate, 'MMMM yyyy')}
        </h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => setCurrentDate(subMonths(currentDate, 1))}>
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <Button variant="outline" size="sm" onClick={() => setCurrentDate(new Date())} className="font-bold hidden sm:block">
            Today
          </Button>
          <Button variant="outline" size="icon" onClick={() => setCurrentDate(addMonths(currentDate, 1))}>
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-px bg-border/40 border border-border/50 rounded-2xl overflow-hidden shadow-md">
        {weekDays.map(d => (
          <div key={d} className="bg-muted/70 p-3 text-center text-xs font-bold text-muted-foreground tracking-wider uppercase">
            {d}
          </div>
        ))}
        
        {days.map(day => {
          const isCurrentMonth = isSameMonth(day, monthStart);
          const dayActivities = activities
            .filter(a => a.date === format(day, 'yyyy-MM-dd'))
            .sort((a, b) => a.startTime.localeCompare(b.startTime));

          return (
            <div 
              key={day.toISOString()} 
              className={cn(
                "min-h-[120px] p-1 sm:p-2.5 transition-colors relative group", 
                isCurrentMonth ? "bg-card" : "bg-muted/20 text-muted-foreground",
                "hover:bg-muted/10"
              )}
            >
              <div className="flex justify-between items-start mb-1.5">
                <span className={cn(
                  "text-sm font-bold w-7 h-7 flex items-center justify-center rounded-full",
                  isToday(day) ? "bg-primary text-primary-foreground shadow-md" : "text-foreground/70"
                )}>
                  {format(day, 'd')}
                </span>
              </div>
              
              <div className="flex flex-col gap-1.5 overflow-hidden">
                {dayActivities.slice(0, 3).map(a => (
                  <button 
                    key={a.id} 
                    onClick={() => setSelectedActivity(a)} 
                    className={cn(
                      "text-left text-[10px] sm:text-xs truncate px-1.5 sm:px-2 py-1 rounded shadow-sm font-bold transition-all w-full",
                      getStatusColorClass(a.status)
                    )}
                    title={a.title}
                  >
                    <span className="opacity-80 font-mono mr-1 hidden sm:inline">{a.startTime}</span>
                    {a.title}
                  </button>
                ))}
                
                {dayActivities.length > 3 && (
                  <div className="text-[10px] font-bold text-muted-foreground px-1">
                    + {dayActivities.length - 3} more
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <ActivityDetailsModal 
        isOpen={!!selectedActivity} 
        activity={selectedActivity} 
        onClose={() => setSelectedActivity(null)} 
      />
    </div>
  );
}
