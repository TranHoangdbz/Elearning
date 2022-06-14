import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:uit_elearning/constants/text_styles.dart';

import '../data/models/teacher.dart';
import '../constants/app_colors.dart';

class CourseTeacher extends StatelessWidget {
  const CourseTeacher({required this.teacher, Key? key}) : super(key: key);

  // final Teacher teacher = Teacher(
  //   fullName: 'Huy Nhan',
  //   email: 'example@example.com',
  //   title: 'Flutter Developer',
  // );
  // CourseTeacher(this.teacher);
  final Teacher teacher;

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        CircleAvatar(
          backgroundImage: NetworkImage(teacher.profilePicture),
          onBackgroundImageError: (e, s) {
            debugPrint('Teacher avatar can\'t load: , $e, $s');
          },
        ),
        const SizedBox(width: 10),
        // Image.network('https://picsum.photos/50/50', width: 37.88, height: 37.88, ),
        Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              teacher.fullName,
              textAlign: TextAlign.left,
              style: TextStyles.textStylePrimaryColor12w600,
            ),
            Text(
              teacher.title,
              textAlign: TextAlign.left,
              style: TextStyles.textStylePrimaryColor12w300,
            )
          ],
        ),
      ],
    );
  }
}
