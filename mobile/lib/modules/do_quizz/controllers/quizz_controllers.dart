import 'package:collection/collection.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:uit_elearning/constants/app_colors.dart';
import 'package:uit_elearning/data/models/lesson.dart';
import 'package:uit_elearning/data/models/passed.dart';
import 'package:uit_elearning/data/models/quizz.dart';
import 'package:uit_elearning/data/services/auth_service.dart';
import 'package:uit_elearning/data/services/quizz_service.dart';
import 'package:uit_elearning/global_widgets/custom_dialog.dart';

class QuizzController extends GetxController {
  late List<Lesson> lessons;
  RxInt selectedIndex = 0.obs;
  late Map<String, bool> checkAnswers;
  late Map<String, List<int>> quizAnswers;
  RxBool checked = false.obs;
  RxList<Quiz> quizList = RxList<Quiz>();

  @override
  void onInit() async {
    selectedIndex.value = 0;
    checked.value = false;
    checkAnswers = {};
    quizAnswers = <String, List<int>>{};
    lessons = Get.arguments;
    quizList.value = [];
    updateQuizList();
    super.onInit();
  }

  onSelected(int index) async {
    if (index != selectedIndex.value) {
      final result = await showDialog(
        context: Get.context!,
        builder: (context) {
          return const CustomDialog(
            icon: Icon(
              Icons.info_rounded,
              color: AppColors.blueColor,
              size: 48,
            ),
            showConfirmButton: true,
            content:
                'Switching to another lesson will delete your entire answer. Are you sure you want to move on to another lesson?',
          );
        },
      );
      if (result.toString().compareTo('confirm') == 0) {
        selectedIndex.value = index;
        reset();
        updateQuizList();
      }
    }
  }

  onAnswer(Quiz quiz, bool checked, int value) {
    if (quizAnswers.containsKey(quiz.id)) {
      if (!quizAnswers[quiz.id]!.contains(value)) {
        quizAnswers[quiz.id]!.add(value);
      } else {
        quizAnswers[quiz.id]!.remove(value);
      }
    } else {
      quizAnswers[quiz.id!] = [value];
    }

    update();

    Function deepEq = const DeepCollectionEquality.unordered().equals;
    bool passed = deepEq(quizAnswers[quiz.id], quiz.answers);

    if (quiz.id != null) {
      if (checkAnswers.containsKey(quiz.id)) {
        checkAnswers.update(quiz.id!, (value) => passed);
      } else {
        checkAnswers[quiz.id!] = passed;
      }
    }
  }

  onCheck() async {
    if (checked.value) {
      reset();
    } else {
      if (checkAnswers.entries.any((element) => !element.value)) {
        showDialog(
          context: Get.context!,
          builder: (context) {
            return const CustomDialog(
              icon: Icon(
                Icons.close_rounded,
                color: AppColors.redColor,
                size: 48,
              ),
              content:
                  'Sorry! You\'ve failed this lesson. Please check your answer again!',
            );
          },
        );
      } else {
        String? userId = AuthenticationService.instance.currentUser == null
            ? null
            : AuthenticationService.instance.currentUser!.id;
        List<Passed>? passed = lessons[selectedIndex.value].passed;

        if (userId != null) {
          if (passed != null) {
            Passed? passedData = passed.firstWhereOrNull(
                (element) => element.user.compareTo(userId) == 0);
            if (passedData != null) {
              if (!passedData.passed) {
                passedData.passed = true;
              }
            } else {
              passed.add(
                Passed(user: userId, passed: true),
              );
            }
          } else {
            passed = [Passed(user: userId, passed: true)];
          }
          if (lessons[selectedIndex.value].id != null) {
            await QuizzService.instance
                .updateLessonPassed(lessons[selectedIndex.value].id!, userId);
          }
        }
        showDialog(
          context: Get.context!,
          builder: (context) {
            return const CustomDialog(
              icon: Icon(
                Icons.check_circle_rounded,
                color: AppColors.greenColor,
                size: 48,
              ),
              content:
                  'Congratulations! You\'ve passed this lesson. You can continue to the next lesson right now!',
            );
          },
        );
      }
      checked.value = true;
    }
  }

  reset() {
    checked.value = false;
    checkAnswers.clear();
    quizAnswers.clear();
  }

  updateQuizList() {
    quizList.clear();
    for (int i = 0; i < lessons[selectedIndex.value].quizz.length; i++) {
      Quiz? result = QuizzService.instance
          .getQuizById(lessons[selectedIndex.value].quizz[i]);
      if (result != null) {
        quizList.add(
          result,
        );
      }
    }
  }

  fetchAllQuizz() async {
    return await QuizzService.instance.fetchQuizz();
  }
}
