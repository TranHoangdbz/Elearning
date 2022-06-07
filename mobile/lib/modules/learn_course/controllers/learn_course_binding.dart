import 'package:get/get.dart';
import 'learning_course_controller.dart';

class LearnCoursesBinding extends Bindings {
  @override
  void dependencies() {
    Get.lazyPut(() => LearnCoursesController());
  }
}