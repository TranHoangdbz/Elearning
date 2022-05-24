import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart';
import 'package:get/get.dart';

import '../../../constants/text_styles.dart';
import '../../../data/models/teacher.dart';
import '../../../global_widgets/course_teacher.dart';
import '../../../constants/app_colors.dart';
import '../../../data/models/course.dart';

class CourseItem extends StatelessWidget {
  // const CourseItem({Key? key}) : super(key: key);

  Course course;
  CourseItem(this.course);

  @override
  Widget build(BuildContext context) {
    return Material(
      elevation: 4,
      borderRadius: BorderRadius.circular(20),
      child: GestureDetector(
        // onTap: ,
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
                        course.courseImage ??
                            'https://picsum.photos/250/250?image=2',
                        fit: BoxFit.cover,
                      ),
                    ),
                  ),
                  Expanded(
                    flex: 4,
                    child: Padding(
                      padding: const EdgeInsets.only(top: 15, left: 20),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          CourseTeacher(),
                          const SizedBox(
                            height: 8,
                          ),
                          Text(
                            course.courseName,
                            style: TextStyles.textStylePrimaryColor12w600,
                          ),
                          const SizedBox(
                            height: 5,
                          ),
                          Row(
                            children: [
                              Text(
                                '1 hours 12 mins',
                                style: TextStyles.textStylePrimaryColor12w300,
                              ),
                              const SizedBox(
                                width: 32,
                              ),
                              const Icon(
                                Icons.circle,
                                size: 8,
                              ),
                              const SizedBox(
                                width: 8,
                              ),
                              Text(
                                '7 lessons',
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
