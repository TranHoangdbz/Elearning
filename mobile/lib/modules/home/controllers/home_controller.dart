import 'package:get/get.dart';
import 'package:uit_elearning/data/models/course.dart';
import 'package:uit_elearning/data/services/data_service.dart';

class HomeController extends GetxController {
  RxList courses = [].obs;

  @override
  void onInit() {
    super.onInit();
    initCourses();
  }

  void initCourses() async {
    await DataService.instance.loadCourseList();
    courses.value = DataService.instance.courseList;
  }
}
