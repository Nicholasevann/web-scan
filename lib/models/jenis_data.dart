import 'package:freezed_annotation/freezed_annotation.dart';

part 'jenis_data.freezed.dart';
part 'jenis_data.g.dart';

@freezed
class JenisData with _$JenisData {
  const factory JenisData({
    required int id,
    required String name,
    required String description,
    required DateTime createdAt,
  }) = _JenisData;

  factory JenisData.fromJson(Map<String, dynamic> json) =>
      _$JenisDataFromJson(json);
}