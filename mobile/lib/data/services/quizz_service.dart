import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:uit_elearning/constants/app_colors.dart';
import 'package:uit_elearning/data/models/quizz.dart';
import 'package:uit_elearning/data/providers/quizz_provider.dart';
import 'package:uit_elearning/global_widgets/custom_dialog.dart';

class QuizzService {
  QuizzService._();
  static final QuizzService instance = QuizzService._();

  final QuizzProvider _quizzProvider = QuizzProvider();

  List<Quiz> quizz = [];

  Future<Quiz?> getQuizzById(id) async {
    return await _quizzProvider.fetch(id);
  }

  getQuizById(id) {
    if (quizz.isEmpty) return null;
    return quizz.firstWhereOrNull((element) => element.id!.compareTo(id) == 0);
  }

  fetchQuizz() async {
    try {
      quizz = await _quizzProvider.fetchAll();
      return quizz;
    } catch (e) {
      quizz = [];
      showDialog(
        context: Get.context!,
        builder: (context) {
          return const CustomDialog(
            content: "Fetch data error",
            icon: Icon(
              Icons.error,
              color: AppColors.redColor,
              size: 48,
            ),
          );
        },
      );
    }
  }
}
