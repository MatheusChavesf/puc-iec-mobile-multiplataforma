// lib/firebase_options.dart
//
// ⚠️ SUBSTITUA pelos valores do SEU projeto Firebase antes de entregar.
//
// Opção 1 (recomendada): na pasta pratica/, rode `flutterfire configure`
//   (marque só a plataforma "web"). Ele sobrescreve este arquivo sozinho.
// Opção 2 (sem CLI): Console do Firebase → Visão geral → ícone </> (Web) →
//   copie o objeto `firebaseConfig` para os campos abaixo.
//
// Enquanto estiver com os placeholders, o app roda normalmente, mas os favoritos
// ficam só em memória (o main.dart captura a falha do Firebase).
import 'package:firebase_core/firebase_core.dart';

class DefaultFirebaseOptions {
  static const FirebaseOptions currentPlatform = FirebaseOptions(
    apiKey: 'SUA_API_KEY',
    appId: 'SEU_APP_ID',
    messagingSenderId: 'SEU_SENDER_ID',
    projectId: 'SEU_PROJECT_ID',
  );
}
