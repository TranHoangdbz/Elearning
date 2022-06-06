import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

import 'package:get/get_core/src/get_main.dart';
import 'package:get/get_instance/src/extension_instance.dart';
import 'package:get/get_navigation/src/extension_navigation.dart';
import 'package:uit_elearning/data/models/course.dart';
import 'package:uit_elearning/global_widgets/custom_icon_button.dart';
import 'package:uit_elearning/global_widgets/video_player_wiget.dart';
import 'package:uit_elearning/modules/disscussion/screens/disscussion_screen.dart';
import 'package:uit_elearning/modules/learn_course/controllers/learning_course_controller.dart';
import 'package:uit_elearning/modules/lessons/screens/lessons_screen.dart';
import 'package:uit_elearning/modules/my_courses/screens/my_courses_screen.dart';
import 'package:video_player/video_player.dart';

class LearnCourseScreen extends StatelessWidget {
  final Course course;
  LearnCourseScreen({Key? key, required this.course}) : super(key: key);

  //final _controller = Get.find<LearnCoursesController>();
  late VideoPlayerController vidcontroller;

  @override
  Widget build(BuildContext context) {
    Get.put(LearnCoursesController());
    vidcontroller = VideoPlayerController.network("https://www.youtube.com/watch?v=sMcfFmR0MmA");
    return GetBuilder<LearnCoursesController>(
        builder: (_controller) {
          return DefaultTabController(
              length: 3,
              child: SafeArea(
                child: Scaffold(
                  appBar: PreferredSize(
                    preferredSize: Size.fromHeight(270),
                    child: Container(
                      child: Column(
                        children: [
                          Container(
                            height: 210,
                            decoration: BoxDecoration(
                              color: Colors.blue,
                            ),
                            child: Stack(
                              children: [
                                Positioned(
                                    left: 0,
                                    right: 0,
                                    top: 0,
                                    bottom: 0,
                                    child: Container(
                                      height: 250,
                                      color: Colors.red,
                                      child: VideoPlayerWidget(controller: vidcontroller,),
                                    )),
                                Positioned(
                                  left: 0,
                                  top: 0,
                                  child: CustomIconButton(
                                      icon: const Icon(
                                        Icons.arrow_back_ios_new_rounded,
                                        color: Colors.white,
                                      ),
                                      onTap: (){
                                        Get.back();
                                      }
                                  ),
                                ),
                                Positioned(
                                  left: 2,
                                  bottom: 5,
                                  child: Row(
                                    children: [
                                      CustomIconButton(
                                          icon: const Icon(
                                            Icons.fast_rewind,
                                            color: Colors.white,
                                          ),
                                          onTap: (){
                                            Get.back();
                                          }
                                      ),
                                      CustomIconButton(
                                          icon: const Icon(
                                            Icons.pause,
                                            color: Colors.white,
                                          ),
                                          onTap: (){
                                            Get.back();
                                          }
                                      ),
                                      CustomIconButton(
                                          icon: const Icon(
                                            Icons.fast_forward,
                                            color: Colors.white,
                                          ),
                                          onTap: (){
                                            Get.back();
                                          }
                                      ),
                                    ],
                                  ),
                                ),
                              ],
                            ),
                          ),

                          Align(
                            alignment: Alignment.topLeft,
                            child: TabBar(
                              unselectedLabelColor: Colors.black,
                              labelColor: Colors.black,
                              indicatorColor: Colors.black,
                              tabs: [
                                Tab(text: 'Lessons',),
                                Tab(text: 'Quizzes',),
                                Tab(text: 'Disscussion',),
                              ],
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                  body: TabBarView(
                    children: [
                      LessonsScreen(course),
                      MyCoursesScreen(),
                      DisscussionScreen(course),
                    ],
                  ),
                ),
              )
          );
        }
    );
  }
}
