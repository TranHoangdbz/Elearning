import 'package:get/get.dart';
import 'view_courses_controller.dart';

class ViewCoursesBinding extends Bindings {
  @override
  void dependencies() {
    Get.lazyPut(() => ViewCoursesController());
  }
}