import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

import 'package:get/get_core/src/get_main.dart';
import 'package:get/get_instance/src/extension_instance.dart';
import 'package:get/get_navigation/src/extension_navigation.dart';
import 'package:uit_elearning/data/models/course.dart';
import 'package:uit_elearning/modules/learn_course/screens/learn_course_screen.dart';
import 'package:uit_elearning/routes/routes.dart';
import '../../../global_widgets/custom_icon_button.dart';
import '../../../global_widgets/custom_elevated_button.dart';
import 'package:uit_elearning/modules/View_Course/controller/view_courses_controller.dart';

class ViewcourseScreen extends StatelessWidget {
  final Course course;
  ViewcourseScreen({Key? key, required this.course}) : super(key: key);

  //final _controller = Get.find<ViewCoursesController>();

  // final _controller = Get.find<MyCoursesController>();

  @override
  Widget build(BuildContext context) {
    Get.put(ViewCoursesController());
    return Scaffold(
      body: Container(
        width: double.maxFinite,
        height: double.maxFinite,
        child: Stack(
          children: [
            Positioned(
              left: 0,
              right: 0,
              child: Container(
                width: double.maxFinite,
                height: 300,
                decoration: BoxDecoration(),
                child: Image.network(
                  course.courseImage,
                  fit: BoxFit.cover,
                ),
              ),
            ),
            Positioned(
              left: 0,
              top: 20,
              child: CustomIconButton(
                  icon: const Icon(
                    Icons.arrow_back_ios_new_rounded,
                    color: Colors.white,
                  ),
                  onTap: () {
                    Get.back();
                  }),
            ),
            Positioned(
              top: 270,
              child: SingleChildScrollView(
                child: Container(
                  padding: const EdgeInsets.all(20),
                  width: MediaQuery.of(context).size.width,
                  height: 600,
                  decoration: BoxDecoration(
                      color: Colors.white,
                      borderRadius: BorderRadius.only(
                          topLeft: Radius.circular(30),
                          topRight: Radius.circular(30))),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      SizedBox(
                        height: 30,
                      ),
                      Container(
                        child: Center(
                          child: Text(
                            course.courseName,
                            style: TextStyle(
                              fontSize: 24,
                              fontWeight: FontWeight.w600,
                            ),
                          ),
                        ),
                      ),
                      SizedBox(
                        height: 30,
                      ),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Row(
                            children: [
                              Container(
                                child: CircleAvatar(
                                  backgroundImage: NetworkImage(
                                      course.teacher.profilePicture),
                                  onBackgroundImageError: (e, s) {
                                    debugPrint(
                                        'Teacher avatar can\'t load: , $e, $s');
                                  },
                                  minRadius: 15,
                                ),
                              ),
                              SizedBox(
                                width: 10,
                              ),
                              Container(
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Text(
                                      course.teacher.fullName,
                                      style: TextStyle(
                                        fontSize: 13,
                                        fontWeight: FontWeight.w600,
                                      ),
                                    ),
                                    Text(
                                      course.teacher.title,
                                      style: TextStyle(
                                        fontSize: 13,
                                        fontWeight: FontWeight.w300,
                                      ),
                                    )
                                  ],
                                ),
                              ),
                            ],
                          ),
                          Container(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.end,
                              children: [
                                Text("4 hours 20 mins",
                                    style: TextStyle(
                                      fontSize: 13,
                                      fontWeight: FontWeight.w300,
                                    )),
                                Text(course.lessons.length.toString(),
                                    style: TextStyle(
                                      fontSize: 13,
                                      fontWeight: FontWeight.w600,
                                    ))
                              ],
                            ),
                          ),
                        ],
                      ),
                      SizedBox(
                        height: 30,
                      ),
                      Container(
                          child: Text("Description:",
                              style: TextStyle(
                                fontSize: 13,
                                fontWeight: FontWeight.w600,
                              ))),
                      SizedBox(
                        height: 20,
                      ),
                      Container(
                          child: Text(
                        course.description,
                        style: TextStyle(
                          fontSize: 13,
                          fontWeight: FontWeight.w300,
                        ),
                        textAlign: TextAlign.center,
                      )),
                      SizedBox(
                        height: 20,
                      ),
                    ],
                  ),
                ),
              ),
            ),
            Positioned(
              bottom: 20,
              left: 20,
              right: 20,
              child: CustomElevatedButton(
                label: "REGISTER",
                onPressed: () {
                  Navigator.push(
                      context,
                      MaterialPageRoute(
                          builder: (context) => LearnCourseScreen(
                                course: course,
                                lesson: course.lessons.first,
                              )));
                },
                primary: Colors.indigo,
                onPrimary: Colors.white,
              ),
            )
          ],
        ),
      ),
    );
  }
}
