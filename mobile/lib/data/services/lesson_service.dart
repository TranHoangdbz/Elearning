import 'package:flutter/material.dart';
import 'package:get/get_core/src/get_main.dart';
import 'package:get/get_navigation/src/extension_navigation.dart';
import 'package:uit_elearning/constants/app_colors.dart';
import 'package:uit_elearning/data/models/lesson.dart';
import 'package:uit_elearning/data/providers/lesson_provider.dart';
import 'package:uit_elearning/global_widgets/custom_dialog.dart';

class LessonService {
  LessonService._();
  static LessonService instance = LessonService._();

  final LessonProvider _lessonProvider = LessonProvider();

  List<Lesson> lessons = [];

  fetchLessons() async {
    try {
      lessons = await _lessonProvider.fetchAll();
      return lessons;
    } catch (e) {
      lessons = [];
      showDialog(
        context: Get.context!,
        builder: (context) {
          return const CustomDialog(
            content: "Can't connect to server",
            icon: Icon(
              Icons.error,
              color: AppColors.redColor,
              size: 48,
            ),
          );
        },
      );

      rethrow;
    }
  }

  getAllLessons() {
    return lessons;
  }
}
