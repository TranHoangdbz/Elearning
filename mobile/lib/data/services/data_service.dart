import 'package:uit_elearning/data/models/course.dart';
import 'package:uit_elearning/data/providers/course_provider.dart';

class DataService {
  DataService._();
  static final DataService instance = DataService._();

  static late List<Course> _courseList = [];
  final CourseProvider _courseProvider = CourseProvider();

  List<Course> get courseList => [..._courseList];

  loadCourseList() async {
    if (_courseList.isEmpty) {
      _courseList = await _courseProvider.fetchAll();
    }
  }
}
