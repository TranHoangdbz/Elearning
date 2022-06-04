import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:uit_elearning/constants/app_colors.dart';
import 'package:uit_elearning/constants/text_styles.dart';
import 'package:uit_elearning/data/models/lesson.dart';
import 'package:uit_elearning/data/models/quizz.dart';
import 'package:uit_elearning/data/services/auth_service.dart';
import 'package:uit_elearning/global_widgets/expandable_widget.dart';
import 'package:uit_elearning/modules/do_quizz/controllers/quizz_controllers.dart';
import 'package:uit_elearning/modules/do_quizz/screens/do_quizz_screen.dart';
import 'package:uit_elearning/modules/do_quizz/widgets/quizz_tile.dart';

class QuizzScreen extends StatelessWidget {
  const QuizzScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final _controller = Get.find<QuizzController>();

    return Material(
      color: AppColors.backgroundColor,
      child: FutureBuilder(
          future: _controller.fetchAllQuizz(),
          builder: (BuildContext context, snapshot) {
            if (snapshot.hasData) {
              _controller.updateQuizList();
              return ListView(
                children: [
                  Text(
                    'Attention',
                    style: TextStyles.textStyleOnBackgroundColor18w700,
                  ),
                  const SizedBox(
                    height: 4,
                  ),
                  Text(
                    'Score a lession’s quizz with an accuracy of 100% to unlock the next lession.',
                    style: TextStyles.textStyleOnBackgroundColor12w500,
                  ),
                  const SizedBox(
                    height: 16,
                  ),
                  Obx(() {
                    return Column(
                      children: _buildQuizzTiles(
                        lessons: _controller.lessons,
                        selectedIndex: _controller.selectedIndex.value,
                        onSelected: _controller.onSelected,
                        onAnswer: _controller.onAnswer,
                        onCheck: _controller.onCheck,
                        quizAnswers: _controller.quizAnswers,
                        checked: _controller.checked.value,
                        quizList: _controller.quizList,
                      ),
                    );
                  }),
                ],
              );
            } else if (snapshot.connectionState == ConnectionState.waiting) {
              return const Center(
                child: CircularProgressIndicator(),
              );
            } else if (snapshot.hasError) {
              return const Center(
                child: Text('An error has occured'),
              );
            } else {
              return const Center(
                child: Text('Empty'),
              );
            }
          }),
    );
  }

  _buildQuizzTiles({
    required List<Lesson> lessons,
    required int selectedIndex,
    required Function(int index) onSelected,
    required Function(Quiz quiz, bool checked, int value) onAnswer,
    required Function() onCheck,
    required Map<String, List<int>> quizAnswers,
    required bool checked,
    required List<Quiz> quizList,
  }) {
    List<Widget> results = [];
    String? userId = AuthenticationService.instance.currentUser == null
        ? null
        : AuthenticationService.instance.currentUser!.id;

    for (int i = 0; i < lessons.length; i++) {
      results.add(Column(
        children: [
          QuizzTile(
            onTap: () {
              onSelected(i);
            },
            title: '${i + 1}. ${lessons[i].name}',
            description: '${lessons[i].quizz.length} question' +
                (lessons[i].quizz.length > 1 ? 's' : ''),
            isLocked: i == 0
                ? false
                : lessons[i - 1].passed == null || userId == null
                    ? true
                    : !lessons[i - 1].passed!.any((element) =>
                        element.user.compareTo(userId) == 0 && element.passed),
            isSelected: i == selectedIndex ? true : false,
          ),
          ExpandableWidget(
            expand: i == selectedIndex ? true : false,
            child: GetBuilder<QuizzController>(builder: (_) {
              return DoQuizScreen(
                checked: checked,
                onCheck: onCheck,
                onAnswer: onAnswer,
                quizz: quizList,
                quizAnswers: quizAnswers,
              );
            }),
          ),
        ],
      ));
    }
    return results;
  }
}
