import { format, parseISO } from 'date-fns';
import { MapPin, Clock, AlignLeft, Calendar, UserCheck } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { StatusBadge } from './StatusBadge';
import { TripMember, Activity } from '@/types';
import { useCurrentMember, joinActivity, leaveActivity, volunteerToBook, getMembers } from '@/lib/data';

interface ActivityDetailsModalProps {
  activity: Activity | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ActivityDetailsModal({ activity, isOpen, onClose }: ActivityDetailsModalProps) {
  const currentMember = useCurrentMember();
  const allMembers = getMembers();
  
  if (!activity) return null;
  
  const creator = allMembers.find(m => m.id === activity.createdByMemberId);
  const volunteer = activity.bookedByMemberId ? allMembers.find(m => m.id === activity.bookedByMemberId) : null;
  
  const isParticipant = currentMember ? activity.participantIds.includes(currentMember.id) : false;
  const isVolunteer = currentMember ? activity.bookedByMemberId === currentMember.id : false;

  const participants = activity.participantIds
    .map(id => allMembers.find(m => m.id === id))
    .filter((m): m is TripMember => m !== undefined);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden bg-card border-border/50 shadow-2xl rounded-2xl">
        {/* Decorative Header Image */}
        <div className="w-full h-32 sm:h-48 relative bg-primary/10">
          {/* Unsplash abstract tokyo neon lights */}
          <img 
            src="https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1200&h=400&fit=crop" 
            alt="City view" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
          <div className="absolute bottom-4 left-6 flex items-center gap-3">
             <StatusBadge status={activity.status} className="shadow-lg" />
             {volunteer && (
               <span className="text-xs font-bold text-white bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md flex items-center shadow-lg">
                 <UserCheck className="w-3 h-3 mr-1.5 text-lime-400" /> Booked by {volunteer.name}
               </span>
             )}
          </div>
        </div>

        <div className="p-6 sm:p-8">
          <DialogHeader className="mb-6 text-left">
            <DialogTitle className="text-3xl font-display font-bold leading-tight mb-2">
              {activity.title}
            </DialogTitle>
            <DialogDescription className="text-base text-foreground/80 font-medium">
              Created by {creator?.name || 'Unknown'}
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
              <div className="flex items-start gap-3">
                <AlignLeft className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-1">Details</h4>
                  <p className="text-foreground leading-relaxed whitespace-pre-wrap">{activity.description}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-1">Location</h4>
                  <p className="text-foreground font-medium">{activity.location}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-1">When</h4>
                  <p className="text-foreground font-medium flex items-center gap-2">
                    {format(parseISO(activity.date), 'EEEE, MMMM d, yyyy')}
                  </p>
                  <p className="text-muted-foreground text-sm flex items-center mt-1">
                    <Clock className="w-4 h-4 mr-1.5" />
                    {activity.startTime} — {activity.endTime}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-muted/30 rounded-xl p-5 border border-border/50 h-fit">
              <h4 className="text-sm font-bold text-foreground mb-4 flex items-center justify-between">
                Who's In? 
                <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full text-xs">{participants.length}</span>
              </h4>
              <div className="space-y-3 mb-6 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
                {participants.length === 0 ? (
                  <p className="text-sm text-muted-foreground italic">No one has joined yet. Be the first!</p>
                ) : (
                  participants.map(p => (
                    <div key={p.id} className="flex items-center gap-3">
                      <Avatar className={`w-8 h-8 ${p.avatarColor} shadow-sm`}>
                        <AvatarFallback className="bg-transparent text-white text-xs font-bold">{p.initials}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium">{p.name} {p.id === currentMember?.id ? "(You)" : ""}</span>
                      {activity.bookedByMemberId === p.id && (
                        <span className="ml-auto text-[10px] uppercase tracking-wider font-bold bg-indigo-100 text-indigo-700 px-1.5 py-0.5 rounded">Booker</span>
                      )}
                    </div>
                  ))
                )}
              </div>

              {currentMember && (
                <div className="space-y-3 pt-4 border-t border-border">
                  {!isParticipant ? (
                    <Button onClick={() => joinActivity(activity.id, currentMember.id)} className="w-full font-bold shadow-md">
                      Join Activity
                    </Button>
                  ) : (
                    <Button onClick={() => leaveActivity(activity.id, currentMember.id)} variant="outline" className="w-full">
                      Leave Activity
                    </Button>
                  )}
                  
                  {activity.status === 'open' && isParticipant && !activity.bookedByMemberId && (
                    <Button 
                      variant="secondary" 
                      onClick={() => volunteerToBook(activity.id, currentMember.id)}
                      className="w-full text-sm bg-indigo-50 text-indigo-700 hover:bg-indigo-100 font-bold border border-indigo-200"
                    >
                      Volunteer to Book
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
