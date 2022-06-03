class Passed {
  Passed({
    required this.user,
    required this.passed,
  });

  String user;
  bool passed;

  factory Passed.fromJson(Map<String, dynamic> json) => Passed(
        user: json["user"],
        passed: json["passed"],
      );

  Map<String, dynamic> toJson() => {
        "user": user,
        "passed": passed,
      };
}
