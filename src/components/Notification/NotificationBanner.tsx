import { useEffect, useRef } from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { AppNotification } from '../../hooks/useNotifications';

interface Props {
  notification: AppNotification | null;
  onDismiss: () => void;
}

export default function NotificationBanner({ notification, onDismiss }: Props) {
  const translateY = useRef(new Animated.Value(-120)).current;

  useEffect(() => {
    if (!notification) return;

    Animated.spring(translateY, {
      toValue: 0,
      useNativeDriver: true,
      bounciness: 4,
    }).start();

    const timer = setTimeout(() => {
      hide();
    }, 4000);

    return () => clearTimeout(timer);
  }, [notification]);

  const hide = () => {
    Animated.timing(translateY, {
      toValue: -120,
      duration: 250,
      useNativeDriver: true,
    }).start(() => onDismiss());
  };

  if (!notification) return null;

  return (
    <Animated.View style={[styles.container, { transform: [{ translateY }] }]}>
      <View style={styles.banner}>
        <View style={styles.content}>
          <Text style={styles.title} numberOfLines={1}>
            {notification.title}
          </Text>
          {!!notification.body && (
            <Text style={styles.body} numberOfLines={2}>
              {notification.body}
            </Text>
          )}
        </View>
        <TouchableOpacity onPress={hide} hitSlop={12}>
          <Text style={styles.close}>✕</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    paddingHorizontal: 12,
    paddingTop: 52,
  },
  banner: {
    backgroundColor: '#7c5cfc',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 3,
    borderLeftColor: '#6b4eeb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  content: {
    flex: 1,
    marginRight: 8,
  },
  title: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  body: {
    color: '#ede8ff',
    fontSize: 12,
    marginTop: 5,
  },
  close: {
    color: '#fff',
    fontSize: 13,
  },
});
