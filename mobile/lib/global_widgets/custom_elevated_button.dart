import 'package:flutter/material.dart';
import '../constants/app_colors.dart';
import '../constants/text_styles.dart';

class CustomElevatedButton extends StatelessWidget {
  final Function()? onPressed;
  final String label;
  final TextStyle? textStyle;
  final Color? primary;
  final Color? onPrimary;
  const CustomElevatedButton(
      {Key? key,
      required this.onPressed,
      this.label = 'New button',
      this.textStyle,
      this.primary,
      this.onPrimary})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: double.infinity,
      child: ElevatedButton(
        onPressed: onPressed,
        child: Text(
          label,
        ),
        style: ElevatedButton.styleFrom(
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(8),
          ),
          padding: const EdgeInsets.symmetric(vertical: 16),
          primary: primary ?? AppColors.backgroundColor,
          onPrimary: onPrimary ?? AppColors.primaryColor,
          textStyle: textStyle ?? TextStyles.textStylePrimaryColor14w600,
        ),
      ),
    );
  }
}
