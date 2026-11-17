import React, { useMemo, useState } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { capitalize } from '../types/pokemon';
import type { RootStackParamList } from '../../App';
import BottomNav from './BottomNav';
import PokemonCard from '../components/PokemonCard';
import StateView from '../components/StateView';
import { usePokemonList, useTypeNames } from '../state/usePokemon';
import { useFavorites } from '../state/FavoritesContext';
import { filterPokemon } from '../logic/pokemonLogic';
import { font, radius, spacing, typeColor, useTheme } from '../theme/tokens';

type Props = NativeStackScreenProps<RootStackParamList, 'List'>;

const CATEGORIES = ['fire', 'water', 'electric', 'grass', 'psychic', 'poison', 'bug', 'normal'];

export default function ListScreen({ navigation }: Props) {
  const c = useTheme();
  const list = usePokemonList(); // feature 1 — lista vinda da API
  const [searchText, setSearchText] = useState(''); // feature 3 — busca
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null); // feature 4
  const typeNames = useTypeNames(selectedCategory);
  const favorites = useFavorites();

  const filtered = useMemo(
    () => filterPokemon(list.data ?? [], searchText, typeNames.data),
    [list.data, searchText, typeNames.data],
  );

  const renderBody = () => {
    if (list.loading) return <StateView kind="loading" message="Carregando a Pokédex…" />;
    if (list.error) return <StateView kind="error" message={list.error} onRetry={list.reload} />;
    if (selectedCategory && typeNames.error) {
      return <StateView kind="error" message={typeNames.error} onRetry={typeNames.reload} />;
    }
    if (selectedCategory && typeNames.loading) return <StateView kind="loading" message="Filtrando por tipo…" />;
    return (
      <FlatList
        data={filtered}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={{ paddingTop: spacing.sm, paddingBottom: spacing.lg, flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        ListEmptyComponent={
          <StateView
            kind="empty"
            message="Nenhum pokémon encontrado."
            hint="Tente outro nome ou limpe o filtro de tipo."
          />
        }
        renderItem={({ item }) => (
          <PokemonCard
            testID={`item-card-${item.id}`}
            pokemon={item}
            isFavorite={favorites.isFavorite(item.id)}
            onPress={() => navigation.navigate('Detail', { pokemonId: item.id })}
            onToggleFavorite={() => favorites.toggle(item.id)}
          />
        )}
      />
    );
  };

  return (
    <View testID="item-list-screen" collapsable={false} style={[styles.screen, { backgroundColor: c.background }]}>
      <TextInput
        testID="search-input"
        placeholder="Buscar por nome ou número"
        placeholderTextColor={c.textMuted}
        value={searchText}
        onChangeText={setSearchText}
        autoCapitalize="none"
        autoCorrect={false}
        clearButtonMode="while-editing"
        accessibilityLabel="Buscar pokémon"
        style={[styles.search, { backgroundColor: c.surface, borderColor: c.border, color: c.text }]}
      />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.chips}
        contentContainerStyle={{ paddingHorizontal: spacing.lg, gap: spacing.sm }}
      >
        <Chip
          testID="category-chip-all"
          label="Todos"
          color={c.primary}
          selected={selectedCategory === null}
          onPress={() => setSelectedCategory(null)}
        />
        {CATEGORIES.map((category) => (
          <Chip
            key={category}
            testID={`category-chip-${category}`}
            label={capitalize(category)}
            color={typeColor(category)}
            selected={selectedCategory === category}
            onPress={() => setSelectedCategory(category)}
          />
        ))}
      </ScrollView>
      {!list.loading && !list.error && (
        <Text style={[styles.count, { color: c.textMuted }]}>
          {filtered.length} {filtered.length === 1 ? 'pokémon' : 'pokémons'}
        </Text>
      )}
      <View style={{ flex: 1 }}>{renderBody()}</View>
      <BottomNav navigation={navigation} active="List" />
    </View>
  );
}

function Chip({
  testID,
  label,
  color,
  selected,
  onPress,
}: {
  testID: string;
  label: string;
  color: string;
  selected: boolean;
  onPress: () => void;
}) {
  const c = useTheme();
  return (
    <TouchableOpacity
      testID={testID}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected }}
      style={[
        styles.chip,
        { backgroundColor: selected ? color : c.surface, borderColor: selected ? color : c.border },
      ]}
    >
      <Text style={{ color: selected ? '#fff' : c.text, fontWeight: selected ? '700' : '500' }}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  search: {
    marginHorizontal: spacing.lg,
    marginTop: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderWidth: 1,
    borderRadius: radius.md,
    fontSize: font.body,
  },
  chips: { maxHeight: 52, marginTop: spacing.md, flexGrow: 0 },
  chip: { paddingHorizontal: 14, paddingVertical: spacing.sm, borderRadius: radius.pill, borderWidth: 1 },
  count: { marginHorizontal: spacing.lg, marginTop: spacing.sm, fontSize: font.caption },
});
