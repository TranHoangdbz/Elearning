import 'base_model.dart';

class Teacher extends BaseModel {
  final String fullName;
  final String email;
  final String? phoneNumber;
  final String? title;
  final String? profilePicture;
  final List<Object>? courses;

  Teacher({
    String? id,
    required this.fullName,
    required this.email,
    this.title,
    this.phoneNumber,
    this.profilePicture,
    this.courses,
  }) : super(id);

  @override
  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'fullName': fullName,
      'email': email,
      'title': title,
      'phoneNumber': phoneNumber,
      'profilePicture': profilePicture,
      'courses': courses,
    };
  }

  factory Teacher.fromJson(Map<String, dynamic> data) => Teacher(
    id: data['id'],
    fullName: data['courseName'],
    email: data['email'],
    title: data['title'],
    phoneNumber: data['phoneNumber'],
    profilePicture: data['profilePicture'],
    courses: data['courses'],
  );
}
