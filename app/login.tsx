import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from '@react-native-firebase/auth';
import { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { DARK_THEME } from '@/constants/dummyData';
import { getFirebaseAuth, isFirebaseConfigured } from '@/lib/firebase';

type AuthMode = 'sign-in' | 'create-account';

const FIREBASE_PENDING_MESSAGE =
  'Firebase Auth will start working after you add the Google services config files and rebuild the app.';

function getErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  return 'Something went wrong. Please try again.';
}

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [currentEmail, setCurrentEmail] = useState<string | null>(null);
  const [busyMode, setBusyMode] = useState<AuthMode | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const firebaseReady = useMemo(() => isFirebaseConfigured(), []);

  useEffect(() => {
    const auth = getFirebaseAuth();

    if (!auth) {
      setMessage(FIREBASE_PENDING_MESSAGE);
      return;
    }

    setCurrentEmail(auth.currentUser?.email ?? null);
    return onAuthStateChanged(auth, (user) => {
      setCurrentEmail(user?.email ?? null);
    });
  }, []);

  const submit = async (mode: AuthMode) => {
    const auth = getFirebaseAuth();

    if (!auth) {
      setMessage(FIREBASE_PENDING_MESSAGE);
      return;
    }

    const normalisedEmail = email.trim().toLowerCase();

    if (!normalisedEmail || password.length < 6) {
      setMessage('Enter an email address and a password with at least 6 characters.');
      return;
    }

    setBusyMode(mode);
    setMessage(null);

    try {
      const result =
        mode === 'sign-in'
          ? await signInWithEmailAndPassword(auth, normalisedEmail, password)
          : await createUserWithEmailAndPassword(auth, normalisedEmail, password);

      setCurrentEmail(result.user.email ?? normalisedEmail);
      setMessage(mode === 'sign-in' ? 'Signed in successfully.' : 'Account created successfully.');
    } catch (error) {
      setMessage(getErrorMessage(error));
    } finally {
      setBusyMode(null);
    }
  };

  const handleSignOut = async () => {
    const auth = getFirebaseAuth();

    if (!auth) {
      setMessage(FIREBASE_PENDING_MESSAGE);
      return;
    }

    setBusyMode('sign-in');
    setMessage(null);

    try {
      await auth.signOut();
      setCurrentEmail(null);
      setPassword('');
      setMessage('Signed out.');
    } catch (error) {
      setMessage(getErrorMessage(error));
    } finally {
      setBusyMode(null);
    }
  };

  const loading = busyMode !== null;

  return (
    <KeyboardAvoidingView
      style={styles.keyboardView}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <View style={styles.hero}>
          <Text style={styles.eyebrow}>Account</Text>
          <Text style={styles.title}>Sign in when you are ready.</Text>
          <Text style={styles.subtitle}>
            The app stays open to everyone for now, but this screen is ready for Firebase Auth.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            autoCapitalize="none"
            autoComplete="email"
            keyboardType="email-address"
            onChangeText={setEmail}
            placeholder="chef@example.com"
            placeholderTextColor={DARK_THEME.textMuted}
            style={styles.input}
            value={email}
          />

          <Text style={styles.label}>Password</Text>
          <TextInput
            autoCapitalize="none"
            autoComplete="password"
            onChangeText={setPassword}
            placeholder="Minimum 6 characters"
            placeholderTextColor={DARK_THEME.textMuted}
            secureTextEntry
            style={styles.input}
            value={password}
          />

          <Pressable
            disabled={!firebaseReady || loading}
            onPress={() => submit('sign-in')}
            style={[styles.primaryButton, (!firebaseReady || loading) && styles.buttonDisabled]}
          >
            {busyMode === 'sign-in' ? (
              <ActivityIndicator color={DARK_THEME.background} />
            ) : (
              <Text style={styles.primaryButtonText}>Sign in</Text>
            )}
          </Pressable>

          <Pressable
            disabled={!firebaseReady || loading}
            onPress={() => submit('create-account')}
            style={[styles.secondaryButton, (!firebaseReady || loading) && styles.buttonDisabled]}
          >
            {busyMode === 'create-account' ? (
              <ActivityIndicator color={DARK_THEME.textPrimary} />
            ) : (
              <Text style={styles.secondaryButtonText}>Create account</Text>
            )}
          </Pressable>
        </View>

        <View style={styles.statusCard}>
          <Text style={styles.statusTitle}>{firebaseReady ? 'Firebase ready' : 'Firebase config pending'}</Text>
          <Text style={styles.statusText}>
            {message ??
              (firebaseReady
                ? 'Add your Firebase project files and this screen can start authenticating users.'
                : FIREBASE_PENDING_MESSAGE)}
          </Text>
          {currentEmail ? (
            <>
              <Text style={styles.currentUser}>Signed in as {currentEmail}</Text>
              <Pressable onPress={handleSignOut} style={styles.ghostButton}>
                <Text style={styles.ghostButtonText}>Sign out</Text>
              </Pressable>
            </>
          ) : null}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
    backgroundColor: DARK_THEME.background,
  },
  container: {
    flex: 1,
    backgroundColor: DARK_THEME.background,
  },
  content: {
    padding: 20,
    gap: 16,
  },
  hero: {
    gap: 6,
  },
  eyebrow: {
    color: DARK_THEME.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 1,
    fontSize: 12,
  },
  title: {
    color: DARK_THEME.textPrimary,
    fontSize: 26,
    fontWeight: '700',
  },
  subtitle: {
    color: DARK_THEME.textMuted,
    lineHeight: 20,
  },
  card: {
    backgroundColor: DARK_THEME.surface,
    borderColor: DARK_THEME.border,
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    gap: 12,
  },
  label: {
    color: DARK_THEME.textPrimary,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: DARK_THEME.border,
    borderRadius: 12,
    backgroundColor: DARK_THEME.background,
    color: DARK_THEME.textPrimary,
    minHeight: 52,
    paddingHorizontal: 14,
  },
  primaryButton: {
    borderRadius: 14,
    backgroundColor: DARK_THEME.textPrimary,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 52,
    marginTop: 4,
  },
  primaryButtonText: {
    color: DARK_THEME.background,
    fontWeight: '700',
    fontSize: 16,
  },
  secondaryButton: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: DARK_THEME.textPrimary,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 52,
  },
  secondaryButtonText: {
    color: DARK_THEME.textPrimary,
    fontWeight: '700',
    fontSize: 16,
  },
  buttonDisabled: {
    opacity: 0.45,
  },
  statusCard: {
    backgroundColor: DARK_THEME.surface,
    borderColor: DARK_THEME.border,
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    gap: 10,
  },
  statusTitle: {
    color: DARK_THEME.textPrimary,
    fontWeight: '700',
    fontSize: 16,
  },
  statusText: {
    color: DARK_THEME.textMuted,
    lineHeight: 20,
  },
  currentUser: {
    color: DARK_THEME.textPrimary,
    fontWeight: '600',
  },
  ghostButton: {
    alignSelf: 'flex-start',
    paddingVertical: 6,
  },
  ghostButtonText: {
    color: DARK_THEME.textPrimary,
    fontWeight: '700',
  },
});
