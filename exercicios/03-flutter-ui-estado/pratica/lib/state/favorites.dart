// lib/state/favorites.dart
//
// Ex2 (TASK 2): estado compartilhado de favoritos com Riverpod.
// Ex4 (TASK 7): o mesmo provider sincronizado com o Firestore (cloud).
//
// O estado local é atualizado na hora (otimista) e a gravação no Firestore roda
// em paralelo. Em `flutter test` o Firebase não é inicializado: as chamadas
// falham dentro do try/catch e o provider funciona só em memória.

import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

const _favDoc = 'favorites/meus-favoritos';

class FavoritesNotifier extends Notifier<Set<int>> {
  @override
  Set<int> build() {
    _load(); // leitura assíncrona; o estado começa vazio até o Firestore responder
    return {};
  }

  Future<void> _load() async {
    try {
      final doc = await FirebaseFirestore.instance.doc(_favDoc).get();
      final ids = (doc.data()?['ids'] as List<dynamic>?)?.map((e) => (e as num).toInt()) ?? const <int>[];
      // une com o que o usuário já tenha marcado enquanto a leitura não voltava
      state = {...state, ...ids};
    } catch (e) {
      // offline, regras do Firestore (`permission-denied`) ou `flutter test` ("No Firebase App")
      debugPrint('Firestore (ler): $e');
    }
  }

  Future<void> _persist(Set<int> next) async {
    try {
      await FirebaseFirestore.instance.doc(_favDoc).set({'ids': next.toList()});
    } catch (e) {
      // a UI já refletiu a mudança; com a persistência offline ligada (TASK 10)
      // o Firestore reenvia sozinho quando a rede volta
      debugPrint('Firestore (gravar): $e');
    }
  }

  void toggle(int id) {
    final next = state.contains(id) ? ({...state}..remove(id)) : {...state, id};
    state = next;
    _persist(next);
  }

  void clear() {
    state = {};
    _persist({});
  }
}

final favoritesProvider = NotifierProvider<FavoritesNotifier, Set<int>>(FavoritesNotifier.new);
