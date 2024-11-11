"use client";
import { useEffect, useState } from "react";
import { toast } from "sonner"; // Import Sonner's toast function

const NetworkStatus = () => {
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      toast.success("You are online now!"); // Show success notification when online
    };

    const handleOffline = () => {
      setIsOnline(false);
      toast.error("You are offline. Please check your connection."); // Show error notification when offline
    };

    // Adding event listeners for online and offline events
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Cleanup event listeners when the component is unmounted
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return null; // The notifications are handled by Sonner, so no UI changes are needed here
};

export default NetworkStatus;
