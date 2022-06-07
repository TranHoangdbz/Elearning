import 'package:dio/dio.dart';
import 'base_provider.dart';

import 'package:uit_elearning/constants/app_strings.dart';
import 'package:uit_elearning/data/models/lesson.dart';

class LessonProvider extends BaseProvider {
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
    // TODO: implement fetch
    throw UnimplementedError();
  }

  @override
  Future<List<Lesson>> fetchAll() async {
    // dynamic response =
    // await Dio().get("${AppStrings.connectString}/api/courses");

    // if (response.data['success'] == true) {
    //   final parsed =
    //   List.from(response.data['data']).cast<Map<String, dynamic>>();

    //   return parsed.map<Lesson>((json) => Lesson.fromJson(json)).toList();
    // } else {
    //   throw Exception(response.data['message']);
    // }

    // TODO: implement fetch
    throw UnimplementedError();
  }

  @override
  Future update(id, obj) {
    // TODO: implement update
    throw UnimplementedError();
  }
}
