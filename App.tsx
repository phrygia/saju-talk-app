import {
  Alert,
  AppState,
  BackHandler,
  View,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { useRef, useState, useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import messaging from '@react-native-firebase/messaging';
import {
  BannerAd,
  BannerAdSize,
  TestIds,
} from 'react-native-google-mobile-ads';
import Splash from './src/components/Splash/Splash';
import ErrorScreen from './src/components/ErrorScreen/ErrorScreen';
import OfflineScreen from './src/components/OfflineScreen/OfflineScreen';
import NotificationBanner from './src/components/Notification/NotificationBanner';
import NotificationSettingsModal from './src/components/Notification/NotificationSettingsModal';
import NotificationHistoryPage from './src/components/Notification/NotificationHistoryPage';
import { useNetwork } from './src/hooks/useNetwork';
import {
  useNotifications,
  AppNotification,
} from './src/hooks/useNotifications';

// 백그라운드/종료 상태 메시지 수신
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Background message:', remoteMessage);
});

const adUnitId = __DEV__
  ? TestIds.BANNER
  : 'ca-app-pub-5291962399728632/1229024016';

const scrollTrackJS = `
  (function() {
    window.addEventListener('scroll', function() {
      var scrollY = window.scrollY || document.documentElement.scrollTop;
      window.ReactNativeWebView.postMessage(JSON.stringify({
        type: 'scroll',
        scrollY: scrollY
      }));
    }, { passive: true });
  })();
  true;
`;

interface navType {
  url: string;
  canGoBack: boolean;
}

function App() {
  const webViewRef = useRef<WebView>(null);
  const [navState, setNavState] = useState({ url: '', canGoBack: false });
  const [splashVisible, setSplashVisible] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);
  const [pendingUrl, setPendingUrl] = useState<string | null>(null);
  const [activeBanner, setActiveBanner] = useState<AppNotification | null>(
    null,
  );
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [historyVisible, setHistoryVisible] = useState(false);
  const {
    notifications,
    notificationsEnabled,
    setNotificationsEnabled,
    addNotification,
    clearNotifications,
  } = useNotifications();
  const isConnected = useNetwork();

  const navigateToUrl = (url: string) => {
    if (url?.startsWith('https://phrygia-saju-talk-web.vercel.app')) {
      webViewRef.current?.injectJavaScript(
        `window.location.href = '${url}'; true;`,
      );
    }
  };

  useEffect(() => {
    const initFCM = async () => {
      if (Platform.OS === 'android' && Platform.Version >= 33) {
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        );
      }

      const permission = await messaging().requestPermission();
      const enabled =
        permission === messaging.AuthorizationStatus.AUTHORIZED ||
        permission === messaging.AuthorizationStatus.PROVISIONAL;

      setNotificationsEnabled(enabled);

      if (enabled) {
        // const token = await messaging().getToken();
        // console.log('FCM Token:', token);
        // TODO: 토큰을 서버(Supabase)에 저장
      }
    };

    initFCM();

    // 앱 포그라운드 상태에서 수신
    const unsubscribeForeground = messaging().onMessage(async remoteMessage => {
      const url = remoteMessage.data?.url as string;
      const title = remoteMessage.notification?.title ?? '';
      const body = remoteMessage.notification?.body ?? '';
      const saved = await addNotification({ title, body, url });
      if (notificationsEnabled) setActiveBanner(saved);
    });

    // 앱 백그라운드 상태에서 푸시 탭
    const unsubscribeBackground = messaging().onNotificationOpenedApp(
      remoteMessage => {
        const url = remoteMessage.data?.url as string;
        if (url) navigateToUrl(url);
      },
    );

    // 앱 종료 후 푸시 탭으로 실행 — WebView 로드 전일 수 있어서 pendingUrl에 저장
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          const url = remoteMessage.data?.url as string;
          if (url) setPendingUrl(url);
        }
      });

    return () => {
      unsubscribeForeground();
      unsubscribeBackground();
    };
  }, []);

  useEffect(() => {
    const checkPermissionOnForeground = async () => {
      const permission = await messaging().hasPermission();
      const enabled =
        permission === messaging.AuthorizationStatus.AUTHORIZED ||
        permission === messaging.AuthorizationStatus.PROVISIONAL;
      setNotificationsEnabled(enabled);
    };

    const subscription = AppState.addEventListener('change', state => {
      if (state === 'active') checkPermissionOnForeground();
    });

    return () => subscription.remove();
  }, []);

  useEffect(() => {
    const handleBackButton = () => {
      if (navState.canGoBack) {
        webViewRef.current?.goBack();
      } else {
        close();
      }
      return true;
    };

    const subscription = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackButton,
    );
    return () => subscription.remove();
  }, [navState]);

  const handleRetry = () => {
    setHasError(false);
    setSplashVisible(true);
  };

  const onRefresh = () => {
    setRefreshing(true);
    webViewRef.current?.reload();
  };

  const handleMessage = (event: any) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      if (data.type === 'scroll') {
        setIsAtTop(data.scrollY <= 0);
      }
    } catch {}
  };

  if (!isConnected) {
    return <ErrorScreen />;
  }

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        {hasError ? (
          <OfflineScreen handleRetry={handleRetry} />
        ) : (
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                enabled={isAtTop}
                colors={['#7c5cfc']}
                tintColor="#7c5cfc"
              />
            }
          >
            <WebView
              ref={webViewRef}
              style={styles.webview}
              source={{ uri: 'https://phrygia-saju-talk-web.vercel.app' }}
              injectedJavaScript={scrollTrackJS}
              onMessage={handleMessage}
              onLoadEnd={() => {
                setSplashVisible(false);
                setRefreshing(false);
                if (pendingUrl) {
                  navigateToUrl(pendingUrl);
                  setPendingUrl(null);
                }
              }}
              onError={() => {
                setHasError(true);
                setSplashVisible(false);
                setRefreshing(false);
              }}
              onHttpError={() => {
                setHasError(true);
                setSplashVisible(false);
                setRefreshing(false);
              }}
              onShouldStartLoadWithRequest={request => {
                if (
                  request.url ===
                  'https://phrygia-saju-talk-web.vercel.app/app/notification-settings'
                ) {
                  setSettingsVisible(true);
                  return false;
                }
                return true;
              }}
              onNavigationStateChange={(nav: navType) => {
                setNavState({ url: nav.url, canGoBack: nav.canGoBack });
              }}
            />
            <BannerAd
              unitId={adUnitId}
              size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
            />
          </ScrollView>
        )}
        <NotificationBanner
          notification={activeBanner}
          onDismiss={() => setActiveBanner(null)}
        />
        <NotificationSettingsModal
          visible={settingsVisible}
          enabled={notificationsEnabled}
          notificationCount={notifications.length}
          onToggle={setNotificationsEnabled}
          onClear={clearNotifications}
          onViewHistory={() => {
            setSettingsVisible(false);
            setHistoryVisible(true);
          }}
          onClose={() => setSettingsVisible(false)}
        />
        <NotificationHistoryPage
          visible={historyVisible}
          notifications={notifications}
          onClose={() => setHistoryVisible(false)}
        />
        <Splash visible={splashVisible} />
      </View>
    </SafeAreaProvider>
  );
}

function close() {
  Alert.alert('종료하시겠어요?', '확인을 누르면 종료합니다.', [
    { text: '취소', style: 'cancel' },
    { text: '확인', onPress: () => BackHandler.exitApp() },
  ]);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
});

export default App;
