import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Plane, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useCurrentMember, setCurrentMember } from '@/lib/data';
import { CreateActivityModal } from './CreateActivityModal';
import { cn } from '@/lib/utils';

export function Navbar() {
  const currentMember = useCurrentMember();
  const [location] = useLocation();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  if (!currentMember) return null;

  return (
    <>
      <nav className="sticky top-0 z-40 w-full backdrop-blur-xl bg-background/85 border-b border-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          <div className="flex items-center gap-8 lg:gap-12">
            <Link href="/board" className="flex items-center gap-2 group cursor-pointer" data-testid="nav-logo">
              <div className="bg-primary text-primary-foreground p-1.5 rounded-lg group-hover:scale-110 transition-transform shadow-sm">
                <Plane className="w-5 h-5" />
              </div>
              <span className="font-display font-bold text-xl tracking-tight text-foreground">TripSync</span>
            </Link>
            
            <div className="hidden md:flex gap-1">
              <Link href="/board" className={cn(
                "px-4 py-2 text-sm font-semibold rounded-full transition-colors",
                location === '/board' ? "bg-muted text-foreground" : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
              )} data-testid="nav-board">
                Board
              </Link>
              <Link href="/calendar" className={cn(
                "px-4 py-2 text-sm font-semibold rounded-full transition-colors",
                location === '/calendar' ? "bg-muted text-foreground" : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
              )} data-testid="nav-calendar">
                Calendar
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-5">
            <Button 
              size="sm" 
              onClick={() => setIsCreateModalOpen(true)} 
              className="hidden sm:flex font-bold shadow-sm"
              data-testid="nav-new-activity"
            >
              <Plus className="w-4 h-4 mr-1.5" /> New Activity
            </Button>
            
            <div className="h-6 w-px bg-border hidden sm:block mx-1"></div>
            
            <div className="flex items-center gap-3 bg-muted/40 p-1.5 pr-4 rounded-full border border-border/50">
              <Avatar className={`h-8 w-8 ${currentMember.avatarColor} shadow-sm border border-card`}>
                <AvatarFallback className="bg-transparent text-white text-xs font-bold">
                  {currentMember.initials}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm font-bold hidden sm:block">{currentMember.name}</span>
              <button 
                onClick={() => setCurrentMember(null)} 
                className="text-xs font-bold text-muted-foreground hover:text-primary transition-colors ml-1 sm:ml-2 uppercase tracking-wider"
                data-testid="nav-switch-profile"
              >
                Switch
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile nav links, since they are hidden in the top bar on very small screens */}
      <div className="md:hidden flex border-b border-border/50 bg-background px-4 py-2 gap-2 overflow-x-auto">
        <Link href="/board" className={cn(
          "px-4 py-1.5 text-sm font-semibold rounded-full transition-colors whitespace-nowrap",
          location === '/board' ? "bg-muted text-foreground" : "text-muted-foreground"
        )}>
          Activity Board
        </Link>
        <Link href="/calendar" className={cn(
          "px-4 py-1.5 text-sm font-semibold rounded-full transition-colors whitespace-nowrap",
          location === '/calendar' ? "bg-muted text-foreground" : "text-muted-foreground"
        )}>
          Calendar View
        </Link>
        <button 
          onClick={() => setIsCreateModalOpen(true)} 
          className="px-4 py-1.5 text-sm font-bold rounded-full transition-colors whitespace-nowrap bg-primary/10 text-primary"
        >
          + New
        </button>
      </div>

      <CreateActivityModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)} 
      />
    </>
  );
}
