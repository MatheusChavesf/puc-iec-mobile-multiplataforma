// src/components/HeartButton.tsx
//
// ATIVIDADE 2 — TASK 8, opção A (Heart pop).
//
// Ao tocar no coração: escala em spring (1 -> 1.4 -> 1.0) + rotação leve.
// Tudo roda na UI thread via worklets do Reanimated (useSharedValue +
// useAnimatedStyle). Não usa a Animated API legada.

import { Pressable, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

type Props = {
  active: boolean;
  onPress: () => void;
  size?: number;
};

export default function HeartButton({ active, onPress, size = 24 }: Props) {
  const scale = useSharedValue(1);
  const rotation = useSharedValue(0);

  // Estilo derivado dos shared values: recalculado na UI thread, sem passar pelo JS.
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }, { rotate: `${rotation.value}deg` }],
  }));

  const handlePress = () => {
    // 1 -> 1.4 (rápido) -> 1.0 (spring com leve overshoot)
    scale.value = withSequence(withTiming(1.4, { duration: 90 }), withSpring(1, { damping: 4, stiffness: 220 }));
    // balança pra um lado e volta ao centro
    rotation.value = withSequence(
      withTiming(-12, { duration: 70 }),
      withTiming(12, { duration: 90 }),
      withSpring(0, { damping: 6 }),
    );
    onPress();
  };

  return (
    <Pressable
      onPress={(e) => {
        // evita disparar o onPress do card pai (navegação)
        e.stopPropagation();
        handlePress();
      }}
      hitSlop={8}
      style={styles.button}
      accessibilityRole="button"
      accessibilityLabel={active ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
    >
      <Animated.Text style={[{ fontSize: size }, animatedStyle]}>{active ? '❤️' : '🤍'}</Animated.Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: { padding: 8 },
});
