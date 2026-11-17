import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { capitalize, spriteUrl } from '../types/pokemon';
import type { RootStackParamList } from '../../App';
import StateView from '../components/StateView';
import { usePokemonDetail } from '../state/usePokemon';
import { useFavorites } from '../state/FavoritesContext';
import { dexNumber, formatHeight, formatWeight } from '../logic/pokemonLogic';
import { font, radius, spacing, typeColor, useTheme } from '../theme/tokens';

type Props = NativeStackScreenProps<RootStackParamList, 'Detail'>;

export default function DetailScreen({ route, navigation }: Props) {
  const { pokemonId } = route.params;
  const c = useTheme();
  const insets = useSafeAreaInsets();
  const detail = usePokemonDetail(pokemonId); // feature 2 — detalhe
  const favorites = useFavorites(); // feature 5 — favoritos persistidos
  const isFavorite = favorites.isFavorite(pokemonId);
  const mainType = detail.data?.types[0];
  const accent = mainType ? typeColor(mainType) : c.primary;

  return (
    <View
      testID="detail-screen"
      collapsable={false}
      style={[styles.screen, { backgroundColor: c.background, paddingTop: insets.top }]}
    >
      <View style={styles.topBar}>
        <TouchableOpacity
          testID="detail-back-button"
          onPress={() => navigation.goBack()}
          accessibilityRole="button"
          accessibilityLabel="Voltar"
          hitSlop={10}
        >
          <Text style={{ fontSize: font.title, color: c.text }}>{'‹ Voltar'}</Text>
        </TouchableOpacity>
      </View>

      {detail.loading && <StateView kind="loading" />}
      {detail.error && <StateView kind="error" message={detail.error} onRetry={detail.reload} />}

      {detail.data && (
        <ScrollView contentContainerStyle={{ padding: spacing.lg, paddingBottom: insets.bottom + spacing.xl }}>
          <View style={[styles.hero, { backgroundColor: accent + '33' }]}>
            <Image
              source={{ uri: spriteUrl(detail.data.id) }}
              style={styles.sprite}
              resizeMode="contain"
              accessibilityIgnoresInvertColors
            />
          </View>

          <View style={styles.titleRow}>
            <View style={{ flex: 1 }}>
              <Text style={[styles.number, { color: c.textMuted }]}>{dexNumber(detail.data.id)}</Text>
              <Text testID="detail-title" style={[styles.title, { color: c.text }]}>
                {capitalize(detail.data.name)}
              </Text>
            </View>
            <TouchableOpacity
              testID="detail-favorite-button"
              onPress={() => favorites.toggle(pokemonId)}
              accessibilityRole="button"
              accessibilityLabel={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
              style={[styles.favButton, { borderColor: c.primary, backgroundColor: isFavorite ? c.primary : 'transparent' }]}
            >
              <Text style={{ fontSize: 22, color: isFavorite ? c.onPrimary : c.primary }}>{isFavorite ? '♥' : '♡'}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.types}>
            {detail.data.types.map((t) => (
              <View key={t} style={[styles.typeBadge, { backgroundColor: typeColor(t) }]}>
                <Text style={styles.typeText}>{capitalize(t)}</Text>
              </View>
            ))}
          </View>

          <View style={[styles.stats, { backgroundColor: c.surface, borderColor: c.border }]}>
            <Stat label="Altura" value={formatHeight(detail.data.heightDm)} />
            <View style={{ width: 1, backgroundColor: c.border }} />
            <Stat label="Peso" value={formatWeight(detail.data.weightHg)} />
          </View>
        </ScrollView>
      )}
    </View>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  const c = useTheme();
  return (
    <View style={{ flex: 1, alignItems: 'center', gap: spacing.xs }}>
      <Text style={{ fontSize: font.title, fontWeight: '700', color: c.text }}>{value}</Text>
      <Text style={{ fontSize: font.caption, color: c.textMuted }}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  topBar: { paddingHorizontal: spacing.lg, paddingVertical: spacing.md },
  hero: { borderRadius: radius.lg, alignItems: 'center', paddingVertical: spacing.xl },
  sprite: { width: 180, height: 180 },
  titleRow: { flexDirection: 'row', alignItems: 'center', marginTop: spacing.lg },
  number: { fontSize: font.body, fontWeight: '600' },
  title: { fontSize: font.h1, fontWeight: '800' },
  favButton: { width: 48, height: 48, borderRadius: 24, borderWidth: 2, alignItems: 'center', justifyContent: 'center' },
  types: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.md },
  typeBadge: { paddingHorizontal: spacing.md, paddingVertical: spacing.xs, borderRadius: radius.pill },
  typeText: { color: '#fff', fontWeight: '700' },
  stats: {
    flexDirection: 'row',
    marginTop: spacing.xl,
    paddingVertical: spacing.lg,
    borderRadius: radius.md,
    borderWidth: StyleSheet.hairlineWidth,
  },
});
