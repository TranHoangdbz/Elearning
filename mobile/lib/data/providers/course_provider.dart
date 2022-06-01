import 'dart:convert';

import 'package:dio/dio.dart';

import '../../../../constants/app_strings.dart';
import '../models/course.dart';
import '../providers/base_provider.dart';

class CourseProvider extends BaseProvider {
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
  Future<List<Course>> fetchAll() async {
    dynamic response =
        await Dio().get("${AppStrings.connectString}/api/courses");

    if (response.data['success'] == true) {
      final parsed =
          List.from(response.data['data']).cast<Map<String, dynamic>>();

      return parsed.map<Course>((json) => Course.fromJson(json)).toList();
    } else {
      throw Exception(response.data['message']);
    }
  }

  @override
  Future update(id, obj) {
    // TODO: implement update
    throw UnimplementedError();
  }
}
