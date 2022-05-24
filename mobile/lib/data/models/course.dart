import 'base_model.dart';

class Course extends BaseModel {
  final String courseName;
  final String? courseImage;
  final String description;
  final String? teacher;
  final List<Object>? discussions;
  final List<num>? rating;

  Course({
    String? id,
    required this.courseName,
    this.courseImage,
    required this.description,
    this.teacher,
    this.discussions,
    this.rating
  }) : super(id);

  @override
  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'courseName': courseName,
      'courseImage': courseImage,
      'description': description,
      'teacher': teacher,
      'discussions': discussions,
      'rating': rating
    };
  }

  factory Course.fromJson(Map<String, dynamic> data) => Course(
    id: data['id'],
    courseName: data['courseName'],
    courseImage: data['courseImage'],
    description: data['description'],
    teacher: data['teacher'],
    discussions: data['discussions'],
    rating: data['rating'],
  );
}
