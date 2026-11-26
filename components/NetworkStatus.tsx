'use client';

import { Wifi, WifiOff, X } from 'lucide-react';
import { useEffect, useState } from 'react';

type ToastType = 'success' | 'error';

type ToastData = {
  id: number;
  type: ToastType;
  title: string;
  message: string;
};

const NetworkStatus = () => {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  useEffect(() => {
    let toastId = 0;
    let timeout: ReturnType<typeof setTimeout>;

    const showToast = (type: ToastType, title: string, message: string) => {
      const id = ++toastId;

      setToasts(prev => [...prev, { id, type, title, message }]);

      if (type === 'success') {
        timeout = setTimeout(() => {
          setToasts(prev => prev.filter(toast => toast.id !== id));
        }, 4000);
      }
    };

    const handleOnline = () => {
      showToast(
        'success',
        'Connection Restored',
        'You are back online. All services are ready to use.'
      );
    };

    const handleOffline = () => {
      showToast(
        'error',
        'Internet Connection Lost',
        'You are offline. Please check your internet connection.'
      );
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      clearTimeout(timeout);
    };
  }, []);

  const removeToast = (id: number) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  return (
    <div className="fixed top-5 right-5 z-[9999] flex w-[calc(100%-2.5rem)] max-w-sm flex-col gap-3">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className={`animate-in slide-in-from-right-5 fade-in duration-300
            flex items-start gap-3 rounded-xl border p-4 shadow-xl backdrop-blur-md
            ${
              toast.type === 'success'
                ? 'border-emerald-500/30 bg-emerald-950/95 text-white'
                : 'border-red-500/30 bg-red-950/95 text-white'
            }`}
        >
          <div
            className={`rounded-lg p-2 ${
              toast.type === 'success'
                ? 'bg-emerald-500/20 text-emerald-400'
                : 'bg-red-500/20 text-red-400'
            }`}
          >
            {toast.type === 'success' ? (
              <Wifi size={22} />
            ) : (
              <WifiOff size={22} />
            )}
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="text-sm font-semibold">{toast.title}</h3>
            <p className="mt-1 text-xs leading-relaxed text-white/70">
              {toast.message}
            </p>
          </div>

          <button
            onClick={() => removeToast(toast.id)}
            className="rounded-md p-1 text-white/50 transition hover:bg-white/10 hover:text-white"
            aria-label="Dismiss notification"
          >
            <X size={17} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default NetworkStatus;
