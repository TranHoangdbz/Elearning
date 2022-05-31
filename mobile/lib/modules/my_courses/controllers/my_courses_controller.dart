import 'package:get/get.dart';
import 'package:uit_elearning/data/services/course_service.dart';

import '../../../data/services/auth_service.dart';

class MyCoursesController extends GetxController {
  // @override
  // void onInit() {
  //   super.onInit();
  // }

  getUserProfilePicture() {
    return AuthenticationService.instance.currentUser!.profilePicture;
  }

  getUserFullName() {
    return AuthenticationService.instance.currentUser!.fullName;
  }

  getUserTakenCourses() async {
    return AuthenticationService.instance.currentUser!.takenCourses;
  }

  getUserCurrentCourses() async {
    return AuthenticationService.instance.currentUser!.currentCourses;
  }

  getCourseById(id) {
    return CourseService.instance.getCourseById(id);
  }
}
