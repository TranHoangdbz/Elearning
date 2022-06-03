import 'package:flutter/material.dart';
import 'package:uit_elearning/constants/text_styles.dart';
import 'package:uit_elearning/data/models/quizz.dart';

class QuestionItem extends StatelessWidget {
  final Quiz quiz;
  final List<int> userAnswers;
  final Function(Quiz quiz, bool checked, int value)? onAnswer;
  final bool checked;
  const QuestionItem({
    Key? key,
    required this.quiz,
    this.onAnswer,
    required this.userAnswers,
    this.checked = false,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          quiz.question,
          style: TextStyles.textStyleOnBackgroundColor14w600,
        ),
        ..._buildChoices(),
      ],
    );
  }

  _buildChoices() {
    List<Widget> results = [];
    for (int i = 0; i < quiz.choices.length; i++) {
      results.add(Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Row(
            children: [
              Checkbox(
                value: checked
                    ? (quiz.answers.contains(i) || userAnswers.contains(i))
                    : userAnswers.contains(i),
                onChanged: checked
                    ? null
                    : (value) {
                        if (onAnswer != null) {
                          onAnswer!(quiz, value!, i);
                        }
                        // if (value == true) {
                        //   userAnswers.add(i);
                        // } else {
                        //   userAnswers.remove(i);
                        // }
                        // if (onAnswer != null) {
                        //   Function deepEq =
                        //       const DeepCollectionEquality.unordered().equals;
                        //   onAnswer!(
                        //     quiz,
                        //     deepEq(userAnswers, quiz.answers),
                        //   );
                        // }
                      },
              ),
              Text(
                quiz.choices[i],
                style: TextStyles.textStyleOnBackgroundColor14w400,
              ),
            ],
          ),
          if (checked && quiz.answers.contains(i))
            Text(
              'Correct',
              style: TextStyles.textStyleGreenColorDark14w600,
            ),
          if (checked && !quiz.answers.contains(i) && userAnswers.contains(i))
            Text(
              'Incorrect',
              style: TextStyles.textStyleRedColor14w600,
            ),
        ],
      ));
    }
    return results;
  }
}
