import 'lesson.dart';
import 'teacher.dart';
import 'base_model.dart';
import 'discussion.dart';
import 'rating.dart';

class Course extends BaseModel {
  final String courseCode;
  final String courseName;
  final String courseImage;
  final String demoVideo;
  final String? category;
  final String description;
  final Teacher? teacher;
  final List<Discussion>? discussion;
  final List<Rating>? rating;
  final List<Lesson> lessons;
  final bool? isActive;
  final num? v;

  Course({
    String? id,
    required this.courseCode,
    required this.courseName,
    required this.courseImage,
    required this.demoVideo,
    //required this.category,
    this.category,
    required this.description,
    required this.teacher,
    this.discussion,
    this.rating,
    required this.lessons,
    this.isActive,
    this.v,
  }) : super(id);

  @override
  Map<String, dynamic> toJson() => {
        "_id": id,
        "courseCode": courseCode,
        "courseImage": courseImage,
        "courseName": courseName,
        "demoVideo": demoVideo,
        "category": category,
        "description": description,
        "teacher": teacher == null ? null : teacher!.toJson(),
        "discussion": discussion == null
            ? null
            : List<dynamic>.from(discussion!.map((x) => x.toJson())),
        "rating": rating == null
            ? null
            : List<dynamic>.from(rating!.map((x) => x.toJson())),
        "lessons":
            lessons == null ? null : List<dynamic>.from(lessons.map((x) => x)),
        "isActive": isActive,
        '__v': v,
      };

  factory Course.fromJson(Map<String, dynamic> data) => Course(
        id: data["_id"],
        courseCode: data["courseCode"] ?? '',
        courseImage: data["courseImage"] ?? '',
        courseName: data["courseName"] ?? '',
        demoVideo: data["demoVideo"] ?? '',
        category: data["category"] ?? "No Category",
        description: data["description"] ?? "No Description",
        teacher:
            data["teacher"] == null ? null : Teacher.fromJson(data["teacher"]),
        discussion: data["discussion"] == null
            ? null
            : List<Discussion>.from(
                data["discussion"].map((x) => Discussion.fromJson(x))),
        rating: data["rating"] == null
            ? null
            : List<Rating>.from(data["rating"].map((x) => Rating.fromJson(x))),
        lessons:
            List<Lesson>.from(data["lessons"].map((x) => Lesson.fromJson(x))),
        isActive: data["isActive"],
        v: data["__v"],
      );
}
