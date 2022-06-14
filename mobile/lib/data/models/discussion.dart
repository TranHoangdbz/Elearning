import 'base_model.dart';
import 'comment.dart';

class Discussion extends BaseModel {
  final Comment comment;
  final List<Comment>? repliedComments;

  Discussion({
    String? id,
    required this.comment,
    this.repliedComments,
  }) : super(id);

  @override
  Map<String, dynamic> toJson() => {
        "_id": id,
        "comment": comment.toJson(),
        "repliedComments": repliedComments == null
            ? null
            : List<dynamic>.from(repliedComments!.map((x) => x.toJson())),
      };

  factory Discussion.fromJson(Map<String, dynamic> data) => Discussion(
        id: data["_id"],
        comment: Comment.fromJson(data["comment"]),
        repliedComments: data["repliedComments"] == null
            ? null
            : List<Comment>.from(
                data["repliedComments"].map((x) => Comment.fromJson(x))),
      );
}
