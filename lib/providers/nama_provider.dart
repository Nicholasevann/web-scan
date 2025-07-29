import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../notifiers/nama_notifier.dart';
import '../states/nama_state.dart';

/// Provider for NamaNotifier
final namaProvider = NotifierProvider<NamaNotifier, NamaState>(
  () => NamaNotifier(),
);