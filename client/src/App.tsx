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
function useBasePathLocation() {
  if (typeof window === 'undefined') return ['/', () => {}] as const;
  
  const getLocation = () => {
    const path = window.location.pathname;
    return path.startsWith(BASE_PATH)
      ? path.slice(BASE_PATH.length) || '/'
      : path;
  };
  
  const setLocation = (path: string, replace = false) => {
    const fullPath = path.startsWith(BASE_PATH) ? path : BASE_PATH + (path === '/' ? '' : path);
    if (replace) {
      window.history.replaceState(null, '', fullPath);
    } else {
      window.history.pushState(null, '', fullPath);
    }
    window.dispatchEvent(new PopStateEvent('popstate'));
  };
  
  return [getLocation(), setLocation] as const;
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
