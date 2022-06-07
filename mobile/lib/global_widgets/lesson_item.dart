import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:uit_elearning/constants/app_colors.dart';
import 'package:uit_elearning/data/models/lesson.dart';

class LessonItem extends StatelessWidget {
  Lesson lesson;
  final Color? primary;
  final Color? onPrimary;
  final function;
  LessonItem(
      {required this.lesson,
      this.primary,
      this.onPrimary,
      Key? key,
      this.function})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Material(
      child: GestureDetector(
        onTap: function,
        child: Container(
          padding: const EdgeInsets.all(20),
          height: 60,
          width: double.maxFinite,
          color: onPrimary ?? AppColors.disabledColor,
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                lesson.name,
                style: TextStyle(fontSize: 14, color: primary ?? Colors.black),
              ),
              Text(
                "${lesson.lessonVolume} minute",
                style: TextStyle(fontSize: 14, color: primary ?? Colors.black),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
