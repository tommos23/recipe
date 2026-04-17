import { getApp, getApps } from '@react-native-firebase/app';
import { getAnalytics } from '@react-native-firebase/analytics';
import { initializeAppCheck } from '@react-native-firebase/app-check';
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

function getOptionalFirebaseService<T>(factory: () => T) {
  try {
    return factory();
  } catch {
    return null;
  }
}

export function getFirebaseAnalytics() {
  const app = getFirebaseApp();

  return app ? getOptionalFirebaseService(() => getAnalytics(app)) : null;
}

export function getFirebaseAuth() {
  const app = getFirebaseApp();

  return app ? getOptionalFirebaseService(() => getAuth(app)) : null;
}

export function getFirebaseCrashlytics() {
  const app = getFirebaseApp();

  return app ? getOptionalFirebaseService(() => getCrashlytics()) : null;
}

export function getFirebaseFirestore() {
  const app = getFirebaseApp();

  return app ? getOptionalFirebaseService(() => getFirestore(app)) : null;
}

export function getFirebaseFunctions() {
  const app = getFirebaseApp();

  return app ? getOptionalFirebaseService(() => getFunctions(app)) : null;
}

export function getFirebasePerformance() {
  const app = getFirebaseApp();

  return app ? getOptionalFirebaseService(() => getPerformance(app)) : null;
}

export function getFirebaseRemoteConfig() {
  const app = getFirebaseApp();

  return app ? getOptionalFirebaseService(() => getRemoteConfig(app)) : null;
}

export function getFirebaseServices() {
  const app = getFirebaseApp();

  if (!app) {
    return null;
  }

  return {
    app,
    analytics: getFirebaseAnalytics(),
    auth: getFirebaseAuth(),
    crashlytics: getFirebaseCrashlytics(),
    firestore: getFirebaseFirestore(),
    functions: getFirebaseFunctions(),
    perf: getFirebasePerformance(),
    remoteConfig: getFirebaseRemoteConfig(),
  };
}

export { initializeAppCheck };
