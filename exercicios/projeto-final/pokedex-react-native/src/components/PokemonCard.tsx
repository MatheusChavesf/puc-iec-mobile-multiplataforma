import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { capitalize, spriteUrl, type PokemonSummary } from '../types/pokemon';
import { dexNumber } from '../logic/pokemonLogic';
import { font, radius, spacing, useTheme } from '../theme/tokens';

type Props = {
  pokemon: PokemonSummary;
  testID: string;
  isFavorite: boolean;
  onPress: () => void;
  onToggleFavorite: () => void;
};

export default function PokemonCard({ pokemon, testID, isFavorite, onPress, onToggleFavorite }: Props) {
  const c = useTheme();
  return (
    <Pressable
      testID={testID}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${capitalize(pokemon.name)}, ${dexNumber(pokemon.id)}`}
      style={({ pressed }) => [
        styles.card,
        { backgroundColor: c.surface, borderColor: c.border, opacity: pressed ? 0.85 : 1 },
      ]}
    >
      <View style={[styles.sprite, { backgroundColor: c.surfaceAlt }]}>
        <Image source={{ uri: spriteUrl(pokemon.id) }} style={styles.image} resizeMode="contain" />
      </View>
      <View style={styles.info}>
        <Text style={[styles.number, { color: c.textMuted }]}>{dexNumber(pokemon.id)}</Text>
        <Text style={[styles.name, { color: c.text }]} numberOfLines={1}>
          {capitalize(pokemon.name)}
        </Text>
      </View>
      <Pressable
        onPress={onToggleFavorite}
        hitSlop={10}
        accessibilityRole="button"
        accessibilityLabel={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
        style={styles.heart}
      >
        <Text style={{ fontSize: 22, color: isFavorite ? c.primary : c.textMuted }}>{isFavorite ? '♥' : '♡'}</Text>
      </Pressable>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: spacing.lg,
    marginBottom: spacing.sm,
    padding: spacing.sm,
    borderRadius: radius.md,
    borderWidth: StyleSheet.hairlineWidth,
  },
  sprite: { width: 64, height: 64, borderRadius: radius.sm, alignItems: 'center', justifyContent: 'center' },
  image: { width: 56, height: 56 },
  info: { flex: 1, marginLeft: spacing.md },
  number: { fontSize: font.caption, fontWeight: '600' },
  name: { fontSize: font.title, fontWeight: '700' },
  heart: { padding: spacing.sm },
});
