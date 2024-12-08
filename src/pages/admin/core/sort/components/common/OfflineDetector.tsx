import { useEffect, useState } from 'react';
import { Wifi, WifiOff } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const OfflineDetector = () => {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!isOffline) return null;

  return (
    <Alert variant="destructive" className="fixed bottom-4 right-4 max-w-md z-50">
      <WifiOff className="h-4 w-4" />
      <AlertTitle>You're offline</AlertTitle>
      <AlertDescription>
        Please check your internet connection and try again.
      </AlertDescription>
    </Alert>
  );
};

export default OfflineDetector;