import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

import '../../../data/models/course.dart';
import '../../../global_widgets/course_list.dart';
import '../../../constants/text_styles.dart';
import '../../../constants/app_colors.dart';
import '../../../global_widgets/custom_dialog.dart';
import '../../../global_widgets/logo_widget.dart';
import '../controllers/recommended_controller.dart';

class RecommendedScreen extends GetView<RecommendedController> {
  RecommendedScreen({Key? key}) : super(key: key);

  // final _controller = RecommendedController();

  @override
  Widget build(BuildContext context) {
    Get.put(RecommendedController());
    return Scaffold(
      extendBodyBehindAppBar: true,
      backgroundColor: AppColors.backgroundColor,
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        centerTitle: false,
        title: Row(
          children: [
            const Material(
              color: AppColors.backgroundColor,
              child: LogoWidget(
                showLabel: false,
              ),
            ),
            Text(
              'ProCourse',
              style: TextStyles.textStylePrimaryColor22w800,
            )
          ],
        ),
        automaticallyImplyLeading: false,
      ),
      body: SafeArea(
        child: Container(
          margin: const EdgeInsets.only(top: 20),
          child: SingleChildScrollView(
            // child: Column(
            // children: [
            //   CourseList('Category 1'),
            //   const SizedBox(
            //     height: 32,
            //   ),
            //   CourseList('Category 2'),
            //   const SizedBox(
            //     height: 32,
            //   ),
            //   CourseList('Category 3'),
            //   const SizedBox(
            //     height: 32,
            //   ),
            //   CourseList('Category 4'),
            // ],
            // children: controller.getAllCategories().map(
            //       (category) => CourseList(
            //         courses: controller.getCourseByCategory(category),
            //         category: category,
            //       ),
            //     ),
            // ),
            child: FutureBuilder(
              future: controller.getAllCourses(),
              builder: (BuildContext context, snapshot) {
                if (snapshot.hasData) {
                  return Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: controller
                        .getAllCategories()
                        .map<Widget>(
                          (category) => Column(
                            children: [
                              CourseList(
                                courses:
                                    controller.getCourseByCategory(category),
                                category: category,
                              ),
                              const SizedBox(
                                height: 32,
                              ),
                            ],
                          ),
                        )
                        .toList(),
                  );
                } else if (snapshot.connectionState ==
                    ConnectionState.waiting) {
                  return const Center(
                    child: CircularProgressIndicator(),
                  );
                } else if (snapshot.hasError) {
                  return const Center(
                    child: Text('An error has occured'),
                  );
                } else {
                  return const Center(
                    child: Text('Empty'),
                  );
                }
              },
            ),
          ),
        ),
      ),
    );
  }
}
