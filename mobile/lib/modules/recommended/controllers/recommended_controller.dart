import 'package:get/get.dart';

import '../../../data/models/course.dart';
import '../../../data/services/course_service.dart';

class RecommendedController extends GetxController {
  List<Course> getCourseByCategory(String category) {
    return CourseService.instance
        .getAllCourse()
        .where((course) => course.category == category)
        .toList();
  }

  getAllCategories() {
    return CourseService.instance.getAllCategories();
  }

  getAllCourses() async {
    return await CourseService.instance.fetchCourses();
  }
}
