import 'package:flutter/material.dart';
import 'package:get/get.dart';

import '../../../constants/text_styles.dart';
import 'course_item.dart';
import '../../../data/models/course.dart';

class CourseList extends StatelessWidget {
  // const CourseList({Key? key}) : super(key: key);
  // final coursesList = [
  //   Course(
  //     courseName: 'Flutter',
  //     courseImage: 'https://picsum.photos/250/250?image=1',
  //     description: 'Let\'s learn Flutter!',
  //   ),
  //   Course(
  //     courseName: 'React',
  //     courseImage: 'https://picsum.photos/250/250?image=2',
  //     description: 'Let\'s learn React!',
  //   ),
  //   Course(
  //     courseName: 'Android',
  //     courseImage: 'https://picsum.photos/250/250?image=3',
  //     description: 'Let\'s learn Flutter!',
  //   ),
  //   Course(
  //     courseName: 'Web',
  //     courseImage: 'https://picsum.photos/250/250?image=4',
  //     description: 'Let\'s learn Web!',
  //   ),
  //   Course(
  //     courseName: 'UI/UX',
  //     courseImage: 'https://picsum.photos/250/250?image=5',
  //     description: 'Let\'s learn UI/UX',
  //   ),
  // ];

  final String category;
  final List<Course> courses;
  const CourseList({required this.courses, required this.category, Key? key})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Container(
          margin: const EdgeInsets.only(left: 30),
          child: Text(
            category,
            style: TextStyles.textStylePrimaryColor24w700,
          ),
        ),
        const SizedBox(
          height: 20,
        ),
        SizedBox(
          height: 280,
          child: courses.isEmpty
              ? const SizedBox(
                  height: 18,
                  child: Center(
                    child: Text('Empty'),
                  ),
                )
              : ListView.separated(
                  controller: ScrollController(),
                  shrinkWrap: true,
                  physics: const ClampingScrollPhysics(),
                  padding: const EdgeInsets.only(left: 24, bottom: 28),
                  scrollDirection: Axis.horizontal,
                  itemCount: courses.length,
                  itemBuilder: (context, index) =>
                      CourseItem(course: courses[index]),
                  separatorBuilder: (context, index) => const SizedBox(
                    width: 40,
                  ),
                ),
        )
      ],
    );
  }
}
