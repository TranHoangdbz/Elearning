import 'package:collection/collection.dart';
import 'package:get/get.dart';
import 'package:uit_elearning/data/models/lesson.dart';
import 'package:uit_elearning/data/models/quizz.dart';

class QuizzController extends GetxController {
  late List<Lesson> lessons;
  RxInt selectedIndex = 0.obs;
  late Map<String, bool> checkAnswers;
  late Map<String, List<int>> quizAnswers;
  RxBool checked = false.obs;

  @override
  void onInit() {
    selectedIndex.value = 0;
    checked.value = false;
    checkAnswers = {};
    quizAnswers = <String, List<int>>{};
    lessons = [
      Lesson(
          description: '',
          video: '',
          quizz: [],
          thumbnail: '',
          name: 'A summary about .NET',
          lessonVolume: 3),
      Lesson(
          description: '',
          video: '',
          quizz: [],
          thumbnail: '',
          name: 'Exception filters',
          lessonVolume: 3),
      Lesson(
          description: '',
          video: '',
          quizz: [],
          thumbnail: '',
          name: 'ref keyword',
          lessonVolume: 3),
      Lesson(
          description: '',
          video: '',
          quizz: [],
          thumbnail: '',
          name: 'Finalizers',
          lessonVolume: 3),
      Lesson(
          description: '',
          video: '',
          quizz: [],
          thumbnail: '',
          name: 'Struct layout',
          lessonVolume: 3),
    ];
    super.onInit();
  }

  onSelected(int index) {
    selectedIndex.value = index;
    reset();
  }

  onAnswer(Quiz quiz, bool checked, int value) {
    // List<int> userAnswers = quizAnswers[quiz.id] ?? [];
    // if (checked) {
    //   userAnswers.add(value);
    // } else {
    //   userAnswers.remove(value);
    // }
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
}
