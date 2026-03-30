import { Badge } from '@/components/ui/badge';
import { ActivityStatus } from '@/types';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: ActivityStatus;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  switch (status) {
    case 'open':
      return (
        <Badge className={cn("bg-lime-400 text-lime-950 shadow-sm border-0 font-bold", className)} data-testid={`status-${status}`}>
          Open 🟢
        </Badge>
      );
    case 'booked':
      return (
        <Badge className={cn("bg-indigo-500 text-white shadow-sm border-0 font-bold", className)} data-testid={`status-${status}`}>
          Booked ✅
        </Badge>
      );
    case 'full':
      return (
        <Badge className={cn("bg-amber-500 text-white shadow-sm border-0 font-bold", className)} data-testid={`status-${status}`}>
          Full 🔥
        </Badge>
      );
    case 'cancelled':
      return (
        <Badge variant="secondary" className={cn("bg-gray-200 text-gray-600 font-bold", className)} data-testid={`status-${status}`}>
          Cancelled 🚫
        </Badge>
      );
    default:
      return null;
  }
}
