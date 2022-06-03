import 'package:flutter/material.dart';
import '../constants/app_colors.dart';
import '../constants/text_styles.dart';

class CustomTextButton extends StatelessWidget {
  final Function()? onPressed;
  final String label;
  final TextStyle? textStyle;
  final Color? primary;
  const CustomTextButton({
    Key? key,
    required this.onPressed,
    this.label = 'New button',
    this.textStyle,
    this.primary,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return TextButton(
      onPressed: onPressed,
      child: Text(
        label,
      ),
      style: TextButton.styleFrom(
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(8),
        ),
        padding: const EdgeInsets.symmetric(vertical: 16, horizontal: 24),
        primary: primary ?? AppColors.backgroundColor,
        textStyle: textStyle ?? TextStyles.textStylePrimaryColor14w600,
      ),
    );
  }
}
