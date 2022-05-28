import 'package:flutter/material.dart';
import 'package:get/get.dart';

import '../../constants/app_colors.dart';
import '../../global_widgets/custom_dialog.dart';
import '../models/course.dart';
import '../providers/course_provider.dart';

class CourseService {
  CourseService._();
  static final CourseService instance = CourseService._();

  final CourseProvider _courseProvider = CourseProvider();

  List<Course>? courses;

  getAllCourse() async {
    try {
      courses = await _courseProvider.fetchAll();
    } catch (e) {
      courses = [];
      showDialog(
        context: Get.context!,
        builder: (context) {
          return CustomDialog(
            content: e.toString(),
            icon: const Icon(
              Icons.error,
              color: AppColors.redColor,
              size: 48,
            ),
          );
        },
      );
    }
  }
}
