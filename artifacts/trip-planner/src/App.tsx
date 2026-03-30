import { useEffect } from "react";
import { Switch, Route, Router as WouterRouter, Redirect } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

import { initializeSeedData, useCurrentMember } from "@/lib/data";
import { Navbar } from "@/components/Navbar";
import { ProfilePicker } from "@/pages/ProfilePicker";
import { ActivityBoard } from "@/pages/ActivityBoard";
import { CalendarView } from "@/pages/CalendarView";

const queryClient = new QueryClient();

// A simple layout wrapper that enforces the profile picker
function AppContent() {
  const currentMember = useCurrentMember();

  // If no member is selected, lock them into the profile picker entirely
  if (!currentMember) {
    return <ProfilePicker />;
  }

  // Otherwise, show the full app shell
  return (
    <div className="min-h-screen bg-background text-foreground font-sans flex flex-col">
      <Navbar />
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <Switch>
          <Route path="/board" component={ActivityBoard} />
          <Route path="/calendar" component={CalendarView} />
          <Route path="/">
            <Redirect to="/board" />
          </Route>
          <Route component={NotFound} />
        </Switch>
      </main>
    </div>
  );
}

function App() {
  // Ensure the app works perfectly from scratch by seeding local storage
  useEffect(() => {
    initializeSeedData();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <AppContent />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
