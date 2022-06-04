import 'package:collection/collection.dart';
import 'package:get/get.dart';
import 'package:uit_elearning/data/models/lesson.dart';
import 'package:uit_elearning/data/models/quizz.dart';
import 'package:uit_elearning/data/services/quizz_service.dart';

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

  onSelected(int index) {
    selectedIndex.value = index;
    reset();
    updateQuizList();
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

  onCheck() {
    if (checked.value) {
      reset();
    } else {
      if (checkAnswers.entries.any((element) => !element.value)) {
        // showDialog(
        //   context: Get.context!,
        //   builder: (context) {
        //     return CustomDialog(
        //         content: 'Congratulations!\nYou\'ve passed this lesson.');
        //   },
        // );
      } else {
        print(true);
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
