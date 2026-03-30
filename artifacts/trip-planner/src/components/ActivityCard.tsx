import { MapPin, Clock, UserCheck } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StatusBadge } from './StatusBadge';
import { MemberAvatarGroup } from './MemberAvatarGroup';
import { Activity } from '@/types';
import { useCurrentMember, joinActivity, leaveActivity, volunteerToBook, getMembers } from '@/lib/data';

interface ActivityCardProps {
  activity: Activity;
  onClickDetails: () => void;
}

export function ActivityCard({ activity, onClickDetails }: ActivityCardProps) {
  const currentMember = useCurrentMember();
  const allMembers = getMembers();
  
  const creator = allMembers.find(m => m.id === activity.createdByMemberId);
  const volunteer = activity.bookedByMemberId ? allMembers.find(m => m.id === activity.bookedByMemberId) : null;
  
  const isParticipant = currentMember ? activity.participantIds.includes(currentMember.id) : false;
  const isVolunteer = currentMember ? activity.bookedByMemberId === currentMember.id : false;
  
  const handleJoin = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentMember) joinActivity(activity.id, currentMember.id);
  };
  
  const handleLeave = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentMember) leaveActivity(activity.id, currentMember.id);
  };
  
  const handleVolunteer = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentMember) volunteerToBook(activity.id, currentMember.id);
  };

  return (
    <Card 
      onClick={onClickDetails}
      className="group flex flex-col h-full bg-card overflow-hidden hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1.5 cursor-pointer border-border/60"
      data-testid={`activity-card-${activity.id}`}
    >
      <div className="p-6 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-4 gap-4">
          <StatusBadge status={activity.status} />
          <div className="flex flex-col items-end text-right">
            <span className="text-sm font-bold text-foreground bg-secondary px-2.5 py-1 rounded-md mb-1">
              {format(parseISO(activity.date), 'MMM d, yyyy')}
            </span>
          </div>
        </div>
        
        <h3 className="text-xl font-display font-bold text-foreground mb-3 leading-tight group-hover:text-primary transition-colors">
          {activity.title}
        </h3>
        
        <div className="space-y-2 mb-6">
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="w-4 h-4 mr-2 text-primary/70" />
            <span className="font-medium">{activity.startTime} - {activity.endTime}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="w-4 h-4 mr-2 text-primary/70" />
            <span className="truncate">{activity.location}</span>
          </div>
          {volunteer && (
            <div className="flex items-center text-sm text-indigo-600 dark:text-indigo-400 font-medium bg-indigo-50 dark:bg-indigo-500/10 w-fit px-2 py-0.5 rounded">
              <UserCheck className="w-3.5 h-3.5 mr-1.5" />
              Booked by {volunteer.name}
            </div>
          )}
        </div>
        
        <div className="mt-auto">
          <div className="flex items-center justify-between mb-5">
            <MemberAvatarGroup participantIds={activity.participantIds} />
            <span className="text-xs font-medium text-muted-foreground">
              {activity.participantIds.length} joined
            </span>
          </div>
          
          <div className="flex flex-col gap-2 relative z-10" onClick={e => e.stopPropagation()}>
            <div className="flex items-center gap-2">
              {!isParticipant ? (
                <Button 
                  onClick={handleJoin} 
                  className="flex-1 bg-primary hover:brightness-110 font-bold"
                  data-testid={`btn-join-${activity.id}`}
                >
                  Join Activity
                </Button>
              ) : (
                <Button 
                  onClick={handleLeave} 
                  variant="outline" 
                  className="flex-1 font-semibold"
                  data-testid={`btn-leave-${activity.id}`}
                >
                  Leave
                </Button>
              )}
              
              <Button 
                variant="ghost" 
                onClick={onClickDetails}
                className="px-3"
                data-testid={`btn-details-${activity.id}`}
              >
                Details
              </Button>
            </div>
            
            {activity.status === 'open' && isParticipant && !activity.bookedByMemberId && (
              <Button 
                variant="secondary" 
                onClick={handleVolunteer}
                className="w-full text-xs bg-indigo-50 text-indigo-700 hover:bg-indigo-100 dark:bg-indigo-500/10 dark:text-indigo-400 font-bold border border-indigo-100 dark:border-indigo-500/20 shadow-none"
                data-testid={`btn-volunteer-${activity.id}`}
              >
                Volunteer to Book
              </Button>
            )}
            
            {isVolunteer && (
              <div className="text-center text-xs font-bold text-indigo-600 dark:text-indigo-400 py-2 bg-indigo-50/50 dark:bg-transparent rounded border border-dashed border-indigo-200 dark:border-indigo-500/30">
                ✨ You are the booking volunteer!
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
