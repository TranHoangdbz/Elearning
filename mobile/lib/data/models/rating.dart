class Rating {
  final String user;
  final num rate;

  Rating({String? id, required this.user, required this.rate});

  Map<String, dynamic> toJson() => {
        "user": user,
        "rate": rate,
      };

  factory Rating.fromJson(Map<String, dynamic> data) => Rating(
        user: data["user"],
        rate: data["rate"],
      );
}
