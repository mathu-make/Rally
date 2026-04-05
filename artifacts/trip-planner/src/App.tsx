import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase";
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

type TodoRow = { id: string; name: string };

// A simple layout wrapper that enforces the profile picker
function AppContent() {
  const currentMember = useCurrentMember();
  const [todos, setTodos] = useState<TodoRow[]>([]);

  useEffect(() => {
    async function getTodos() {
      const { data } = await supabase.from("todos").select();
      if (data) {
        setTodos(data as TodoRow[]);
      }
    }
    void getTodos();
  }, []);

  // If no member is selected, lock them into the profile picker entirely
  if (!currentMember) {
    return <ProfilePicker />;
  }

  // Otherwise, show the full app shell
  return (
    <div className="min-h-screen bg-background text-foreground font-sans flex flex-col">
      <Navbar />
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <section
          aria-label="Supabase todos"
          className="mb-6 rounded-lg border border-border bg-card p-4 text-card-foreground"
        >
          <h2 className="mb-2 text-sm font-medium text-muted-foreground">
            Todos (Supabase)
          </h2>
          <ul className="list-inside list-disc text-sm">
            {todos.map((todo) => (
              <li key={todo.id}>{todo.name}</li>
            ))}
          </ul>
        </section>
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
