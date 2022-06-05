

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:uit_elearning/constants/app_colors.dart';
import 'package:uit_elearning/data/models/lesson.dart';

class LessonItem extends StatelessWidget{
  Lesson lesson;
  final Color? primary;
  final Color? onPrimary;
  LessonItem({required this.lesson, this.primary, this.onPrimary, Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Material(
      child: GestureDetector(
        child: Container(
          height: 60,
          width: double.maxFinite,
          color: onPrimary ?? AppColors.disabledColor,
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                lesson.name,
                style: TextStyle(
                  fontSize: 14,
                  color: primary ?? Colors.black
                ),
              ),
              Text(
                "5 minute",
                style: TextStyle(
                    fontSize: 14,
                    color: primary ?? Colors.black
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}