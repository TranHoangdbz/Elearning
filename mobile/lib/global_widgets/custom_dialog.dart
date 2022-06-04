import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:uit_elearning/constants/app_colors.dart';
import 'package:uit_elearning/constants/text_styles.dart';
import 'package:uit_elearning/global_widgets/custom_elevated_button.dart';

class CustomDialog extends StatelessWidget {
  final String content;
  final Widget? icon;
  final String buttonLabel;

  const CustomDialog(
      {Key? key,
      this.content = 'Content',
      this.icon,
      this.buttonLabel = 'Close'})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Dialog(
      backgroundColor: Colors.transparent,
      child: Container(
        padding: const EdgeInsets.fromLTRB(24, 24, 24, 20),
        decoration: BoxDecoration(
          color: AppColors.backgroundColor,
          borderRadius: BorderRadius.circular(20),
        ),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            if (icon != null) icon!,
            Padding(
              padding: const EdgeInsets.fromLTRB(24, 16, 24, 24),
              child: Text(content,
                  style: TextStyles.textStyleOnBackgroundColor13w700,
                  textAlign: TextAlign.center),
            ),
            CustomElevatedButton(
                primary: AppColors.primaryColor,
                onPrimary: AppColors.onPrimaryColor,
                label: buttonLabel,
                onPressed: () {
                  Get.back();
                }),
          ],
        ),
      ),
    );
  }
}
