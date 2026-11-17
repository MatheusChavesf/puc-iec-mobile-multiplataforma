import React, { useMemo } from 'react';
import { FlatList, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../App';
import BottomNav from './BottomNav';
import PokemonCard from '../components/PokemonCard';
import StateView from '../components/StateView';
import { usePokemonList } from '../state/usePokemon';
import { useFavorites } from '../state/FavoritesContext';
import { spacing, useTheme } from '../theme/tokens';

type Props = NativeStackScreenProps<RootStackParamList, 'Favorites'>;

export default function FavoritesScreen({ navigation }: Props) {
  const c = useTheme();
  const list = usePokemonList();
  const favorites = useFavorites();

  // cruza os ids salvos com os dados da lista (feature 5)
  const items = useMemo(
    () => (list.data ?? []).filter((p) => favorites.ids.has(p.id)),
    [list.data, favorites.ids],
  );

  const renderBody = () => {
    if (list.loading || !favorites.ready) return <StateView kind="loading" />;
    if (list.error) return <StateView kind="error" message={list.error} onRetry={list.reload} />;
    if (items.length === 0) {
      return (
        <StateView
          kind="empty"
          message="Nenhum favorito ainda."
          hint="Toque no ♡ de um pokémon para guardá-lo aqui."
        />
      );
    }
    return (
      <FlatList
        data={items}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={{ paddingVertical: spacing.md }}
        renderItem={({ item }) => (
          <PokemonCard
            testID={`favorite-item-${item.id}`}
            pokemon={item}
            isFavorite
            onPress={() => navigation.navigate('Detail', { pokemonId: item.id })}
            onToggleFavorite={() => favorites.toggle(item.id)}
          />
        )}
      />
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: c.background }}>
      <View style={{ flex: 1 }}>{renderBody()}</View>
      <BottomNav navigation={navigation} active="Favorites" />
    </View>
  );
}
