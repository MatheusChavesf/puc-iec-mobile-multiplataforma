// Estados de carregando, vazio e erro — nunca tela branca.
import React from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { font, radius, spacing, useTheme } from '../theme/tokens';

type Props =
  | { kind: 'loading'; message?: string }
  | { kind: 'empty'; message: string; hint?: string }
  | { kind: 'error'; message: string; onRetry?: () => void };

export default function StateView(props: Props) {
  const c = useTheme();
  return (
    <View style={[styles.box, { backgroundColor: c.background }]} accessibilityLiveRegion="polite">
      {props.kind === 'loading' && (
        <>
          <ActivityIndicator size="large" color={c.primary} />
          <Text style={[styles.message, { color: c.textMuted }]}>{props.message ?? 'Carregando…'}</Text>
        </>
      )}
      {props.kind === 'empty' && (
        <>
          <Text style={styles.icon}>🔎</Text>
          <Text style={[styles.message, { color: c.text }]}>{props.message}</Text>
          {props.hint && <Text style={[styles.hint, { color: c.textMuted }]}>{props.hint}</Text>}
        </>
      )}
      {props.kind === 'error' && (
        <>
          <Text style={styles.icon}>📡</Text>
          <Text style={[styles.message, { color: c.text }]}>{props.message}</Text>
          {props.onRetry && (
            <Pressable
              testID="retry-button"
              accessibilityRole="button"
              onPress={props.onRetry}
              style={[styles.button, { backgroundColor: c.primary }]}
            >
              <Text style={{ color: c.onPrimary, fontWeight: '600' }}>Tentar de novo</Text>
            </Pressable>
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  box: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: spacing.xl, gap: spacing.md },
  icon: { fontSize: 40 },
  message: { fontSize: font.body, textAlign: 'center' },
  hint: { fontSize: font.caption, textAlign: 'center' },
  button: { marginTop: spacing.sm, paddingHorizontal: spacing.xl, paddingVertical: spacing.md, borderRadius: radius.pill },
});
