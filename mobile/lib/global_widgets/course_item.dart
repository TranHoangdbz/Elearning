import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart';
import 'package:get/get.dart';
import 'package:uit_elearning/routes/routes.dart';

import '../../../constants/text_styles.dart';
import '../../../data/models/teacher.dart';
import '../../../global_widgets/course_teacher.dart';
import '../../../constants/app_colors.dart';
import '../../../data/models/course.dart';

class CourseItem extends StatelessWidget {
  // const CourseItem({Key? key}) : super(key: key);
  Course course;
  final function;
  CourseItem({required this.course, Key? key, this.function}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    num noLessons = course.lessons.length;
    num courseVolume = course.lessons.fold(
        0, (previousValue, element) => previousValue + element.lessonVolume);

    return Material(
      elevation: 4,
      borderRadius: BorderRadius.circular(20),
      child: GestureDetector(
        onTap: function,
        child: Column(
          children: [
            SizedBox(
              height: 250,
              width: 250,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  Expanded(
                    flex: 5,
                    child: ClipRRect(
                      borderRadius: const BorderRadius.only(
                          topLeft: Radius.circular(20),
                          topRight: Radius.circular(20)),
                      child: Image.network(
                        course.courseImage,
                        fit: BoxFit.cover,
                        errorBuilder: (context, error, stackTrace) =>
                            const Center(
                          child: Icon(
                            Icons.error,
                            color: AppColors.redColor,
                            size: 48,
                          ),
                        ),
                      ),
                    ),
                  ),
                  Expanded(
                    flex: 4,
                    child: Padding(
                      padding:
                          const EdgeInsets.only(top: 15, left: 20, right: 20),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          if (course.teacher != null)
                            CourseTeacher(teacher: course.teacher!),
                          const SizedBox(
                            height: 8,
                          ),
                          Text(
                            course.courseName,
                            style: TextStyles.textStylePrimaryColor12w600,
                            overflow: TextOverflow.ellipsis,
                          ),
                          const SizedBox(
                            height: 5,
                          ),
                          Row(
                            children: [
                              Text(
                                '$courseVolume minute${courseVolume > 1 ? 's' : ''}',
                                style: TextStyles.textStylePrimaryColor12w300,
                              ),
                              const SizedBox(
                                width: 4,
                              ),
                              const Icon(
                                Icons.circle,
                                size: 8,
                              ),
                              const SizedBox(
                                width: 4,
                              ),
                              Text(
                                '$noLessons lesson${noLessons > 1 ? 's' : ''}',
                                style: TextStyles.textStylePrimaryColor12w600,
                              ),
                            ],
                          )
                        ],
                      ),
                    ),
                  )
                ],
              ),
            )
          ],
        ),
      ),
    );
  }
}
