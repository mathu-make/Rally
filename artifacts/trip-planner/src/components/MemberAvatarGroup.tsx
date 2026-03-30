import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { getMembers } from '@/lib/data';
import { TripMember } from '@/types';
import { cn } from '@/lib/utils';

interface MemberAvatarGroupProps {
  participantIds: string[];
  max?: number;
  className?: string;
}

export function MemberAvatarGroup({ participantIds, max = 4, className }: MemberAvatarGroupProps) {
  const allMembers = getMembers();
  const participants = participantIds
    .map(id => allMembers.find(m => m.id === id))
    .filter(Boolean) as TripMember[];
    
  if (participants.length === 0) {
    return <span className="text-sm text-muted-foreground font-medium">No one yet</span>;
  }

  const visible = participants.slice(0, max);
  const overflow = participants.length - max;

  return (
    <div className={cn("flex items-center -space-x-2.5", className)} data-testid="member-avatar-group">
      {visible.map(member => (
        <Avatar 
          key={member.id} 
          className={cn("h-8 w-8 border-2 border-card shadow-sm hover:-translate-y-1 transition-transform", member.avatarColor)}
        >
          <AvatarFallback className="bg-transparent text-white text-xs font-bold tracking-wider">
            {member.initials}
          </AvatarFallback>
        </Avatar>
      ))}
      {overflow > 0 && (
        <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-card bg-muted text-xs font-bold text-muted-foreground shadow-sm z-10">
          +{overflow}
        </div>
      )}
    </div>
  );
}
