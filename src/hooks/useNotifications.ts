import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@notifications';
const ENABLED_KEY = '@notifications_enabled';

export interface AppNotification {
  id: string;
  title: string;
  body: string;
  url?: string;
  receivedAt: number;
}

export function useNotifications() {
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [notificationsEnabled, setNotificationsEnabledState] = useState(true);

  useEffect(() => {
    Promise.all([
      AsyncStorage.getItem(STORAGE_KEY),
      AsyncStorage.getItem(ENABLED_KEY),
    ]).then(([raw, enabled]) => {
      if (raw) setNotifications(JSON.parse(raw));
      if (enabled !== null) setNotificationsEnabledState(JSON.parse(enabled));
    });
  }, []);

  const setNotificationsEnabled = useCallback(async (value: boolean) => {
    setNotificationsEnabledState(value);
    await AsyncStorage.setItem(ENABLED_KEY, JSON.stringify(value));
  }, []);

  const addNotification = useCallback(
    async (notification: Omit<AppNotification, 'id' | 'receivedAt'>) => {
      const next: AppNotification = {
        ...notification,
        id: Date.now().toString(),
        receivedAt: Date.now(),
      };
      setNotifications(prev => {
        const updated = [next, ...prev];
        AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        return updated;
      });
      return next;
    },
    [],
  );

  const clearNotifications = useCallback(async () => {
    setNotifications([]);
    await AsyncStorage.removeItem(STORAGE_KEY);
  }, []);

  return {
    notifications,
    notificationsEnabled,
    setNotificationsEnabled,
    addNotification,
    clearNotifications,
  };
}
