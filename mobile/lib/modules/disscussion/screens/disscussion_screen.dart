import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:get/get_core/src/get_main.dart';
import 'package:get/get_instance/src/extension_instance.dart';
import 'package:get/get_state_manager/src/simple/get_view.dart';
import 'package:uit_elearning/constants/text_styles.dart';
import 'package:uit_elearning/data/models/course.dart';
import 'package:uit_elearning/modules/disscussion/controllers/disscusion_controller.dart';

class DisscussionScreen extends GetView<DisscussionController> {
  final Course course;
  DisscussionScreen(this.course, {Key? key}) : super(key: key);

  //final _controller = Get.find<LessonsController>();

  @override
  Widget build(BuildContext context) {
    Get.put(DisscussionController());
    return Scaffold(
      body: Container(
        width: double.maxFinite,
        height: double.maxFinite,
        child: SingleChildScrollView(
          child: Container(
            padding: EdgeInsets.all(20),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Column(
                  children: [
                    Text(
                        course.discussion!.length.toString() + " Disscussion",
                        style: TextStyles.textStyleOnBackgroundColor13w700,
                      textAlign: TextAlign.start,
                    ),
                  ],
                ),
                SizedBox(height: 10,),
                Container(
                  width: double.maxFinite,
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Text(
                        "Finish 70% the lessons of this course to rate it",
                        style: TextStyles.textStyleOnBackgroundColor12w600,
                        textAlign: TextAlign.center,
                      ),
                      SizedBox(height: 10,),
                      Text("* * * * *"),
                      SizedBox(height: 10,),
                      Text(
                        "Rate a course could help us improve the course quality as well as helping other users",
                        style: TextStyles.textStyleOnBackgroundColor12w300,
                        textAlign: TextAlign.center,
                      )
                    ],
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}