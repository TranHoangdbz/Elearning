import 'package:uit_elearning/data/models/base_model.dart';

class Course extends BaseModel {
  final String name;

  Course({required String id, required this.name}) : super(id);

  factory Course.fromJson(Map<String, dynamic> json) {
    return Course(
      id: json["_id"],
      name: json["name"],
    );
  }
}
