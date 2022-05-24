import 'package:flutter/material.dart';
import 'package:get/get.dart';

import '../widgets/course_list.dart';
import '../../../constants/text_styles.dart';
import '../../../constants/app_colors.dart';
import '../../../global_widgets/logo_widget.dart';
import '../controllers/recommended_controller.dart';

class RecommendedScreen extends GetView<RecommendedController> {
  const RecommendedScreen({Key? key}) : super(key: key);

  // final _controller = Get.find<RecommendedController>();

  @override
  Widget build(BuildContext context) {
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
            child: Column(
              children: [
                CourseList('Category 1'),
                const SizedBox(
                  height: 32,
                ),
                CourseList('Category 2'),
                const SizedBox(
                  height: 32,
                ),
                CourseList('Category 3'),
                const SizedBox(
                  height: 32,
                ),
                CourseList('Category 4'),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
