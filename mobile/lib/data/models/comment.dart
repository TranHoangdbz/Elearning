import 'base_model.dart';

class Comment extends BaseModel {
  final String user;
  final String content;
  DateTime time = DateTime.now();
  final List<String>? likes;

  Comment({
    String? id,
    required this.user,
    required this.content,
    DateTime? time,
    this.likes,
  }) : super(id);

  @override
  Map<String, dynamic> toJson() => {
        "_id": id,
        "user": user,
        "content": content,
        "time": time.toIso8601String(),
        "likes":
            likes == null ? null : List<dynamic>.from(likes!.map((x) => x)),
      };

  factory Comment.fromJson(Map<String, dynamic> data) => Comment(
        id: data["_id"],
        user: data["user"],
        content: data["content"],
        time: DateTime.parse(data["time"]),
        likes: data["likes"] == null
            ? null
            : List<String>.from(data["likes"].map((x) => x)),
      );
}
