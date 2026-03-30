import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { useMembers, setCurrentMember, useCurrentMember } from '@/lib/data';

export function ProfilePicker() {
  const members = useMembers();
  const currentMember = useCurrentMember();
  const [, setLocation] = useLocation();

  useEffect(() => {
    // If somehow a member is already selected, redirect immediately
    if (currentMember) {
      setLocation('/board');
    }
  }, [currentMember, setLocation]);

  const handleSelect = (memberId: string) => {
    setCurrentMember(memberId);
    setLocation('/board');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 relative overflow-hidden">
      
      {/* Dynamic Background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <img 
          src={`${import.meta.env.BASE_URL}images/profile-bg.png`} 
          className="w-full h-full object-cover opacity-30 mix-blend-multiply" 
          alt="Abstract decorative background" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center text-center animate-in fade-in zoom-in-95 duration-700">
        <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-primary/10 text-primary font-bold text-sm tracking-wider uppercase mb-6 shadow-sm border border-primary/20">
          TripSync 2026
        </div>
        
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-black text-foreground mb-4 tracking-tight">
          Who's joining the trip? <span className="inline-block animate-bounce origin-bottom">🌏</span>
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground font-medium mb-16 max-w-xl">
          Pick your vibe. No passwords. No drama. Let's plan something unforgettable.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8 w-full">
          {members.map((member, index) => (
            <button
              key={member.id}
              onClick={() => handleSelect(member.id)}
              className="group flex flex-col items-center gap-4 outline-none focus-visible:ring-4 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-background rounded-3xl p-4 transition-all"
              style={{ animationDelay: `${index * 100}ms` }}
              data-testid={`profile-card-${member.id}`}
            >
              <div className="relative">
                {/* Glow effect behind */}
                <div className={`absolute inset-0 rounded-full blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500 ${member.avatarColor}`} />
                
                {/* Actual Avatar */}
                <div className={`relative w-28 h-28 md:w-32 md:h-32 rounded-full flex items-center justify-center text-white text-3xl md:text-4xl font-display font-bold shadow-lg border-4 border-background group-hover:-translate-y-3 group-hover:shadow-2xl transition-all duration-300 ${member.avatarColor}`}>
                  {member.initials}
                </div>
              </div>
              
              <span className="text-xl font-bold text-foreground/80 group-hover:text-foreground transition-colors">
                {member.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
