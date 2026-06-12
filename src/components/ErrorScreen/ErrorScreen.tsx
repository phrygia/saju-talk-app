import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import StarBackground from '../StarBackground/StarBackground';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function ErrorScreen() {
  return (
    <SafeAreaProvider style={styles.container}>
      <LinearGradient
        colors={['#200f64', '#08071d']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <StarBackground />
      <View style={styles.errorContainer}>
        <Text style={styles.errorTitle}>인터넷 연결 없음</Text>
        <Text style={styles.errorText}>네트워크 연결을 확인해주세요.</Text>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#08071d',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
});
