import { useState, useEffect, useCallback } from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import QuizPage from "@/pages/quiz";
import NotFound from "@/pages/not-found";

// Base path for GitHub Pages
const BASE_PATH = '/Quiz-Spark';

// Custom location hook for Router that strips base path
function useBasePathLocation(): [string, (to: string, options?: { replace?: boolean }) => void] {
  const getPath = useCallback(() => {
    if (typeof window === 'undefined') return '/';
    const path = window.location.pathname;
    const normalized = path.startsWith(BASE_PATH)
      ? path.slice(BASE_PATH.length) || '/'
      : path;
    return normalized;
  }, []);

  const [location, setLocationState] = useState(getPath);

  useEffect(() => {
    const handler = () => setLocationState(getPath());
    window.addEventListener('popstate', handler);
    return () => window.removeEventListener('popstate', handler);
  }, [getPath]);

  const navigate = useCallback((to: string, options?: { replace?: boolean }) => {
    const fullPath = to.startsWith(BASE_PATH) ? to : BASE_PATH + (to === '/' ? '' : to);
    if (options?.replace) {
      window.history.replaceState(null, '', fullPath);
    } else {
      window.history.pushState(null, '', fullPath);
    }
    setLocationState(getPath());
  }, [getPath]);

  return [location, navigate];
}

function Router() {
  return (
    <WouterRouter hook={useBasePathLocation}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/quiz/:id" component={QuizPage} />
        <Route component={NotFound} />
      </Switch>
    </WouterRouter>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
