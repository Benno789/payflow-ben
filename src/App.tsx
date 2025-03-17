
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import SignIn from "./pages/SignIn";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";
import Subscriptions from "./pages/Subscriptions";
import Analysis from "./pages/Analysis";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const isLoggedIn = localStorage.getItem('onboardingCompleted') === 'true';

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={isLoggedIn ? <Navigate to="/dashboard" /> : <Navigate to="/signin" />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/subscriptions" element={<Subscriptions />} />
            <Route path="/analysis" element={<Analysis />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
