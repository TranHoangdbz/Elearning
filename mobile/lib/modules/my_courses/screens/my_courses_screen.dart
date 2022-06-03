import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:uit_elearning/data/services/auth_service.dart';
import 'package:uit_elearning/modules/do_quizz/screens/quizz_screen.dart';
import 'package:uit_elearning/routes/routes.dart';

import '../../../constants/app_colors.dart';
import '../../../constants/text_styles.dart';
import '../../../data/models/course.dart';
import '../controllers/my_courses_controller.dart';
import '../../../global_widgets/course_list.dart';

class MyCoursesScreen extends GetView<MyCoursesController> {
  const MyCoursesScreen({Key? key}) : super(key: key);

  // final _controller = Get.find<MyCoursesController>();

  @override
  Widget build(BuildContext context) {
    Get.put(MyCoursesController());
    return Scaffold(
      backgroundColor: AppColors.backgroundColor,
      body: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Container(
              margin: const EdgeInsets.all(20),
              child: Row(
                children: [
                  Container(
                    margin: const EdgeInsets.only(right: 20),
                    child: CircleAvatar(
                      backgroundImage:
                          NetworkImage(controller.getUserProfilePicture()),
                      onBackgroundImageError: (e, s) {
                        debugPrint('User avatar can\'t load: , $e, $s');
                      },
                      minRadius: 41,
                    ),
                  ),
                  const SizedBox(
                    height: 24,
                  ),
                  Flexible(
                    fit: FlexFit.loose,
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        FittedBox(
                          fit: BoxFit.scaleDown,
                          child: Text(
                            controller.getUserFullName(),
                            textAlign: TextAlign.left,
                            style: TextStyles.textStylePrimaryColor22w800,
                          ),
                        ),
                        const SizedBox(
                          height: 12,
                        ),
                        FittedBox(
                          fit: BoxFit.contain,
                          child: ElevatedButton(
                            onPressed: () {
                              Get.toNamed(Routes.profileDetail);
                            },
                            child: Padding(
                              padding: const EdgeInsets.all(10),
                              child: Text(
                                'Profile Detail',
                                style:
                                    TextStyles.textStyleBackkgroundColor12w600,
                              ),
                            ),
                            style: ElevatedButton.styleFrom(
                              primary: AppColors.primaryColor,
                              onPrimary: AppColors.onPrimaryColor,
                              shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(30),
                              ),
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                  const Spacer(),
                  IconButton(
                    onPressed: () {
                      Get.toNamed(Routes.quizz);
                    },
                    icon: const Icon(Icons.settings),
                  )
                ],
              ),
            ),
            const SizedBox(
              height: 8,
            ),
            FutureBuilder(
              future: controller.getUserCurrentCourses(),
              builder: (context, snapshot) {
                if (snapshot.hasData) {
                  return CourseList(
                    category: 'Current Courses',
                    courses: List<Course>.from(
                        List<String>.from(snapshot.data as List)
                            .map((e) => controller.getCourseById(e))),
                  );
                } else if (snapshot.connectionState ==
                    ConnectionState.waiting) {
                  return const Center(
                    child: CircularProgressIndicator(),
                  );
                } else if (snapshot.hasError) {
                  return Column(
                    children: [
                      Text(
                        'Current Courses',
                        style: TextStyles.textStylePrimaryColor24w700,
                      ),
                      const Center(
                        child: Text('An error has occured'),
                      ),
                    ],
                  );
                } else {
                  return Column(
                    children: [
                      Text(
                        'Current Courses',
                        style: TextStyles.textStylePrimaryColor24w700,
                      ),
                      const SizedBox(
                        height: 18,
                        child: Center(
                          child: Text('Empty'),
                        ),
                      ),
                    ],
                  );
                }
              },
            ),
            const SizedBox(
              height: 12,
            ),
            FutureBuilder(
              future: controller.getUserTakenCourses(),
              builder: (context, snapshot) {
                if (snapshot.hasData) {
                  return CourseList(
                    category: 'Completed Courses',
                    courses: List<Course>.from(
                        List<String>.from(snapshot.data as List)
                            .map((e) => controller.getCourseById(e))),
                  );
                } else if (snapshot.connectionState ==
                    ConnectionState.waiting) {
                  return const Center(
                    child: CircularProgressIndicator(),
                  );
                } else if (snapshot.hasError) {
                  return Column(
                    children: [
                      Text(
                        'Completed Courses',
                        style: TextStyles.textStylePrimaryColor24w700,
                      ),
                      const Center(
                        child: Text('An error has occured'),
                      ),
                    ],
                  );
                } else {
                  return Column(
                    children: [
                      Text(
                        'Completed Courses',
                        style: TextStyles.textStylePrimaryColor24w700,
                      ),
                      const SizedBox(
                        height: 18,
                        child: Center(
                          child: Text('Empty'),
                        ),
                      ),
                    ],
                  );
                }
              },
            ),
          ],
        ),
      ),
    );
  }
}
