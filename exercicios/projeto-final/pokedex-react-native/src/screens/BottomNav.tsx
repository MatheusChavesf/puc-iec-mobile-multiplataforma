import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFavorites } from '../state/FavoritesContext';
import { font, spacing, useTheme } from '../theme/tokens';

// Só precisa navegar entre as duas abas; tipo mínimo aceita a navigation de qualquer tela.
type Nav = { navigate: (screen: 'List' | 'Favorites') => void };

export default function BottomNav({ navigation, active }: { navigation: Nav; active: 'List' | 'Favorites' }) {
  const c = useTheme();
  const insets = useSafeAreaInsets();
  const { ids } = useFavorites();

  const tab = (name: 'List' | 'Favorites', label: string, testID?: string) => (
    <TouchableOpacity
      testID={testID}
      onPress={() => navigation.navigate(name)}
      accessibilityRole="tab"
      accessibilityState={{ selected: active === name }}
      style={{ flex: 1, alignItems: 'center', paddingVertical: spacing.sm }}
    >
      <Text
        style={{
          fontSize: font.body,
          fontWeight: active === name ? '700' : '500',
          color: active === name ? c.primary : c.textMuted,
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View
      style={{
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: c.border,
        backgroundColor: c.surface,
        paddingBottom: insets.bottom,
      }}
    >
      {tab('List', 'Pokédex')}
      {tab('Favorites', ids.size > 0 ? `Favoritos (${ids.size})` : 'Favoritos', 'tab-favorites')}
    </View>
  );
}
