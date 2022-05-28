import 'base_model.dart';
import 'passed.dart';

class Lesson extends BaseModel {
  String lessonCode;
  String description;
  String video;
  List<String> quizz;
  List<Passed> passed;
  String thumbnail;
  String name;
  int lessonVolume;

  Lesson({
    String? id,
    required this.lessonCode,
    required this.description,
    required this.video,
    required this.quizz,
    required this.passed,
    required this.thumbnail,
    required this.name,
    required this.lessonVolume,
  }) : super(id);

  factory Lesson.fromJson(Map<String, dynamic> json) => Lesson(
        id: json["_id"],
        lessonCode: json["lessonCode"],
        description: json["description"],
        video: json["video"],
        quizz: List<String>.from(json["quizz"].map((x) => x)),
        passed:
            List<Passed>.from(json["passed"].map((x) => Passed.fromJson(x))),
        thumbnail: json["thumbnail"],
        name: json["name"],
        lessonVolume: json["lessonVolume"],
      );

  @override
  Map<String, dynamic> toJson() => {
        "_id": id,
        "lessonCode": lessonCode,
        "description": description,
        "video": video,
        "quizz": List<dynamic>.from(quizz.map((x) => x)),
        "passed": List<dynamic>.from(passed.map((x) => x.toJson())),
        "thumbnail": thumbnail,
        "name": name,
        "lessonVolume": lessonVolume,
      };
}
