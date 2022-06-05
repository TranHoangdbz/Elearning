import 'package:get/get.dart';
import 'package:uit_elearning/data/models/lesson.dart';
import 'package:uit_elearning/data/services/lesson_service.dart';

class LessonsController extends GetxController {

  List<Lesson> getCourseByCategory(String category) {
    return LessonService.instance
        .getAllLessons()
        .toList();
  }

  getAllLessons() async {
    return await LessonService.instance.fetchLessons();
  }
}