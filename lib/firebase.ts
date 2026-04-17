import { getApp, getApps } from '@react-native-firebase/app';
import { getAnalytics } from '@react-native-firebase/analytics';
import { getAuth } from '@react-native-firebase/auth';
import { getCrashlytics } from '@react-native-firebase/crashlytics';
import { getFirestore } from '@react-native-firebase/firestore';
import { getFunctions } from '@react-native-firebase/functions';
import { getPerformance } from '@react-native-firebase/perf';
import { getRemoteConfig } from '@react-native-firebase/remote-config';

export const isFirebaseConfigured = () => getApps().length > 0;

export function getFirebaseApp() {
  return isFirebaseConfigured() ? getApp() : null;
}

export function getFirebaseServices() {
  const app = getFirebaseApp();

  if (!app) {
    return null;
  }

  return {
    app,
    analytics: getAnalytics(app),
    appCheck: app.appCheck(),
    auth: getAuth(app),
    crashlytics: getCrashlytics(),
    firestore: getFirestore(app),
    functions: getFunctions(app),
    perf: getPerformance(app),
    remoteConfig: getRemoteConfig(app),
  };
}

export function getFirebaseAuth() {
  return getFirebaseServices()?.auth ?? null;
}
