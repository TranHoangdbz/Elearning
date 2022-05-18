import 'base_model.dart';

class User extends BaseModel {
  final String email;
  final String password;
  final String fullName;
  final String phoneNumber;

  User({
    String? id,
    required this.email,
    required this.password,
    required this.fullName,
    required this.phoneNumber,
  }) : super(id);

  @override
  Map<String, dynamic> toJson() {
    return {
      'email': email,
      'password': password,
      'fullName': fullName,
      'phoneNumber': phoneNumber,
    };
  }

  factory User.fromJson(Map<String, dynamic> data) => User(
        email: data['email'],
        password: data['password'],
        fullName: data['fullName'],
        phoneNumber: data['phoneNumber'],
      );
}
