import 'base_model.dart';
import 'passed.dart';

class Lesson extends BaseModel {
  String description;
  String video;
  List<String> quizz;
  String thumbnail;
  String name;
  int lessonVolume;
  int? v;
  List<Passed> passed;

  Lesson({
    String? id,
    required this.description,
    required this.video,
    required this.quizz,
    required this.thumbnail,
    required this.name,
    required this.lessonVolume,
    this.v,
    required this.passed,
  }) : super(id);

  factory Lesson.fromJson(Map<String, dynamic> json) => Lesson(
        id: json["_id"],
        description: json["description"],
        video: json["video"],
        quizz: List<String>.from(json["quizz"].map((x) => x)),
        thumbnail: json["thumbnail"],
        name: json["name"],
        v: json["__v"],
        lessonVolume: json["lessonVolume"],
        passed: List<Passed>.from(json["passed"].map((x) => Passed.fromJson(x))),
      );

  @override
  Map<String, dynamic> toJson() => {
        "_id": id,
        "description": description,
        "video": video,
        "quizz": List<dynamic>.from(quizz.map((x) => x)),
        "thumbnail": thumbnail,
        "__v": v,
        "name": name,
        "lessonVolume": lessonVolume,
        "passed": List<Passed>.from(passed.map((x) => x.toJson())),
      };
}
