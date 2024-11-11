"use client";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"; // Import ShadCN Dialog components

const NetworkStatus = () => {
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const [statusMessage, setStatusMessage] = useState<string>(
    "You are online now!"
  );

  useEffect(() => {
    /**
     * This effect listens for online and offline events and updates the UI
     * based on the user's network status. It handles the following:
     *
     * 1. It uses `navigator.onLine` to determine the initial network status
     *    (whether the user is online or offline) when the component first renders.
     *
     * 2. The `useEffect` hook sets up event listeners for the browser's
     *    `online` and `offline` events:
     *    - When the user goes online, it sets `isOnline` to `true`,
     *      updates the status message to "You are online now!" and opens the dialog.
     *    - When the user goes offline, it sets `isOnline` to `false`,
     *      updates the status message to "You are offline. Please check your connection."
     *      and opens the dialog.
     *
     * 3. The ShadCN `Dialog` component is used to display a pop-up alert.
     *    - The dialog shows either "You are Online!" or "You are Offline!" in the title,
     *      based on the network status.
     *    - The message in the dialog content explains whether the user is online or offline.
     *
     * 4. The event listeners for `online` and `offline` events are cleaned up
     *    when the component is unmounted to prevent memory leaks.
     */
    const handleOnline = () => {
      setIsOnline(true);
      setStatusMessage("You are online now!");
    };

    const handleOffline = () => {
      setIsOnline(false);
      setStatusMessage("You are offline. Please check your connection.");
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

  return (
    <Dialog open={!isOnline}>
      <DialogTrigger asChild>
        <button className="hidden" aria-hidden="true"></button>
      </DialogTrigger>
      <DialogContent className="p-6">
        <DialogTitle>
          {isOnline ? "You are Online!" : "You are Offline!"}
        </DialogTitle>
        <p>{statusMessage}</p>
      </DialogContent>
    </Dialog>
  );
};

export default NetworkStatus;
