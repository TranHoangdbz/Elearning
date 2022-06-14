import 'package:uit_elearning/data/models/base_model.dart';

class Quiz extends BaseModel {
  final String question;
  final List<String> choices;
  final List<int> answers;

  Quiz({
    String? id,
    required this.question,
    required this.choices,
    required this.answers,
  }) : super(id);

  factory Quiz.fromJson(Map<String, dynamic> json) => Quiz(
        id: json["_id"],
        question: json["question"],
        choices: List<String>.from(json["choice"].map((x) => x)),
        answers: List<int>.from(json["answer"].map((x) => x)),
      );
}
