// Ex3 · TASK 9 — teste unitário do favoritesProvider (sem UI, sem Firestore).
//
// Em teste o Firebase não é inicializado: a leitura/gravação no Firestore falha
// dentro do try/catch do provider e o estado local funciona normalmente.

import 'package:flutter_test/flutter_test.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:filmes_flutter/state/favorites.dart';

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();

  test('favoritos: começa vazio, toggle adiciona/remove e clear esvazia', () {
    final c = ProviderContainer();
    addTearDown(c.dispose);

    expect(c.read(favoritesProvider), isEmpty);

    c.read(favoritesProvider.notifier).toggle(1);
    expect(c.read(favoritesProvider).contains(1), isTrue);

    c.read(favoritesProvider.notifier).toggle(1);
    expect(c.read(favoritesProvider).contains(1), isFalse);

    c.read(favoritesProvider.notifier).toggle(1);
    c.read(favoritesProvider.notifier).toggle(2);
    expect(c.read(favoritesProvider), {1, 2});

    c.read(favoritesProvider.notifier).clear();
    expect(c.read(favoritesProvider), isEmpty);
  });

  test('favoritos: providers em containers diferentes não compartilham estado', () {
    final a = ProviderContainer();
    final b = ProviderContainer();
    addTearDown(a.dispose);
    addTearDown(b.dispose);

    a.read(favoritesProvider.notifier).toggle(10);
    expect(a.read(favoritesProvider), {10});
    expect(b.read(favoritesProvider), isEmpty);
  });
}
