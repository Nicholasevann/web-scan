import 'package:freezed_annotation/freezed_annotation.dart';
import '../models/jenis_data.dart';

part 'nama_state.freezed.dart';

@freezed
class NamaState with _$NamaState {
  const factory NamaState.initial() = _Initial;
  const factory NamaState.loading() = _Loading;
  const factory NamaState.success(List<JenisData> data) = _Success;
  const factory NamaState.error(String message) = _Error;
}