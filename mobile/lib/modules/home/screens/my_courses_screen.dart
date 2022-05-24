import 'package:flutter/material.dart';
import 'package:get/get.dart';

import '../controllers/my_courses_controller.dart';
import '../../../constants/app_colors.dart';
import '../widgets/course_list.dart';
import '../../../constants/text_styles.dart';

class MyCoursesScreen extends GetView<MyCoursesController> {
  const MyCoursesScreen({Key? key}) : super(key: key);

  // final _controller = Get.find<MyCoursesController>();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.backgroundColor,
      body: Container(
        // margin: const EdgeInsets.only(top: 20),
        child: SingleChildScrollView(
          child: Column(
            children: [
              Container(
                margin: const EdgeInsets.all(20),
                child: Row(
                  children: [
                    Container(
                      margin: const EdgeInsets.only(right: 20),
                      child: CircleAvatar(
                        backgroundImage: const NetworkImage(
                            'https://picsum.photos/100/100?image=35'),
                        onBackgroundImageError: (e, s) {
                          debugPrint('Teacher avatar can\'t load: , $e, $s');
                        },
                        minRadius: 41,
                      ),
                    ),
                    const SizedBox(
                      height: 24,
                    ),
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          'No Name',
                          textAlign: TextAlign.left,
                          style: TextStyles.textStylePrimaryColor22w800,
                        ),
                        const SizedBox(
                          height: 12,
                        ),
                        ElevatedButton(
                          onPressed: () {},
                          child: Padding(
                            padding: const EdgeInsets.all(10),
                            child: Text(
                              'Profile Detail',
                              style: TextStyles.textStyleBackkgroundColor12w600,
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
                      ],
                    ),
                    const Spacer(),
                    IconButton(
                      onPressed: () {},
                      icon: const Icon(Icons.settings),
                    )
                  ],
                ),
              ),
              CourseList('Current Courses'),
              const SizedBox(
                height: 32,
              ),
              CourseList('Completed Courses'),
              // const SizedBox(
              //   height: 32,
              // ),
            ],
          ),
        ),
      ),
    );
  }
}
