// Custom location hook that handles GitHub Pages base path
import { useLocation as useWouterLocation } from "wouter";

const BASE_PATH = '/Quiz-Spark';

export function useLocation() {
  const [location, setLocation] = useWouterLocation();
  
  // Strip base path from location
  const normalizedLocation = location.startsWith(BASE_PATH)
    ? location.slice(BASE_PATH.length) || '/'
    : location;
  
  // Add base path when setting location
  const normalizedSetLocation = (path: string) => {
    const fullPath = path.startsWith(BASE_PATH) ? path : BASE_PATH + (path === '/' ? '' : path);
    setLocation(fullPath);
  };
  
  return [normalizedLocation, normalizedSetLocation] as const;
}

