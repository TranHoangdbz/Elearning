import 'package:carousel_indicator/carousel_indicator.dart';
import 'package:carousel_slider/carousel_slider.dart';
import 'package:flutter/material.dart';
import 'package:uit_elearning/constants/app_colors.dart';
import 'package:uit_elearning/data/models/quizz.dart';
import 'package:uit_elearning/global_widgets/custom_elevated_button.dart';
import 'package:uit_elearning/modules/do_quizz/widgets/question_item.dart';

class DoQuizScreen extends StatefulWidget {
  final List<Quiz> quizz;
  final Function(Quiz quiz, bool checked, int value)? onAnswer;
  final Function()? onCheck;
  final Map<String, List<int>>? quizAnswers;
  final bool checked;
  const DoQuizScreen({
    Key? key,
    required this.quizz,
    this.onAnswer,
    this.onCheck,
    this.quizAnswers,
    this.checked = false,
  }) : super(key: key);

  @override
  State<DoQuizScreen> createState() => _DoQuizScreenState();
}

class _DoQuizScreenState extends State<DoQuizScreen> {
  late int _index;
  @override
  void initState() {
    _index = 0;
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        CarouselSlider(
          items: _buildQuestionItems(),
          options: CarouselOptions(
            initialPage: _index,
            aspectRatio: 3 / 2,
            viewportFraction: 1,
            enableInfiniteScroll: false,
            scrollPhysics: const BouncingScrollPhysics(
              parent: AlwaysScrollableScrollPhysics(),
            ),
            onPageChanged: (index, reason) {
              setState(() {
                _index = index;
              });
            },
          ),
        ),
        CarouselIndicator(
          count: widget.quizz.length,
          index: _index,
          color: AppColors.disabledColor,
          activeColor: AppColors.onDisabledColor,
          width: 8,
          height: 8,
        ),
        Padding(
          padding: const EdgeInsets.all(16.0),
          child: CustomElevatedButton(
            onPressed: _isCheckingAvailable() ? widget.onCheck : null,
            label: widget.checked ? 'Reset' : 'Check',
            primary: AppColors.primaryColor,
            onPrimary: AppColors.onPrimaryColor,
          ),
        ),
      ],
    );
  }

  _buildQuestionItems() {
    return widget.quizz.map((e) {
      return Padding(
        padding: const EdgeInsets.only(
          top: 16,
          left: 24,
          right: 24,
        ),
        child: QuestionItem(
          checked: widget.checked,
          onAnswer: widget.onAnswer,
          quiz: e,
          userAnswers:
              widget.quizAnswers == null || widget.quizAnswers![e.id] == null
                  ? []
                  : widget.quizAnswers![e.id]!,
        ),
      );
    }).toList();
  }

  _isCheckingAvailable() {
    if (widget.checked) {
      return true;
    }

    if (widget.quizAnswers == null) {
      return false;
    } else {
      if (widget.quizAnswers!.isEmpty) {
        return false;
      }
    }

    if (widget.quizAnswers!.length < widget.quizz.length) {
      return false;
    }
    return !widget.quizAnswers!.values.any((element) => element.isEmpty);
  }
}
