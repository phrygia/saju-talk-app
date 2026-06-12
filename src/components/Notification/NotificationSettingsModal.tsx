import {
  Modal,
  View,
  Text,
  Switch,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

interface Props {
  visible: boolean;
  enabled: boolean;
  notificationCount: number;
  onToggle: (value: boolean) => void;
  onClear: () => void;
  onViewHistory: () => void;
  onClose: () => void;
}

export default function NotificationSettingsModal({
  visible,
  enabled,
  notificationCount,
  onToggle,
  onClear,
  onViewHistory,
  onClose,
}: Props) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <TouchableOpacity
          style={StyleSheet.absoluteFill}
          activeOpacity={1}
          onPress={onClose}
        />
        <View style={styles.sheet}>
        <View style={styles.handle} />
        <Text style={styles.title}>알림 설정</Text>

        <View style={styles.row}>
          <View>
            <Text style={styles.rowTitle}>푸시 알림</Text>
            <Text style={styles.rowDesc}>앱 실행 중 알림을 표시합니다</Text>
          </View>
          <Switch
            value={enabled}
            onValueChange={onToggle}
            trackColor={{ false: '#333', true: '#7c5cfc' }}
            thumbColor="#fff"
          />
        </View>

        {notificationCount > 0 && (
          <>
            <View style={styles.divider} />

            <TouchableOpacity style={styles.row} onPress={onViewHistory}>
              <Text style={styles.rowTitle}>알림 내역</Text>
              <View style={styles.historyRight}>
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{notificationCount}</Text>
                </View>
                <Text style={styles.chevron}>›</Text>
              </View>
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity
              style={styles.clearButton}
              onPress={() => {
                onClear();
                onClose();
              }}>
              <Text style={styles.clearText}>알림 내역 모두 지우기</Text>
            </TouchableOpacity>
          </>
        )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  sheet: {
    backgroundColor: '#12103a',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 24,
    paddingBottom: 40,
    paddingTop: 12,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: '#444',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 20,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  rowTitle: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '500',
  },
  rowDesc: {
    color: '#888',
    fontSize: 12,
    marginTop: 2,
  },
  historyRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  badge: {
    backgroundColor: '#7c5cfc',
    borderRadius: 10,
    paddingHorizontal: 7,
    paddingVertical: 2,
  },
  badgeText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '600',
  },
  chevron: {
    color: '#666',
    fontSize: 20,
  },
  divider: {
    height: 1,
    backgroundColor: '#2a2a4a',
    marginVertical: 16,
  },
  clearButton: {
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: '#1e1c3a',
  },
  clearText: {
    color: '#ff6b6b',
    fontSize: 14,
    fontWeight: '500',
  },
});
