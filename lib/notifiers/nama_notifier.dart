import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../models/jenis_data.dart';
import '../states/nama_state.dart';

class NamaNotifier extends Notifier<NamaState> {
  @override
  NamaState build() {
    return const NamaState.initial();
  }

  /// Fetches data and updates the state accordingly
  Future<void> fetchData() async {
    // Transition to loading state
    state = const NamaState.loading();

    try {
      // Simulate API call delay
      await Future.delayed(const Duration(seconds: 2));

      // Simulate potential error (uncomment to test error state)
      // if (DateTime.now().millisecond % 2 == 0) {
      //   throw Exception('Random error occurred');
      // }

      // Create dummy data
      final dummyData = _generateDummyData();

      // Transition to success state with data
      state = NamaState.success(dummyData);
    } catch (error) {
      // Transition to error state
      state = NamaState.error(error.toString());
    }
  }

  /// Resets the state back to initial
  void reset() {
    state = const NamaState.initial();
  }

  /// Generates dummy data for demonstration
  List<JenisData> _generateDummyData() {
    return [
      JenisData(
        id: 1,
        name: 'Flutter Development',
        description: 'Cross-platform mobile app development framework',
        createdAt: DateTime.now().subtract(const Duration(days: 30)),
      ),
      JenisData(
        id: 2,
        name: 'Riverpod State Management',
        description: 'A reactive caching and data-binding framework',
        createdAt: DateTime.now().subtract(const Duration(days: 15)),
      ),
      JenisData(
        id: 3,
        name: 'Freezed Code Generation',
        description: 'Code generation for immutable classes and unions',
        createdAt: DateTime.now().subtract(const Duration(days: 7)),
      ),
      JenisData(
        id: 4,
        name: 'Clean Architecture',
        description: 'Software design philosophy for maintainable code',
        createdAt: DateTime.now().subtract(const Duration(days: 3)),
      ),
    ];
  }
}