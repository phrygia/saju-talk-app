import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import StarBackground from '../StarBackground/StarBackground';

interface OfflineScreenProps {
  handleRetry: () => void;
}

export default function OfflineScreen({ handleRetry }: OfflineScreenProps) {
  return (
    <View style={styles.errorContainer}>
      <LinearGradient
        colors={['#200f64', '#08071d']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <StarBackground />
      <Text style={styles.errorTitle}>페이지를 불러올 수 없어요</Text>
      <Text style={styles.errorText}>
        인터넷 연결을 확인하고 다시 시도해주세요.
      </Text>
      <TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
        <Text style={styles.retryText}>다시 시도</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#08071d',
  },
  errorTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 8,
  },
  errorText: {
    color: '#dccdffa6',
    fontSize: 14,
    marginBottom: 24,
  },
  retryButton: {
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#7c5cfc',
  },
  retryText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
});
