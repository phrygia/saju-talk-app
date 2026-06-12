import { useEffect } from 'react';
import {
  BackHandler,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { AppNotification } from '../../hooks/useNotifications';

interface Props {
  visible: boolean;
  notifications: AppNotification[];
  onClose: () => void;
}

function formatDate(timestamp: number) {
  const d = new Date(timestamp);
  const month = d.getMonth() + 1;
  const day = d.getDate();
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  return `${month}/${day} ${hours}:${minutes}`;
}

export default function NotificationHistoryPage({
  visible,
  notifications,
  onClose,
}: Props) {
  useEffect(() => {
    if (!visible) return;
    const sub = BackHandler.addEventListener('hardwareBackPress', () => {
      onClose();
      return true;
    });
    return () => sub.remove();
  }, [visible]);

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={onClose}
            style={styles.backButton}
            hitSlop={12}
          >
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>알림 내역</Text>
          <View style={styles.backButton} />
        </View>

        {notifications.length === 0 ? (
          <View style={styles.empty}>
            <Text style={styles.emptyIcon}>🔕</Text>
            <Text style={styles.emptyText}>알림 내역이 없습니다</Text>
          </View>
        ) : (
          <FlatList
            data={notifications}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.list}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <View style={styles.itemContent}>
                  <Text style={styles.itemTitle} numberOfLines={1}>
                    {item.title}
                  </Text>
                  {!!item.body && (
                    <Text style={styles.itemBody} numberOfLines={2}>
                      {item.body}
                    </Text>
                  )}
                </View>
                <Text style={styles.itemDate}>
                  {formatDate(item.receivedAt)}
                </Text>
              </View>
            )}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
        )}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#08071d',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 52,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1e1c3a',
  },
  backButton: {
    width: 40,
    alignItems: 'flex-start',
  },
  backIcon: {
    color: '#fff',
    fontSize: 22,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
  },
  list: {
    padding: 16,
  },
  item: {
    backgroundColor: '#12103a',
    borderRadius: 12,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemContent: {
    flex: 1,
    marginRight: 12,
  },
  itemTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  itemBody: {
    color: '#aaa',
    fontSize: 12,
    marginTop: 3,
  },
  itemDate: {
    color: '#666',
    fontSize: 11,
  },
  separator: {
    height: 8,
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyIcon: {
    fontSize: 40,
    marginBottom: 12,
  },
  emptyText: {
    color: '#555',
    fontSize: 15,
  },
});
