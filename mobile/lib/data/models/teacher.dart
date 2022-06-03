import 'base_model.dart';

class Teacher extends BaseModel {
  final String fullName;
  final String email;
  final String phoneNumber;
  final String title;
  final String profilePicture;
  final List<String> courses;

  Teacher({
    String? id,
    required this.fullName,
    required this.email,
    required this.phoneNumber,
    required this.title,
    required this.profilePicture,
    required this.courses,
  }) : super(id);

  factory Teacher.fromJson(Map<String, dynamic> data) => Teacher(
        id: data["_id"],
        fullName: data["fullName"],
        email: data["email"],
        phoneNumber: data["phoneNumber"],
        title: data["title"],
        profilePicture: data["profilePicture"],
        courses: List<String>.from(data["courses"].map((x) => x)),
      );

  @override
  Map<String, dynamic> toJson() => {
        "_id": id,
        "fullName": fullName,
        "email": email,
        "phoneNumber": phoneNumber,
        "title": title,
        "profilePicture": profilePicture,
        "courses": List<dynamic>.from(courses.map((x) => x)),
      };
}
