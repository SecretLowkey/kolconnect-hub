import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import KOLDirectory from "./pages/KOLDirectory";
import KOLProfile from "./pages/KOLProfile";
import JobBoard from "./pages/JobBoard";
import Leaderboard from "./pages/Leaderboard";
import AuthPage from "./pages/AuthPage";
import AuthCallback from "./pages/AuthCallback";
import KOLDashboard from "./pages/dashboard/KOLDashboard";
import ProjectDashboard from "./pages/dashboard/ProjectDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/kols" element={<KOLDirectory />} />
          <Route path="/kols/:kolId" element={<KOLProfile />} />
          <Route path="/jobs" element={<JobBoard />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route path="/dashboard/kol" element={<KOLDashboard />} />
          <Route path="/dashboard/project" element={<ProjectDashboard />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
