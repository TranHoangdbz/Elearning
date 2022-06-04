import 'package:dio/dio.dart';
import 'package:uit_elearning/constants/app_strings.dart';
import 'package:uit_elearning/data/models/quizz.dart';
import 'package:uit_elearning/data/providers/base_provider.dart';

class QuizzProvider extends BaseProvider {
  @override
  Future add(obj) {
    // TODO: implement add
    throw UnimplementedError();
  }

  @override
  Future delete(id) {
    // TODO: implement delete
    throw UnimplementedError();
  }

  @override
  Future fetch(id) {
    throw UnimplementedError();
  }

  @override
  Future<List<Quiz>> fetchAll() async {
    try {
      final response = await Dio().get(
        '${AppStrings.connectString}/api/quizz/',
      );
      if (response.data['success']) {
        final parsed =
            List.from(response.data['data']).cast<Map<String, dynamic>>();

        return parsed.map<Quiz>((json) => Quiz.fromJson(json)).toList();
      }
    } on DioError catch (e) {
      return [];
    }
    throw UnimplementedError();
  }

  @override
  Future update(id, obj) {
    // TODO: implement update
    throw UnimplementedError();
  }
}
