# SAJU TALK - AI 사주 상담 앱

AI 사주 전문가와 나누는 깊이 있는 사주 상담 서비스의 Android 앱입니다.
WebView 기반으로 [phrygia-saju-talk-web](https://phrygia-saju-talk-web.vercel.app)을 래핑하며, FCM 푸시 알림 및 Google AdMob 광고 기능을 포함합니다.

## 기술 스택

- **React Native** 0.85.3 (New Architecture)
- **TypeScript**
- **Firebase Cloud Messaging** — 푸시 알림
- **Google AdMob** — 배너 광고
- **AsyncStorage** — 알림 내역 로컬 저장
- **react-native-webview** — 웹앱 래핑

## 주요 기능

- WebView 기반 웹앱 렌더링
- 당겨서 새로고침 (최상단에서만 동작)
- FCM 푸시 알림 수신 및 인앱 배너 표시
- 푸시 알림 딥링크 (특정 URL 페이지로 이동)
- 알림 내역 저장 및 조회
- 알림 설정 (켜기/끄기)
- 네트워크 오프라인 감지
- Google AdMob 배너 광고

## 프로젝트 구조

```
src/
├── components/
│   ├── ErrorScreen/          # 페이지 로딩 오류 화면
│   ├── Notification/
│   │   ├── NotificationBanner/        # 포그라운드 알림 배너
│   │   ├── NotificationHistoryPage/   # 알림 내역 화면
│   │   └── NotificationSettingsModal/ # 알림 설정 모달
│   ├── OfflineScreen/        # 네트워크 오프라인 화면
│   ├── OrbitAnimation/       # 스플래시 오빗 애니메이션
│   ├── Splash/               # 스플래시 화면
│   └── StarBackground/       # 별 배경 애니메이션
└── hooks/
    ├── useNetwork.ts          # 네트워크 연결 상태
    └── useNotifications.ts    # 알림 상태 및 AsyncStorage 관리
```

## 시작하기

### 요구사항

- Node.js 20+
- Android Studio
- JDK 17

### 설치

```bash
yarn install
```

### 환경 설정

`android/app/google-services.json` 파일을 Firebase 콘솔에서 다운로드하여 배치하세요.

릴리즈 빌드 시 `android/gradle.properties`에 키스토어 정보를 추가하세요:

```
MYAPP_UPLOAD_STORE_FILE=sajutalk.keystore
MYAPP_UPLOAD_KEY_ALIAS=sajutalk
MYAPP_UPLOAD_STORE_PASSWORD=...
MYAPP_UPLOAD_KEY_PASSWORD=...
```

### 실행

```bash
# Metro 시작
yarn start

# Android 실행
yarn android
```

### 빌드

```bash
# 릴리즈 APK
cd android && ./gradlew assembleRelease

# 릴리즈 AAB (Play Store)
cd android && ./gradlew bundleRelease
```

## 주의사항

- `android/app/google-services.json` — Git 제외 (Firebase 설정)
- `android/gradle.properties` — Git 제외 (키스토어 비밀번호 포함)
- `android/app/sajutalk.keystore` — Git 제외 (서명 키)
