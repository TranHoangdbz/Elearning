import 'package:dio/dio.dart';
import '../../constants/app_strings.dart';

import '../models/course.dart';

import 'base_provider.dart';

class CourseProvider extends BaseProvider<String, Course> {
  @override
  Future<Course> add(Course obj) {
    // TODO: implement add
    throw UnimplementedError();
  }

  @override
  Future<String> delete(String id) {
    // TODO: implement delete
    throw UnimplementedError();
  }

  @override
  Future<Course> fetch(String id) {
    // TODO: implement fetch
    throw UnimplementedError();
  }

  @override
  Future<List<Course>> fetchAll() async {
    List<Course> courses = [];

    try {
      final response = await Dio().get('${AppStrings.connectString}/courses');
      if (response.statusCode == 200) {
        for (dynamic data in response.data) {
          courses.add(Course.fromJson(data));
        }
      }
    } catch (e) {
      throw Exception;
    }
    return courses;
  }

  @override
  Future<Course> update(String id, Course obj) {
    // TODO: implement update
    throw UnimplementedError();
  }
}
